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
    id: 66727105,
    region: "台灣",
    topic: "競品",
    title: "松珍生技以美味與創新技術重新定義蔬食市場",
    summary: "松珍生技作為台灣蔬食產業領頭羊，持續投入創新技術研發，突破傳統素食口感與風味限制，結合營養與美味重新定義蔬食產品。其透過多元化的植物肉與蔬食料理開發，不僅滿足傳統素食族群的需求，更積極拓展非素食的廣大彈性素食消費者，顯著提升植物基食品在主流市場的接受度與市佔率。",
    impact: "松珍生技在風味與口感上的創新突破，加劇了國內蔬食市場的競業壓力。這提醒齋之味必須重視產品口感與風味升級，避免既有市場份額遭強勢競品擠壓。",
    action: "針對競品主力商品進行質地與風味盲測，全面評估並升級現有產品線之調味配方。",
    owner: "產品研發",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiZkFVX3lxTFBzeGJaVWJ1YjNrTXV3c3A5YWRXTEtmaHg4UzE5RnFnTDEwOEw4TkcxVE42bk1RVlV2MFl0cVg2c0l3c0JwN3VQeUEwOXJ4WXV4cENSeXEybWw2aHVXM0FfUGJ5U0NsUQ?oc=5",
    priority: "高",
    publishedAt: "2026-07-09",
    collectedAt: "2026-08-12",
    score: 92,
  },
  {
    id: 45258947,
    region: "台灣",
    topic: "競品",
    title: "台灣素食龍頭弘陽食品投資4億元打造首座綠電智慧新廠",
    summary: "台灣素食龍頭弘陽食品宣佈投資新台幣4億元，建置首座結合綠能與智慧化生產的全新工廠。此舉旨在大幅提升植物肉與蔬食產品的產能及品質穩定度，並透過綠電導入降低產品碳足跡，積極響應永續發展趨勢。新廠導入自動化設備與智慧管理系統，將進一步優化生產效率，鞏固其在國內外植物基食品市場的競爭優勢。",
    impact: "弘陽食品擴建綠電智慧廠提升產能與永續優勢，對齋之味帶來市場競爭壓力。齋之味需關注競品成本及減碳優勢，評估自身綠色供應鏈與生產轉型策略。",
    action: "評估現有供應鏈減碳路徑，並盤點競品產能擴張對市場價格之影響。",
    owner: "採購品保",
    source: "經濟日報",
    url: "https://news.google.com/rss/articles/CBMiWkFVX3lxTE5WalFQenFMaV9ZaUQ3bWV6dnlBWEtWTG9Yd1Q3djIzdkMzWUtTcHVyUWxZV1NNUzNuelNoTjRjNjF3RExuWHRJSjlxeXktcWVoSlI5SXNvYmdCQdIBX0FVX3lxTE1xcWI0Q3BNSFNGWVNNRmN4bjdtYUsyNnAyMTNoSkZGNmw0WjRsVG0yWTBPV0F0bkFzMUszTXBPWkVNRlQwWXYtTndNcVRscWR4UGdFQWx2Yjc3MGpBLVBz?oc=5",
    priority: "高",
    publishedAt: "2026-02-22",
    collectedAt: "2026-08-12",
    score: 92,
  },
{
    id: 49927134,
    region: "美國",
    topic: "原料技術",
    title: "破解密碼：克服植物基產品開發中的挑戰",
    summary: "美國研究機構 RTI International 深入剖析植物基產品開發面臨的技術瓶頸。雖然植物基市場持續成長，但製造商在風味遮蔽、質地模擬與營養配方調整上仍面臨挑戰。文章指出，透過新興加工技術與原料優化組合，能有效改善感官體驗與量產穩定度，是提升消費者重複購買率的關鍵要素。",
    impact: "此技術趨勢強調口感與風味是植物基產品成功的關鍵。這提示齋之味應針對現有產品線進行感官體驗升級，運用新原料技術改善風味遮蔽與質地，奠定產品優勢。",
    action: "評估現有植物肉產品配方，引進新式風味遮蔽與質地改良技術以優化品質。",
    owner: "產品研發",
    source: "RTI International",
    url: "https://news.google.com/rss/articles/CBMiggFBVV95cUxPNHdlYnBSd3FwcmNRanBpQjlFeGd0a3JNNFFqWXJkcG9yeC1GRml5akZJUjVXbjBHeXdJQ0wtc25Pdy1wSE50eHk2Q3phLWhzTTlTRGhxS0I2QlRxRENkdU5MQnNBd1Z5UHNTUjBDUzZaVWp1djBZMVBDWXF2M3ZORjVn?oc=5",
    priority: "高",
    publishedAt: "2025-11-21",
    collectedAt: "2026-08-12",
    score: 92,
  },
{
    id: 43458714,
    region: "歐洲",
    topic: "法規標示",
    title: "歐盟禁止純素食品標籤使用31個肉類相關名稱，惟「素肉排」仍獲准保留",
    summary: "歐盟正式規範純素與植物基食品標籤，禁止使用31個與肉類直接相關的名詞（如牛排、培根、香腸等），以防止消費誤導。然而，較通用且普遍認知的「素肉排（veggie burger）」等名稱則不在禁令之列。此法規大幅限縮了植物肉產品在歐洲市場的命名自由度，製造商必須重新檢視並調整產品包裝標示以符規定。",
    impact: "此政策直接影響齋之味產品若拓展或外銷歐盟市場時的標籤合規性。針對歐洲市場的產品包裝與行銷文案，必須全面排除禁用的肉類名詞，避免面臨產品下架或監管裁罰等法律風險，並需重新定義符合當地法規的產品溝通策略。",
    action: "全面盤點外銷歐盟產品標籤與行銷文案，排查禁用詞彙並完成品名更名審查。",
    owner: "品保法規",
    source: "Vegan Food & Living",
    url: "https://news.google.com/rss/articles/CBMiqgFBVV95cUxQZHB1alhTOTlPbG5Udl94V2JWaDd3NWZXdVBvWHM0bzBIdjk5aDhSNGY5WnIzOWFXaDNGUWhKN3NabERpQTlvQlFYVXowYmhtQmtCZ1RsY2p3WDB3NE4zRm91cTA1VzVkR0ptNmlKMFg5V0hVSEE3ODVLalJsUUFfUG9fQVpNZ2VFMkhkTjBWd2RxcGhDWjNxTzBaeWRaTWNGOWVCWVNUM3pTUQ?oc=5",
    priority: "高",
    publishedAt: "2026-03-09",
    collectedAt: "2026-08-12",
    score: 92,
  },
{
    id: 5923352,
    region: "澳洲",
    topic: "消費趨勢",
    title: "我們是否已失去對肉類與乳製品替代品的胃口？",
    summary: "本文探討澳洲市場對植物肉與植物奶等替代食品的需求變化。隨著初期爆發性成長結束，消費者因價格偏高、高度加工及口感不符預期等因素，熱潮逐漸冷卻。市場正進入盤整期，促使業者重新檢視產品策略，從單純模仿肉奶轉向訴求原型食物、潔淨標示與提升性價比，以重塑市場成長動能。",
    impact: "此趨勢提示齋之味，傳統植物肉過度加工與高價形象正面臨考驗。公司應重視潔淨標示與原型植物成分，兼顧美味度與平實價格，以應對消費市場對植物基食品回歸理性與健康取向的轉變。",
    action: "評估現有植物肉產品線配方，盤點潔淨標示與原型食物技術，並優化生產成本以提升性價比。",
    owner: "產品研發",
    source: "The Conversation",
    url: "https://news.google.com/rss/articles/CBMilwFBVV95cUxPR0t4V2VaNEhCTDdUbGV3dWY4N01VZG1PUDhIMFhkaFQ4Z0ZuQS1YYW9tRWgzckttODFWc2M1djF2NFU5cGpOalNuZm10WXpTcVM1MERaeVR3R1dOSS1pWUN3VmNRUGVnaHdVUThVREpwcDc3TmhsZklHTVJqdDB5Zm5jMU8wU3Zma0U3YUxnbjkwV0V1STJZ?oc=5",
    priority: "高",
    publishedAt: "2026-06-16",
    collectedAt: "2026-08-12",
    score: 92,
  },
{
    id: 41123917,
    region: "台灣",
    topic: "法規標示",
    title: "【社論】推動食安法修法：加工食品原料來源透明化不應僅靠業者自律",
    summary: "本篇社論指出，目前食品安全改革若僅依賴「業者自律」效果有限，呼籲政府應將「加工食品原料來源透明化」正式納入《食安法》修法範疇。文中強調，隨著消費大眾對食品成分與供應鏈追溯的要求提高，明確標示加工原料來源、建立強制性資訊公開機制，才是落實食安防護網、重建消費者信任的核心關鍵。",
    impact: "預期法規若推動原料來源透明化，齋之味需全面檢視植物肉與素食加工品的原料供應鏈追溯性。這將增加供應鏈管理成本，但也是建立品質信任、強化品牌優勢的絕佳契機。",
    action: "提前盤點所有產品之素食原料來源清單，並建立供應商履歷追溯與透明化資料庫。",
    owner: "品保法規",
    source: "上下游",
    url: "https://news.google.com/rss/articles/CBMiVEFVX3lxTFAwczdEbERSX0YtODF5N1VZMlk3cWtxTS1ORDF3MEcwZl9XamJMRG02QmFnOS0wOXZSLUFQdmNiclpqZkJCa19FUUREb0VwZVB2aDE4ag?oc=5",
    priority: "高",
    publishedAt: "2026-07-21",
    collectedAt: "2026-08-12",
    score: 92,
  },
{
    id: 41015448,
    region: "台灣",
    topic: "法規標示",
    title: "行政院推動食安法修法 列十大重點並加重隱匿通報罰則",
    summary: "行政院擬具《食品安全衛生管理法》修正草案，提出十大修法重點，核心內容包含加重業者隱匿食安事件或延遲通報的處罰機制、強化食品供應鏈追蹤追溯體系，以及完善自主管理與違規沒收機制。此舉旨在提升食品業者自主管理責任，從源頭確保國人飲食安全，並建立更嚴密透明的食安防護網。",
    impact: "修法加重隱匿通報罰則並強化溯源管理。齋之味須全面檢視品保通報應變機制與原料供應鏈紀錄，若發生品質異常需迅速通報與處置，確保符合法規要求並維持品牌信譽。",
    action: "盤點內部食安異常通報流程，更新原料溯源系統，並對品保與供應鏈團隊開展法規宣導。",
    owner: "品保法規",
    source: "cna.com.tw",
    url: "https://news.google.com/rss/articles/CBMiX0FVX3lxTFBmVTI1TTBtZ21SbUxqVmpPTjQwRVJ0U0ZrR1ZuOUpaU21ueGJjZEpGeThOWkpZb1dCWThwU1JsVzhVbFMxd3ZhMGo4V1BhY3JtRUpuR29EVEd5dEUxVktF?oc=5",
    priority: "高",
    publishedAt: "2026-07-20",
    collectedAt: "2026-08-11",
    score: 92,
  },
{
    id: 43692559,
    region: "台灣",
    topic: "法規標示",
    title: "美國FDA發布食品安全現代化法案（FSMA）特定食品額外追溯記錄最終法規",
    summary: "美國FDA針對《食品安全現代化法案》（FSMA）發布特定食品額外追溯記錄最終法規，要求製造、加工、包裝或儲存「食品追溯清單（FTL）」上食品的企業，需建立並維護詳細的關鍵數據元素（KDEs）與供應鏈追溯記錄。此法規旨在加速食品安全事件發生時的污染源追查，強化整體供應鏈的透明度與消費安全保護。",
    impact: "若齋之味有外銷美國或對接國際供應鏈之規劃，此法規將提高原料追溯與生產履歷紀錄的合規要求。公司需全面檢視植物性原料供應商履歷，確保符合國際食安與透明化標準。",
    action: "盤點出口相關產品之原料追溯流程，並建立符合FSMA規範之供應鏈數位履歷體系。",
    owner: "品保法規",
    source: "fda.gov",
    url: "https://news.google.com/rss/articles/CBMizwFBVV95cUxOLUpFeElsTVhoSmhiSmk3bDI3ZWJucWxHd05jN3FXRUNSTGtoSHB1VUpjMTd3aktFMlpsQWdNRF9hU1V2bU01Y1JoZWdWeXZNd05mLW9XX2s3Qk9vWGwtV0o3bm9EUXpFbXAzN3Nsb2VOSGtUNmJqa0dJTHJSalNSNnlxUDNZYzZKblcwMVEzcDY3b3pvb0hSUFdqNlBfN3BFZWlPVXIxdWJmcDQ5cmVKcnh0NERYLVF3RUlaNVBwdWlPYVF3QzhvUGtpeTFSSzA?oc=5",
    priority: "高",
    publishedAt: "2026-07-24",
    collectedAt: "2026-08-11",
    score: 92,
  },
{
    id: 13661314,
    region: "台灣",
    topic: "競品",
    title: "植物肉熱潮退燒？Beyond Meat 股價重挫至 3 美元的深層原因分析",
    summary: "植物肉龍頭 Beyond Meat 股價跌至約 3 美元，反映市場熱潮消退。主因包括價格昂貴、高度加工疑慮、口感未達期待及通膨下消費者回歸傳統肉類。此外，重複購買率低下與傳統肉巨頭參戰加劇競爭，導致營收萎縮與虧損擴大，顯示單靠素食概念已無法支撐高估值。",
    impact: "此事件警示齋之味，僅靠環保概念難維持複購。消費者更看重美味、健康無過度加工（Clean Label）及價格。齋之味應避免高度加工擬真肉路線，加強原型食物與在地美味的研發定位。",
    action: "評估現有擬真素肉產品線，轉向潔淨標示（Clean Label）與在地風味產品之研發策略。",
    owner: "產品研發",
    source: "鏈新聞 ABMedia",
    url: "https://news.google.com/rss/articles/CBMiVEFVX3lxTE1pUXY3azR3TkprM0MwUEVYaFEyblljTFp5SHZZTjNycU9zcmhYREYzZV9MT1A3STAzVzdHelNBdnRxT0ZNX0RaWktoVkxGOGw5dl9lXw?oc=5",
    priority: "高",
    publishedAt: "2025-03-14",
    collectedAt: "2026-08-11",
    score: 92,
  },
{
    id: 39247086,
    region: "台灣",
    topic: "競品",
    title: "響應世界地球日 大成集團推出兩大全新蔬食品牌",
    summary: "為響應世界地球日，台灣肉品龍頭大成集團宣佈推出兩大全新蔬食品牌，積極布局植物基飲食市場。大成結合先進蛋白質加工技術與多元產品線，推出涵蓋即食料理與植物肉的新品，鎖定彈性素食與環保族群。傳統肉品大廠加速跨足蔬食領域，預計將大幅改變台灣植物基食品的通路格局與競爭態勢。",
    impact: "大成集團具備資源與通路優勢，推出新蔬食品牌將直接衝擊市場占有率。齋之味須警惕同業競合，應思考如何展現傳統蔬食品牌的專業度與口感差異，維繫核心客戶忠誠度。",
    action: "持續追蹤大成新品之市場定價與通路分布，並研擬差異化的品牌行銷方案與產品線佈局。",
    owner: "品牌行銷",
    source: "winnews.com.tw",
    url: "https://news.google.com/rss/articles/CBMiSkFVX3lxTE56NlRqb1ItSHktWlRIU3ZsZnpvTHJSZTVnZ2ppcW15TEx6S045TzRJZThjbXcwRFByanNHbm9CWjVndTd3OTBpQ2NB?oc=5",
    priority: "高",
    publishedAt: "2025-04-15",
    collectedAt: "2026-08-11",
    score: 92,
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
    region: "台灣", signal: "分化", note: "策展體驗與食安嚴管", value: 80,
    headline: "植物基飲食邁向精緻與體驗化，搭配嚴謹食安規範驅動產業升級。",
    drivers: ["策展思維與精緻餐飲抬頭，成功吸引高比例彈性素食與非素食客群。", "健康與環保意識轉變，倡導八分飽、減碳與原型食材的飲食風格。", "政府強化食安源頭監測與食農教育，推動透明化與風險評估機制。"],
    opportunity: "針對彈性素食者開發高質感、天然無添加的原型植物基產品，並結合在地食材與體驗式市集進行策展行銷，翻轉傳統素食印象。",
    risk: "食安追溯與添加物規範越趨嚴格，過度依賴加工替代肉或標示不合規者，恐面臨稽查下架與品牌信任度下滑之風險。",
    watch: ["非素食者（彈性素食）於蔬食餐飲之消費佔比", "清潔標示（Clean Label）與原型食材產品滲透率", "中央與地方食安源頭稽查及標示合規率", "體驗式門市與實體市集活動之導客轉化率"],
  },
  {
    region: "美國", signal: "分化", note: "品質升級與區域分化", value: 62,
    headline: "美國植物基市場進入轉型升級期，聚焦潔淨標示與極致口感。",
    drivers: ["六成美大家庭已購買植物基產品，市場步入主流轉型升級階段。", "消費者對潔淨標示、健康價值、口感與價格合理性提出高標準。", "產學研合作突破風味遮蔽與質地模擬技術，有效提升重複購買率。"],
    opportunity: "針對美中南部潛力市場推出具潔淨標示與高感官體驗的植物肉，透過風味遮蔽技術降低豆味，精準對接品質升級需求。",
    risk: "爆發性成長放緩導致通路淘汰率上升，若無法解決技術瓶頸導致口感不佳或定價過高，將面臨重複購買率過低之風險。",
    watch: ["西岸與中南部市場滲透與回購率", "潔淨標示（Clean Label）產品市占", "風味遮蔽與質地模擬新技術應用", "各大植物基品牌的價格降幅與毛利"],
  },
  {
    region: "澳洲", signal: "承壓", note: "潔淨標示與價格重整", value: 42,
    headline: "替代肉熱潮冷卻，市場走向潔淨標示與高性價比重整期。",
    drivers: ["高通膨與高價格壓抑購買意願，消費者轉向追求高性價比。", "過度加工疑慮與口感落差，促使產品轉向潔淨標示與原型食物。", "傳統乳業發起命名標示抗爭，零售通路嚴格控管庫存與坪效。"],
    opportunity: "齋之味可主打潔淨標示、高CP值與少添加的原型素食產品，針對澳洲烤肉與起司市場開發具在地風味且價格親民的創新選項。",
    risk: "植物肉品牌面臨清算洗牌，傳統產業推動法規標示禁令，且大型超市隨時可能因銷量不佳將高價品下架。",
    watch: ["植物奶與植物肉產品命名標示法規審查進度", "Woolworths等大型連鎖超市產品線下架與調整動態", "UNSW等科研單位在植物起司與乳製品之技術商業化進程", "消費者對潔淨標示與高性價比植物基產品的回購率變化"],
  },
  {
    region: "歐洲", signal: "分化", note: "標示重整與原型變革", value: 72,
    headline: "歐洲植物基市場強勁擴張，然面臨標示禁令與健康轉型衝擊。",
    drivers: ["健康與永續意識抬頭，推動整體植物基市場規模達163億歐元。", "消費者偏好轉向潔淨標示、天然原型食物與豆類加工製品。", "歐盟提出嚴格肉類命名禁令，衝擊植物肉產品的包裝與行銷策略。"],
    opportunity: "順應歐洲潔淨標示與天然原型飲食趨勢，齋之味可研發低加工豆類蔬食料理，並以合規創新命名搶攻彈性素食市場。",
    risk: "歐盟與英國禁止使用31種肉類相關名稱，外銷產品面臨包裝全面更換與重新建立品牌認知之高額成本與通路下架風險。",
    watch: ["歐盟肉類命名禁令最終通過範疇與各國執行細則", "原型蔬食與低加工植物蛋白產品之銷售成長率", "彈性素食者對潔淨標示（Clean Label）產品的復購率", "英國與歐洲零售通路對植物基產品的架位調整動態"],
  }
];

const dailyBriefing = {
  title: "全球植物基迎來二次革命，勝負關鍵在於<strong>原型潔淨與體驗加值。</strong>",
  subtitle: "跨國市場顯示植物基已進入主流，但過度加工法規與爆發期後退潮帶來考驗；消費者正全面轉向追求天然原型、潔淨標章與精緻體驗加值。",
  decisionTitle: "鎖定彈性素客群，導向潔淨標示與體驗式產品。",
  decisionDetail: "非素食者已成消費主力，過度加工產品逐漸失寵。我方應轉向天然潔淨標籤，結合體驗行銷打動大眾市場。"
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
              <p className="eyebrow">2026年8月12日・星期三</p>
            </div>
            <div className="summary-line">今日彙整 {freshIntelligence.length} 則 · {highPriorityCount} 則核心關注</div>
          </div>
        </div>

        <div className="subline-bar">
          <div>台灣 / 美國 / 澳洲 / 歐洲市場 · 每日自動更新</div>
          <div>最後更新：<time dateTime="2026-08-12T22:47:17+08:00">2026/08/12 22:47</time></div>
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
              <p>每日 06:00 檢查公開評價與品牌提及；Google 評論最近查核：2026/08/12 22:47。</p>
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
