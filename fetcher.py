import os
import json
import sys
import urllib.request
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
    "taiwan": "https://news.google.com/rss/search?q=(%E7%B4%A0%E9%A3%9F+OR+%E8%94%AC%E9%A3%9F+OR+%E6%A4%8D%E7%89%A9%E8%82%85)+site:foodnext.net+when:2y&hl=zh-TW&gl=TW&ceid=TW:zh-Hant",
    # Google News site-restricted RSS replaces the Cloudflare-blocked direct feed.
    "newsmarket": (
        "https://news.google.com/rss/search?"
        "q=site%3Anewsmarket.com.tw+"
        "%28%E9%A3%9F%E5%93%81+OR+%E8%BE%B2%E6%A5%AD+OR+%E9%A3%9F%E5%AE%89+OR+%E8%BE%B2%E7%94%A2+OR+%E9%A3%9F%E7%89%A9%29+"
        "when%3A2y&hl=zh-TW&gl=TW&ceid=TW%3Azh-Hant"
    ),
    "usa": "https://news.google.com/rss/search?q=%22plant-based%22+OR+%22vegan+food%22+market+OR+product+OR+launch+when:2y&hl=en-US&gl=US&ceid=US:en",
    "europe": "https://news.google.com/rss/search?q=%22plant-based%22+OR+%22vegan+food%22+market+OR+product+Europe+when:2y&hl=en-GB&gl=GB&ceid=GB:en",
    "australia": "https://news.google.com/rss/search?q=%22plant-based%22+OR+%22vegan+food%22+market+OR+product+Australia+when:2y&hl=en-AU&gl=AU&ceid=AU:en",
    # Food Safety Feeds (Domestic & International)
    "food_safety_tw": "https://news.google.com/rss/search?q=%E9%A3%9F%E5%AE%89+OR+%E9%A3%9F%E5%93%81%E5%AE%89%E5%85%A8+OR+%E8%98%87%E4%B8%B9%E7%B4%85+OR+%E9%A3%9F%E5%AE%89%E6%B3%95%E8%A6%8F+OR+%E9%A3%9F%E5%93%81%E8%A1%9B%E7%94%9F+when:2y&hl=zh-TW&gl=TW&ceid=TW:zh-Hant",
    "food_safety_global": "https://news.google.com/rss/search?q=%22food+safety%22+OR+%22food+recall%22+OR+%22food+contamination%22+when:2y&hl=en-US&gl=US&ceid=US:en",
    # Competitor Patrol Feed (Search for competitor giants: 松珍, 鈺統, 弘陽, 隨緣, 大成, 卜蜂, Beyond Meat, Impossible Foods, Oatly)
    "brand_patrol": "https://news.google.com/rss/search?q=(%22%E6%9D%BE%E7%8F%8D%22+OR+%22%E9%85%97%E7%B5%B1%22+OR+%22%E5%BC%98%E9%99%BD%22+OR+%22%E9%9A%A8%E7%B7%A3%22+OR+%22%E5%A4%A7%E6%88%90%22+OR+%22%E5%8D%9C%E8%9C%82%22+OR+%22Beyond+Meat%22+OR+%22Impossible+Foods%22+OR+%22Oatly%22)+AND+(%E7%B4%A0%E9%A3%9F+OR+%E8%94%AC%E9%A3%9F+OR+%E6%A4%8D%E7%89%A9%E8%82%85+OR+%E6%A4%8D%E7%89%A9%E5%A5%B6+OR+%E7%85%92%E9%BA%A5%E5%A5%B6)+when:2y&hl=zh-TW&gl=TW&ceid=TW:zh-Hant"
}

# Wider fallback query for temporary Google News indexing gaps.
FEED_FALLBACKS = {
    "newsmarket": (
        "https://news.google.com/rss/search?"
        "q=site%3Anewsmarket.com.tw+when%3A2y&"
        "hl=zh-TW&gl=TW&ceid=TW%3Azh-Hant"
    ),
}

def load_db():
    if not os.path.exists(DB_PATH):
        return {"news_items": [], "config": {}}
    try:
        with open(DB_PATH, "r", encoding="utf-8") as f:
            db = json.load(f)
            if "news_items" not in db: db["news_items"] = []
            if "config" not in db: db["config"] = {}
            return db
    except Exception as e:
        print(f"Error loading DB: {e}")
        return {"news_items": [], "config": {}}

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

# Local, deterministic analysis.  This module intentionally has no AI/API fallback.

TRANSLATION_GLOSSARY = {
    "plant-based": "植物基", "plant based": "植物基", "vegan": "純素",
    "meat alternative": "肉類替代品", "meat alternatives": "肉類替代品",
    "dairy alternative": "乳製品替代品", "food safety": "食品安全",
    "food recall": "食品召回", "food contamination": "食品污染",
    "clean label": "潔淨標示", "labeling": "標示", "labelling": "標示",
    "market growth": "市場成長", "market share": "市場份額",
    "product launch": "產品上市", "new product": "新品",
    "supply chain": "供應鏈", "traceability": "追溯管理",
    "high protein": "高蛋白", "oat milk": "燕麥奶",
    "alternative protein": "替代蛋白", "cultivated meat": "培養肉",
    "research": "研究", "technology": "技術", "regulation": "法規",
}

CATEGORY_RULES = {
    "食安事件": ["食安", "食品安全", "food safety", "recall", "召回", "回收", "contamination", "污染", "outbreak", "疫情", "中毒", "檢出", "超標", "異物"],
    "法規政策": ["法規", "規範", "政策", "修法", "法案", "標示", "標籤", "label", "regulation", "regulatory", "fda", "fsma", "禁用", "禁止", "認證", "通報"],
    "同業動態": ["松珍", "鈺統", "弘陽", "隨緣", "大成", "卜蜂", "beyond meat", "impossible foods", "oatly", "競品", "同業", "收購", "投資", "工廠", "併購"],
    "新產品上市": ["新品", "上市", "推出", "發表", "發布", "launch", "new product", "introduce", "release", "unveil", "flavor", "口味"],
    "技術創新": ["技術", "科技", "研發", "研究", "蛋白", "原料", "配方", "質地", "風味遮蔽", "protein", "technology", "research", "innovation", "cultivated"],
    "市場趨勢": ["市場", "消費", "趨勢", "需求", "價格", "通路", "成長", "下降", "market", "consumer", "trend", "sales", "price", "demand"],
}

CATEGORY_ACTIONS = {
    "食安事件": "立即核對相關原料、供應商批次與內部檢驗紀錄，更新異常通報及召回應變 SOP。",
    "法規政策": "由品保法規團隊追蹤正式條文與生效日期，盤點產品標示、宣稱及出口文件的影響。",
    "同業動態": "建立競品追蹤卡，記錄其產品、價格、通路與產能變化，並安排主力品項的差異化比較。",
    "新產品上市": "拆解新品的成分、口味、價格與使用情境，評估在地化開發及現有產品線的替代風險。",
    "技術創新": "請產品研發評估原料、加工技術與感官表現，安排小規模配方或口感測試以驗證可行性。",
    "市場趨勢": "持續追蹤價格、通路與消費者需求訊號，將具一致性的變化納入下一季產品與業務規劃。",
}

CATEGORY_IMPACT = {
    "食安事件": "事件可能提高消費者對原料、製程與追溯透明度的要求，齋滋味應優先確認自身供應鏈與品保紀錄。",
    "法規政策": "政策變化可能影響產品命名、標示、宣稱或出口合規，提前盤點可降低改版與下架風險。",
    "同業動態": "同業動作反映競爭者正在調整產品、產能或通路布局，齋滋味需比較自身的口感、價格與供應優勢。",
    "新產品上市": "新品會改變消費者對口味、便利性或價格的期待，齋滋味可從使用情境與差異化價值尋找機會。",
    "技術創新": "新原料或製程可能改善口感、營養與量產穩定性，也可能提高研發驗證與法規審查需求。",
    "市場趨勢": "市場訊號顯示需求、價格或通路正在變化，齋滋味應以實際回購與使用情境驗證，而非只追逐單一話題。",
}

POSITIVE_WORDS = ["成長", "增加", "擴張", "投資", "推出", "上市", "突破", "growth", "increase", "launch", "expansion"]
NEGATIVE_WORDS = ["下降", "衰退", "退燒", "召回", "污染", "超標", "危機", "裁員", "下滑", "decline", "recall", "contamination"]

def _normalize(text):
    return " ".join((text or "").lower().replace("－", "-").split())

def _localize_title(title):
    result = title.strip()
    lower = result.lower()
    for source, target in sorted(TRANSLATION_GLOSSARY.items(), key=lambda pair: len(pair[0]), reverse=True):
        if source in lower:
            result = result.replace(source, target).replace(source.title(), target)
    return result

def _matches(text, keywords):
    normalized = _normalize(text)
    return [keyword for keyword in keywords if keyword.lower() in normalized]

def _classify(title, region):
    text = f"{title} {region}"
    scores = {category: len(_matches(text, keywords)) for category, keywords in CATEGORY_RULES.items()}
    # Safety and regulation signals have precedence because they require faster action.
    for category in ("食安事件", "法規政策", "同業動態"):
        if scores[category] > 0:
            return category
    return max(scores, key=scores.get) if max(scores.values(), default=0) else "市場趨勢"

def _sentiment(title, summary, category):
    text = _normalize(f"{title} {summary}")
    positive = sum(1 for word in POSITIVE_WORDS if word.lower() in text)
    negative = sum(1 for word in NEGATIVE_WORDS if word.lower() in text)
    if category == "食安事件" or negative > positive:
        return "負面"
    if positive > negative:
        return "正面"
    return "中立"

def _make_summary(title, source, pub_date, category, region):
    localized = _localize_title(title)
    matched = _matches(title, CATEGORY_RULES[category])
    signal = "、".join(matched[:3]) if matched else "相關市場訊號"
    date_text = pub_date or "日期未明"
    source_text = source or "未標示來源"
    return (f"{date_text}，{source_text}發布一則來自{region}的{category}情報，主題為「{localized}」。"
            f"從標題可辨識的關鍵訊號包括{signal}，顯示事件與{category}相關；目前僅依 RSS 標題與來源欄位整理，仍應點擊原始連結核對完整內容。")

def offline_fallback_analysis(title, region, source="", pub_date=""):
    """Generate explainable Traditional Chinese analysis using local rules only."""
    localized = _localize_title(title)
    category = _classify(title, region)
    summary = _make_summary(title, source, pub_date, category, region)
    impact = CATEGORY_IMPACT[category]
    takeaway = CATEGORY_ACTIONS[category]
    sentiment = _sentiment(title, summary, category)
    return {
        "title_zh": localized,
        "category": category,
        "summary": summary,
        "impact": impact,
        "takeaway": takeaway,
        "sentiment": sentiment,
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
    """Fetch recent RSS items and process them with deterministic local rules."""
    from datetime import timedelta
    db = load_db()
    
    # 0. Clean up existing database items that are older than 2 years
    two_years_ago = datetime.now() - timedelta(days=730)
    valid_items = []
    removed_count = 0
    for item in db.get("news_items", []):
        item_date_str = item.get("pub_date", "")
        if item_date_str:
            try:
                dt = datetime.strptime(item_date_str, "%Y-%m-%d %H:%M")
                if dt >= two_years_ago:
                    valid_items.append(item)
                else:
                    removed_count += 1
            except Exception:
                valid_items.append(item)
        else:
            valid_items.append(item)
            
    if removed_count > 0:
        print(f"Database cleanup: Removed {removed_count} items older than 2 years.")
        db["news_items"] = valid_items
        save_db(db)

    existing_links = {item["link"] for item in db["news_items"]}
    existing_titles = [item["title"] for item in db["news_items"]]
    new_items_added = 0
    errors = []

    print("Starting news sync... Local rules mode; no AI/API analysis is used.")

    for feed_key, url in FEEDS.items():
        print(f"Processing feed for: {feed_key}...")
        feed_urls = [url]
        if feed_key in FEED_FALLBACKS:
            feed_urls.append(FEED_FALLBACKS[feed_key])

        raw_items = []
        for source_index, feed_url in enumerate(feed_urls):
            xml_data = fetch_rss_feed(feed_url)
            parsed_items = parse_rss_xml(xml_data)
            if parsed_items:
                raw_items = parsed_items
                label = "primary" if source_index == 0 else "fallback"
                print(f"{label.capitalize()} RSS source succeeded for {feed_key}: {len(parsed_items)} items.")
                break

        if not raw_items:
            errors.append(f"無法獲取 {feed_key} 的 RSS feed 資料。")
            continue

        # Google News queries can overlap; remove duplicate links before filtering.
        unique_raw_items = []
        seen_feed_keys = set()
        for item in raw_items:
            dedupe_key = item.get("link") or hashlib.md5(
                item.get("title", "").encode("utf-8")
            ).hexdigest()
            if dedupe_key in seen_feed_keys:
                continue
            seen_feed_keys.add(dedupe_key)
            unique_raw_items.append(item)
        raw_items = unique_raw_items
        
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
                
            # 2.5 Filter out articles older than 2 years
            if ri["pub_date"]:
                try:
                    dt = datetime.strptime(ri["pub_date"], "%Y-%m-%d %H:%M")
                    if dt < two_years_ago:
                        print(f"Skipping old news item: {ri['title']} ({ri['pub_date']})")
                        continue
                except Exception:
                    pass

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
            
            # Deterministic local analysis; no API key or external model is consulted.
            analysis = offline_fallback_analysis(
                title=raw_item["title"],
                region=region,
                source=raw_item["source"],
                pub_date=raw_item["pub_date"],
            )

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
