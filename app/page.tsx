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
    id: 94829123,
    region: "台灣",
    topic: "法規標示",
    title: "食安法規重大修正 行政院提出十大法案修訂重點",
    summary: "行政院近期列出食品安全衛生管理法修正案的十項重點，涵蓋加重違規罰則、強化源頭追蹤管理、標示透明化以及業者自主檢驗等規定。政府將嚴格審查食品供應鏈與成分標示，特別針對素食與植物基產品的添加物與原料來源提出更明確規範，期盼藉此建立更完善的食安防護網並提升消費信任。",
    impact: "此修法提高食安罰則與標示要求，對齋之味而言，極需確保素食產品成分透明、無交叉污染並符合最新標示規範，雖增加合規成本，但有助提升品牌專業誠信度。",
    action: "盤點全系列產品成分與標示，全面檢視原物料供應商合規證明，確保符合新法規範。",
    owner: "品保法規",
    source: "工商時報",
    url: "https://news.google.com/rss/articles/CBMiX0FVX3lxTE9XdkxxY05MV1dGbTF4a09OQ1hWUEFOa204M04xcGdULU9OVWRoMzdxcnYtYjdEeG02N1B4Qk9GYm81SkFRMDJrbEFqUGVyWXRub1RuWWZZb3ZFQ3BaRG9B?oc=5",
    priority: "高",
    publishedAt: "2026-07-21",
    collectedAt: "2026-08-10",
    score: 92,
  },
  {
    id: 86660328,
    region: "台灣",
    topic: "法規標示",
    title: "2026台灣《食安法》修法重點解析：最高罰鍰達3000萬元與企業合規指引",
    summary: "台灣2026年《食品安全衛生管理法》進行大幅度修正，提出十大重點改動，其中違規最高罰鍰大幅調升至3,000萬元。修法範疇涵蓋食品標示準確性、原料溯源管理、業者登錄制度及食安事件通報責任等。新舊罰則對比顯示政府對違規行為實施更嚴格懲處，旨在建立更完善的食品安全防禦網並提升消費者信心。",
    impact: "食安法罰款提高至三千萬元，對齋之味的產品標示、原料溯源與添加物檢驗帶來極高合規壓力。若有標示不實或溯源缺失將面臨鉅額罰款，極需強化供應鏈稽核與品保流程。",
    action: "全面盤點現行產品標示與原料供應鏈溯源文件，並比對最新食安修法條文更新內部品保SOP。",
    owner: "品保法規",
    source: "businessweekly.com.tw",
    url: "https://news.google.com/rss/articles/CBMiYkFVX3lxTE1ydTNsaFYwV0ZhbWY4M29lWFVuU2YwZUxpdVQ3N21nLTEwY0hsYjZOTnRoQm85SFFXajhDSExoUFRJWmhBSHNZSkQyZllyOEU3bGlfOU8weW5SazUxakUyVk93?oc=5",
    priority: "高",
    publishedAt: "2026-07-23",
    collectedAt: "2026-08-10",
    score: 92,
  },
  {
    id: 4007718,
    region: "台灣",
    topic: "競品",
    title: "大成集團進軍蔬食餐飲，發表兩大平價植物肉品牌翻轉飲食印象",
    summary: "大成集團發表兩大全新蔬食餐飲品牌，正式擴大植物基飲食版圖。該集團結合研發技術與供應鏈優勢，主打平價、美味且口感接近真肉的植物肉料理，打破傳統蔬食昂貴或口感不佳的刻板印象。此舉顯示食品巨頭正透過垂直整合與連鎖餐飲佈局，全面爭奪大眾蔬食市場與彈性素食客群。",
    impact: "大成以規模優勢切入平價蔬食餐飲，加劇同業競爭。此舉擠壓中小型蔬食品牌的價格空間，但也證明植物肉大眾化趨勢。齋之味應加速產品風味升級，強調獨特風味與品質差異化。",
    action: "評估現有產品線成本結構，並針對競品餐飲菜色進行風味與價格標竿對比分析。",
    owner: "產品研發",
    source: "遠見雜誌",
    url: "https://news.google.com/rss/articles/CBMiTkFVX3lxTE9Yc0dHZkZJTE5oUk1MSC1BVk41YWN2N3U4Z1ZJQkctbHJndE5SX1BYcDBXblVXVHlFN0huRWtzdUxMYWtuSTVrNG5weFdCUQ?oc=5",
    priority: "高",
    publishedAt: "2025-05-02",
    collectedAt: "2026-08-10",
    score: 92,
  },
{
    id: 65358122,
    region: "台灣",
    topic: "競品",
    title: "素食風潮退燒？未來肉企業股價崩跌與肉食搜尋量成長之市場脈動分析",
    summary: "近年植物肉市場面臨退燒質疑，比爾蓋茲投資的植物肉企業（如Beyond Meat）股價遭遇重挫，同時消費者對肉食的搜尋量逆勢成長87%。此現象反映過度加工、口感價格未達預期以及消費者新鮮感退去等問題，導致高度資本化的「未來肉」產業正面臨嚴峻的市場轉型與重新定位挑戰。",
    impact: "西方高總價、過度加工植物肉受挫，啟示齋之味應回歸傳統原型食材與在地口味優勢，強調健康美味與高性價比，避免盲目追逐高價仿肉概念，鞏固實用型素食客群。",
    action: "評估產品線之加工度與定價策略，轉向推廣美味健康的真食材植物基產品。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiZ0FVX3lxTE1uTENJZ2ZPREh0dHVaTlpTb2xQWFZWZURiMkpQS3lsS1FZTkN5NFYxeUFBTFowaEdsZ0xEd3labEdISXVpcDVZUU4yWEF6OHBoQndJa1pxeGRicFY2N3BQTEdBdWRSMVk?oc=5",
    priority: "高",
    publishedAt: "2025-02-27",
    collectedAt: "2026-08-08",
    score: 92,
  },
{
    id: 48319183,
    region: "歐洲",
    topic: "消費趨勢",
    title: "歐洲植物基食品市場規模達到 163 億歐元",
    summary: "根據 Food Manufacture 最新報導，歐洲植物基食品市場規模已達 163 億歐元，顯示出該地區對替代蛋白需求的強勁增長。這項成長主要由健康意識抬頭、環保永續理念深化以及多元產品創新所驅動。乳製品替代品與植物肉依舊是市場兩大核心柱石，同時複合型與便利型植物基餐點成長顯著，吸引廣大彈性素食族群消費。",
    impact: "歐洲市場持續擴張，顯示植物基外銷潛力巨大。此趨勢對齋之味拓展海外外銷版圖提供強大信心，特別是針對彈性素食者開發的便利餐點與潔淨標籤產品，可作為進軍歐洲市場的研發與行銷主力。",
    action: "評估歐洲市場法規與外銷通路需求，針對彈性素食者偏好規劃主力外銷產品線。",
    owner: "國際業務",
    source: "Food Manufacture",
    url: "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPQ0k0OTRaX21xcHMzNE1RZnJwUmxYLVJzRlpsQ0w2a2NoX0RQeVZQemx1dzh5SGppWlB2RnJFRDAycmFjaHFoYmgwQmk3N0R0emR6NnFjaTZMNW1XRFpVMVZ4YzdNZnRXaDJTcEExMTNZQjVYNzBiTENSaTdWamlFalRWTWEzUUZxVXZCa0J1c2c5cnVNSjBOdjUyTnVvVHhlUVNuczk0RmlNcDVmV2IwWWJzdE1QLWE3?oc=5",
    priority: "高",
    publishedAt: "2026-04-09",
    collectedAt: "2026-08-08",
    score: 92,
  },
{
    id: 71172800,
    region: "台灣",
    topic: "法規標示",
    title: "行政院擬修食安法：業者獲知食品異常須24小時內通報，隱匿最重罰3,000萬",
    summary: "行政院提出《食品安全衛生管理法》修正草案，強化食品業者監測與通報義務。新法規定食品業者若發現產品有衛生安全疑慮或檢驗異常，必須在24小時內主動通報主管機關並採取預防性處置。若有隱匿或延遲通報情事，最高將面臨新臺幣3,000萬元罰鍰，以維護消費者食用安全並防範食安風險擴大。",
    impact: "修法大幅提高通報時效與罰鍰金額，對齋之味的品質監控與供應鏈應變提出嚴苛考驗。公司需全面檢視異常通報機制，確保從原料到成品均能在時限內迅速處置，降低商譽及法律風險。",
    action: "建立24小時食安異常緊急通報 SOP，並對供應商進行品質檢驗與合規性全面盤點。",
    owner: "品保法規",
    source: "cna.com.tw",
    url: "https://news.google.com/rss/articles/CBMiX0FVX3lxTE1mUjRXNF9aeFFnVGxYR2xpT0dVSEdib2ktVDV3d2tyUzRzc1NNS0kxTkQtUDFPUDdLNHpVWnpsRjNRUDNVMlBtMS1LZlJka0o0M2JrYVJaZXJLSTdZVDdB?oc=5",
    priority: "高",
    publishedAt: "2026-07-23",
    collectedAt: "2026-08-08",
    score: 92,
  },
{
    id: 69065753,
    region: "台灣",
    topic: "競品",
    title: "從150億到2.7億市值，Oatly做錯了什麼？植物奶明星企業的殞落與重生",
    summary: "植物奶龍頭 Oatly 市值自高點 150 億美元暴跌至 2.7 億美元，主因在於早期擴張過快、供應鏈管理失誤、資本支出過高，加上傳統乳業與其他植物奶品牌加入競爭導致市場紅海化。品牌目前透過實施精簡營運、轉向資產輕量化供應鏈模式，並重新聚焦於高毛利的核心 B2B 咖啡通路與行銷策略，嘗試尋求轉型與重生。",
    impact: "此案例警示齋之味在拓展植物基市場時，應避免過度擴張與重資產投入。應著重資產輕量化或彈性供應鏈策略，深化核心通路黏著度，並嚴格控管成本與現金流，以維持長期獲利能力。",
    action: "檢視現有植物基產品線之供應鏈成本結構，評估資產輕量化代工可行性，並強化核心通路合作。",
    owner: "品牌行銷",
    source: "Meet創業小聚",
    url: "https://news.google.com/rss/articles/CBMiWEFVX3lxTE1BSjIyaFhZVzI2SzkzRmxZVVFkZU1OVnFLQWx2WkVHeU1aZTVBVTFIU0dWYWtQc2lENWsteUxlSzhLRTVSaTdsVExMTGhxaGZfZnNFQWw3NTg?oc=5",
    priority: "高",
    publishedAt: "2025-09-16",
    collectedAt: "2026-08-08",
    score: 92,
  },
{
    id: 11992331,
    region: "台灣",
    topic: "競品",
    title: "農畜大廠「大成」植物肉戰略再進化！從「新創肉」延伸至雙餐飲品牌佈局",
    summary: "台灣農畜巨頭大成集團推動植物肉品牌「NEO MEAT新創肉」戰略升級，從原料代工與加工研發，進一步向下游延伸發展雙餐飲品牌。大成結合自身肉品加工實力與餐飲通路經驗，串聯研發、生產至終端消費場景，構建完整植物基產業價值鏈，加速植物肉在大眾餐飲市場的普及與商業化進程。",
    impact: "大成跨足餐飲將加速植物肉普及，但也加劇通路與餐飲競爭。此舉提示齋之味需防範傳統肉品大廠垂直整合的競爭壓力，應深化純素品牌特色並加速開發差異化餐飲產品。",
    action: "評估餐飲通路合作可行性，並盤點現有產品線以開發具差異化的餐飲專用植物肉模組。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiZkFVX3lxTE1qenNjUXlIV2dQVjhZTWpiMlJ3b1BFWUJSVEF3cGxPaFY2Q0tNekc4RTQ5ZWJuMGxQbldBMFFwR01fb0djN1RnWmpxeE5adEw5VHlMMHNValdQSzhuV0NQR2kzckJwZw?oc=5",
    priority: "高",
    publishedAt: "2025-04-15",
    collectedAt: "2026-08-08",
    score: 92,
  },
{
    id: 45258947,
    region: "台灣",
    topic: "競品",
    title: "台灣素食龍頭弘陽食品斥資4億元 打造首座綠電智慧轉型新廠",
    summary: "台灣植物肉與素食龍頭弘陽食品宣佈投入新台幣4億元，打造全台首座結合綠電與智慧化生產的全新廠房。該廠旨在提升生產效能、降低碳足跡，並導入自動化設備以因應全球對ESG及永續供應鏈的需求。此舉標誌著台灣素食產業邁向低碳製造與高規格智慧生產的新里程碑，顯著提升其在全球植物基市場的競爭力。",
    impact: "弘陽升級綠能智慧廠，強化產能與低碳優勢，對齋之味在永續供應鏈與成本結構上帶來競爭壓力。這啟示齋之味需關注市場低碳轉型趨勢，維護產品綠色競爭力。",
    action: "評估現有生產線低碳化與智慧化升級，並盤點主要產品碳足跡與供應鏈永續性。",
    owner: "採購品保",
    source: "經濟日報",
    url: "https://news.google.com/rss/articles/CBMiWkFVX3lxTE5WalFQenFMaV9ZaUQ3bWV6dnlBWEtWTG9Yd1Q3djIzdkMzWUtTcHVyUWxZV1NNUzNuelNoTjRjNjF3RExuWHRJSjlxeXktcWVoSlI5SXNvYmdCQdIBX0FVX3lxTE1xcWI0Q3BNSFNGWVNNRmN4bjdtYUsyNnAyMTNoSkZGNmw0WjRsVG0yWTBPV0F0bkFzMUszTXBPWkVNRlQwWXYtTndNcVRscWR4UGdFQWx2Yjc3MGpBLVBz?oc=5",
    priority: "高",
    publishedAt: "2026-02-22",
    collectedAt: "2026-08-08",
    score: 92,
  },
{
    id: 64530120,
    region: "台灣",
    topic: "法規標示",
    title: "政府發布《食品安全衛生管理法》修正草案政策宣導",
    summary: "衛生福利部發布《食品安全衛生管理法》修正草案政策宣導，旨在強化食品安全源頭管理、嚴格規範食品標示與追溯追蹤體系，並提高違規處罰標準。此修正草案聚焦於提升食品供應鏈透明度與消費者權益保障，涵蓋原料登錄、標示規範及衛生標準之最新調整，要求食品業者落實自主管理與合規措施。",
    impact: "食安法修正將直接影響齋之味的產品包裝標示、原料溯源管理與品管標準。若未及時更新標示或檢視供應鏈合規性，可能面臨罰鍰或商譽受損，但亦能藉此強化品牌信任度。",
    action: "全面盤點現有產品標示與原料追溯文件，並評估新法規對生產流程之影響，確保完全合規。",
    owner: "品保法規",
    source: "wda.gov.tw",
    url: "https://news.google.com/rss/articles/CBMiZEFVX3lxTFBZYm9Xc2VCb1ZVaU1DU19ZSTBJcXJ4aUxkc1ktQmFRTXJrbmU4QnlVV3JCbXo0Vm1zTWFDSng1WVhORFdDUmlaanFseGxCU2FidV9lRjhGVGxBaG5MZldNOVBMUzI?oc=5",
    priority: "高",
    publishedAt: "2026-08-06",
    collectedAt: "2026-08-07",
    score: 92,
  },
{
    id: 97640512,
    region: "台灣",
    topic: "法規標示",
    title: "毒油風暴引發民眾凱道怒吼 訴求政府嚴查食安漏洞",
    summary: "台灣爆發毒油風暴，引發大批民眾前往凱達格蘭大道走上街頭，表達對食品安全頻出漏洞的強烈不滿。抗議民眾訴求政府應落實食品源頭管理、嚴懲違規業者，並建立更加透明與完善的食品追溯體系。此事件嚴重打擊消費者對食品加工業的信任，使油脂與原料安全成為社會焦點。",
    impact: "毒油事件打擊消費者對加工食品的信心。齋之味作為植物基品牌，須全面清查原料油脂供應鏈溯源，並可藉機強調產品天然無毒與品質控管，提升品牌信任度。",
    action: "全面盤點食用油與原料供應商檢驗報告，並建立溯源資訊以提供顧客查驗。",
    owner: "採購品保",
    source: "UDN",
    url: "https://news.google.com/rss/articles/CBMiU0FVX3lxTE9tdVVoUFdZcmRSa0d1NWVOeEFUVnJrY0RLTUxJZ3pQdVVtWTdsUDhseURnblN4TTNJYTZhcHlXeFhmNi1iMTFFZTdpbjdpNnJmc0hj0gFYQVVfeXFMTU1VLUkxc01wNW5rV1NmZnJuYjZQMDBFYzFNSEJWYmNWUmxldHRSZHFoWDNBRWtoVFVMM203RHVPWXhyY1pUckpweElXUU1LZGxGS2NzOGp2aQ?oc=5",
    priority: "高",
    publishedAt: "2026-07-26",
    collectedAt: "2026-08-07",
    score: 92,
  },
{
    id: 37260906,
    region: "台灣",
    topic: "法規標示",
    title: "致癌油風暴延燒食安爭議 國民黨痛批政府監督失能並要求嚴查食安風險",
    summary: "台灣近期爆發致癌油風暴並持續延燒，國民黨批評行政院食安辦未能及時發揮監督與溝通功能，導致社會對政府食安體系的信任破產。外界質疑政府將食安檢驗與風險負擔轉嫁給一般民眾與業者。此事件引發全民對食品添加物及食用油脂安全的嚴肅關注，呼籲政府應立即全面落實油脂源頭控管與資訊透明。",
    impact: "油脂為植物基與素食加工品之核心原料。致癌油風暴易引發消費者對加工食品的疑慮，對齋之味的產品信任度造成潛在考驗，需強化原料溯源與用油安全宣導。",
    action: "全面盤點廠內食用油脂來源，要求供應商提供最新致癌物檢驗報告並嚴格執行進貨抽驗。",
    owner: "品保法規",
    source: "kmt.org.tw",
    url: "https://news.google.com/rss/articles/CBMiXEFVX3lxTE5tMldOQjdMT1Q2cnNYcUZOUTFkRWpYLXJVb05SMDNySFczQ3puNk5Nc0hCdkoyZVBlN3MwMjRybmQ1Sy1DMHFqQjRnUDg0eFRHaGVpQjBvLWZmQkF2?oc=5",
    priority: "高",
    publishedAt: "2026-07-13",
    collectedAt: "2026-08-07",
    score: 92,
  },
{
    id: 11096756,
    region: "台灣",
    topic: "法規標示",
    title: "油品致癌物超標與食安體檢：台灣食安體系12年共犯結構剖析",
    summary: "本報導指出台灣食用油品出現致癌污染物超標問題，揭露食安監管機制12年來的系統性缺陷與共犯結構。產業長期缺乏嚴格的原料自主檢驗與追溯，導致安全風險持續積累。此事件再度引發大眾對食用油脂安全的極大焦慮，促使主管機關與業者面臨更嚴格的檢驗標準與供應鏈透明化要求。",
    impact: "植物基食品極度依賴油脂來提升風味與口感。油品致癌物超標事件將加劇消費者對素食加工品的安全疑慮，若齋之味未確保原料用油安全，品牌信任度將面臨重大打擊與法規風險。",
    action: "全面盤點產品線用油供應商，要求提供致癌物合格檢驗報告，並建立定期抽驗與源頭追溯機制。",
    owner: "品保法規",
    source: "peopo.org",
    url: "https://news.google.com/rss/articles/CBMiSEFVX3lxTFBRcUFwcDhWMW5rVkNMa0xROHVxSGtRXzh0d2ZJRnRKV3VCMW1ObklxUTIwVkRfLTR1ZU5VazQyM3lidTBreWg2TQ?oc=5",
    priority: "高",
    publishedAt: "2026-07-04",
    collectedAt: "2026-08-07",
    score: 92,
  },
{
    id: 87232305,
    region: "台灣",
    topic: "法規標示",
    title: "中聯油脂19批油品重新上架 食藥署研擬食安法修法方向",
    summary: "中聯油脂先前受食安疑慮影響的19批食用油品，經複驗與確認符合標準後即日起獲准重新上架。衛生福利部食品藥物管理署對此進行檢討，並規劃未來《食品安全衛生管理法》修法方向，擬加強原料油品溯源管理、稽查機制及相關違規罰則，以提升國內食用油產業整體食安規範與消費者信心。",
    impact: "油品為植物基產品關鍵加工原料，食藥署修法將提高油品供應鏈審查標準。齋之味需關注法規修訂進度，預先盤查油脂供應商合法性與檢驗報告，防範供應鏈斷鏈及潛在食安風險。",
    action: "全面盤點合作油品供應商資質與檢驗報告，並追蹤食安法修法進度以調整內部採購規範。",
    owner: "品保法規",
    source: "健康醫療網",
    url: "https://news.google.com/rss/articles/CBMiVkFVX3lxTE9vQ3BFNVJXeWdyZ2V5cmdibGdsdm5vaWVYRkRfT1JzMFNNRjdlZEFMdklmMEk0R2pDa3dpWE1USVJ2RURCcGVQZXZfd0pkSnlVMlpTSk9R?oc=5",
    priority: "高",
    publishedAt: "2026-07-22",
    collectedAt: "2026-08-06",
    score: 92,
  },
{
    id: 63476539,
    region: "台灣",
    topic: "法規標示",
    title: "行政院通過《食安法》修正草案 強化源頭、製程、通報與數位治理",
    summary: "行政院通過《食品安全衛生管理法》部分條文修正草案，針對食品安全管理進行全面升級。修法重點包括強化原料源頭管理、落實生產製程控制、建立異常主動通報機制，並優化企業品質管理系統。此外，更導入數位治理工具提升食品追溯效益，全面鞏固食品安全防線並促進產業健全發展。",
    impact: "修法提高源頭管理與異常通報要求。齋之味需全面檢視植物基原料供應鏈與生產稽核流程，確保原料可追溯性與數位申報完全合規，降低營運風險並強化品質聲譽。",
    action: "盤點現有原料供應商追溯資料，升級內部食安異常通報流程與數位系統。",
    owner: "品保法規",
    source: "僑新聞",
    url: "https://news.google.com/rss/articles/CBMiS0FVX3lxTFBSUk1VcW5YV05taERvYW85YVFpVnRwZUpQaHJ2ODZkMkI5Z1RFRUIzRXVCZmphSHRRTm9oTk5WZ01ET29NWXg5dzVOcw?oc=5",
    priority: "高",
    publishedAt: "2026-07-23",
    collectedAt: "2026-08-06",
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
    region: "台灣", signal: "分化", note: "體驗創新與法規嚴管", value: 78,
    headline: "蔬食市場邁向體驗策展與精緻化，配合食安嚴管升級。",
    drivers: ["策展思維與異國精緻料理賦予蔬食全新生活風格與高附加價值。", "健康適量與生態永續意識抬頭，促使大眾轉向原型植物基飲食。", "食安法規重罰與溯源要求，推動供應鏈透明化與品牌信任建構。"],
    opportunity: "結合在地原型食材與異國風味，開發具故事性與減法配方的精緻蔬食產品；利用策展市集進行體驗行銷，建立高品質純素品牌形象。",
    risk: "2026食安法大幅提高違規罰鍰並嚴查添加物標示，若原料溯源或純素標示不周，將面臨高額裁罰與品牌信任危機。",
    watch: ["2026年食安法修正案對植物基添加物與溯源之具體施行細則", "彈性蔬食者與年輕族群在體驗式蔬食市集中的實質轉化率", "原型食物與低度加工植物基產品的市場成長率", "異國精緻純素餐飲（如Vegan法餐）向零售通路化發展的趨勢"],
  },
  {
    region: "美國", signal: "分化", note: "區域極化、技術突破", value: 72,
    headline: "美家戶滲透率達六成，區域分化與技術突破成成長關鍵。",
    drivers: ["家庭滲透率達六成，美西與美東北部奠定主流消費基本盤。", "跨領域食品科技與產學合作，持續攻克風味與質地瓶頸。", "健康與永續意識抬頭，長期推升植物肉與替代乳製品需求。"],
    opportunity: "針對美西美東市場開發具東方特色的植物基方便食品，並結合掩味與質地創新技術，提供兼具營養與高性價比的選擇。",
    risk: "若無法克服口感遮蔽與加工穩定性等技術瓶頸，且價格未能合理化，將難以跨越主流大眾並拓展中西部等潛力市場。",
    watch: ["美西與美東以外潛力區域（中西部、南部）的滲透率成長", "風味遮蔽與質地改良技術對消費者重複購買率的提升", "植物基食品與傳統肉乳製品之間的零售價格落差變化", "產學合作創新技術商業化落地與青年人才市場導入進程"],
  },
  {
    region: "澳洲", signal: "分化", note: "潔淨與價值重組", value: 48,
    headline: "澳洲植物基市場進入洗牌分化期，潔淨標籤與高性價比產品成勝出關鍵。",
    drivers: ["通膨壓力下消費者價格敏感度提升，傾向選擇平價與原型蔬食替代品。", "健康意識轉變促使需求轉向潔淨標籤、無添加與高功能性配方產品。", "大型通路精簡SKU引爆忠實客群反彈，市場同步加速資本併購重組。"],
    opportunity: "聚焦潔淨標籤與原型蔬食開發，降低過度加工成分並提升高蛋白質優勢，以平實價格與天然營養切入主流超市與健康通路。",
    risk: "主流超市精簡SKU提高上架門檻，加上當地深厚烤肉文化與通膨環境，若產品無價格優勢或口感還原度不足易面臨下架危機。",
    watch: ["大型超市（Woolworths等）植物基SKU精簡與重新上架動向", "潔淨標籤與高蛋白機能性植物基商品的成長趨勢", "澳洲在地植物肉新創併購重組與資本挹注狀況", "高通膨環境下原型蔬食對高度加工替代肉的替代率"],
  },
  {
    region: "歐洲", signal: "分化", note: "天然原型與法規變局", value: 72,
    headline: "歐洲植物基市場強勁成長，然面臨標示禁令與原型食材轉向。",
    drivers: ["彈性素食族群擴大與永續意識抬頭，帶動市場規模突破百億歐元。", "消費者轉向低加工、高蛋白質與潔淨標籤的原型植物性食材。", "複合型與便利型植物基餐點需求增長，拓展超市與餐飲通路。"],
    opportunity: "聚焦潔淨標籤與原型豆類穀物開發，避開高度加工肉品，並以複合便利餐點切入歐洲通路，提早佈局非肉類命名之包裝策略。",
    risk: "歐盟與英國擬禁止植物基食品使用漢堡等肉類名稱，將大幅增加包裝重繪、產品更名與市場重新定位之行銷與營運成本。",
    watch: ["歐盟及英國「肉類命名禁令」法案審查與落實進度", "低加工原型植物性食品（豆類、穀物）之銷售成長率", "潔淨標籤（Clean Label）與高蛋白產品研發趨勢", "歐洲主流超市通路對非肉類命名蔬食餐點的架位排他性"],
  }
];

const dailyBriefing = {
  title: "植物基擺脫擬真模仿，決勝點在於<strong>體驗策展與原型潔淨。</strong>",
  subtitle: "全球植物基市場正從加工替代肉，轉向天然原型與口感技術優化；台灣則透過體驗策展與精緻餐飲，帶動植物飲食邁向生活化與主流化。",
  decisionTitle: "擺脫擬真框架，聚焦原型潔淨與體驗價值",
  decisionDetail: "消費者轉向追求原型營養與體驗美學，擬真肉需求放緩。我方應佈局潔淨標章與情境策展，建立品牌護城河。"
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

  // Dynamically compute competitor watch list based on freshIntelligence
  const industryWatch = useMemo(() => {
    const brandsConfig = [
      {
        name: "弘陽生技",
        keywords: ["弘陽"],
        defaultUrl: "https://news.google.com/search?q=%E5%BC%98%E9%99%B5%E9%A3%9F%E5%93%81"
      },
      {
        name: "大成新食成",
        keywords: ["大成", "新食成"],
        defaultUrl: "https://news.google.com/search?q=%E6%96%B0%E9%A3%9F%E6%88%90"
      },
      {
        name: "松珍",
        keywords: ["松珍"],
        defaultUrl: "https://news.google.com/search?q=%E6%9D%BE%E7%8F%8D"
      },
      {
        name: "Beyond Meat",
        keywords: ["Beyond Meat", "BeyondMeat", "Beyond"],
        defaultUrl: "https://news.google.com/search?q=Beyond%20Meat"
      }
    ];

    // Reference base date is the latest date in the collected feeds, or today
    let latestNewsDate = new Date();
    if (freshIntelligence.length > 0) {
      const dates = freshIntelligence.map(item => new Date(item.publishedAt).getTime());
      latestNewsDate = new Date(Math.max(...dates));
    }

    return brandsConfig.map(brand => {
      // Find all news items containing brand keywords in title or summary
      const matches = freshIntelligence.filter(item => {
        const text = `${item.title} ${item.summary}`.toLowerCase();
        return brand.keywords.some(kw => text.includes(kw.toLowerCase()));
      });

      if (matches.length > 0) {
        // Sort matches to find the latest one
        const sorted = [...matches].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        const latest = sorted[0];
        const pubDate = new Date(latest.publishedAt);
        const diffTime = latestNewsDate.getTime() - pubDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 7 && diffDays >= 0) {
          return {
            brand: brand.name,
            status: "有更新",
            date: latest.publishedAt,
            update: `偵測到近 7 天內有新訊：${latest.title}`,
            url: latest.url
          };
        } else {
          return {
            brand: brand.name,
            status: "持續觀測",
            date: latest.publishedAt,
            update: `最新動態 (${latest.title}) 已超過 7 天，持續追蹤中。`,
            url: latest.url
          };
        }
      }

      // Default fallback
      return {
        brand: brand.name,
        status: "持續觀測",
        date: "2026-07-28",
        update: "近期無相關新聞動態，點擊下方連結手動查詢最新消息。",
        url: brand.defaultUrl
      };
    });
  }, [freshIntelligence]);

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
              <p className="eyebrow">2026年8月10日・星期一</p>
            </div>
            <div className="summary-line">今日彙整 {freshIntelligence.length} 則 · {highPriorityCount} 則核心關注</div>
          </div>
        </div>

        <div className="subline-bar">
          <div>台灣 / 美國 / 澳洲 / 歐洲市場 · 每日自動更新</div>
          <div>最後更新：<time dateTime="2026-08-10T02:49:34+08:00">2026/08/10 02:49</time></div>
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
              <p>每日 08:30 檢查公開評價與品牌提及；Google 評論最近查核：2026/08/10 02:49。</p>
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
