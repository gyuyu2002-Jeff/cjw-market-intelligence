import os
import json
import re
import sys
import urllib.request
from datetime import datetime, timezone, timedelta
import subprocess

tz_tw = timezone(timedelta(hours=8))
now = datetime.now(tz_tw)
import hashlib

# Fix Windows console encoding issues for unicode characters
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

# Try importing fetcher from local directory first, then fallback to E drive
try:
    import fetcher
except ImportError:
    sys.path.append(r"C:\HJ\齋滋味\cjw_news_hub")
    try:
        import fetcher
    except ImportError as e:
        print(f"Error importing fetcher: {e}")
        sys.exit(1)

# Paths
# Dynamically determine the directory of this script to support both local and GitHub Actions environments
FRONTEND_DIR = os.path.dirname(os.path.abspath(__file__))
PAGE_TSX_PATH = os.path.join(FRONTEND_DIR, "app", "page.tsx")

DB_PATH = os.path.join(FRONTEND_DIR, "news_db.json")
if not os.path.exists(DB_PATH):
    DB_PATH = r"C:\HJ\齋滋味\cjw_news_hub\news_db.json"

# Load Gemini API Key
api_key = ""
if os.path.exists(DB_PATH):
    try:
        with open(DB_PATH, "r", encoding="utf-8") as f:
            db_data = json.load(f)
            api_key = db_data.get("config", {}).get("gemini_api_key", "").strip()
    except Exception:
        pass

if not api_key:
    api_key = os.environ.get("GEMINI_API_KEY", "").strip()

print(f"Gemini API Key loaded: {'Yes' if api_key else 'No (Using Offline Mode)'}")

def execute_gemini_request(api_key, prompt, response_mime_type="application/json", max_retries=3, initial_delay=5):
    if not api_key:
        return None
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key={api_key}"
    body = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ]
    }
    if response_mime_type:
        body["generationConfig"] = {"responseMimeType": response_mime_type}
        
    data = json.dumps(body).encode('utf-8')
    
    import time
    import urllib.error
    
    delay = initial_delay
    for attempt in range(max_retries + 1):
        req = urllib.request.Request(
            url,
            data=data,
            headers={'Content-Type': 'application/json'}
        )
        try:
            with urllib.request.urlopen(req, timeout=20) as response:
                res_body = response.read().decode('utf-8')
                res_json = json.loads(res_body)
                text = res_json['candidates'][0]['content']['parts'][0]['text']
                raw_text = text.strip()
                if raw_text.startswith("```"):
                    lines = raw_text.splitlines()
                    if lines[0].startswith("```"):
                        lines = lines[1:]
                    if lines[-1].startswith("```"):
                        lines = lines[:-1]
                    raw_text = "\n".join(lines).strip()
                return json.loads(raw_text)
        except urllib.error.HTTPError as e:
            if e.code == 429:
                retry_after_sec = 60
                try:
                    err_body = e.read().decode('utf-8')
                    err_json = json.loads(err_body)
                    err_msg = err_json.get("error", {}).get("message", "")
                    sec_match = re.search(r"retry in ([\d\.]+)s", err_msg)
                    if sec_match:
                        retry_after_sec = float(sec_match.group(1)) + 2.0
                    else:
                        sec_match_min = re.search(r"retry in ([\d\.]+)m", err_msg)
                        if sec_match_min:
                            retry_after_sec = (float(sec_match_min.group(1)) * 60.0) + 5.0
                except Exception:
                    pass
                print(f"Gemini API rate limited (429). Retrying in {retry_after_sec}s... (Attempt {attempt+1}/{max_retries})")
                time.sleep(retry_after_sec)
            else:
                print(f"Gemini API HTTP Error {e.code}: {e.reason}")
                break
        except Exception as e:
            print(f"Gemini API Request failed: {e}")
            break
    return None

def call_gemini_api_for_market_pulse(api_key, region, news_items):
    if not api_key or not news_items:
        return None
    
    summaries = []
    for item in news_items[:15]:
        summaries.append(f"- [{item.get('topic')}] {item.get('title')}: {item.get('summary')}")
    news_summaries_text = "\n".join(summaries)
    
    prompt = f"""你是一位資深食品與蔬食產業分析師。請針對 {region} 市場近期的產業動態摘要：
{news_summaries_text}

請根據這些最新動態，撰寫一份客觀的對該市場的月度核心判讀與策略建議，並嚴格以 JSON 格式回傳（只回傳 JSON 物件，不要任何 markdown 的 ```json 包裹標記，也不要任何前後贅字，以防 JSON 解析失敗）：
{{
  "signal": "必須且只能是下列選項之一：'穩定'、'偏多'、'觀察'、'承壓'",
  "note": "4-8 字的核心摘要形容詞（例如：標示與通路重整、健康與價值拉鋸、價格與口味決勝、德義成長與英國承壓）",
  "value": 50,
  "headline": "15-25 字的一句話市場大局結論描述",
  "drivers": [
    "第 1 個核心驅動因素描述（15-30字）",
    "第 2 個核心驅動因素描述（15-30字）",
    "第 3 個核心驅動因素描述（15-30字）"
  ],
  "opportunity": "我方的開發與行銷機會點（40-60字）",
  "risk": "我方主要面臨的法規或競爭風險（40-60字）",
  "watch": [
    "後續觀察重點指標 1",
    "後續觀察重點指標 2",
    "後續觀察重點指標 3",
    "後續觀察重點指標 4"
  ]
}}
"""
    return execute_gemini_request(api_key, prompt)

def call_gemini_api_for_briefing(api_key, news_items):
    if not api_key or not news_items:
        return None
    
    summaries = []
    for item in news_items[:15]:
        summaries.append(f"- [{item.get('region', '未知地區')}] {item.get('title')}: {item.get('summary')}")
    news_summaries_text = "\n".join(summaries)
    
    prompt = f"""你是一位資深的食品與蔬食產業分析師。請分析以下今日最新的跨市場產業情報：
{news_summaries_text}

請根據這些最新動態，為本月的「決策情報簡報」撰寫標題與核心判讀。請嚴格以 JSON 格式回傳（只回傳 JSON 物件，不要任何 markdown 的 ```json 包裹標記，也不要任何前後贅字，以防 JSON 解析失敗）：
{{
  "title": "一句具備高階商業社論質感的簡報大標題，15-25字，繁體中文，其中核心關鍵字用 <strong>...</strong> 包裹（例如：市場不缺新品，真正稀缺的是<strong>回購理由。</strong> 或 植物肉進入重整期，成長關鍵在於<strong>潔淨標章。</strong>）",
  "subtitle": "二至三句話的簡報副標題/總體摘要，40-60字，繁體中文，概括全球或多國市場的共通訊號與主要趨勢",
  "decisionTitle": "一句話的核心商業判讀結論標題，12-20字，繁體中文，總結我方該重視的決策方向",
  "decisionDetail": "兩句話的詳細決策判讀分析描述，30-50字，繁體中文，指出消費者或通路的最新行為轉變及對我方的具體影響"
}}
"""
    return execute_gemini_request(api_key, prompt)

# Region mapping from crawl key to traditional chinese
REGION_MAP = {
    "taiwan": "台灣",
    "newsmarket": "台灣",
    "food_safety_tw": "台灣",
    "brand_patrol": "台灣",
    "usa": "美國",
    "europe": "歐洲",
    "australia": "澳洲"
}

DEFAULT_MARKET_PULSE = {
    "台灣": {
        "signal": "穩定", "note": "標示與通路動態", "value": 72,
        "headline": "成熟素食文化支撐基本盤，成長機會來自日常化與透明度。",
        "drivers": ["素食分類細緻，純素與五辛需求具有在地特色", "食力與上下游持續放大低加工、國產原料與產地透明議題", "冷凍調理、氣炸料理和電商組合降低嘗試門檻"],
        "opportunity": "把素海鮮、火腿片與肉醬包裝成早餐、便當、晚餐等明確使用場景，並主動揭露主要原料來源。",
        "risk": "若只以『素料』溝通，容易停留在既有客群；健康感、鈉含量與加工印象也會影響新客回購。",
        "watch": ["電商回購率", "非素食客占比", "主力 SKU 每餐成本", "國產原料比例"]
    },
    "美國": {
        "signal": "承壓", "note": "健康與價值重整", "value": 48,
        "headline": "植物肉零售降溫，市場正從擬真轉向蛋白質、潔淨標示與實際價值。",
        "drivers": ["消費者重新檢視價格、鈉含量與成分表", "高蛋白與機能食品吸引力高於單一仿肉敘事", "食品服務通路的使用情境比零售貨架更具韌性"],
        "opportunity": "優先測試差異化的亞洲炸物與餐飲用規格，英文品名清楚揭露大豆、菇類等主要植物來源。",
        "risk": "高運費與植物肉溢價會壓縮競爭力；若營養或口感無明顯差異，難以取得穩定回購。",
        "watch": ["每磅售價差", "蛋白質／鈉含量", "餐飲通路新品", "FDA 命名指引"]
    },
    "澳洲": {
        "signal": "觀察", "note": "口感、價格決勝", "value": 61,
        "headline": "市場仍有需求，但通路進入汰弱留強，能否持續上架取決於回購。",
        "drivers": ["彈性減肉人口提供潛在客群", "大型超市對銷量、價格與貨架效率要求提高", "氣炸鍋與快速料理適合冷凍調理產品"],
        "opportunity": "以純素香酥花枝圈切入差異化海鮮替代品，提供氣炸時間、每份成本與多人分享情境。",
        "risk": "市場距離造成物流與冷鏈成本；Vegan 宣稱仍需完整供應商文件與交叉污染證明。",
        "watch": ["Woolworths／Coles 上下架", "促銷頻率", "冷凍素海鮮品項", "FSANZ 標示更新"]
    },
    "歐洲": {
        "signal": "分化", "note": "德義成長、英國承壓", "value": 68,
        "headline": "不是單一市場：德國、義大利仍有成長訊號，英國則更受價格壓力影響。",
        "drivers": ["平價自有品牌帶動部分國家的銷量", "各國飲食文化與零售結構造成明顯差異", "Novel Food、名稱與營養宣稱提高跨國上市複雜度"],
        "opportunity": "先以德國或荷蘭作為產品驗證市場，主打亞洲口味、冷凍方便性與合理每公斤價格。",
        "risk": "用同一包裝進入所有歐洲國家容易忽略語言、名稱、通路與消費差異。",
        "watch": ["德國銷量", "自有品牌價格", "英國品項縮減", "EU Novel Food 更新"]
    }
}

DEFAULT_DAILY_BRIEFING = {
    "title": "市場不缺新品，<br />真正稀缺的是<strong>回購理由。</strong>",
    "subtitle": "跨市場訊號共同指向價格、健康感與使用情境。這三項因素正影響新品能否進入日常餐桌並形成回購。",
    "decisionTitle": "價格、健康感與料理便利性共同決定回購",
    "decisionDetail": "各市場的成長速度不同，但資訊都顯示：消費者不只在意是否純素，也會比較成分、每份成本及料理是否方便。"
}

DYNAMIC_BRIEFING_POOL = [
    {
        "keywords": ["標示", "產地", "原料", "溯源", "食安", "稽查", "法規", "透明"],
        "title": "概念紅利退潮後，<br /><strong>產地透明與潔淨標示</strong>才是護城河。",
        "subtitle": "近期跨國情報密集聚焦原料溯源、主原料產地標示與食安合規。當消費者開始翻看背面成分表，品牌信任度將直接決定貨架留存率。",
        "decisionTitle": "以潔淨標示與原料溯源建立差異化信任",
        "decisionDetail": "食安稽查與標示法規趨嚴，主動揭露大豆、菇類等主原料來源並減少非必要添加物，能有效拉開與傳統素料的競爭差距。"
    },
    {
        "keywords": ["餐廳", "米其林", "市集", "餐桌", "料理", "牛肉麵", "漢堡", "法餐", "泰式", "非素食"],
        "title": "突破同溫層的關鍵，<br />是讓<strong>非素食者也想點單。</strong>",
        "subtitle": "從歐美星級植物性餐廳到台灣在地蔬食市集與跨界餐飲，高成長品牌正跳脫宗教與純素框架，改以極致風味與台泰異國料理體驗吸引彈性客群。",
        "decisionTitle": "鎖定彈性素食客群，以料理場景驅動嚐鮮",
        "decisionDetail": "90% 以上的增量來自非純素食者；產品包裝與行銷應弱化說教感，直接溝通氣炸酥脆度、異國風味與快速上桌的美味體驗。"
    },
    {
        "keywords": ["價格", "銷量", "超市", "零售", "回購", "價差", "成本", "通路", "自有品牌"],
        "title": "當通路進入汰弱留強，<br /><strong>平價美味與高周轉</strong>決定誰能留架。",
        "subtitle": "歐美與澳洲大型超市正加速縮減低周轉植物肉品項，唯有縮小與動物性產品價差、具備明確日常備餐價值的冷凍與調理品項能維持正成長。",
        "decisionTitle": "優化每份餐食成本，強化家庭日常備餐場景",
        "decisionDetail": "零售通路對坪效要求升高，建議聚焦高回購率的早餐、便當與氣炸點心規格，以親民單價與穩定口感鞏固基本盤。"
    },
    {
        "keywords": ["蛋白", "營養", "健康", "B12", "發酵", "起司", "植物奶", "技術", "機能"],
        "title": "從「仿肉擬真」走向<strong>營養升級，</strong><br />植物基進入第二波價值戰。",
        "subtitle": "單純模仿肉類外觀已難支撐溢價，最新研發與消費趨勢轉向優質植物蛋白、低鈉少油配方與機能性營養補充，健康實益成為核心購買動因。",
        "decisionTitle": "強化高蛋白與低負擔訴求，回應健康導向需求",
        "decisionDetail": "消費者選購植物性食品時更重視蛋白質含量與少添加表現，研發與包裝溝通應突顯營養密度與身體無負擔。"
    },
    {
        "keywords": ["工廠", "綠電", "大成", "弘陽", "投資", "收購", "國際", "外銷", "產能", "供應鏈"],
        "title": "大廠重兵卡位智慧產線，<br />蔬食競爭轉向<strong>供應鏈與風味速度戰。</strong>",
        "subtitle": "農畜巨頭與指標大廠紛紛投入綠電智慧工廠、跨足連鎖餐飲與調理包外銷，產業正從單一產品競爭升級為研發速度、冷鏈效率與多通路布局。",
        "decisionTitle": "深化特色品項研發，以靈活規格切入海內外通路",
        "decisionDetail": "面對大型集團垂直整合，我方應發揮素海鮮、特色炸物與精緻調理優勢，結合餐飲業務與零售雙軌拓展市場。"
    },
    {
        "keywords": ["EU", "歐盟", "英國", "德國", "命名", "法案", "出口", "合規", "標章"],
        "title": "跨國法規與命名限制收緊，<br />海外布局須先贏在<strong>在地合規。</strong>",
        "subtitle": "歐盟與英美針對植物基產品能否使用肉類與乳品名稱展開新一輪法規拉鋸，各國零售結構與法規門檻分化，單一包裝已難通吃全球市場。",
        "decisionTitle": "提前檢視外銷品名與標示，分區制定上市策略",
        "decisionDetail": "針對歐美澳不同市場的命名規範與通路特性，應以直觀的植物原料與料理方式命名，降低法規風險並提升在地接受度。"
    }
]

def generate_local_dynamic_briefing(news_items, now_dt, current_page_content=""):
    combined_text = " ".join(
        f"{item.get('title', '')} {item.get('summary', '')} {item.get('topic', '')}"
        for item in (news_items or [])
    )
    month_seed = now_dt.year * 12 + now_dt.month
    scored_pool = []
    for idx, candidate in enumerate(DYNAMIC_BRIEFING_POOL):
        kw_hits = sum(combined_text.count(kw) for kw in candidate["keywords"])
        # Rotate priority by month_seed while rewarding real keyword hits in current news
        rotation_bonus = 3 if (idx == (month_seed % len(DYNAMIC_BRIEFING_POOL))) else 0
        total_score = kw_hits * 2 + rotation_bonus
        # Avoid repeating the exact title already in page_content when updating
        if candidate["title"] in current_page_content:
            total_score -= 100
        scored_pool.append((total_score, idx, candidate))
    scored_pool.sort(key=lambda x: (x[0], x[1]), reverse=True)
    chosen = dict(scored_pool[0][2])
    return chosen
# Load current page.tsx content
with open(PAGE_TSX_PATH, "r", encoding="utf-8") as f:
    page_content = f.read()

# Extract existing URLs to avoid duplicate crawling
existing_urls = set(re.findall(r'url:\s*"([^"]+)"', page_content))
existing_titles = re.findall(r'title:\s*"([^"]+)"', page_content)

print(f"Loaded existing page.tsx. Found {len(existing_urls)} links and {len(existing_titles)} titles.")

# Fetch latest RSS items
limit_per_feed = 5
new_analyzed_items = []

for feed_key, url in fetcher.FEEDS.items():
    print(f"Fetching RSS feed for: {feed_key}...")
    feed_urls = [url]
    if feed_key in fetcher.FEED_FALLBACKS:
        feed_urls.append(fetcher.FEED_FALLBACKS[feed_key])

    raw_items = []
    for source_index, feed_url in enumerate(feed_urls):
        xml_data = fetcher.fetch_rss_feed(feed_url)
        parsed_items = fetcher.parse_rss_xml(xml_data)
        if parsed_items:
            raw_items = parsed_items
            label = "primary" if source_index == 0 else "fallback"
            print(f"{label.capitalize()} RSS source succeeded for {feed_key}: {len(parsed_items)} items.")
            break
    if not raw_items:
        continue

    # Remove duplicate links returned by overlapping primary/fallback queries.
    unique_items = []
    seen_feed_keys = set()
    for item in raw_items:
        dedupe_key = item.get("link") or hashlib.md5(
            item.get("title", "").encode("utf-8")
        ).hexdigest()
        if dedupe_key in seen_feed_keys:
            continue
        seen_feed_keys.add(dedupe_key)
        unique_items.append(item)
    raw_items = unique_items
    
    # Overwrite default sources and filter duplicates
    items_to_process = []
    default_source = "上下游 News&Market" if feed_key == "newsmarket" else "Google News"
    for ri in raw_items:
        if feed_key == "newsmarket":
            ri["source"] = "上下游 News&Market"
        elif ri["source"] == "Google News":
            ri["source"] = default_source
            
        # Filters
        if feed_key == "brand_patrol" and fetcher.is_official_channel(ri["link"], ri["source"]):
            continue
        if fetcher.is_irrelevant_social_news(ri["title"]):
            continue
        if feed_key == "newsmarket" and not fetcher.is_relevant_newsmarket_item(ri["title"]):
            continue
        if ri["link"] in existing_urls:
            continue
        if fetcher.is_duplicate_title(ri["title"], existing_titles):
            continue
            
        items_to_process.append(ri)
        if len(items_to_process) >= limit_per_feed:
            break
            
    print(f"Found {len(items_to_process)} new items to analyze for {feed_key}.")
    
    for raw_item in items_to_process:
        print(f"Analyzing locally: {raw_item['title']}")
        analysis = fetcher.offline_fallback_analysis(
            title=raw_item["title"],
            region=feed_key,
            source=raw_item["source"],
            pub_date=raw_item["pub_date"],
        )
            
        if analysis:
            # Generate 8-digit unique ID
            item_id = int(hashlib.md5(raw_item["link"].encode('utf-8')).hexdigest(), 16) % 100000000
            
            # Map region key
            region_zh = REGION_MAP.get(feed_key, "台灣")
            
            # Parse published date to YYYY-MM-DD
            published_at = raw_item["pub_date"].split(" ")[0]
            collected_at = datetime.now(tz_tw).strftime("%Y-%m-%d")
            
            new_analyzed_items.append({
                "id": item_id,
                "region": region_zh,
                "topic": analysis.get("category", "市場趨勢"),
                "title": analysis.get("title_zh", raw_item["title"]),
                "summary": analysis.get("summary", ""),
                "impact": analysis.get("impact", ""),
                "action": analysis.get("takeaway", ""),
                "owner": analysis.get("owner", "產品研發"),
                "source": raw_item["source"],
                "url": raw_item["link"],
                "priority": analysis.get("priority", "中"),
                "publishedAt": published_at,
                "collectedAt": collected_at,
                "score": int(analysis.get("score", 75))
            })
            existing_urls.add(raw_item["link"])
            existing_titles.append(raw_item["title"])

print(f"Completed analysis. Generated {len(new_analyzed_items)} new intelligence feed items.")

if not new_analyzed_items:
    print("No new news articles found. Proceeding to update Briefing, Market Pulse, and Timestamps.")

# Extract array boundaries in page.tsx
idx_start = page_content.find("const intelligence: Intelligence[] = [")
idx_end = page_content.find("];\n\nconst regions: Region[]")

if idx_start == -1 or idx_end == -1:
    print("Error: Could not locate intelligence array boundaries in page.tsx.")
    sys.exit(1)

existing_array_body = page_content[idx_start + len("const intelligence: Intelligence[] = [") : idx_end].strip()

# Match individual existing item blocks
items_blocks = re.findall(r'\{\s*id:[\s\S]*?\}', existing_array_body)
print(f"Parsed {len(items_blocks)} existing items from page.tsx.")

# Format new items as TS strings
new_items_blocks = []
for item in new_analyzed_items:
    block = f"""  {{
    id: {item['id']},
    region: "{item['region']}",
    topic: "{item['topic']}",
    title: "{item['title']}",
    summary: "{item['summary']}",
    impact: "{item['impact']}",
    action: "{item['action']}",
    owner: "{item['owner']}",
    source: "{item['source']}",
    url: "{item['url']}",
    priority: "{item['priority']}",
    publishedAt: "{item['publishedAt']}",
    collectedAt: "{item['collectedAt']}",
    score: {item['score']},
  }}"""
    new_items_blocks.append(block)

# Combine and apply 1.5-year (18-month) freshness filter, then keep top 20 by score
from datetime import timedelta
cutoff_date = datetime.now(tz_tw).replace(tzinfo=None) - timedelta(days=548)  # ~18 months

def get_published_date(block):
    m = re.search(r'publishedAt:\s*"(\d{4}-\d{2}-\d{2})"', block)
    if m:
        try:
            return datetime.strptime(m.group(1), "%Y-%m-%d")
        except ValueError:
            pass
    return None

def get_score(block):
    m = re.search(r'score:\s*(\d+)', block)
    return int(m.group(1)) if m else 0

all_blocks = new_items_blocks + items_blocks
all_blocks = [b for b in all_blocks if (get_published_date(b) or cutoff_date) >= cutoff_date]
# Sort by score descending to keep only the most important items
all_blocks.sort(key=get_score, reverse=True)
all_blocks = all_blocks[:20]
print(f"After 1.5-year filter and top-score selection: {len(all_blocks)} items retained.")

combined_array_body = ",\n".join(all_blocks)

# Replace array in content
new_page_content = (
    page_content[:idx_start + len("const intelligence: Intelligence[] = [\n")]
    + combined_array_body
    + "\n"
    + page_content[idx_end:]
)

# Parse existing items back to Python dicts for market pulse analysis
def parse_ts_object(block):
    obj = {}
    r_match = re.search(r'region:\s*"([^"]+)"', block)
    if r_match: obj["region"] = r_match.group(1)
    t_match = re.search(r'topic:\s*"([^"]+)"', block)
    if t_match: obj["topic"] = t_match.group(1)
    title_match = re.search(r'title:\s*"([^"]+)"', block)
    if title_match: obj["title"] = title_match.group(1)
    s_match = re.search(r'summary:\s*"([^"]+)"', block)
    if s_match: obj["summary"] = s_match.group(1)
    return obj

parsed_existing_items = [parse_ts_object(b) for b in items_blocks]
all_parsed_items = new_analyzed_items + parsed_existing_items

# Monthly Briefing and Market Pulse logic
is_monthly_update = (now.day == 1)
force_ai_update = os.environ.get("FORCE_AI_UPDATE", "").lower() == "true"

existing_pulse_body = None
existing_briefing_body = None

if not is_monthly_update and not force_ai_update:
    print("Today is not the 1st of the month. Checking for existing marketPulse and dailyBriefing in page.tsx...")
    idx_pulse_start = page_content.find("const marketPulse = [")
    idx_pulse_end = page_content.find("];", idx_pulse_start)
    idx_briefing_start = page_content.find("const dailyBriefing = {")
    idx_briefing_end = page_content.find("};", idx_briefing_start)
    
    if idx_pulse_start != -1 and idx_pulse_end != -1 and idx_briefing_start != -1 and idx_briefing_end != -1:
        candidate_briefing = page_content[idx_briefing_start : idx_briefing_end + len("};")]
        if DEFAULT_DAILY_BRIEFING["title"] in candidate_briefing:
            print("Existing dailyBriefing is still the default fallback. Triggering briefing update...")
        else:
            existing_pulse_body = page_content[idx_pulse_start : idx_pulse_end + len("];")]
            existing_briefing_body = candidate_briefing
            print("Found existing marketPulse and dailyBriefing. Preserving them.")

# 1. Market Pulse
combined_pulse_body = ""
if existing_pulse_body:
    combined_pulse_body = existing_pulse_body
else:
    market_pulse_data = {}
    for region_name in ["台灣", "美國", "澳洲", "歐洲"]:
        region_news = [item for item in all_parsed_items if item.get("region") == region_name]
        pulse_info = None
        if api_key and region_news:
            print(f"Calling Gemini API to update Market Pulse for {region_name}...")
            pulse_info = call_gemini_api_for_market_pulse(api_key, region_name, region_news)
            import time
            time.sleep(4)
        
        if not pulse_info:
            print(f"Gemini API not available or failed for {region_name} pulse. Using default fallback.")
            pulse_info = DEFAULT_MARKET_PULSE[region_name]
            
        market_pulse_data[region_name] = pulse_info

    pulse_blocks = []
    for region_name, data in market_pulse_data.items():
        block = f"""  {{
    region: "{region_name}", signal: "{data['signal']}", note: "{data['note']}", value: {data['value']},
    headline: "{data['headline']}",
    drivers: {json.dumps(data['drivers'], ensure_ascii=False)},
    opportunity: "{data['opportunity']}",
    risk: "{data['risk']}",
    watch: {json.dumps(data['watch'], ensure_ascii=False)},
  }}"""
        pulse_blocks.append(block)
    combined_pulse_body = "const marketPulse = [\n" + ",\n".join(pulse_blocks) + "\n];"

# Replace marketPulse in new_page_content
idx_pulse_start = new_page_content.find("const marketPulse = [")
idx_pulse_end = new_page_content.find("];", idx_pulse_start)
if idx_pulse_start != -1 and idx_pulse_end != -1:
    new_page_content = (
        new_page_content[:idx_pulse_start]
        + combined_pulse_body
        + new_page_content[idx_pulse_end + len("];"):]
    )

# 2. Daily Briefing
combined_briefing_body = ""
if existing_briefing_body:
    combined_briefing_body = existing_briefing_body
else:
    briefing_data = None
    if api_key and all_parsed_items:
        print("Calling Gemini API to update Daily Briefing...")
        briefing_data = call_gemini_api_for_briefing(api_key, all_parsed_items)
        import time
        time.sleep(4)
        
    if not briefing_data:
        print("Gemini API not available or failed for briefing. Using smart local news-driven briefing generator.")
        briefing_data = generate_local_dynamic_briefing(all_parsed_items, now, page_content)

    briefing_title_escaped = briefing_data['title'].replace('"', '\\"')
    briefing_subtitle_escaped = briefing_data['subtitle'].replace('"', '\\"')
    briefing_decisionTitle_escaped = briefing_data['decisionTitle'].replace('"', '\\"')
    briefing_decisionDetail_escaped = briefing_data['decisionDetail'].replace('"', '\\"')

    combined_briefing_body = f"""const dailyBriefing = {{
  title: "{briefing_title_escaped}",
  subtitle: "{briefing_subtitle_escaped}",
  decisionTitle: "{briefing_decisionTitle_escaped}",
  decisionDetail: "{briefing_decisionDetail_escaped}"
}};"""

# Replace dailyBriefing in new_page_content
idx_briefing_start = new_page_content.find("const dailyBriefing = {")
idx_briefing_end = new_page_content.find("};", idx_briefing_start)
if idx_briefing_start != -1 and idx_briefing_end != -1:
    new_page_content = (
        new_page_content[:idx_briefing_start]
        + combined_briefing_body
        + new_page_content[idx_briefing_end + len("};"):]
    )

# Update date & timestamp headers
weekdays = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
weekday_str = weekdays[now.weekday()]
date_str = f"{now.year}年{now.month}月{now.day}日・{weekday_str}"

new_page_content = re.sub(
    r'<p className="eyebrow">.*?</p>',
    f'<p className="eyebrow">{date_str}</p>',
    new_page_content
)

iso_time = now.strftime("%Y-%m-%dT%H:%M:%S+08:00")
display_time = now.strftime("%Y/%m/%d %H:%M")
new_page_content = re.sub(
    r'<time dateTime=".*?">.*?</time>',
    f'<time dateTime="{iso_time}">{display_time}</time>',
    new_page_content
)

new_page_content = re.sub(
    r'Google 評論最近查核：\d{4}/\d{2}/\d{2} \d{2}:\d{2}。',
    f'Google 評論最近查核：{display_time}。',
    new_page_content
)

# 3. Amazon US Cross-Border War Room Monitoring
AMAZON_PRODUCTS_CONFIG = [
    {
        "asin": "B0H68ZJF27",
        "nameZh": "齋滋味 煙燻素火腿／午餐肉切片",
        "nameEn": "Vegan Select Luncheon Meat Slices, Rich Smoky Flavor, Non-GMO Soy Protein, Gluten-Free & Vegan, Shelf Stable, Crispy Pan-Fry Slices, 5.6 oz",
        "spec": "5.6 oz (160g) · 常溫保存",
        "tags": ["Non-GMO 大豆蛋白", "Gluten-Free 無麩質", "100% Vegan", "Shelf-Stable 常溫免冷鏈", "香煎酥脆"],
        "insight": "主打常溫保存突破北美冷鏈高運費痛點；留意商品大標題為 Luncheon Meat Slices 而五點描述提及 vegan bacon strips，建議持續觀察買家對切型之評論回饋。"
    },
    {
        "asin": "B0GF6K7B6G",
        "nameZh": "齋滋味 煙燻純素培根條／切片",
        "nameEn": "Vegan Select Plant-Based Bacon Strips, Rich Smoky Flavor, Non-GMO Soy Protein, Gluten-Free & Vegan, Shelf Stable, Crispy Pan-Fry Slices, 5.6 oz",
        "spec": "5.6 oz (160g) · 常溫保存",
        "tags": ["VEGAN SELECT 旗艦館主打", "Non-GMO 大豆蛋白", "Gluten-Free 無麩質", "Shelf-Stable 常溫免冷鏈"],
        "insight": "列為 Amazon 品牌旗艦館（VEGAN SELECT SINCE 1993）首頁核心單品，直接鎖定北美早餐、早午餐與漢堡夾層的純素培根（Vegan Bacon）高頻消費場景。"
    }
]

def check_amazon_products(existing_content, checked_time_str):
    prev_map = {}
    idx_amz_start = existing_content.find("const amazonWatch: AmazonProductItem[] = [")
    idx_amz_end = existing_content.find("];\n\ntype ReputationItem", idx_amz_start)
    if idx_amz_start == -1:
        idx_amz_end = existing_content.find("];", idx_amz_start) if idx_amz_start != -1 else -1
    if idx_amz_start != -1 and idx_amz_end != -1:
        amz_block = existing_content[idx_amz_start:idx_amz_end]
        for obj_m in re.finditer(r'\{[\s\S]*?asin:\s*"([^"]+)"[\s\S]*?\}', amz_block):
            b_text = obj_m.group(0)
            a_code = obj_m.group(1)
            p_m = re.search(r'price:\s*"([^"]+)"', b_text)
            st_m = re.search(r'status:\s*"([^"]+)"', b_text)
            rc_m = re.search(r'reviewCount:\s*(\d+)', b_text)
            rt_m = re.search(r'rating:\s*"([^"]+)"', b_text)
            prev_map[a_code] = {
                "price": p_m.group(1) if p_m else "待北美節點同步",
                "status": st_m.group(1) if st_m else "正常在售",
                "reviewCount": int(rc_m.group(1)) if rc_m else 0,
                "rating": rt_m.group(1) if rt_m else "尚無評分"
            }

    alerts = []
    updated_items = []
    summary_lines = []

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    }

    for prod in AMAZON_PRODUCTS_CONFIG:
        asin = prod["asin"]
        prev = prev_map.get(asin, {
            "price": "待北美節點同步",
            "status": "正常在售",
            "reviewCount": 0,
            "rating": "尚無評分"
        })
        new_price = prev["price"]
        new_status = prev["status"]
        new_rc = prev["reviewCount"]
        new_rating = prev["rating"]
        latest_rev = f"目前累積 {new_rc} 則買家評論，系統每日 06:00 自動巡檢破蛋首評、價格變動與庫存狀態。"
        alert_flag = "正常"

        try:
            url = f"https://www.amazon.com/dp/{asin}"
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=15) as resp:
                html = resp.read().decode("utf-8", errors="ignore")

            # 1. Extract main BuyBox / CenterCol price
            for div_id in ["corePriceDisplay_desktop_feature_div", "corePrice_feature_div", "apex_desktop", "desktop_buybox"]:
                d_idx = html.find(f'id="{div_id}"')
                if d_idx != -1:
                    sub_div = html[d_idx : d_idx + 4000]
                    pm = re.search(r'class="a-offscreen">(\$[0-9]+\.[0-9]{2})<', sub_div)
                    if pm:
                        new_price = pm.group(1)
                        break

            # 2. Extract availability / stock status
            avail_idx = html.find('id="availability"')
            out_idx = html.find('id="outOfStock"')
            buybox_idx = html.find('id="desktop_buybox"')
            avail_snippet = html[avail_idx : avail_idx + 1500] if avail_idx != -1 else ""
            buybox_snippet = html[buybox_idx : buybox_idx + 3500] if buybox_idx != -1 else ""

            if out_idx != -1 or "Currently unavailable" in avail_snippet or "Currently unavailable" in buybox_snippet:
                new_status = "目前無庫存 (Unavailable)"
            elif "cannot be shipped to your selected delivery location" in buybox_snippet:
                new_status = "正常在售 (限北美配送)"
            elif "In Stock" in avail_snippet or "In stock" in avail_snippet or new_price.startswith("$"):
                new_status = "正常在售 (In Stock)"
            else:
                new_status = "正常在售"

            # 3. Extract rating and review count strictly from averageCustomerReviews
            acr_idx = html.find('id="averageCustomerReviews"')
            if acr_idx != -1:
                acr_sub = html[acr_idx : acr_idx + 2500]
                rt_m = re.search(r'title="([0-9\.]+)\s+out of 5 stars"', acr_sub)
                rc_m = re.search(r'id="acrCustomerReviewText"[^>]*>([0-9,]+)\s+(?:ratings|reviews)', acr_sub, re.I)
                if rt_m:
                    new_rating = f"{rt_m.group(1)} ★"
                if rc_m:
                    new_rc = int(rc_m.group(1).replace(",", ""))

            # 4. Extract latest review snippet if present
            rev_m = re.search(r'data-hook="review-collapsed"[^>]*>([\s\S]*?)</div>', html)
            if rev_m:
                rev_text = re.sub(r"<[^>]+>", " ", rev_m.group(1))
                rev_text = re.sub(r"\s+", " ", rev_text).strip()
                if rev_text:
                    latest_rev = f"最新買家評論摘錄：「{rev_text[:85]}...」"
            elif new_rc == 0:
                latest_rev = "目前為新品上架階段（0 則買家評論），系統每日 06:00 自動巡檢破蛋首評、價格變動與庫存狀態。"

            print(f"Amazon check [{asin}]: status={new_status}, price={new_price}, rating={new_rating}, reviews={new_rc}")
        except Exception as e:
            print(f"Amazon check failed for {asin}: {e}")

        # Compare for alerts
        if "無庫存" in new_status or "Unavailable" in new_status:
            alert_flag = "庫存斷貨"
            alerts.append(f"🚨 <b>【庫存斷貨警報】</b>{prod['nameZh']} ({asin}) 目前顯示為：{new_status}")
        if (
            new_price != prev["price"]
            and new_price.startswith("$")
            and prev["price"].startswith("$")
        ):
            alert_flag = "價格異動"
            alerts.append(f"💰 <b>【價格變動提醒】</b>{prod['nameZh']} ({asin}) 價格由 {prev['price']} 變動為 {new_price}")
        if new_rc > prev["reviewCount"]:
            alert_flag = "新增評論"
            alerts.append(f"⭐ <b>【新增買家評論】</b>{prod['nameZh']} ({asin}) 新增 {new_rc - prev['reviewCount']} 則評論（目前共 {new_rc} 則，評分 {new_rating}）")

        updated_items.append({
            "asin": asin,
            "nameZh": prod["nameZh"],
            "nameEn": prod["nameEn"],
            "spec": prod["spec"],
            "status": new_status,
            "price": new_price,
            "prevPrice": prev["price"],
            "rating": new_rating,
            "reviewCount": new_rc,
            "tags": prod["tags"],
            "insight": prod["insight"],
            "latestReview": latest_rev,
            "url": f"https://www.amazon.com/dp/{asin}",
            "checkedAt": checked_time_str,
            "alertFlag": alert_flag
        })
        summary_lines.append(f"• <b>{prod['nameZh']}</b> (<code>{asin}</code>)：{new_status}｜售價 {new_price}｜評論 {new_rc} 則 ({new_rating})")

    return updated_items, alerts, "\n".join(summary_lines)

amazon_items, amazon_alerts, amazon_summary_text = check_amazon_products(page_content, display_time)

amz_blocks = []
for item in amazon_items:
    name_en_escaped = item['nameEn'].replace('"', '\\"')
    insight_escaped = item['insight'].replace('"', '\\"')
    latest_review_escaped = item['latestReview'].replace('"', '\\"')
    tags_json = json.dumps(item['tags'], ensure_ascii=False)
    amz_block = f"""  {{
    asin: "{item['asin']}",
    nameZh: "{item['nameZh']}",
    nameEn: "{name_en_escaped}",
    spec: "{item['spec']}",
    status: "{item['status']}",
    price: "{item['price']}",
    prevPrice: "{item['prevPrice']}",
    rating: "{item['rating']}",
    reviewCount: {item['reviewCount']},
    tags: {tags_json},
    insight: "{insight_escaped}",
    latestReview: "{latest_review_escaped}",
    url: "{item['url']}",
    checkedAt: "{item['checkedAt']}",
    alertFlag: "{item['alertFlag']}"
  }}"""
    amz_blocks.append(amz_block)

combined_amz_body = "const amazonWatch: AmazonProductItem[] = [\n" + ",\n".join(amz_blocks) + "\n];"
idx_amz_s = new_page_content.find("const amazonWatch: AmazonProductItem[] = [")
idx_amz_e = new_page_content.find("];", idx_amz_s)
if idx_amz_s != -1 and idx_amz_e != -1:
    new_page_content = (
        new_page_content[:idx_amz_s]
        + combined_amz_body
        + new_page_content[idx_amz_e + len("];"):]
    )

# Write to page.tsx
with open(PAGE_TSX_PATH, "w", encoding="utf-8") as f:
    f.write(new_page_content)

print("Updated app/page.tsx successfully with new items and timestamps.")

def send_telegram_notification(token, chat_id, date_str, news_count, briefing_title, amz_summary="", amz_alerts=None):
    clean_title = briefing_title.replace("<br />", " ").replace("<br>", " ").replace("</br>", " ")
    
    alert_block = ""
    if amz_alerts:
        alert_block = "\n\n" + "\n".join(amz_alerts)

    amz_section = ""
    if amz_summary:
        amz_section = f"\n\n🛒 <b>Amazon 北美跨境戰情室巡檢</b>：\n{amz_summary}{alert_block}"

    message = f"""<b>🔔 CJW 蔬食市場情報已更新完畢！</b>

📅 <b>更新日期</b>：{date_str} (台灣時間)
📰 <b>今日新增情報</b>：{news_count} 則新快訊
💡 <b>本月簡報主題</b>：{clean_title}{amz_section}

🔗 <b>點擊查看最新情報網站</b>：
https://gyuyu2002-jeff.github.io/cjw-market-intelligence/#amazon"""

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": message,
        "parse_mode": "HTML",
        "disable_web_page_preview": True
    }
    
    try:
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            url,
            data=data,
            headers={'Content-Type': 'application/json'}
        )
        with urllib.request.urlopen(req, timeout=10) as response:
            print("Telegram notification sent successfully!")
    except Exception as e:
        print(f"Failed to send Telegram notification: {e}")

# Build and Push
try:
    print("Running static GitHub Pages build...")
    build_result = subprocess.run("./node_modules/.bin/vite build --config vite.static.config.ts", cwd=FRONTEND_DIR, shell=True, capture_output=True, text=True, encoding="utf-8")
    if build_result.returncode != 0:
        print("Build failed.")
        print("STDOUT:", build_result.stdout)
        print("STDERR:", build_result.stderr)
        sys.exit(1)
    print("Build succeeded.")
    
    print("Staging and pushing changes to GitHub...")
    subprocess.run("git add app/page.tsx app/globals.css news_db.json docs/", cwd=FRONTEND_DIR, shell=True, encoding="utf-8")
    commit_msg = f"auto: daily intelligence update {now.strftime('%Y/%m/%d')}"
    # Escape quotes for commit message in shell command
    escaped_msg = commit_msg.replace('"', '\\"')
    subprocess.run(f'git commit -m "{escaped_msg}"', cwd=FRONTEND_DIR, shell=True, encoding="utf-8")
    # Push to origin
    subprocess.run("git push origin main", cwd=FRONTEND_DIR, shell=True, encoding="utf-8")
    print("Successfully pushed updates to GitHub Pages.")
    
    # Send Telegram Notification
    telegram_token = os.environ.get("TELEGRAM_BOT_TOKEN", "").strip()
    telegram_chat_id = os.environ.get("TELEGRAM_CHAT_ID", "").strip()
    if telegram_token and telegram_chat_id:
        briefing_title = "市場不缺新品，真正稀缺的是回購理由。"
        if not is_monthly_update and not force_ai_update and existing_briefing_body:
            t_m = re.search(r'title:\s*"([^"]+)"', existing_briefing_body)
            if t_m:
                briefing_title = t_m.group(1)
        elif 'briefing_data' in locals() and briefing_data:
            briefing_title = briefing_data.get('title', briefing_title)
            
        send_telegram_notification(
            token=telegram_token,
            chat_id=telegram_chat_id,
            date_str=now.strftime("%Y/%m/%d %H:%M"),
            news_count=len(new_analyzed_items),
            briefing_title=briefing_title,
            amz_summary=amazon_summary_text,
            amz_alerts=amazon_alerts
        )
except Exception as e:
    print("Deployment failed:", e)
    sys.exit(1)
