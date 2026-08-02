"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Region = "全部市場" | "台灣" | "美國" | "澳洲" | "歐洲";
type Topic = "全部主題" | "新品" | "通路價格" | "競品" | "消費趨勢" | "原料技術" | "法規標示";
type SourceFilter = "全部來源" | "食力 foodNEXT" | "上下游新聞";
type SectionId = "today" | "markets" | "intelligence";

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
  publishedAt: string;
  collectedAt: string;
  score: number;
};

const intelligence: Intelligence[] = [
{
    id: 37624096,
    region: "歐洲",
    topic: "消費趨勢",
    title: "植物基肉品市場預計到2030年價值將增長一倍以上",
    summary: "根據2025年3月10日Plant Based News報導，歐洲植物基肉品市場預計到2030年其市場價值將增長一倍以上。這份來自歐洲的分析指出，消費者對植物基替代品的需求持續強勁，推動了市場的顯著擴張。此趨勢顯示植物基食品產業在未來幾年內將面臨巨大的成長機會與競爭，品牌需密切關注市場動態與消費者偏好，以應對這股強勁的發展浪潮。",
    impact: "齋之味應視此為拓展市場與品牌影響力的重大機會。未來植物基肉品市場的快速成長，意味著競爭將加劇，但同時也為新產品開發和市場滲透提供廣闊空間。齋之味需加強創新，提升產品差異化，並策略性地進入或擴大在植物基肉品領域的佈局，以搶佔先機。",
    action: "評估現有植物基肉品產品線，研發符合市場新趨勢與消費者需求的創新產品，並探索潛在的歐洲市場機會。",
    owner: "產品研發",
    source: "Plant Based News",
    url: "https://news.google.com/rss/articles/CBMiggFBVV95cUxNcXNHc3dscmRoSFJSclo3cHlnRlNSWXJWQzBqeDFmZ1ZlakZYZjFBRnhvbmV5S3VBZnJzSkYtM0NLeUpGTHVqVnJnQ2FtNHRvS2xaNGppSDRabW94Uy0tQ0ttMTgtaFZIVEJzUExLOVFKX3JzS1hkUkpJYTJ4ck9XNER3?oc=5",
    priority: "高",
    publishedAt: "2025-03-10",
    collectedAt: "2026-08-01",
    score: 95,
  },
{
    id: 20426306,
    region: "台灣",
    topic: "法規標示",
    title: "行政院擬修《食安法》：業者異常事件須24小時內通報，隱匿最高罰三千萬",
    summary: "行政院近期提案修正《食品安全衛生管理法》，核心重點為要求所有食品業者，一旦發現與食品安全相關的異常事件或風險，必須在24小時內主動向主管機關通報。若業者刻意隱匿不報，將面臨最高新台幣三千萬元的重罰。此修法旨在強化食品安全管理機制，加速異常事件處理，避免食安疑慮擴大，確保消費者飲食安全。",
    impact: "齋之味須全面檢視現行品保流程，確保具備24小時內通報異常事件的能力。此法規加重業者責任，提升品質控管重要性，可能需投入更多資源於內部稽核與緊急應變機制，以避免高額罰款並維護品牌信譽。",
    action: "盤點現有品保作業流程，制定24小時內異常事件通報SOP，強化員工食安法規教育訓練，確保全面符合新法規要求。",
    owner: "品保法規",
    source: "中央社 CNA",
    url: "https://news.google.com/rss/articles/CBMiX0FVX3lxTFB0MDV5VUp0TmtCaUlHUTNPRlVCRndVcWNfUEstU1o1WnQ5SXN1N3ZnR09nU3NxR1ZPM0podWtWU0llcllOSFVRX1p6UWRUbVdYNnJLZE1GdTc3SDZTdW04?oc=5",
    priority: "高",
    publishedAt: "2026-07-23",
    collectedAt: "2026-08-01",
    score: 95,
  },
{
    id: 14934181,
    region: "台灣",
    topic: "法規標示",
    title: "行政院通過《食安法》修法草案，提高業者自主檢驗頻率及通報延遲罰鍰",
    summary: "行政院於2026年7月23日通過《食品安全衛生管理法》修法草案，旨在強化食品業者自主管理責任。此次修法重點包含提高業者自主檢驗的頻率，以確保產品品質與安全。同時，針對業者若未依規定或延遲通報食品安全事件，其罰鍰將大幅提高至最高新台幣三千萬元，以遏止不法行為並加速資訊透明。此舉展現政府對食品安全的重視，並要求業者更主動積極地落實食品安全管理，對於所有食品產業鏈上的業者都將產生深遠影響，尤其強調了事前預防與即時應變的重要性。",
    impact: "新法規將要求齋之味加強自主檢驗頻率，可能增加品管與營運成本。必須確保現有與未來產品皆符合更高標準的食安規範，並建立快速應變的通報機制，避免高額罰鍰。此為提升品牌信譽與消費者信任的機會，應將此視為強化內部管理與供應鏈品保的契機。",
    action: "立即檢視並調整內部自主檢驗計畫，確保符合新法規要求；建立高效食安事件通報SOP，並培訓相關人員；評估供應鏈夥伴的食安能力。",
    owner: "品保法規",
    source: "農傳媒",
    url: "https://news.google.com/rss/articles/CBMiVkFVX3lxTE8tMU5HRzJzTDU1d0FIeTJvTHBvSUxBNWpBcjJ6cjFEVFRxVW5zSkZiSmUwY01LaFRLeWMzZE83SmpoSzRyQkJNVFRLN1hXZFFsT3VfQWR3?oc=5",
    priority: "高",
    publishedAt: "2026-07-23",
    collectedAt: "2026-08-01",
    score: 95,
  },
{
    id: 75562629,
    region: "台灣",
    topic: "法規標示",
    title: "嘉義市黃敏惠市長出席「反毒油線上國是會議」研商食安聯防機制，強調食品安全為基本人權",
    summary: "嘉義市黃敏惠市長於2026年7月28日出席「反毒油線上國是會議」，與各界研商建立食品安全聯防機制。會議強調食品安全是市民的基本人權，並討論如何透過跨領域合作，強化食品溯源管理、邊境查驗及市場稽查等措施，以有效防堵不肖業者摻偽劣質油品或其他非法添加物進入食品供應鏈，確保市售食品的品質與安全。此舉顯示政府對食安議題的高度重視，以及未來可能加強的食品安全監管力度與協防措施，旨在從源頭到餐桌全面守護民眾的飲食健康。",
    impact: "此次政府加強食品安全監管的會議，對齋之味而言是提升品牌信譽的機會，也帶來更高的合規壓力。品牌須確保所有原料來源透明、供應鏈可追溯，並嚴格把關產品品質，尤其在植物基產品的原料多樣性下，更需謹慎防範任何摻偽或劣質成分。這有助於強化消費者對齋之味產品的信任，並應準備迎接未來可能更嚴格的法規標準。",
    action: "檢視現有產品原料供應鏈，確保所有供應商符合最新食安規範並建立完整溯源機制。加強內部品管流程，確保產品品質及標示的準確性與合規性，以因應未來更趨嚴謹的食安聯防措施。",
    owner: "品保法規",
    source: "嘉義市政府衛生局",
    url: "https://news.google.com/rss/articles/CBMifEFVX3lxTFBZT2hoUml0SVQ2WGlzVTR1V3haczNHa0w3WVdCOERfMWdqeWJ0N0NLTEo0b2JmWE1HMzVYbnFKNXI3Q3laQTh6V3FKd3VXaVdlWDhaRkhOd1RaNml1QlhqdDNpUGZyMnY4LUpPUFB1V3phUmFBXzI2UDc1LXU?oc=5",
    priority: "高",
    publishedAt: "2026-07-28",
    collectedAt: "2026-08-01",
    score: 95,
  },
{
    id: 30589980,
    region: "台灣",
    topic: "法規標示",
    title: "詹長權觀點：台灣《食品安全衛生管理法》修法方向分析",
    summary: "此新聞為詹長權教授就台灣《食品安全衛生管理法》未來修訂方向提出的觀點分析。文章探討現行法規的不足之處，並提出具體修法建議，旨在強化食品安全管理體系、提升消費者信心，以及因應新興食品科技與產業趨勢帶來的挑戰。這對於食品製造商如齋之味，在產品研發、生產流程與標示規範上，都將產生深遠影響。",
    impact: "《食品安全衛生管理法》的任何修訂，將直接影響齋之味從原料採購、生產製程到產品標示的各個環節。品牌需密切關注法規變動，確保所有產品符合最新的安全與衛生標準，尤其在植物基新興食材的應用上，更需預先評估潛在影響並及早因應，以維護品牌信譽與消費者信任。",
    action: "成立跨部門小組，持續追蹤《食品安全衛生管理法》修法進度與內容，評估對現有產品及新產品開發的潛在影響，並規劃相應的調整方案。",
    owner: "品保法規",
    source: "信傳媒",
    url: "https://news.google.com/rss/articles/CBMiWkFVX3lxTE8zZ1VLQkc3UWdnQ2V3ZGNnNkhVZDdaYnpLNXVnd1JtaTVzU1dGbjJpZFdRZzMzQUxORmxDTS1wV1Nwd1VnaHVOMDJqSHZtVU43c2dRYjNIaWFKZw?oc=5",
    priority: "高",
    publishedAt: "2026-07-21",
    collectedAt: "2026-08-01",
    score: 95,
  },
{
    id: 65358122,
    region: "台灣",
    topic: "競品",
    title: "素食風潮降溫？Beyond Meat等植物肉巨頭股價重挫與消費趨勢轉變分析",
    summary: "近期全球植物基市場面臨挑戰，曾獲比爾蓋茲投資的植物肉巨頭 Beyond Meat 股價顯著崩跌，顯示西方過度包裝的植物肉熱潮正面臨退燒。相關數據更指出肉食搜尋量逆勢成長87%，反映消費者對高加工、高單價的植物肉疑慮增加，轉而回歸原型食物。產業需重新審視產品口感、價格與天然健康價值。",
    impact: "西方加工植物肉退燒，對主打在地美味與原型蔬食的齋之味是升級契機。消費者轉向追求天然健康與高CP值，齋之味應強化「少添加、原型滋味」的品牌差異化，切中市場新需求。",
    action: "評估現行產品線之加工度與訴求，調整行銷溝通重點至天然健康，並研擬清潔標示新品。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiZ0FVX3lxTE1uTENJZ2ZPREh0dHVaTlpTb2xQWFZWZURiMkpQS3lsS1FZTkN5NFYxeUFBTFowaEdsZ0xEd3labEdISXVpcDVZUU4yWEF6OHBoQndJa1pxeGRicFY2N3BQTEdBdWRSMVk?oc=5",
    priority: "高",
    publishedAt: "2025-02-27",
    collectedAt: "2026-08-01",
    score: 92,
  },
{
    id: 48975630,
    region: "歐洲",
    topic: "法規標示",
    title: "不能再叫素漢堡？歐洲議會投票禁止植物基食品使用肉類名稱 - BBC",
    summary: "歐洲議會投票通過限制法規，禁止植物基食品使用「素漢堡」、「素香腸」等傳統肉類相關名稱。肉品產業主張舊有命名會混淆消費者，但植物基業者與環保團體認為既有標示已足夠清晰，新規將增加企業合規成本並影響綠色轉型。此項裁決將強制所有於歐洲販售的植物基品牌重新調整產品命名與包裝標示策略。",
    impact: "此法規若正式實施，將直接影響齋之味外銷歐洲產品的包裝與行銷名稱。產品需避免使用肉類相關字眼，增加標示審查與換包裝成本，但也促使品牌思考建立更具辨識度且符合當地法規的新命名體系。",
    action: "盤點銷歐產品線之品名與包裝標示，並評估替換肉類意象詞彙之新命名方案與法規合規性。",
    owner: "品保法規",
    source: "BBC",
    url: "https://news.google.com/rss/articles/CBMiWkFVX3lxTE5JeDhDVVlHSVNFcWptaDlBVmM3Y09sNk9yS1MwdHdwOTcwQk9Ha0N1VmVwQ0Mtbjk3OW5qdnhlTjRDSUUweDNFQ2tEbUlnRV9aQ1k4eE1vMS1oUQ?oc=5",
    priority: "高",
    publishedAt: "2025-10-08",
    collectedAt: "2026-08-01",
    score: 92,
  },
{
    id: 4007718,
    region: "台灣",
    topic: "競品",
    title: "大成集團推出兩大蔬食餐飲品牌，以平價美味植物肉翻轉蔬食印象",
    summary: "台灣肉品巨頭大成集團宣佈推出兩大全新蔬食餐飲品牌，主打平價且美味的植物肉料理，旨在刷新大眾對傳統蔬食的印象。大成結合自身供應鏈優勢與研發技術，透過餐飲門市直接接觸消費者，積極拓展廣大的彈性素食族群。此舉標誌著傳統肉品大廠加速進入植物基餐飲市場，市場競爭將進一步升溫。",
    impact: "大成進軍平價蔬食餐飲將提升植物肉普及率，同時對齋之味帶來價格與風味上的競爭壓力。齋之味需深耕產品風味差異化與品質優勢，確保品牌忠誠度。",
    action: "評估大成蔬食品牌之產品與價格結構，並調研自家產品在餐飲通路的競爭力與風味優化空間。",
    owner: "品牌行銷",
    source: "遠見雜誌",
    url: "https://news.google.com/rss/articles/CBMiTkFVX3lxTE9Yc0dHZkZJTE5oUk1MSC1BVk41YWN2N3U4Z1ZJQkctbHJndE5SX1BYcDBXblVXVHlFN0huRWtzdUxMYWtuSTVrNG5weFdCUQ?oc=5",
    priority: "高",
    publishedAt: "2025-05-02",
    collectedAt: "2026-08-01",
    score: 92,
  },
{
    id: 26502772,
    region: "台灣",
    topic: "消費趨勢",
    title: "當蔬食遇見策展思維：顛覆想像的飲食革命",
    summary: "這篇來自食力foodNEXT的報導指出，台灣蔬食產業正朝向結合「策展思維」的新方向發展，旨在打破大眾對蔬食的既有想像。此趨勢強調透過更具創意、主題性與沉浸式的體驗來呈現植物基食品，不僅關乎食材本身，更著重於餐飲氛圍、故事性與文化意涵的傳遞。這種新型態的經營模式，旨在提升蔬食餐飲的品味與時尚感，吸引更廣泛的消費者族群，將蔬食從傳統印象中解放，成為一種引領潮流的生活風格。",
    impact: "此策展思維趨勢對齋之味而言，意味著品牌需重新審視產品的呈現方式與顧客體驗設計。僅提供美味蔬食已不足夠，更應思考如何透過品牌故事、空間營造或聯名活動，為消費者帶來獨特且具記憶點的飲食旅程，以提升品牌價值並擴大市場影響力。",
    action: "評估品牌推廣策略，導入策展概念，例如與藝文空間合作舉辦快閃活動，或設計具主題性的產品套裝，以創新方式吸引年輕客群。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiakFVX3lxTE03Z2l1ejJkcTAtUW4wWWpPTl93S1ZaMkVRZE9XckVWRTY3OFBVRzB5RE9jNXFnd1prTUhGdzZGNmdfNVZPWmtRdzRhSUJJZVkxMGtCVVFwOUhWZDY2RWxuRDVHTVdVZU9uNkE?oc=5",
    priority: "高",
    publishedAt: "2026-07-17",
    collectedAt: "2026-08-01",
    score: 92,
  },
{
    id: 4248989,
    region: "台灣",
    topic: "消費趨勢",
    title: "95%顧客非素食者：英國首家米其林星級植物性餐廳的成功秘訣",
    summary: "英國首家榮獲米其林星級的植物性餐廳成功吸引高達95%非素食客群。此新聞探討該餐廳如何透過提供卓越的風味、精緻的用餐體驗以及打破素食餐飲刻板印象來達成。其核心策略在於不強調「素食」標籤，而是專注於食材的創新應用與烹飪技藝，將植物基飲食提升至美食層次，證明植物性料理能超越特定客群，獲得廣泛市場認同，顯示全球飲食文化正朝向更彈性、多元的植物性消費趨勢發展。",
    impact: "此趨勢對齋之味品牌啟示深遠。需重新思考目標客群，擴大至彈性素食者與葷食者。產品研發應更著重風味創新、口感提升及多元應用，而非僅強調「素食」。行銷上可借鑒其策略，降低「素食」標籤，改以「美味」、「健康」或「永續」為訴求，吸引更廣泛消費者。",
    action: "評估現有產品線在風味、口感上的普適性，並研發針對葷食者的植物基創新菜色與食材。規劃「無肉料理」或「彈性食」的行銷專案。",
    owner: "產品研發",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiaEFVX3lxTE9fWEtnNERnYWtYVXFCVHc3N3VrTkoxdUN2eVJTTldEaDdLS1oySWU3aURMemFyNF9VTFkwZjQxc1FPUHJGcnpjWUwyTUh5X0stUkVuZzM4UEs2dWNKcXROdTVsYTdkQVFV?oc=5",
    priority: "高",
    publishedAt: "2025-12-18",
    collectedAt: "2026-08-01",
    score: 92,
  },
{
    id: 47148721,
    region: "美國",
    topic: "消費趨勢",
    title: "植物基食品市場規模、市佔率 | 產業報告 [2034] - Fortune Business Insights",
    summary: "根據Fortune Business Insights於2026年發布的報告，美國植物基食品市場預計將在2034年前呈現顯著成長。這份產業報告深入分析了市場規模、市佔率及未來趨勢，揭示了消費者對健康、永續發展和道德飲食日益增長的關注，正推動植物基食品產業的擴張。報告內容涵蓋了不同植物基產品類別的表現，如植物奶、植物肉、植物基海鮮等，並探討了關鍵市場驅動因素、挑戰以及新興機會。這項研究提供行業參與者對未來十年市場走向的寶貴洞察。",
    impact: "此市場報告揭示了植物基食品的強勁成長潛力，對齋之味而言是擴大市場份額的絕佳機會。齋之味應密切關注市場的細分品類成長，特別是在植物肉、植物奶等高成長領域，並洞察消費者偏好變化，以精準調整產品組合與品牌定位。這也意味著競爭加劇，需要更突出的創新和行銷策略。",
    action: "評估現有植物基產品線，針對高成長品類如植物肉、植物奶進行新產品研發。加強市場趨勢分析，調整品牌行銷策略，以符合未來消費需求。考慮擴展通路或深化現有通路合作。",
    owner: "品牌行銷",
    source: "Fortune Business Insights",
    url: "https://news.google.com/rss/articles/CBMiekFVX3lxTE9SaFFqWlI2aW1RQUFfS3NtRUVRWlhmSDB6VldjQVhWNTd6WjJfVXp0aEUyTmR3NGJ1NDZtNVZ4Q291T1lybm9wVXhQbHE2ZHVsUHRpSkl6UGhwQW9mVEsxZWUtZ1E2RF9rOVFZTUdwZndqUFQ4eXB2ak5R?oc=5",
    priority: "高",
    publishedAt: "2026-07-06",
    collectedAt: "2026-08-01",
    score: 92,
  },
{
    id: 99167306,
    region: "美國",
    topic: "新品",
    title: "普渡大學主辦植物基食品產品開發與行銷競賽",
    summary: "普渡大學的農業學院預計於2025年10月2日在美國舉辦一場植物基食品產品開發與行銷競賽。這項活動旨在鼓勵學生及業界專業人士投入植物基食品領域的創新研發，提升從產品概念發想、原型製作到市場策略規劃的整體能力。競賽匯聚了食品科學、營養學及行銷等跨領域人才，共同推動植物基食品產業的進步，以滿足市場對多元、永續食品方案日益增長的需求，預計將催生具潛力的新產品與行銷策略。",
    impact: "此競賽凸顯全球植物基食品對創新產品與行銷策略的重視。對於齋之味而言，這是一個重要啟示，鼓勵我們持續投入新產品研發，探索新型植物性原料與製程。同時，應借鏡國際行銷案例，思考如何更精準地溝通品牌價值與產品特色，以吸引廣泛客群，提升品牌競爭力。",
    action: "評估全球植物基食品新興趨勢，探索創新原料應用與產品原型開發，並檢視現有產品線的市場溝通策略。",
    owner: "產品研發",
    source: "Purdue University - College of Agriculture",
    url: "https://news.google.com/rss/articles/CBMitwFBVV95cUxQNTNNS3VCaFNiOW9ndFItb212RmN5Z2RnUkxKRGhTUGczZXdMVkx4SGx6VnFFbXpIQkZqSlhRc2dZV2hnQmc5UEl4bG92QTBEZnVjZC1fa3k1aFo3elFpRXVhNkk3T1ZzZ3BPdFAxd1pNQTIwQm9JUXNySEo0cVRkWFU5c3lTYlFHXzZJZXhPamoyNld5Y04zS1RMckhSMGt5NW9qSWJpWHRnYXNleEhYeFhzR2swRjg?oc=5",
    priority: "高",
    publishedAt: "2025-10-02",
    collectedAt: "2026-08-01",
    score: 92,
  },
{
    id: 70156975,
    region: "美國",
    topic: "消費趨勢",
    title: "美國 60% 家庭購買植物基產品 – 各地區表現分析",
    summary: "美國最新報告指出，高達 60% 的美國家庭已購買過植物基產品，顯示市場已廣泛接受。新聞分析美國各區域的消費表現差異，揭示不同地區的消費者偏好與滲透率，證明植物基食品已從利基市場走向主流。這為品牌制定精準在地化策略提供重要參考，凸顯市場巨大潛力。",
    impact: "美國市場的高滲透率對齋之味是正面啟示，表明植物基食品國際市場潛力巨大。齋之味應評估美國各區域偏好，思考產品在地化策略與國際拓展機會。",
    action: "研究美國各區域植物基產品消費偏好差異，評估產品國際化潛力與市場進入策略。",
    owner: "國際業務",
    source: "Green Queen Media",
    url: "https://news.google.com/rss/articles/CBMiqAFBVV95cUxOcUdZM19XWGdndGZ0LU9wb0h0QWxFU1dDbHlXOXoyWWpqcDlCYWctQ3pmY1RyTG1WWGE5RG55MnBUWksxLXRqTWY3dmN0bGhnRjFxU2VQYTIxdXE4NS1DX1pxSjBiYUNLc0FZTm9WVjh5dGRSakM5SUQ0dXpTNkdOdGd0SDBDVHJlQ2g2Z2NKQWtUd25mbjlReE82QzYzQlJlTHlvRjE3Y2E?oc=5",
    priority: "高",
    publishedAt: "2026-06-04",
    collectedAt: "2026-08-01",
    score: 92,
  },
{
    id: 49927134,
    region: "美國",
    topic: "原料技術",
    title: "解碼：克服植物基產品開發的挑戰 - RTI International",
    summary: "這篇來自RTI International的報導（發布於2025年11月21日）探討植物基食品產業在產品開發中面臨的關鍵挑戰。內容可能聚焦於如何解決植物基產品在風味、質地、營養成分、成本效益及規模化生產等方面的難題。報告預期將提出創新的原料應用、加工技術或配方策略，旨在提升產品的消費者接受度與市場競爭力，強調科學研發在推動植物基市場成長中的核心作用。這類資訊對於產業參與者，特別是新產品開發部門，具有重要的參考價值。",
    impact: "此資訊顯示植物基產業持續聚焦於技術突破。對齋之味而言，這意味著需密切關注原料與技術發展，以滿足消費者對更佳風味、質地及營養價值的期待。若能成功應用新技術，將有助於強化齋之味的產品競爭力與市場領先地位，否則恐面臨創新不足的風險。",
    action: "評估當前產品線的風味、質地與營養挑戰，並研究新興植物基原料與加工技術，以提升產品競爭力。",
    owner: "產品研發",
    source: "RTI International",
    url: "https://news.google.com/rss/articles/CBMiggFBVV95cUxPNHdlYnBSd3FwcmNRanBpQjlFeGd0a3JNNFFqWXJkcG9yeC1GRml5akZJUjVXbjBHeXdJQ0wtc25Pdy1wSE50eHk2Q3phLWhzTTlTRGhxS0I2QlRxRENkdU5MQnNBd1Z5UHNTUjBDUzZaVWp1djBZMVBDWXF2M3ZORjVn?oc=5",
    priority: "高",
    publishedAt: "2025-11-21",
    collectedAt: "2026-08-01",
    score: 92,
  },
{
    id: 26806391,
    region: "歐洲",
    topic: "消費趨勢",
    title: "2025-2033年歐洲植物基肉品市場趨勢報告 | 健康意識、永續發展焦點與消費者偏好轉變推動市場擴張",
    summary: "一份由ResearchAndMarkets.com發布的報告指出，2025年至2033年間歐洲植物基肉品市場預計將持續擴張。此成長主要受到消費者健康意識提升、對永續發展的高度關注，以及飲食偏好轉向植物基產品等因素的推動。這份報告強調，這些宏觀趨勢將是未來幾年歐洲植物基肉品市場發展的關鍵驅動力，預示著植物基食品在歐洲市場的強勁增長潛力。",
    impact: "歐洲市場的健康與永續趨勢預示全球植物基食品產業的走向。齋之味應積極審視現有產品線在健康與永續面向的競爭力，並探索如何將這些消費者價值觀融入品牌故事與產品創新中，以鞏固並拓展市場份額。",
    action: "評估現有產品的健康與永續訴求，並規劃新產品研發方向，加強與健康、環保概念的連結。",
    owner: "產品研發",
    source: "vegconomist - the vegan business magazine",
    url: "https://news.google.com/rss/articles/CBMilwFBVV95cUxPdVVfaFVXNEEyWmdoY0x3bC12dXViZjA5R1JyWVFTV2hlaUZWZU1PVHZ6dnVXLVdRS2psVUp4dWowOEVYdVpldjktMVFSRkRrUFFOZkZsbTlHTm9rOTRyVEFPc25UeGlldEVvMnNJdHNra3NHajVkY3BSYVV5YzNENlY5TUh3UllvNUdGaWZydnd2RG5DN3pZ?oc=5",
    priority: "高",
    publishedAt: "2025-08-11",
    collectedAt: "2026-08-01",
    score: 92,
  },
{
    id: 48319183,
    region: "歐洲",
    topic: "消費趨勢",
    title: "歐洲植物基市場規模達163億歐元",
    summary: "根據Food Manufacture於2026年4月9日的報導，歐洲植物基食品市場已達到163億歐元的規模。此數據突顯了歐洲消費者對植物基產品日益增長的需求和市場的強勁擴張。這不僅反映了健康意識、環境永續性及動物福利等因素對消費選擇的影響，也預示著植物基產業在歐洲將持續成為主流食品趨勢。此趨勢將促使食品製造商加大在創新研發和產品多元化方面的投入，以滿足不斷變化的市場需求，並鞏固植物基食品在歐洲食品供應鏈中的地位。",
    impact: "歐洲植物基市場規模的顯著成長，對齋之味而言是強烈的市場肯定。這表示全球植物基食品需求旺盛，齋之味應借鑒歐洲市場的創新趨勢與成功案例，思考產品在地化與國際化的可能性。同時，這也鼓勵齋之味在研發上投入更多資源，開發符合新世代消費者口味與健康訴求的多元產品線，以鞏固品牌競爭力。",
    action: "評估歐洲植物基市場的產品種類與消費偏好，審視齋之味現有產品線的國際競爭力，並規劃潛在的歐盟市場拓展策略或汲取其研發靈感。",
    owner: "國際業務",
    source: "Food Manufacture",
    url: "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPQ0k0OTRaX21xcHMzNE1RZnJwUmxYLVJzRlpsQ0w2a2NoX0RQeVZQemx1dzh5SGppWlB2RnJFRDAycmFjaHFoYmgwQmk3N0R0emR6NnFjaTZMNW1XRFpVMVZ4YzdNZnRXaDJTcEExMTNZQjVYNzBiTENSaTdWamlFalRWTWEzUUZxVXZCa0J1c2c5cnVNSjBOdjUyTnVvVHhlUVNuczk0RmlNcDVmV2IwWWJzdE1QLWE3?oc=5",
    priority: "高",
    publishedAt: "2026-04-09",
    collectedAt: "2026-08-01",
    score: 92,
  },
{
    id: 32536850,
    region: "歐洲",
    topic: "法規標示",
    title: "歐盟擬立法禁止素食產品使用肉類名稱引發業界沮喪",
    summary: "歐盟正考慮一項法案，旨在禁止植物基食品使用肉類產品名稱，例如「素食漢堡」或「素食香腸」。此舉在植物基食品產業中引起廣泛沮喪與擔憂，業者認為這將阻礙市場發展，並可能使消費者在辨識產品時面臨困惑。這項爭議凸顯了植物基食品命名標準以及與消費者溝通的複雜性，對於植物基產品的市場行銷策略構成新的挑戰。",
    impact: "此法案一旦通過，齋之味需重新評估其在歐洲市場或全球推廣產品時的命名策略，特別是針對目前使用肉類替代名稱的產品。這可能影響品牌識別、包裝設計及行銷溝通，需更著重發展獨特且具吸引力的植物基專屬名稱。",
    action: "盤點現有產品命名與包裝設計，評估在歐洲市場推廣時的合規性。研擬替代性植物基產品命名方案，並密切關注歐盟法規進展。",
    owner: "品保法規",
    source: "European Newsroom",
    url: "https://news.google.com/rss/articles/CBMikwFBVV95cUxPaVlibGpUbWdGVE8tSTRocWQtZTlUbGw1dklkY1M1cklYRnk5RGhPQnN3ZHNkdDZ0dUR3bThqSVpoQldVVG9tak9nQjNHU2c5dUI4ZmVtVDJNcDVVSWZVSlVORUFDQWpnTUpSVjM5cTBiM0MxX1BXLU5JUmhQaFZsRmtXcG1YYXp3cGExQUZZOGFjY0U?oc=5",
    priority: "高",
    publishedAt: "2025-10-07",
    collectedAt: "2026-08-01",
    score: 92,
  },
{
    id: 5923352,
    region: "澳洲",
    topic: "消費趨勢",
    title: "我們是否已對肉類和乳製品替代品失去胃口？",
    summary: "澳洲一份報導指出，消費者對肉類和乳製品替代品的興趣可能正在減退。該文探討植物基食品市場是否已失去初期成長動能，消費者對於這類產品的「胃口」是否大不如前。可能原因包含產品風味與口感未能滿足期待、價格競爭力不足、對高度加工食品的疑慮，或是消費者從嚴格素食轉向彈性素食的趨勢。此趨勢值得密切關注，因其可能預示植物基產業未來發展的挑戰與轉變方向。",
    impact: "此趨勢對齋之味而言，意味著需重新審視澳洲市場的產品策略。若消費者興趣減退，齋之味可能需要加強產品的風味與質地創新，提升性價比，並調整行銷訊息以強調植物基食品的美味與健康益處，而非僅僅替代肉品，以維持市場競爭力。",
    action: "深入市場調研以理解澳洲消費者對植物基食品興趣減退的原因，並評估現有產品線與新產品開發方向，加強產品體驗。",
    owner: "品牌行銷",
    source: "The Conversation",
    url: "https://news.google.com/rss/articles/CBMilwFBVV95cUxPR0t4V2VaNEhCTDdUbGV3dWY4N01VZG1PUDhIMFhkaFQ4Z0ZuQS1YYW9tRWgzckttODFWc2M1djF2NFU5cGpOalNuZm10WXpTcVM1MERaeVR3R1dOSS1pWUN3VmNRUGVnaHdVUThVREpwcDc3TmhsZklHTVJqdDB5Zm5jMU8wU3Zma0U3YUxnbjkwV0V1STJZ?oc=5",
    priority: "高",
    publishedAt: "2026-06-16",
    collectedAt: "2026-08-01",
    score: 92,
  },
{
    id: 47222874,
    region: "澳洲",
    topic: "消費趨勢",
    title: "澳洲燒烤市場爭奪戰：植物肉在澳洲發展受阻的關鍵因素",
    summary: "澳洲麥考瑞大學發布新聞指出，植物肉在澳洲市場的普及面臨顯著挑戰，尤其在當地獨特的燒烤文化中未能有效滲透。此分析將探討阻礙植物肉廣泛被接受的核心因素，可能涵蓋消費者對風味口感的疑慮、產品價格定位、文化習慣的抗拒以及市場推廣策略的不足，揭示植物基食品欲在澳洲市場取得成功需克服的深層障礙。",
    impact: "此新聞提醒齋之味，欲拓展澳洲或類似飲食文化市場，需深入了解當地消費者對植物肉的認知與接受度。產品研發上，應考慮推出更符合在地烹飪習慣及口感期待的品項；行銷策略則需專注於突破文化藩籬，強調植物肉的獨特價值。",
    action: "立即啟動澳洲市場消費者行為與偏好研究，評估開發符合燒烤情境的植物肉產品線，並制定在地化品牌行銷策略。",
    owner: "品牌行銷",
    source: "Macquarie University",
    url: "https://news.google.com/rss/articles/CBMiwwFBVV95cUxNMkJ6WkJBc0NJSHhqUXM5bzFjZGpjSm40V1dKXy1HV1NNSkthM2dfTVhTQ19Pejd4RnFoUEttM1A0cTVRNVhYeTNhRlpVMlNwZHF1MzZRajh3OU93RnN4SGJMTENLckRKQ2pKc3o1X2JKYm5mdHFVOXkzZ2ZEVTF4VVk3aWphOTRGNzQ3ZlR1QV92cDVSclFSdlZ3eUxRYXVySng3TkZlYmRCNVQ4ekFSS1BoSU90dGxVQTdkclpNbEhiV3c?oc=5",
    priority: "高",
    publishedAt: "2025-12-08",
    collectedAt: "2026-08-01",
    score: 92,
  },
{
    id: 57731230,
    region: "澳洲",
    topic: "消費趨勢",
    title: "澳洲植物基乳製品趨於成熟，健康導向更鮮明，創新加劇 - Inside FMCG",
    summary: "澳洲植物基乳製品市場正步入成熟階段，主要驅動力來自消費者對健康的意識日益提高，以及業界持續不斷的產品創新。製造商正積極開發不僅在口感和質地上能媲美傳統乳製品，更具備優越營養價值的產品，例如減少糖分、增加蛋白質及強化維生素等。這股趨勢反映出市場已從初期的新奇感轉向更精緻化，產品品質、健康屬性及多元選項成為關鍵差異化因素。品牌正投入研發以滿足這些不斷演變的需求，確保植物基產業的永續增長。",
    impact: "此趨勢顯示消費者對植物基產品的健康訴求日益增強，對「齋之味」而言，需重新審視其植物基產品線的健康價值主張。這可能影響產品配方調整、營養標示強調及新產品開發方向，以符合市場對低糖、高蛋白、機能性成分的需求，提升品牌競爭力。",
    action: "產品研發部門應盤點現有植物基乳製品替代品的營養成分，並啟動開發健康訴求更明確、具創新成分的產品線，例如低糖高蛋白燕麥奶或堅果奶。",
    owner: "產品研發",
    source: "Inside FMCG",
    url: "https://news.google.com/rss/articles/CBMisgFBVV95cUxNNURseVJfUDc0alBMYmVPQTdoRzR3NjZqZUk0RFlnZDZjVVJZWUF3V0VRM1ZqOEE5dGlNSEpRTU42S0VsYWk3bUpOQlV2eWMyb3F5MDF3SjBfTW9SRm5CY0djRVVNWnZ4MkxqTG55WWhDaHBBdWFsdlRZaUVHWnJQcEh1MjdXbTl3eFlQUGFFYVRyWUhORThUU1F4UHUwaWpXYlYwYkw3WEJ0SktfSEVWQUlR?oc=5",
    priority: "高",
    publishedAt: "2025-11-04",
    collectedAt: "2026-08-01",
    score: 92,
  }
];

const regions: Region[] = ["全部市場", "台灣", "美國", "澳洲", "歐洲"];
const topics: Topic[] = ["全部主題", "新品", "通路價格", "競品", "消費趨勢", "原料技術", "法規標示"];
const sourceFilters: SourceFilter[] = ["全部來源", "食力 foodNEXT", "上下游新聞"];
const eighteenMonthsAgo = new Date();
eighteenMonthsAgo.setMonth(eighteenMonthsAgo.getMonth() - 18);
const freshIntelligence = intelligence.filter((item) => {
  const publishedAt = new Date(`${item.publishedAt}T00:00:00+08:00`);
  return !Number.isNaN(publishedAt.getTime()) && publishedAt >= eighteenMonthsAgo;
});
const highPriorityCount = freshIntelligence.filter((item) => item.priority === "高").length;
const formatDate = (date: string) => date.replaceAll("-", "/");

// ── Topic Trend (past 30 days) ──────────────────────────────
const trendCutoff = new Date();
trendCutoff.setDate(trendCutoff.getDate() - 30);
const topicColorMap: Record<string, string> = {
  "新品": "#7C9270",
  "通路價格": "#C89B3C",
  "競品": "#9C3B2B",
  "消費趨勢": "#16301F",
  "原料技術": "#48594A",
  "法規標示": "#3B4C63",
};
const topicTrend = (["競品", "消費趨勢", "新品", "通路價格", "原料技術", "法規標示"] as Exclude<Topic, "全部主題">[]).map(t => ({
  topic: t,
  count: freshIntelligence.filter(i => {
    const d = new Date(`${i.publishedAt}T00:00:00+08:00`);
    return i.topic === t && d >= trendCutoff;
  }).length,
  color: topicColorMap[t],
})).sort((a, b) => b.count - a.count);
const maxTopicCount = Math.max(...topicTrend.map(t => t.count), 1);



const industryWatch = [
  { brand: "弘陽生技", status: "有更新", date: "2026-07-28", update: "偵測到近 7 天內有新訊，請點擊連結確認最新動態。", url: "https://news.google.com/rss/articles/CBMiX0FVX3lxTFBLUzk5bHJqcEFxWnFHTDItRzlzZlE1SVRhanFNUkxYNkpNU3ZMU29vbjcta05JTkZtN1J2d1Z4VWRVYTBJMHJrSXAzeVM3V1hxUXhwVGJSYXhPbkxaalZn0gFkQVVfeXFMUFpvRXhlSmJnTDNLWHRjT290aW9zdmJ1c0k5ZmdfZUNXaUVNaFA4blNRWTJPc2c0Wm9ObmNfdzNuLXl3TEhsb0ZWaGdlMDl5Y3pNMi1LZm9tOU9RV0tUMVlaMXA5Ug?oc=5" },
  { brand: "大成新食成", status: "有更新", date: "2026-07-28", update: "偵測到近 7 天內有新訊，請點擊連結確認最新動態。", url: "https://news.google.com/rss/articles/CBMiXkFVX3lxTE1ISmNnY25JY0dWblhaanJGX0NVZW5kSlR3SG8yTHI4VTl4OEZwSDJad0F6VmVSWTNqVWZ2TTdETVJfWHZELWl6ODBLNlpmemZ5WFJKUmdRbEtLV2h4cVE?oc=5" },
  { brand: "松珍", status: "有更新", date: "2026-07-28", update: "偵測到近 7 天內有新訊，請點擊連結確認最新動態。", url: "https://news.google.com/rss/articles/CBMiX0FVX3lxTFBUSTFyX2JYOXhubkV1dTR0Y1ZzNTdweG5BWkFTQmw4cWVDN2xzOW5EQjlMY040RHV5OWl0NzdYX3gtMlVLaTI0MGdQTlBCMzNlRVVfZnVyVFJFaVEyUmx3?oc=5" },
  { brand: "Beyond Meat", status: "有更新", date: "2026-07-28", update: "偵測到近 7 天內有新訊，請點擊連結確認最新動態。", url: "https://news.google.com/rss/articles/CBMiygFBVV95cUxPQnN6eFdNbVhlWGxSTFAzSV9GWDhKbzVKREdERkpaLVlVMGlMZ2JLdVo5NnFiVU5vakc1dk9Zdl9WUURnYkhpY1F4ZU42dl9jS0swUUpSZVN4TlBxOW9ndzJXZ0FoMDJERVRhYjdaY0IyZXBhRk90MXc3czllS0ZDNHpFWUVBclZNUG96YmNLT1BVeGNkVEZkVV9FZDljeEQwc25qS0xjaFNSTXVvd0ozbW4wYWlXT2RneEZKb0tBT3g0d0dXbVVhaklR?oc=5" }
];

type ReputationItem = {
  channel: string;
  status: string;
  detail: string;
  url?: string;
  rating?: number;
  reviewCount?: number;
  distribution?: string;
  checkedAt?: string;
  reviews?: { author: string; rating: number; age: string; text: string }[];
};

const reputationWatch: ReputationItem[] = [
  {
    channel: "Google 評論",
    status: "商家頁已確認",
    detail: "Google Maps 公開資料，依最新到最舊排序；星等與評論數每日更新。",
    url: "https://maps.app.goo.gl/fHTua1htFjDuATsK9",
    rating: 4.1,
    reviewCount: 20,
    distribution: "5★ 12・4★ 4・3★ 1・2★ 0・1★ 3",
    checkedAt: "2026/07/22 11:11",
    reviews: [
      { author: "黃晨凱", rating: 1, age: "8 個月前", text: "總機小姐態度差勁急著掛電話" },
      { author: "saen hardy", rating: 1, age: "10 個月前", text: "為什麼總機說話不能好好說呢？" },
      { author: "hardy", rating: 1, age: "10 個月前", text: "詢問一下而已，總機態度不知道在差幾點的～EQ 有這麼低嗎？" },
    ],
  },
  { channel: "Facebook", status: "每日監測", detail: "追蹤公開貼文、留言與互動中的產品、服務與配送回饋。", url: "https://www.facebook.com/p/%E9%BD%8B%E4%B9%8B%E5%91%B3-100064106764970/?locale=zh_TW" },
  { channel: "網路／電商", status: "每日監測", detail: "關注齋滋味、齋之味、CHASTE JE WAY、Vegan Select 的公開評價與提及。" },
];

const featureGuide = [
  { no: "01", title: "今日摘要", copy: "今天發生了什麼最重要的大事", result: "得到：今日最關鍵的 3 分鐘重點與對策", href: "#today" },
  { no: "02", title: "市場雷達", copy: "跨國市場有哪些新機會或潛在風險", result: "得到：台美歐澳四大市場的最新商機訊號", href: "#markets" },
  { no: "03", title: "全部情報", copy: "這則報導源自哪裡？是誰寫的", result: "得到：可隨時點擊查證的原始新聞連結", href: "#intelligence" },
];

const marketPulse = [
  {
    region: "台灣", signal: "穩定", note: "標示與通路動態", value: 72,
    headline: "成熟素食文化支撐基本盤，成長機會來自日常化與透明度。",
    drivers: ["素食分類細緻，純素與五辛需求具有在地特色", "食力與上下游持續放大低加工、國產原料與產地透明議題", "冷凍調理、氣炸料理和電商組合降低嘗試門檻"],
    opportunity: "把素海鮮、火腿片與肉醬包裝成早餐、便當、晚餐等明確使用場景，並主動揭露主要原料來源。",
    risk: "若只以『素料』溝通，容易停留在既有客群；健康感、鈉含量與加工印象也會影響新客回購。",
    watch: ["電商回購率", "非素食客占比", "主力 SKU 每餐成本", "國產原料比例"],
  },
  {
    region: "美國", signal: "承壓", note: "健康與價值重整", value: 48,
    headline: "植物肉零售降溫，市場正從擬真轉向蛋白質、潔淨標示與實際價值。",
    drivers: ["消費者重新檢視價格、鈉含量與成分表", "高蛋白與機能食品吸引力高於單一仿肉敘事", "食品服務通路的使用情境比零售貨架更具韌性"],
    opportunity: "優先測試差異化的亞洲炸物與餐飲用規格，英文品名清楚揭露大豆、菇類等主要植物來源。",
    risk: "高運費與植物肉溢價會壓縮競爭力；若營養或口感無明顯差異，難以取得穩定回購。",
    watch: ["每磅售價差", "蛋白質／鈉含量", "餐飲通路新品", "FDA 命名指引"],
  },
  {
    region: "澳洲", signal: "觀察", note: "口感、價格決勝", value: 61,
    headline: "市場仍有需求，但通路進入汰弱留強，能否持續上架取決於回購。",
    drivers: ["彈性減肉人口提供潛在客群", "大型超市對銷量、價格與貨架效率要求提高", "氣炸鍋與快速料理適合冷凍調理產品"],
    opportunity: "以純素香酥花枝圈切入差異化海鮮替代品，提供氣炸時間、每份成本與多人分享情境。",
    risk: "市場距離造成物流與冷鏈成本；Vegan 宣稱仍需完整供應商文件與交叉污染證明。",
    watch: ["Woolworths／Coles 上下架", "促銷頻率", "冷凍素海鮮品項", "FSANZ 標示更新"],
  },
  {
    region: "歐洲", signal: "分化", note: "德義成長、英國承壓", value: 68,
    headline: "不是單一市場：德國、義大利仍有成長訊號，英國則更受價格壓力影響。",
    drivers: ["平價自有品牌帶動部分國家的銷量", "各國飲食文化與零售結構造成明顯差異", "Novel Food、名稱與營養宣稱提高跨國上市複雜度"],
    opportunity: "先以德國或荷蘭作為產品驗證市場，主打亞洲口味、冷凍方便性與合理每公斤價格。",
    risk: "用同一包裝進入所有歐洲國家容易忽略語言、名稱、通路與消費差異。",
    watch: ["德國銷量", "自有品牌價格", "英國品項縮減", "EU Novel Food 更新"],
  }
];

const dailyBriefing = {
  title: "市場不缺新品，<br />真正稀缺的是<strong>回購理由。</strong>",
  subtitle: "跨市場訊號共同指向價格、健康感與使用情境。這三項因素正影響新品能否進入日常餐桌並形成回購。",
  decisionTitle: "價格、健康感與料理便利性共同決定回購",
  decisionDetail: "各市場的成長速度不同，但資訊都顯示：消費者不只在意是否純素，也會比較成分、每份成本及料理是否方便。"
};

export default function Home() {
  const [region, setRegion] = useState<Region>("全部市場");
  const [topic, setTopic] = useState<Topic>("全部主題");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("全部來源");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<number[]>([]);
  const [activeSection, setActiveSection] = useState<SectionId>("today");
  const [selectedMarket, setSelectedMarket] = useState("台灣");
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
    return freshIntelligence.filter((item) => {
      const matchesRegion = region === "全部市場" || item.region === region;
      const matchesTopic = topic === "全部主題" || item.topic === topic;
      const matchesSource = sourceFilter === "全部來源" || item.source === sourceFilter;
      const searchable = `${item.title}${item.summary}${item.impact}${item.action}${item.source}`.toLowerCase();
      return matchesRegion && matchesTopic && matchesSource && (!normalized || searchable.includes(normalized));
    }).sort((a, b) => b.score - a.score);
  }, [region, topic, sourceFilter, query]);

  const visible = filtered;
  const selectedPulse = marketPulse.find((market) => market.region === selectedMarket) ?? marketPulse[0];
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

  // Regional stamp code mappings
  const regionCodes: Record<string, string> = {
    "台灣": "TW",
    "美國": "US",
    "澳洲": "AU",
    "歐洲": "EU",
  };

  return (
    <main className="app-shell">
      <header className="main-header">
        <div className="header-container">
          <a className="brand" href="#top" aria-label="齋之味情報中樞首頁">
            <img src="favicon.jpg" alt="齋之味" className="brand-logo-img" />
            <span><strong>齋之味</strong><small>市場情報中樞</small></span>
          </a>
          <nav className="header-nav" aria-label="主要導覽">
            <a className={`nav-item ${activeSection === "today" ? "active" : ""}`} href="#today" onClick={(event) => navigateTo(event, "today")}>今日判讀</a>
            <a className={`nav-item ${activeSection === "markets" ? "active" : ""}`} href="#markets" onClick={(event) => navigateTo(event, "markets")}>市場雷達</a>
            <a className={`nav-item ${activeSection === "intelligence" ? "active" : ""}`} href="#intelligence" onClick={(event) => navigateTo(event, "intelligence")}>全部情報</a>
          </nav>
          <div className="header-actions">
            <label className="search">
              <span>⌕</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜尋品牌、產品或趨勢" aria-label="搜尋新聞情報" />
            </label>
            <button className="avatar" aria-label="使用者選單">CJ</button>
          </div>
        </div>
      </header>

      <section className="workspace" id="top">
        {/* Newspaper Masthead */}
        <div className="newspaper-masthead">
          <div className="brand-section">
            <img className="brand-mark-circle" src="favicon.jpg" alt="齋滋味 logo" />
            <div className="brand-text">
              <div className="brand-title">齋滋味 產業情報中樞</div>
              <div className="brand-sub">Vegan Select · Intelligence Desk</div>
            </div>
          </div>
          <div className="masthead-meta">
            <div className="date-line">
              <p className="eyebrow">2026年8月2日・星期日</p>
            </div>
            <div className="summary-line">今日彙整 {freshIntelligence.length} 則 · {highPriorityCount} 則核心關注</div>
          </div>
        </div>

        <div className="subline-bar">
          <div>台灣 / 美國 / 澳洲 / 歐洲市場 · 每日自動更新</div>
          <div>最後更新：<time dateTime="2026-08-02T04:06:33+08:00">2026/08/02 04:06</time></div>
        </div>

        <section className="briefing" id="today">
          <div className="briefing-copy">
            <p className="section-kicker">TODAY’S BRIEFING</p>
            <h2 dangerouslySetInnerHTML={{ __html: dailyBriefing.title }} />
            <p>{dailyBriefing.subtitle}</p>
          </div>
          <div className="decision-card">
            <div className="decision-head"><span>今日核心判讀</span><b>跨市場共通訊號</b></div>
            <h3>{dailyBriefing.decisionTitle}</h3>
            <p>{dailyBriefing.decisionDetail}</p>
            <div className="decision-meta"><span>影響市場：台灣・美國・澳洲・歐洲</span><span>判讀依據：今日 {freshIntelligence.length} 則有效情報</span></div>
          </div>
        </section>

        <section className="feature-guide" aria-labelledby="guide-title">
          <div className="guide-intro"><p className="section-kicker">HOW TO USE</p><h2 id="guide-title">三步看懂市場<br />快速精準決策</h2><p>先看今日焦點 再讀市場風向 需要時回溯原始來源</p></div>
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
            <p>點選市場展開判讀・掌握各區域最新趨勢</p>
          </div>



          <div className="pulse-grid">
            {marketPulse.map((market) => (
              <button key={market.region} className={`pulse-card ${selectedMarket === market.region ? "selected" : ""}`} aria-pressed={selectedMarket === market.region} onClick={() => { setSelectedMarket(market.region); changeRegion(market.region as Region); }}>
                <div className="pulse-card-header">
                  <span className="region-name">{market.region}</span>
                  <span className={`signal signal-${market.signal}`}>{market.signal}</span>
                </div>
                <strong className="pulse-note">{market.note}</strong>
              </button>
            ))}
          </div>
          <div className="market-deep-dive" aria-live="polite">
            <div className="deep-dive-head">
              <div><p className="section-kicker">{selectedPulse.region.toUpperCase()} DEEP DIVE</p><h3>{selectedPulse.region}市場判讀</h3></div>
              <p>{selectedPulse.headline}</p>
            </div>
            <div className="deep-dive-grid">
              <section className="drivers"><span>市場為何這樣走</span><ul>{selectedPulse.drivers.map((driver) => <li key={driver}>{driver}</li>)}</ul></section>
              <section className="opportunity"><span>齋之味的機會</span><p>{selectedPulse.opportunity}</p></section>
              <section className="risk"><span>主要風險</span><p>{selectedPulse.risk}</p></section>
            </div>
            <div className="watch-list"><span>持續觀察指標</span>{selectedPulse.watch.map((item) => <b key={item}>{item}</b>)}</div>
            <small className="method-note">機會指數是依目前情報的相對判讀，用於比較優先度，不代表市場成長率或市場規模。</small>
          </div>
        </section>

        <section className="monitoring-section" aria-labelledby="industry-watch-title">
          <div className="monitoring-title">
            <div><p className="section-kicker">TAIWAN INDUSTRY WATCH</p><h2 id="industry-watch-title">台灣重點業者動向</h2></div>
            <span>重點觀察名單・非市場排名</span>
          </div>
          <div className="industry-grid">
            {industryWatch.map((item) => (
              <article className="watch-card" key={item.brand}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"8px",flexWrap:"wrap"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                    <h3 style={{margin:0}}>{item.brand}</h3>
                    <b className={(item as any).status === "有更新" ? "updated" : "watching"}>{(item as any).status}</b>
                  </div>
                  {(item as any).isMajor && <span className="major-badge">🔴 重大異動</span>}
                </div>
                <time>事件／檢查日期 {formatDate((item as any).date)}</time>
                <p>{(item as any).update}</p>
                {(item as any).url && <a href={(item as any).url} target="_blank" rel="noreferrer">查看來源 ↗</a>}
              </article>
            ))}
          </div>
        </section>

        {/* ── Topic Trend Chart ── */}
        <section className="trend-section" aria-labelledby="trend-title">
          <div className="trend-inner">
            <div className="trend-header">
              <div>
                <p className="section-kicker">INTELLIGENCE TRENDS</p>
                <h2 id="trend-title">近 30 天主題熱度</h2>
              </div>
              <span>依近 30 天收錄情報統計，反映市場近期討論重心</span>
            </div>
            <div className="trend-chart" role="img" aria-label="近 30 天各主題情報數量分布">
              {topicTrend.map(({ topic, count, color }) => (
                <div className={`trend-row${count === 0 ? " trend-zero" : ""}`} key={topic}>
                  <span className="trend-label">{topic}</span>
                  <div className="trend-bar-bg">
                    <div
                      className="trend-bar-fill"
                      style={{ width: `${Math.max((count / maxTopicCount) * 100, count > 0 ? 1 : 0)}%`, background: color }}
                    />
                  </div>
                  <span className="trend-count">{count} 則</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="intel-section" id="intelligence">
          <div className="section-title intel-heading">
            <div><p className="section-kicker">INTELLIGENCE FEED</p><h2>今日情報</h2></div>
            <span className="result-count">{filtered.length} 則符合條件</span>
          </div>

          <div className="filters" aria-label="情報篩選">
            <div className="freshness-policy"><span>資料規則：僅顯示近 1.5 年資料 ・ 日期不明不納入 ・ 每則標示發布與收錄日期</span></div>
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

          <div className="feed">
              {visible.length ? visible.map((item) => {
                const code = regionCodes[item.region] || "GL";
                return (
                  <article className="intel-card" key={item.id}>
                    <div className={`stamp region-${code}`}>
                      <span className="code">{code}</span>
                      <span className="sub">CLEARED</span>
                    </div>
                    <div className="card-body">
                      <div className="card-header-row">
                        <div className="card-tags">
                          <span className="tag-region">{item.region}</span>
                          <span className="tag-topic">{item.topic}</span>
                          <span className={`tag-priority priority-${item.priority}`}>
                            {item.priority === "高" ? "核心關注" : "持續觀察"}
                          </span>
                          {item.priority === "高" && (
                            <span className="tag-score">重要度：{item.score}/100</span>
                          )}
                        </div>
                        <time>發布 {formatDate(item.publishedAt)}</time>
                      </div>
                      <h3>
                        <a href={item.url} target="_blank" rel="noreferrer" className="title-link">
                          {item.title}
                        </a>
                      </h3>
                      <p className="summary">{item.summary}</p>
                      <div className="insight-block">
                        <div className="insight-col">
                          <strong>市場解讀</strong>
                          <p>{item.impact}</p>
                        </div>
                        <div className="insight-col">
                          <strong>應對方針 <small>({item.owner})</small></strong>
                          <p>{item.action}</p>
                        </div>
                      </div>
                      <div className="card-footer">
                        <span className="source-label">來源：{item.source}</span>
                        <button className={`save-btn ${saved.includes(item.id) ? "saved" : ""}`} onClick={() => toggleSaved(item.id)}>
                          {saved.includes(item.id) ? "★ 已收藏" : "☆ 收藏"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              }) : <div className="empty"><strong>找不到符合條件的情報</strong><p>試著清除搜尋文字或切換市場。</p></div>}
          </div>
        </section>

        <section className="reputation-section">
          <div className="reputation-panel">
            <div className="reputation-intro">
              <p className="section-kicker">REPUTATION WATCH</p>
              <h2>齋之味網路風評</h2>
              <p>每日 08:30 檢查公開評價與品牌提及；Google 評論最近查核：2026/08/02 04:06。</p>
            </div>
            <div className="reputation-grid">
              {reputationWatch.map((item) => (
                <article className={item.rating ? "google-review-card" : ""} key={item.channel}>
                  <div><h3>{item.channel}</h3><b>{item.status}</b></div>
                  {item.rating && item.reviewCount && (
                    <>
                      <div className="rating-summary">
                        <strong>{item.rating.toFixed(1)}</strong>
                        <div><span aria-label={`${item.rating} 顆星`}>★★★★☆</span><small>{item.reviewCount} 則評論</small></div>
                      </div>
                      <div className="rating-distribution">{item.distribution}</div>
                      <div className="review-excerpts">
                        <span>最新有文字評論</span>
                        {item.reviews?.map((review) => (
                          <blockquote key={`${review.author}-${review.age}`}>
                            <div><b>{review.rating}★</b><small>{review.author}・{review.age}</small></div>
                            <p>「{review.text}」</p>
                          </blockquote>
                        ))}
                      </div>
                    </>
                  )}
                  <p>{item.detail}</p>
                  {item.url && <a href={item.url} target="_blank" rel="noreferrer">Google Maps 原始頁 ↗</a>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <footer><span>齋之味市場情報中樞・第一版</span><span>資料用於內部研判，決策前請查核原始來源</span></footer>
      </section>
      
      {/* Mobile Bottom Navigation Bar */}
      <nav className="mobile-bottom-nav" aria-label="手機端導覽">
        <a className={`mobile-nav-item ${activeSection === "today" ? "active" : ""}`} href="#today" onClick={(event) => navigateTo(event, "today")}>
          <span className="icon">📰</span>
          <span>今日判讀</span>
        </a>
        <a className={`mobile-nav-item ${activeSection === "markets" ? "active" : ""}`} href="#markets" onClick={(event) => navigateTo(event, "markets")}>
          <span className="icon">🧭</span>
          <span>市場雷達</span>
        </a>
        <a className={`mobile-nav-item ${activeSection === "intelligence" ? "active" : ""}`} href="#intelligence" onClick={(event) => navigateTo(event, "intelligence")}>
          <span className="icon">📥</span>
          <span>全部情報</span>
        </a>
      </nav>
    </main>
  );
}
