import os
import json
import sys
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
import email.utils
import hashlib
from datetime import datetime

# Fix Windows console encoding issues for unicode characters (like Trademark symbol ™)
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(errors='replace')
        sys.stderr.reconfigure(errors='replace')
    except Exception:
        pass

# Database path
DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'news_db.json')

# Google News & Upstream RSS URLs
FEEDS = {
    "taiwan": "https://news.google.com/rss/search?q=(%E7%B4%A0%E9%A3%9F+OR+%E8%94%AC%E9%A3%9F+OR+%E6%A4%8D%E7%89%A9%E8%82%85)+site:foodnext.net&hl=zh-TW&gl=TW&ceid=TW:zh-Hant",
    "newsmarket": "https://www.newsmarket.com.tw/feed/",
    "usa": "https://news.google.com/rss/search?q=%22plant-based%22+OR+%22vegan+food%22+market+OR+product+OR+launch&hl=en-US&gl=US&ceid=US:en",
    "europe": "https://news.google.com/rss/search?q=%22plant-based%22+OR+%22vegan+food%22+market+OR+product+Europe&hl=en-GB&gl=GB&ceid=GB:en",
    "australia": "https://news.google.com/rss/search?q=%22plant-based%22+OR+%22vegan+food%22+market+OR+product+Australia&hl=en-AU&gl=AU&ceid=AU:en",
    # Food Safety Feeds (Domestic & International)
    "food_safety_tw": "https://news.google.com/rss/search?q=%E9%A3%9F%E5%AE%89+OR+%E9%A3%9F%E5%93%81%E5%AE%89%E5%85%A8+OR+%E8%98%87%E4%B8%B9%E7%B4%85+OR+%E9%A3%9F%E5%AE%89%E6%B3%95%E8%A6%8F+OR+%E9%A3%9F%E5%93%81%E8%A1%9B%E7%94%9F&hl=zh-TW&gl=TW&ceid=TW:zh-Hant",
    "food_safety_global": "https://news.google.com/rss/search?q=%22food+safety%22+OR+%22food+recall%22+OR+%22food+contamination%22&hl=en-US&gl=US&ceid=US:en",
    # Competitor Patrol Feed (Search for competitor giants: 松珍, 鈺統, 弘陽, 隨緣, 大成, 卜蜂, Beyond Meat, Impossible Foods, Oatly)
    "brand_patrol": "https://news.google.com/rss/search?q=(%22%E6%9D%BE%E7%8F%8D%22+OR+%22%E9%85%97%E7%B5%B1%22+OR+%22%E5%BC%98%E9%99%BD%22+OR+%22%E9%9A%A8%E7%B7%A3%22+OR+%22%E5%A4%A7%E6%88%90%22+OR+%22%E5%8D%9C%E8%9C%82%22+OR+%22Beyond+Meat%22+OR+%22Impossible+Foods%22+OR+%22Oatly%22)+AND+(%E7%B4%A0%E9%A3%9F+OR+%E8%94%AC%E9%A3%9F+OR+%E6%A4%8D%E7%89%A9%E8%82%85+OR+%E6%A4%8D%E7%89%A9%E5%A5%B6+OR+%E7%85%92%E9%BA%A5%E5%A5%B6)&hl=zh-TW&gl=TW&ceid=TW:zh-Hant"
}

def load_db():
    if not os.path.exists(DB_PATH):
        return {"news_items": [], "config": {"gemini_api_key": ""}}
    try:
        with open(DB_PATH, "r", encoding="utf-8") as f:
            db = json.load(f)
            if "news_items" not in db: db["news_items"] = []
            if "config" not in db: db["config"] = {"gemini_api_key": ""}
            return db
    except Exception as e:
        print(f"Error loading DB: {e}")
        return {"news_items": [], "config": {"gemini_api_key": ""}}

def save_db(db):
    try:
        with open(DB_PATH, "w", encoding="utf-8") as f:
            json.dump(db, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"Error saving DB: {e}")

def fetch_rss_feed(url):
    req = urllib.request.Request(
        url,
        headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            return response.read()
    except Exception as e:
        print(f"Error fetching feed: {e}")
        return None

def parse_rss_xml(xml_data):
    if not xml_data:
        return []
    try:
        root = ET.fromstring(xml_data)
        items = []
        for item in root.findall('.//item'):
            title_elem = item.find('title')
            link_elem = item.find('link')
            pub_date_elem = item.find('pubDate')
            source_elem = item.find('source')

            title = title_elem.text if title_elem is not None else ""
            link = link_elem.text if link_elem is not None else ""
            pub_date_str = pub_date_elem.text if pub_date_elem is not None else ""
            source = source_elem.text if source_elem is not None else "Google News"

            # Parse date
            pub_date_formatted = pub_date_str
            if pub_date_str:
                try:
                    dt = email.utils.parsedate_to_datetime(pub_date_str)
                    pub_date_formatted = dt.strftime("%Y-%m-%d %H:%M")
                except Exception:
                    pass

            items.append({
                "title": title,
                "link": link,
                "pub_date": pub_date_formatted,
                "source": source
            })
        return items
    except Exception as e:
        print(f"Error parsing XML: {e}")
        return []

def call_gemini_api(api_key, title, pub_date, source, region):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    prompt = f"""你是一位專業的食品與蔬食產業分析師。請分析以下關於素食/植物基食品產業的新聞資訊：
新聞地區/來源市場: {region} (來自 {source}, 發布時間: {pub_date})
原始標題: {title}

請將此資訊翻譯與分析，並嚴格回傳一個符合以下 JSON 格式的內容（請只回傳 JSON 物件，不要任何 markdown 的 ```json 包裹標記，也不要任何前後贅字，以防 JSON 解析失敗）：
{{
  "title_zh": "精確的繁體中文標題翻譯（如果原文是英文請翻譯，若為中文可適度潤飾）",
  "category": "必須且只能是這六個分類之一：'新產品上市'、'市場趨勢'、'法規政策'、'技術創新'、'食安事件'、'同業動態'（若提及松珍、鈺統、弘陽、隨緣、大成、卜蜂、Beyond Meat、Impossible Foods、Oatly等素食同業大廠，請分類為同業動態）",
  "summary": "100-150 字的繁體中文摘要，重點摘要此新聞的核心事實、事件起因或討論重點",
  "takeaway": "1 句具體的繁體中文商業建議或開發靈感，若為同業動態，請分析同業動作對齋滋味帶來的啟示或防範策略建議",
  "sentiment": "必須且只能是這三個選項之一：'正面'（代表同業有擴張或新上市等正面發展）、'中立'（代表一般同業商業新聞）、'負面'（代表同業有產品召回、裁員或對我方造成潛在威脅的動作）"
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
        with urllib.request.urlopen(req, timeout=20) as response:
            res_body = response.read().decode('utf-8')
            res_json = json.loads(res_body)
            # Extract content text
            text = res_json['candidates'][0]['content']['parts'][0]['text']
            # Parse response json
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
        print(f"Error calling Gemini API: {e}")
        return None

def google_translate_free(text, target_lang="zh-TW"):
    """Free Google Translate API helper without requiring an API Key."""
    try:
        url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl={target_lang}&dt=t&q={urllib.parse.quote(text)}"
        req = urllib.request.Request(
            url,
            headers={'User-Agent': 'Mozilla/5.0'}
        )
        with urllib.request.urlopen(req, timeout=8) as response:
            res = json.loads(response.read().decode('utf-8'))
            translated_parts = [part[0] for part in res[0] if part and part[0]]
            return "".join(translated_parts)
    except Exception as e:
        print(f"Free translate error: {e}")
        return text

def offline_fallback_analysis(title, region):
    """Fallback when Gemini API is unavailable or not set."""
    title_lower = title.lower()
    
    # Translate title if it is foreign using free Google Translate
    title_translated = title
    if region not in ["taiwan", "food_safety_tw", "brand_patrol"]:
        title_translated = google_translate_free(title)
        title_zh = f"[譯] {title_translated}"
    else:
        title_zh = title
    
    # 0. Competitor Patrol override logic
    if region == "brand_patrol" or any(k in title_lower for k in ["松珍", "鈺統", "弘陽", "隨緣", "大成", "卜蜂", "beyond", "impossible", "oatly"]):
        category = "同業動態"
        summary = f"這是一則關於素食與替代蛋白同業大廠的最新動態。標題為：'{title_translated}'。設定 Gemini 金鑰可分析同業產品佈局與競爭防範建議。"
        takeaway = "分析同業大廠的市場動作，作為齋滋味產品研發與競爭防禦的策略參考。"
    # 0. Food Safety override logic
    elif region == "food_safety" or any(k in title_lower for k in ["recall", "outbreak", "contamination", "poisoning", "食安", "召回", "回收", "檢出", "超標", "中毒"]):
        category = "食安事件"
        summary = f"這是一則關於食品安全、產品召回或法規合規性的最新情報。標題為：'{title_translated}'。設定 Gemini 金鑰後，將為您分析其背後的風險成因與改善防範指引。"
        takeaway = "評估此食安事件或召回原因，審查內部原料供應商與生產管制作業，防範相似之食安風險與商譽損害。"
    # 1. Simple category logic
    elif any(k in title_lower for k in ["launch", "new", "introduce", "release", "unveil", "上市", "新品", "推出", "發表"]):
        category = "新產品上市"
        summary = f"這是一則關於植物基新品發布的新聞。標題為：'{title_translated}'。這顯示了該地區在素食創新產品上的發展速度。您可以設定 Gemini API 金鑰來獲取完整的 AI 翻譯、深度摘要與商業建議。"
        takeaway = "評慢該新品的口味與成分，研究是否適合台灣消費者的飲食習慣，並研發相應的在地素食新品。"
    elif any(k in title_lower for k in ["law", "regulate", "ban", "label", "fda", "policy", "gov", "法規", "政策", "限制", "認證"]):
        category = "法規政策"
        summary = f"這是一則關於素食與食品產業法規或政策的新聞。標題為：'{title_translated}'。法規調整將影響產品標籤或成分出口。設定 Gemini API 金鑰即可自動生成完整的翻譯與法規解讀。"
        takeaway = "應密切關注國際蔬食認證法規，以確保產品符合未來的食安與環保出口標籤要求。"
    elif any(k in title_lower for k in ["tech", "science", "protein", "cultured", "research", "科技", "創新", "蛋白", "研發"]):
        category = "技術創新"
        summary = f"這是一則探討植物基或細胞培養食品科技研發的新聞。標題為：'{title_translated}'。反映了替代蛋白等新技術的重大突破。設定 Gemini API 金鑰後，將為您分析其背後的食品科技成分。"
        takeaway = "研究最新替代蛋白或植物油乳化技術，應用於齋滋味產品中，以提升素食肉排或醬料的質地與保水度。"
    else:
        category = "市場趨勢"
        summary = f"這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'{title_translated}'。這代表該市場的消費趨勢正在演變。設定 Gemini API 金鑰即可啟用自動化中譯與市場商機分析。"
        takeaway = "密切監控此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。"

    return {
        "title_zh": title_zh,
        "category": category,
        "summary": summary,
        "takeaway": takeaway
    }

def is_official_channel(link, source=""):
    """Check if the link belongs to Chaste Je Way's official channels."""
    link_lower = link.lower()
    source_lower = source.lower()
    
    # 1. Official website domain
    if "cjw.com.tw" in link_lower:
        return True
        
    # 2. Official Facebook page ID
    if "facebook.com" in link_lower and "100064106764970" in link_lower:
        return True
        
    # 3. If source indicates brand's official handle
    if "齋滋味" in source_lower or "齋之味" in source_lower:
        if any(w in source_lower for w in ["官方", "官網", "channel", "頻道"]):
            return True
            
    return False

def is_irrelevant_social_news(title):
    """Filter out fire, accident, disaster, crime, and social noise news."""
    title_lower = title.lower()
    irrelevant_keywords = [
        "火災", "惡火", "大火", "失火", "起火", "火警", "火燭", "氣爆", "瓦斯起火", "瓦斯桶",
        "車禍", "偷竊", "強盜", "詐騙", "判刑", "涉嫌", "逮捕", "警方", "偷渡", "鬥毆",
        "身亡", "命案", "猝死", "自殺", "墜樓", "酒駕", "違規", "糾紛", "受傷", "送醫",
        # Irrelevant beverage/alcohol news
        "啤酒", "清酒", "琴酒", "威士忌", "紅酒", "白酒", "泡盛", "釀酒", "酒莊", "酒廠", "調酒", "烈酒", "葡萄酒", "地酒", "酒吧",
        # Irrelevant localized restaurant fire descriptors
        "火海", "烈焰", "一炬", "燒毀", "燒光", "焚毀", "撲滅", "灌救", "火勢", "殘火"
    ]
    for k in irrelevant_keywords:
        if k in title_lower:
            return True
    return False

def is_relevant_newsmarket_item(title):
    """Filter out non-food/non-agricultural articles from newsmarket."""
    title_lower = title.lower()
    
    # Exclude flowers, ornamental gardening, forestry, wildlife, etc.
    exclude_keywords = [
        "火鶴花", "蘭花", "百合花", "菊花", "玫瑰", "花卉", "觀賞植物", "花瓶", 
        "石虎", "黑熊", "穿山甲", "候鳥", "老鷹", "溪流生態", "森林保育", "林業管制"
    ]
    for k in exclude_keywords:
        if k in title_lower:
            return False
            
    # Stricter multi-character food-industry keywords
    include_keywords = [
        "食安", "食品", "植物肉", "植物奶", "素食", "蔬食", "燕麥奶", "豆腐", 
        "黃豆", "大豆", "小麥", "燕麥", "豆漿", "豆奶", "豌豆", "醬油", "醬料", 
        "調味", "加工食品", "小農", "有機", "蔬菜", "作物", "食材", "農產品", 
        "稻米", "白米", "米粉", "茶葉", "焙茶", "綠茶", "全聯", "超商", "全家"
    ]
    for k in include_keywords:
        if k in title_lower:
            return True
            
    return False

def get_sentiment(title, summary=""):
    """Heuristic sentiment analyzer for offline brand patrol reviews."""
    text = (title + " " + summary).lower()
    positive = ["好評", "推薦", "美味", "讚", "好吃", "喜歡", "回購", "方便", "優質", "推", "特價", "盲測", "健康"]
    negative = ["難吃", "投訴", "抱怨", "問題", "退貨", "客服", "生氣", "失望", "雷", "踩雷", "不推薦", "差勁", "不滿"]
    for k in negative:
        if k in text:
            return "負面"
    for k in positive:
        if k in text:
            return "正面"
    return "中立"

def is_duplicate_title(new_title, existing_titles, threshold=0.55):
    """Check Jaccard similarity of character bigrams between new title and existing titles."""
    def normalize(t):
        t = t.lower()
        for char in " .,-_()[]【】「」：:：|/\\":
            t = t.replace(char, "")
        return t
    
    norm_new = normalize(new_title)
    if len(norm_new) < 4:
        return False
        
    def get_bigrams(s):
        return set(s[i:i+2] for i in range(len(s)-1))
        
    b1 = get_bigrams(norm_new)
    if not b1:
        return False
        
    for ext in existing_titles:
        norm_ext = normalize(ext)
        if len(norm_ext) < 4:
            continue
        b2 = get_bigrams(norm_ext)
        if not b2:
            continue
        intersection = len(b1.intersection(b2))
        union = len(b1.union(b2))
        similarity = intersection / union
        if similarity > threshold:
            return True
    return False

def is_competitor_duplicate(new_title, existing_titles):
    """Special deduplicator for competitor news to filter out similar events from different media."""
    competitors = ["松珍", "鈺統", "弘陽", "隨緣", "大成", "卜蜂", "beyond", "impossible", "oatly"]
    new_title_lower = new_title.lower()
    
    # 1. Identify competitor mentioned
    mentioned_competitor = None
    for comp in competitors:
        if comp in new_title_lower:
            mentioned_competitor = comp
            break
            
    if not mentioned_competitor:
        return False
        
    # Helper list of topic keywords
    topic_keywords = ["工廠", "廠", "投資", "動土", "合作", "收購", "上市", "新品", "展", "展覽", "食品展", "綠電"]
    new_topics = [kw for kw in topic_keywords if kw in new_title_lower]
    
    for ext in existing_titles:
        ext_lower = ext.lower()
        if mentioned_competitor in ext_lower:
            # Check if they share any topic keyword (e.g., both mention "廠" or "展" for the same competitor)
            shared_topics = [kw for kw in new_topics if kw in ext_lower]
            if shared_topics:
                return True
                
            # Fallback Jaccard similarity (above 25% overlap)
            def normalize(t):
                t = t.lower()
                for char in " .,-_()[]【】「」：:：|/\\":
                    t = t.replace(char, "")
                return t
                
            def get_bigrams(s):
                return set(s[i:i+2] for i in range(len(s)-1))
                
            norm_new = normalize(new_title)
            norm_ext = normalize(ext)
            b1 = get_bigrams(norm_new)
            b2 = get_bigrams(norm_ext)
            if b1 and b2:
                sim = len(b1.intersection(b2)) / len(b1.union(b2))
                if sim > 0.25:
                    return True
                    
    return False


def sync_news(limit_per_feed=5):
    """Fetch recent items from feeds and use Gemini API to process new ones."""
    db = load_db()
    api_key = db["config"].get("gemini_api_key", "").strip()
    if not api_key:
        # Check system environment variables as fallback
        api_key = os.environ.get("GEMINI_API_KEY", "").strip()

    existing_links = {item["link"] for item in db["news_items"]}
    existing_titles = [item["title"] for item in db["news_items"]]
    new_items_added = 0
    errors = []

    print(f"Starting news sync... API Key configure status: {'Configured' if api_key else 'Not Configured (Offline Mode)'}")

    for feed_key, url in FEEDS.items():
        print(f"Processing feed for: {feed_key}...")
        xml_data = fetch_rss_feed(url)
        if not xml_data:
            errors.append(f"無法獲取 {feed_key} 的 RSS feed 資料。")
            continue

        raw_items = parse_rss_xml(xml_data)
        
        # Determine the region for database storage
        if feed_key == "newsmarket":
            region = "taiwan"
        elif feed_key == "food_safety_tw":
            region = "food_safety_tw"
        elif feed_key == "food_safety_global":
            region = "food_safety_global"
        elif feed_key == "brand_patrol":
            region = "brand_patrol"
        else:
            region = feed_key
            
        default_source = "上下游 News&Market" if feed_key == "newsmarket" else "Google News"
        
        # Process only the first N items to avoid API call spam
        items_to_process = []
        for ri in raw_items:
            # Overwrite source if newsmarket or generic Google News
            if feed_key == "newsmarket":
                ri["source"] = "上下游 News&Market"
            elif ri["source"] == "Google News":
                ri["source"] = default_source
                
            # 1. Filter out official brand channels (website, FB) for brand patrol
            if feed_key == "brand_patrol" and is_official_channel(ri["link"], ri["source"]):
                print(f"Skipping official brand channel mention: {ri['title']}")
                continue
                
            # 2. Filter out irrelevant accident/social/fire news (global filter)
            if is_irrelevant_social_news(ri["title"]):
                print(f"Skipping social/accident news: {ri['title']}")
                continue
                
            # 2. Filter out non-food articles for Newsmarket
            if feed_key == "newsmarket" and not is_relevant_newsmarket_item(ri["title"]):
                print(f"Skipping non-food newsmarket item: {ri['title']}")
                continue
                
            # 3. Deduplicate by link
            if ri["link"] in existing_links:
                continue
                
            # 4. Deduplicate by title similarity
            if is_duplicate_title(ri["title"], existing_titles):
                print(f"Skipping duplicate title: {ri['title']}")
                continue
                
            # 4.5 Deduplicate competitor news specifically (avoid similar competitor events)
            if feed_key == "brand_patrol" and is_competitor_duplicate(ri["title"], existing_titles):
                print(f"Skipping competitor duplicate title: {ri['title']}")
                continue
                
            items_to_process.append(ri)
            existing_links.add(ri["link"])
            existing_titles.append(ri["title"])
            if len(items_to_process) >= limit_per_feed:
                break

        print(f"Found {len(items_to_process)} new items to analyze for {region}.")

        for raw_item in items_to_process:
            # Create a unique ID using md5 of link
            item_id = hashlib.md5(raw_item["link"].encode('utf-8')).hexdigest()[:12]
            
            # AI Analysis
            analysis = None
            if api_key:
                # Try API call
                analysis = call_gemini_api(
                    api_key=api_key,
                    title=raw_item["title"],
                    pub_date=raw_item["pub_date"],
                    source=raw_item["source"],
                    region=region
                )
            
            # Fallback if API key is empty or call failed
            if not analysis:
                analysis = offline_fallback_analysis(raw_item["title"], region)
                if api_key:
                    print(f"Gemini API call failed for '{raw_item['title']}', using offline fallback analysis.")

            # Construct finalized news object
            news_entry = {
                "id": item_id,
                "region": region,
                "title": analysis.get("title_zh", raw_item["title"]),
                "link": raw_item["link"],
                "pub_date": raw_item["pub_date"],
                "source": raw_item["source"],
                "category": analysis.get("category", "市場趨勢"),
                "summary": analysis.get("summary", ""),
                "takeaway": analysis.get("takeaway", ""),
                "sentiment": analysis.get("sentiment", get_sentiment(analysis.get("title_zh", raw_item["title"]), analysis.get("summary", "")))
            }

            # Add to DB
            db["news_items"].insert(0, news_entry)  # Add new items at the top
            existing_links.add(raw_item["link"])
            new_items_added += 1

    # Keep only the latest 100 items to avoid DB bloating
    if len(db["news_items"]) > 100:
        db["news_items"] = db["news_items"][:100]

    save_db(db)
    print(f"News sync complete. Added {new_items_added} new items.")
    return {
        "success": True,
        "new_items_added": new_items_added,
        "errors": errors
    }

if __name__ == '__main__':
    # Test fetch
    sync_news(limit_per_feed=2)
