"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Region = "全部市場" | "台灣" | "美國" | "澳洲" | "歐洲";
type Topic = "全部主題" | "新品" | "通路價格" | "競品" | "消費趨勢" | "原料技術" | "法規標示";
type SourceFilter = "全部來源" | "食力 foodNEXT" | "上下游新聞";
type SectionId = "today" | "markets" | "intelligence" | "actions";

type Intelligence = {
  id: number;
  region: Exclude<Region, "全部市場">;
  topic: Exclude<Topic, "全部主題">;
  title: string;
  summary: string;
  impact: string;
  action: string;
  owner: string;
  source: string;
  url: string;
  priority: "高" | "中" | "低";
  time: string;
  score: number;
};

const intelligence: Intelligence[] = [
  {
    id: 12,
    region: "台灣",
    topic: "法規標示",
    title: "食品原料來源透明度成為消費者與政策焦點",
    summary: "上下游報導指出，部分加工食品雖標示台灣製造，核心原料仍可能來自海外；原料來源國透明化的社會關注正在升高。",
    impact: "齋之味若能主動說明大豆、菇類與主要原料來源，可把供應鏈透明轉化成品牌信任。",
    action: "盤點三個主力 SKU 的主要原料來源國，評估是否加入官網商品頁。",
    owner: "採購品保",
    source: "上下游新聞",
    url: "https://www.newsmarket.com.tw/blog/240244/",
    priority: "高",
    time: "昨天",
    score: 94,
  },
  {
    id: 11,
    region: "台灣",
    topic: "原料技術",
    title: "金盞花蛋白展現耐熱、保水與乳化潛力",
    summary: "食力整理最新研究，金盞花蛋白具耐熱、保水、保油、乳化與抗氧化特性，可能成為植物肉與乳品替代品的新原料。",
    impact: "這仍是早期技術訊號，但其保水與乳化特性值得納入素海鮮口感研發觀察清單。",
    action: "建立新蛋白原料觀察表，先追蹤供應商、法規身分與商業化成本。",
    owner: "產品研發",
    source: "食力 foodNEXT",
    url: "https://www.foodnext.net/science/knowledge/paper/6731173650",
    priority: "中",
    time: "7月6日",
    score: 82,
  },
  {
    id: 10,
    region: "台灣",
    topic: "消費趨勢",
    title: "植物食品轉向高營養、低加工與潔淨標示",
    summary: "食力觀察植物性市場正從追求像真肉，轉向高蛋白、高纖、腸道健康、低加工與可理解的成分表。",
    impact: "齋之味的產品溝通需要同時回答好不好吃、怎麼料理，以及成分與營養是否容易理解。",
    action: "挑選一款產品試做簡化成分溝通與營養賣點的商品頁版本。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://www.foodnext.net/news/newstrack/paper/6971161734",
    priority: "高",
    time: "5月7日",
    score: 91,
  },
  {
    id: 9,
    region: "台灣",
    topic: "通路價格",
    title: "台灣蔬菜自給率下降，進口菜長期進入加工與餐飲通路",
    summary: "上下游追蹤指出，國產蔬菜自給率已由2000年的95%降至2024年的81.6%，進口蔬菜逐漸成為常態供應。",
    impact: "蔬菜與植物原料來源、成本和供應穩定性，未來可能同時影響產品定價與國產價值訴求。",
    action: "把主要蔬菜原料分成國產、進口與可替代三組，標記供應風險。",
    owner: "採購",
    source: "上下游新聞",
    url: "https://www.newsmarket.com.tw/blog/239131/",
    priority: "中",
    time: "6月22日",
    score: 79,
  },
  {
    id: 1,
    region: "歐洲",
    topic: "通路價格",
    title: "歐洲平價自有品牌帶動植物性食品銷量",
    summary: "義大利等市場的平價自有品牌成長快於品牌商品，消費者持續回到價格與日常使用價值。",
    impact: "出口提案不能只靠純素理念，包裝量與每餐成本會直接影響通路採購意願。",
    action: "本週比較德國、義大利三家零售商冷凍純素炸物的每公斤售價。",
    owner: "國際業務",
    source: "GFI Europe",
    url: "https://gfieurope.org/blog/affordable-products-driving-plant-based-retail-sales-growth/",
    priority: "高",
    time: "08:20",
    score: 92,
  },
  {
    id: 2,
    region: "美國",
    topic: "消費趨勢",
    title: "植物肉品牌轉向高蛋白與直接來自植物的敘事",
    summary: "美國消費者更加檢視成分、蛋白質與加工感，品牌開始從仿肉延伸到機能飲品與零食。",
    impact: "齋之味可把大豆、菇類或蒟蒻來源與營養價值放到包裝正面，而非只寫仿葷品名。",
    action: "替火腿肉片與花枝圈整理一版『主要植物來源＋蛋白質』正面包裝文案。",
    owner: "品牌行銷",
    source: "GFI US",
    url: "https://gfi.org/marketresearch/",
    priority: "高",
    time: "07:55",
    score: 89,
  },
  {
    id: 3,
    region: "台灣",
    topic: "法規標示",
    title: "純素標示仍須明確區分五種素食類別",
    summary: "台灣包裝食品宣稱素食時，須使用全素或純素、蛋素、奶素、奶蛋素、植物五辛素等規定名稱。",
    impact: "新品資料庫與跨境包裝稿必須保留五辛、蛋、奶三個結構化欄位。",
    action: "盤點現有 SKU，確認官網、包裝與電商頁面的素食分類一致。",
    owner: "品保法規",
    source: "台灣食藥署",
    url: "https://www.fda.gov.tw/TC/newsContent.aspx?id=10217",
    priority: "高",
    time: "07:30",
    score: 87,
  },
  {
    id: 4,
    region: "澳洲",
    topic: "競品",
    title: "澳洲植物肉維持市場規模，但通路更重視回購",
    summary: "市場在早期成長後進入汰弱留強階段，價格、口感與方便料理成為上架後能否留下的關鍵。",
    impact: "香酥花枝圈比一般漢堡排更具差異化，但需要清楚的氣炸鍋情境與試吃證據。",
    action: "建立澳洲市場的一頁式產品提案：氣炸時間、每份成本、口感特色。",
    owner: "產品企劃",
    source: "Food Frontier",
    url: "https://www.foodfrontier.org/latest-state-of-the-industry-report-shows-plant-based-meat-charts-its-own-course-in-australia/",
    priority: "中",
    time: "昨天",
    score: 78,
  },
  {
    id: 5,
    region: "美國",
    topic: "法規標示",
    title: "FDA建議替代食品名稱清楚揭露植物來源",
    summary: "植物性蛋、海鮮、肉與乳品替代品的名稱，應協助消費者理解產品本質及主要植物來源。",
    impact: "未來英文品名可從 Vegan Calamari Rings 強化為 Soy-based Vegan Calamari-style Rings。",
    action: "請外銷顧問檢視三個主力 SKU 的英文品名與過敏原說明。",
    owner: "品保法規",
    source: "U.S. FDA",
    url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/draft-guidance-industry-labeling-plant-based-alternatives-animal-derived-foods",
    priority: "中",
    time: "昨天",
    score: 76,
  },
  {
    id: 6,
    region: "歐洲",
    topic: "原料技術",
    title: "歐盟持續更新 Novel Food 核准清單",
    summary: "新植物來源、微生物、藻類與新製程原料可能需要上市前授權，核准條件也會持續更新。",
    impact: "若使用新型藻類蛋白或發酵蛋白，配方確認階段就應先查歐盟身分。",
    action: "在研發新品表單新增『目標市場原料法規已查核』欄位。",
    owner: "研發",
    source: "European Commission",
    url: "https://food.ec.europa.eu/food-safety/novel-food_en",
    priority: "中",
    time: "2天前",
    score: 73,
  },
  {
    id: 7,
    region: "台灣",
    topic: "新品",
    title: "快速料理場景可成為冷凍純素產品的共同語言",
    summary: "早餐、便當、宵夜與氣炸鍋料理能跨越純素族群，讓彈性素食者更容易理解購買理由。",
    impact: "既有火腿片、肉醬與炸物可以從品項導向，轉成一週快速料理組合。",
    action: "規劃『五天晚餐不重複』內容企劃，測試三款產品的交叉銷售。",
    owner: "電商營運",
    source: "齋之味產品觀察",
    url: "https://www.cjw.com.tw/",
    priority: "中",
    time: "2天前",
    score: 71,
  },
  {
    id: 8,
    region: "澳洲",
    topic: "法規標示",
    title: "澳紐 Vegan 宣稱仍仰賴供應商證明與誠實表述",
    summary: "FSANZ 的食品標準未為所有宗教、環境與動物福利價值宣稱設定單一定義。",
    impact: "出口文件需保留完整供應鏈聲明，不能只依中文包裝上的純素字樣。",
    action: "整理原料商 vegan 聲明、過敏原與交叉污染文件的缺口。",
    owner: "採購品保",
    source: "FSANZ",
    url: "https://www.foodstandards.gov.au/consumer/labelling/Labelling-consumervalueissues",
    priority: "低",
    time: "3天前",
    score: 65,
  },
];

const regions: Region[] = ["全部市場", "台灣", "美國", "澳洲", "歐洲"];
const topics: Topic[] = ["全部主題", "新品", "通路價格", "競品", "消費趨勢", "原料技術", "法規標示"];
const sourceFilters: SourceFilter[] = ["全部來源", "食力 foodNEXT", "上下游新聞"];

const featureGuide = [
  { no: "01", title: "今日決策", copy: "只看最重要的訊號", result: "得到：優先事項與下一步", href: "#today" },
  { no: "02", title: "市場雷達", copy: "比較四地市場溫度", result: "得到：機會與風險方向", href: "#markets" },
  { no: "03", title: "全部情報", copy: "依市場、主題、來源查找", result: "得到：可追溯的情報脈絡", href: "#intelligence" },
  { no: "04", title: "行動追蹤", copy: "指定負責人與期限", result: "得到：真正落地的任務", href: "#actions" },
];

const marketPulse = [
  { region: "台灣", signal: "穩定", note: "標示與通路動態", value: 72 },
  { region: "美國", signal: "承壓", note: "健康與價值重整", value: 48 },
  { region: "澳洲", signal: "觀察", note: "口感、價格決勝", value: 61 },
  { region: "歐洲", signal: "分化", note: "德義成長、英國承壓", value: 68 },
];

export default function Home() {
  const [region, setRegion] = useState<Region>("全部市場");
  const [topic, setTopic] = useState<Topic>("全部主題");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("全部來源");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<number[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("today");
  const manualNavigationUntil = useRef(0);

  useEffect(() => {
    const trackedSections: SectionId[] = ["today", "markets", "intelligence"];
    const updateActiveSection = () => {
      if (performance.now() < manualNavigationUntil.current) return;
      const current = trackedSections.reduce<SectionId>((active, id) => {
        const section = document.getElementById(id);
        return section && section.getBoundingClientRect().top <= 180 ? id : active;
      }, "today");
      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return intelligence.filter((item) => {
      const matchesRegion = region === "全部市場" || item.region === region;
      const matchesTopic = topic === "全部主題" || item.topic === topic;
      const matchesSource = sourceFilter === "全部來源" || item.source === sourceFilter;
      const searchable = `${item.title}${item.summary}${item.impact}${item.action}${item.source}`.toLowerCase();
      return matchesRegion && matchesTopic && matchesSource && (!normalized || searchable.includes(normalized));
    }).sort((a, b) => b.score - a.score);
  }, [region, topic, sourceFilter, query]);

  const visible = showAll ? filtered : filtered.slice(0, 5);
  const toggleSaved = (id: number) => {
    setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };
  const changeRegion = (nextRegion: Region) => {
    setRegion(nextRegion);
    if (nextRegion !== "台灣" && nextRegion !== "全部市場") setSourceFilter("全部來源");
  };
  const navigateTo = (event: React.MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    event.preventDefault();
    setActiveSection(id);
    manualNavigationUntil.current = performance.now() + 1000;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#top" aria-label="齋之味情報中樞首頁">
          <span className="brand-mark">齋</span>
          <span><strong>齋之味</strong><small>市場情報中樞</small></span>
        </a>
        <nav aria-label="主要導覽">
          <a className={`nav-item ${activeSection === "today" ? "active" : ""}`} aria-current={activeSection === "today" ? "page" : undefined} href="#today" onClick={(event) => navigateTo(event, "today")}><span>01</span><div><strong>今日決策</strong><small>先做哪三件事</small></div></a>
          <a className={`nav-item ${activeSection === "markets" ? "active" : ""}`} aria-current={activeSection === "markets" ? "page" : undefined} href="#markets" onClick={(event) => navigateTo(event, "markets")}><span>02</span><div><strong>市場雷達</strong><small>哪裡有機會或風險</small></div></a>
          <a className={`nav-item ${activeSection === "intelligence" ? "active" : ""}`} aria-current={activeSection === "intelligence" ? "page" : undefined} href="#intelligence" onClick={(event) => navigateTo(event, "intelligence")}><span>03</span><div><strong>全部情報</strong><small>查新聞與原始來源</small></div></a>
          <a className={`nav-item ${activeSection === "actions" ? "active" : ""}`} aria-current={activeSection === "actions" ? "page" : undefined} href="#actions" onClick={(event) => navigateTo(event, "actions")}><span>04</span><div><strong>行動追蹤</strong><small>誰在何時完成</small></div></a>
        </nav>
        <div className="sidebar-foot">
          <span className="live-dot" />情報示範版
          <small>最後整理：今日 08:30</small>
        </div>
      </aside>

      <section className="workspace" id="top">
        <header className="topbar">
          <div>
            <p className="eyebrow">2026年7月22日・星期三</p>
            <h1>早安，今天有 <em>3 項</em>值得採取行動</h1>
          </div>
          <div className="top-actions">
            <label className="search">
              <span>⌕</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜尋品牌、產品或趨勢" aria-label="搜尋情報" />
            </label>
            <button className="avatar" aria-label="使用者選單">CJ</button>
          </div>
        </header>

        <section className="briefing" id="today">
          <div className="briefing-copy">
            <p className="section-kicker">TODAY’S BRIEFING</p>
            <h2>市場不缺新品，<br />真正稀缺的是<strong>回購理由。</strong></h2>
            <p>今日訊號集中在價格、健康感與使用情境。建議優先把現有產品轉譯成消費者能立刻理解的日常餐桌價值。</p>
          </div>
          <div className="decision-card">
            <div className="decision-head"><span>首要建議</span><b>高優先</b></div>
            <h3>建立主力 SKU 的跨市場價值表</h3>
            <p>用同一張表比較植物來源、蛋白質、每份成本、氣炸時間、素食分類與出口標示名稱。</p>
            <div className="decision-meta"><span>負責：產品企劃 × 品保</span><span>本週完成 →</span></div>
          </div>
        </section>

        <section className="feature-guide" aria-labelledby="guide-title">
          <div className="guide-intro"><p className="section-kicker">HOW TO USE</p><h2 id="guide-title">四個功能，一條決策路徑</h2><p>從發現訊號到交付任務，依序使用即可。</p></div>
          <div className="guide-grid">
            {featureGuide.map((feature) => (
              <a href={feature.href} className="guide-card" key={feature.no}>
                <span>{feature.no}</span><div><strong>{feature.title}</strong><p>{feature.copy}</p><small>{feature.result}</small></div><b>→</b>
              </a>
            ))}
          </div>
        </section>

        <section className="market-section" id="markets">
          <div className="section-title">
            <div><p className="section-kicker">MARKET PULSE</p><h2>四大市場溫度</h2></div>
            <p>綜合新品、通路、法規與消費訊號</p>
          </div>
          <div className="pulse-grid">
            {marketPulse.map((market) => (
              <button key={market.region} className={`pulse-card ${region === market.region ? "selected" : ""}`} onClick={() => changeRegion(region === market.region ? "全部市場" : market.region as Region)}>
                <div><span className="region-name">{market.region}</span><span className={`signal signal-${market.signal}`}>{market.signal}</span></div>
                <strong>{market.note}</strong>
                <div className="meter"><i style={{ width: `${market.value}%` }} /></div>
              </button>
            ))}
          </div>
        </section>

        <section className="intel-section" id="intelligence">
          <div className="section-title intel-heading">
            <div><p className="section-kicker">INTELLIGENCE FEED</p><h2>今日情報</h2></div>
            <span className="result-count">{filtered.length} 則符合條件</span>
          </div>

          <div className="filters" aria-label="情報篩選">
            <div className="filter-row">
              {regions.map((item) => <button key={item} className={region === item ? "active" : ""} onClick={() => changeRegion(item)}>{item}</button>)}
            </div>
            <div className="filter-row topics">
              {topics.map((item) => <button key={item} className={topic === item ? "active" : ""} onClick={() => setTopic(item)}>{item}</button>)}
            </div>
            <div className="source-filter">
              <span>台灣重點媒體</span>
              {sourceFilters.map((item) => <button key={item} className={sourceFilter === item ? "active" : ""} onClick={() => { setSourceFilter(item); if (item !== "全部來源") setRegion("台灣"); }}>{item}</button>)}
              <a href="https://www.foodnext.net/" target="_blank" rel="noreferrer">食力首頁 ↗</a>
              <a href="https://www.newsmarket.com.tw/" target="_blank" rel="noreferrer">上下游首頁 ↗</a>
            </div>
          </div>

          <div className="intel-layout">
            <div className="feed">
              {visible.length ? visible.map((item) => (
                <article className="intel-card" key={item.id}>
                  <div className="card-rail"><span className={`priority priority-${item.priority}`}>{item.priority}</span><b>{item.score}</b><small>情報分數</small></div>
                  <div className="card-body">
                    <div className="card-tags"><span>{item.region}</span><span>{item.topic}</span><time>{item.time}</time></div>
                    <h3>{item.title}</h3>
                    <p className="summary">{item.summary}</p>
                    <div className="insight-box"><span>對齋之味的影響</span><p>{item.impact}</p></div>
                    <div className="card-action"><div><span>建議行動</span><strong>{item.action}</strong></div><small>{item.owner}</small></div>
                    <div className="card-footer">
                      <a href={item.url} target="_blank" rel="noreferrer">來源：{item.source} ↗</a>
                      <button className={saved.includes(item.id) ? "saved" : ""} onClick={() => toggleSaved(item.id)}>{saved.includes(item.id) ? "已收藏" : "＋ 收藏"}</button>
                    </div>
                  </div>
                </article>
              )) : <div className="empty"><strong>找不到符合條件的情報</strong><p>試著清除搜尋文字或切換市場。</p></div>}
              {filtered.length > 5 && <button className="load-more" onClick={() => setShowAll(!showAll)}>{showAll ? "收合情報" : `查看其餘 ${filtered.length - 5} 則情報`}</button>}
            </div>

            <aside className="action-panel" id="actions">
              <div className="action-title"><div><p className="section-kicker">NEXT MOVES</p><h2>行動追蹤</h2></div><span>3</span></div>
              <ol>
                <li><span className="check">1</span><div><strong>盤點主力 SKU 素食標示</strong><p>品保法規・今日</p></div></li>
                <li><span className="check">2</span><div><strong>建立歐洲零售價格比較</strong><p>國際業務・本週五</p></div></li>
                <li><span className="check">3</span><div><strong>測試一週快速料理組合</strong><p>電商營運・7月29日</p></div></li>
              </ol>
              <div className="weekly-note">
                <span>本週觀察</span>
                <strong>少加工、高蛋白、好料理</strong>
                <p>三個訊號同時出現時，優先納入產品企劃。</p>
              </div>
              <button className="outline-button">查看全部行動 →</button>
            </aside>
          </div>
        </section>

        <footer><span>齋之味市場情報中樞・第一版</span><span>資料用於內部研判，決策前請查核原始來源</span></footer>
      </section>
    </main>
  );
}
