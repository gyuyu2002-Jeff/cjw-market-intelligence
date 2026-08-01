import os
import json
import re
import sys
import urllib.request
import urllib.parse
from datetime import datetime
import subprocess
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

def call_gemini_api_for_frontend(api_key, title, pub_date, source, region_key):
    if not api_key:
        return None
    mapped_region = REGION_MAP.get(region_key, "台灣")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    
    prompt = f"""你是一位專業的食品與蔬食產業分析師。請分析以下關於素食/植物基食品產業的新聞資訊：
新聞地區/來源市場: {mapped_region} (來自 {source}, 發布時間: {pub_date})
原始標題: {title}

請將此資訊翻譯與分析，並嚴格回傳一個符合以下 JSON 格式的內容（請只回傳 JSON 物件，不要任何 markdown 的 ```json 包裹標記，也不要任何前後贅字，以防 JSON 解析失敗）：
{{
  "title": "精確的繁體中文標題翻譯（如果原文是英文請翻譯，若為中文可適度潤飾）",
  "topic": "必須且只能是這六個選項之一：'新品'、'通路價格'、'競品'、'消費趨勢'、'原料技術'、'法規標示'（若提及松珍、鈺統、弘陽、隨緣、大成、卜蜂、Beyond Meat、Impossible Foods、Oatly等素食同業大廠，請分類為競品）",
  "summary": "100-150 字的繁體中文摘要，重點摘要此新聞的核心事實、事件起因或討論重點",
  "impact": "對齋之味的影響（50-80字，繁體中文，分析此事件或趨勢對齋之味品牌、研發、行銷或供應鏈的具體影響與啟示）",
  "action": "具體建議行動（30-50字，繁體中文，例如『盤點...原料』、『評估...產品線』）",
  "owner": "必須且只能是這六個負責部門之一：'品牌行銷'、'產品研發'、'採購品保'、'品保法規'、'國際業務'、'電商營運'",
  "priority": "必須且只能是這三個選項之一：'高'、'中'、'低'",
  "score": "分數（0-100的整數，重要性評分，高重要度90分以上，中重要度70-89分，低重要度69分以下）"
}}
"""
    
    body = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json"
        }
    }
    
    data = json.dumps(body).encode('utf-8')
    req = urllib.request.Request(
        url,
        data=data,
        headers={'Content-Type': 'application/json'}
    )
    
    try:
        with urllib.request.urlopen(req, timeout=12) as response:
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
            parsed_result = json.loads(raw_text)
            return parsed_result
    except Exception as e:
        print(f"Error calling Gemini API for frontend: {e}")
        return None

def offline_fallback_for_frontend(title, feed_key):
    """Fallback when Gemini API is unavailable or not set."""
    # Free Google Translate if foreign
    title_translated = title
    if feed_key not in ["taiwan", "food_safety_tw", "brand_patrol"]:
        try:
            title_translated = fetcher.google_translate_free(title)
        except Exception:
            pass
            
    title_lower = title_translated.lower()
    
    # Defaults
    topic = "消費趨勢"
    summary = f"這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'{title_translated}'。"
    impact = "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。"
    action = "追蹤此趨勢發展，評估是否納入下一階段產品規劃。"
    owner = "品牌行銷"
    priority = "中"
    score = 70
    
    # Keyword analysis
    if feed_key == "brand_patrol" or any(k in title_lower for k in ["松珍", "鈺統", "弘陽", "隨緣", "大成", "卜蜂", "beyond", "impossible", "oatly"]):
        topic = "競品"
        summary = f"同業大廠最新動態：'{title_translated}'。此動作反映了素食產業競爭格局的最新進展。"
        impact = "分析同業大廠的市場佈局與產品定位，以制定我方的競爭防禦策略與產品研發策略。"
        action = "評估同業此項動作對我方主力產品線的潛在競爭影響。"
        owner = "產品研發"
        priority = "中"
        score = 80
    elif feed_key in ["food_safety_tw", "food_safety_global"] or any(k in title_lower for k in ["recall", "outbreak", "contamination", "poisoning", "食安", "召回", "回收", "檢出", "超標", "中毒"]):
        topic = "原料技術"
        summary = f"食品安全與品質與品質管控事件：'{title_translated}'。事件提醒業界加強供應鏈檢驗。"
        impact = "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。"
        action = "盤點並抽檢主力產品之相關原料品保檢驗報告。"
        owner = "採購品保"
        priority = "高"
        score = 85
    elif any(k in title_lower for k in ["launch", "new", "introduce", "release", "unveil", "上市", "新品", "推出", "發表"]):
        topic = "新品"
        summary = f"新品上市動向：'{title_translated}'。這顯示了該地區在替代蛋白或素食創新產品上的最新趨勢。"
        impact = "研究該新品的口味、配方與主打客群，有助於齋滋味發掘適合台灣或出口市場的潛在產品方向。"
        action = "評估此類新品是否有進行本地化開發與改良的商業價值。"
        owner = "品牌行銷"
        priority = "中"
        score = 75
    elif any(k in title_lower for k in ["law", "regulate", "ban", "label", "fda", "policy", "gov", "法規", "政策", "限制", "認證"]):
        topic = "法規標示"
        summary = f"法規政策更新：'{title_translated}'。食品標籤、命名或進出口限制法規的變動將直接影響商業運作。"
        impact = "法規調整將影響產品包裝標示、出口合規性。我方需確保主力 SKU 之標示符合最新政策規範。"
        action = "檢查目標出口市場之產品包裝標示與法規合規性。"
        owner = "品保法規"
        priority = "高"
        score = 90
    elif any(k in title_lower for k in ["tech", "science", "protein", "cultured", "research", "科技", "創新", "蛋白", "研發"]):
        topic = "原料技術"
        summary = f"食品科技突破：'{title_translated}'。這項替代蛋白或食品加工技術的突破，可為素食口感帶來革新。"
        impact = "新原料與技術可應用於改善植物肉、素海鮮等質地，有助於我方研發團隊提升產品的保水與乳化性。"
        action = "收集該項新技術或新原料的規格說明與法規核准進度。"
        owner = "產品研發"
        priority = "中"
        score = 72
        
    return {
        "title": title_translated,
        "topic": topic,
        "summary": summary,
        "impact": impact,
        "action": action,
        "owner": owner,
        "priority": priority,
        "score": score
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

def call_gemini_api_for_briefing(api_key, news_items):
    if not api_key or not news_items:
        return None
    
    # Format top 15 news summaries
    summaries = []
    for item in news_items[:15]:
        summaries.append(f"- [{item.get('region', '未知地區')}] {item.get('title')}: {item.get('summary')}")
    news_summaries_text = "\n".join(summaries)
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    
    prompt = f"""你是一位資深的食品與蔬食產業分析師。請分析以下今日最新的跨市場產業情報：
{news_summaries_text}

請根據這些最新動態，為今日的「決策情報簡報」撰寫標題與核心判讀。請嚴格以 JSON 格式回傳（只回傳 JSON 物件，不要任何 markdown 的 ```json 包裹標記，也不要任何前後贅字，以防 JSON 解析失敗）：
{{
  "title": "一句具備高階商業社論質感的簡報大標題，15-25字，繁體中文，其中核心關鍵字用 <strong>...</strong> 包裹（例如：市場不缺新品，真正稀缺的是<strong>回購理由。</strong> 或 植物肉進入重整期，成長關鍵在於<strong>潔淨標章。</strong>）",
  "subtitle": "二至三句話的簡報副標題/總體摘要，40-60字，繁體中文，概括全球或多國市場的共通訊號與主要趨勢",
  "decisionTitle": "一句話的核心商業判讀結論標題，12-20字，繁體中文，總結齋之味該重視的決策方向",
  "decisionDetail": "兩句話的詳細決策判讀分析描述，30-50字，繁體中文，指出消費者或通路的最新行為轉變及對我方的具體影響"
}}
"""
    
    body = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json"
        }
    }
    
    data = json.dumps(body).encode('utf-8')
    req = urllib.request.Request(
        url,
        data=data,
        headers={'Content-Type': 'application/json'}
    )
    
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
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
            parsed_result = json.loads(raw_text)
            return parsed_result
    except Exception as e:
        print(f"Error calling Gemini API for briefing: {e}")
        return None

def call_gemini_api_for_market_pulse(api_key, region, news_items):
    if not api_key or not news_items:
        return None
    
    # Format news items summaries
    summaries = []
    for item in news_items[:15]:  # Analyze up to 15 recent news items
        summaries.append(f"- [{item.get('topic')}] {item.get('title')}: {item.get('summary')}")
    news_summaries_text = "\n".join(summaries)
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    
    prompt = f"""你是一位資深的食品與蔬食產業分析師。請分析以下關於 {region} 市場近期的產業情報摘要：
{news_summaries_text}

請根據這些最新動態，為 {region} 市場重新生成一份宏觀的市場戰略判讀，並嚴格以 JSON 格式回傳（只回傳 JSON 物件，不要任何 markdown 的 ```json 包裹標記，也不要任何前後贅字，以防 JSON 解析失敗）：
{{
  "signal": "必須且只能是這四個選項之一：'穩定'、'承壓'、'觀察'、'分化'",
  "note": "4-8 字的短評（例如 '標示與通路動態'、'健康與價值重整'、'口感、價格決勝'、'德義成長、英國承壓'）",
  "value": 50,  // 機會/溫度指數，介於 0-100 的整數，反映該市場目前對新產品上架與回購的友善度
  "headline": "15-25 字的一句話市場核心結論描述",
  "drivers": [
    "第 1 個核心驅動因素描述（15-30字）",
    "第 2 個核心驅動因素描述（15-30字）",
    "第 3 個核心驅動因素描述（15-30字）"
  ],
  "opportunity": "齋之味的具體開發/行銷機會點（40-60字）",
  "risk": "主要面臨的市場/法規/通路風險（40-60字）",
  "watch": [
    "觀察指標 1",
    "觀察指標 2",
    "觀察指標 3",
    "觀察指標 4"
  ]
}}
"""
    
    body = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json"
        }
    }
    
    data = json.dumps(body).encode('utf-8')
    req = urllib.request.Request(
        url,
        data=data,
        headers={'Content-Type': 'application/json'}
    )
    
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
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
            parsed_result = json.loads(raw_text)
            return parsed_result
    except Exception as e:
        print(f"Error calling Gemini API for market pulse ({region}): {e}")
        return None

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
    xml_data = fetcher.fetch_rss_feed(url)
    if not xml_data:
        continue
    
    raw_items = fetcher.parse_rss_xml(xml_data)
    
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
        print(f"Analyzing: {raw_item['title']}")
        analysis = None
        if api_key:
            analysis = call_gemini_api_for_frontend(
                api_key=api_key,
                title=raw_item["title"],
                pub_date=raw_item["pub_date"],
                source=raw_item["source"],
                region_key=feed_key
            )
            import time
            time.sleep(4)
        
        # Use offline fallback if api key is missing or call failed
        if not analysis:
            print("Gemini API not available or failed. Using offline fallback analysis.")
            analysis = offline_fallback_for_frontend(raw_item["title"], feed_key)
            
        if analysis:
            # Generate 8-digit unique ID
            item_id = int(hashlib.md5(raw_item["link"].encode('utf-8')).hexdigest(), 16) % 100000000
            
            # Map region key
            region_zh = REGION_MAP.get(feed_key, "台灣")
            
            # Parse published date to YYYY-MM-DD
            published_at = raw_item["pub_date"].split(" ")[0]
            collected_at = datetime.now().strftime("%Y-%m-%d")
            
            new_analyzed_items.append({
                "id": item_id,
                "region": region_zh,
                "topic": analysis.get("topic", "消費趨勢"),
                "title": analysis.get("title", raw_item["title"]),
                "summary": analysis.get("summary", ""),
                "impact": analysis.get("impact", ""),
                "action": analysis.get("action", ""),
                "owner": analysis.get("owner", "品牌行銷"),
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
cutoff_date = datetime.now() - timedelta(days=548)  # ~18 months

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
        print(f"Gemini API not available or failed for {region_name} pulse. Using default/fallback.")
        pulse_info = DEFAULT_MARKET_PULSE[region_name]
    
    market_pulse_data[region_name] = pulse_info

# Format the new marketPulse as a JS string
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

# Replace marketPulse in page content using robust index lookups
idx_pulse_start = new_page_content.find("const marketPulse = [")
idx_pulse_end = new_page_content.find("];", idx_pulse_start)

if idx_pulse_start != -1 and idx_pulse_end != -1:
    new_page_content = (
        new_page_content[:idx_pulse_start]
        + combined_pulse_body
        + new_page_content[idx_pulse_end + len("];"):]
    )

# Generate new Daily Briefing using Gemini API
briefing_data = None
if api_key and all_parsed_items:
    print("Calling Gemini API to update Daily Briefing...")
    briefing_data = call_gemini_api_for_briefing(api_key, all_parsed_items)
    import time
    time.sleep(4)

if not briefing_data:
    print("Gemini API not available or failed for briefing. Using default/fallback.")
    briefing_data = DEFAULT_DAILY_BRIEFING

# Escape quotes and formatting for page.tsx string
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
now = datetime.now()
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

# Write to page.tsx
with open(PAGE_TSX_PATH, "w", encoding="utf-8") as f:
    f.write(new_page_content)

print("Updated app/page.tsx successfully with new items and timestamps.")

# Build and Push
try:
    print("Running static Vite build...")
    build_result = subprocess.run("npx vite build --config vite.static.config.ts", cwd=FRONTEND_DIR, shell=True, capture_output=True, text=True, encoding="utf-8")
    if build_result.returncode != 0:
        print("Build failed.")
        print("STDOUT:", build_result.stdout)
        print("STDERR:", build_result.stderr)
        sys.exit(1)
    print("Build succeeded.")
    
    print("Staging and pushing changes to GitHub...")
    subprocess.run("git add app/page.tsx news_db.json docs/", cwd=FRONTEND_DIR, shell=True, encoding="utf-8")
    commit_msg = f"auto: daily intelligence update {now.strftime('%Y/%m/%d')}"
    # Escape quotes for commit message in shell command
    escaped_msg = commit_msg.replace('"', '\\"')
    subprocess.run(f'git commit -m "{escaped_msg}"', cwd=FRONTEND_DIR, shell=True, encoding="utf-8")
    # Push to origin
    subprocess.run("git push origin main", cwd=FRONTEND_DIR, shell=True, encoding="utf-8")
    print("Successfully pushed updates to GitHub Pages.")
except Exception as e:
    print("Deployment failed:", e)
    sys.exit(1)
