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
  },
  {
    id: 41123917,
    region: "台灣",
    topic: "法規標示",
    title: "【社論】深化食安改革：推動「加工食品原料來源透明化」納入《食安法》修法",
    summary: "本篇社論主張台灣食安改革不應僅停留在「業者自律」，應將「加工食品原料來源透明化」正式納入《食安法》修法。鑑於加工食品成分複雜且供應鏈漫長，單靠自主管理極易形成食安漏洞。若能透過法規強制要求業者公開與標示原料溯源資訊，將能有效保障消費者知情權，建立更值得信賴的食品產業鏈機制。",
    impact: "若未來《食安法》強制要求原料透明化，齋之味作為素食加工製造商，將面臨更高規格的供應鏈溯源審查。這雖增加採購與品保的管理成本，但能顯著提升品牌信任度並建立競爭壁壘。",
    action: "全面盤點現有素食加工原料之供應商溯源證明，預先建立透明化供應鏈履歷與標示準備。",
    owner: "品保法規",
    source: "上下游",
    url: "https://news.google.com/rss/articles/CBMiVEFVX3lxTFAwczdEbERSX0YtODF5N1VZMlk3cWtxTS1ORDF3MEcwZl9XamJMRG02QmFnOS0wOXZSLUFQdmNiclpqZkJCa19FUUREb0VwZVB2aDE4ag?oc=5",
    priority: "高",
    publishedAt: "2026-07-21",
    collectedAt: "2026-08-06",
    score: 92,
  },
  {
    id: 43692559,
    region: "台灣",
    topic: "法規標示",
    title: "美國FDA公布《食品安全現代化法案》特定食品額外追溯記錄最終法規",
    summary: "美國FDA發布FSMA（食品安全現代化法案）關於特定食品額外追溯記錄要求的最終法規。該新規旨在大幅提升食品供應鏈的透明度與可追溯性，要求相關製造商、加工商及進口商建立並妥善保存供應鏈各關鍵追溯點的紀錄（KDEs），以便在發生食品安全事件時快速定位風險來源，此法規將對外銷美國的植物基及食品業者帶來合規挑戰與記錄重整需求。",
    impact: "若齋之味有外銷美國業務或計劃拓展北美市場，須全面審視現有供應鏈溯源體系。原料供應商管理與產線追溯數據化將成為合規關鍵，若無法符合要求將面臨無法進入美國市場或退貨之風險。",
    action: "盤點出口美洲產品之原料供應鏈，導入符合FDA要求之數位追溯紀錄系統並進行合規性審查。",
    owner: "品保法規",
    source: "fda.gov",
    url: "https://news.google.com/rss/articles/CBMizwFBVV95cUxOLUpFeElsTVhoSmhiSmk3bDI3ZWJucWxHd05jN3FXRUNSTGtoSHB1VUpjMTd3aktFMlpsQWdNRF9hU1V2bU01Y1JoZWdWeXZNd05mLW9XX2s3Qk9vWGwtV0o3bm9EUXpFbXAzN3Nsb2VOSGtUNmJqa0dJTHJSalNSNnlxUDNZYzZKblcwMVEzcDY3b3pvb0hSUFdqNlBfN3BFZWlPVXIxdWJmcDQ5cmVKcnh0NERYLVF3RUlaNVBwdWlPYVF3QzhvUGtpeTFSSzA?oc=5",
    priority: "高",
    publishedAt: "2026-07-24",
    collectedAt: "2026-08-06",
    score: 92,
  },
  {
    id: 13661314,
    region: "台灣",
    topic: "競品",
    title: "植物肉龍頭 Beyond Meat 股價重挫：擬真素肉退燒的原因與產業啟示",
    summary: "植物肉龍頭 Beyond Meat 股價自高點暴跌至 3 美元，揭示植物肉市場面臨成長瓶頸。主因包括產品售價偏高、消費者對高度加工與添加物的疑慮，以及重複購買率不如預期。在全球通膨與飲食趨勢轉向原型健康的衝擊下，過度依賴擬真口感與話題行銷已難維持獲利，為全球素食產業帶來重大的警訊。",
    impact: "Beyond Meat 的挫敗顯示過度追求擬真與高價難以維持回購。這提醒齋之味應避免高度加工疑慮，轉而聚焦原型食材感、美味在地化與合理定價，以建立高黏著度的客群。",
    action: "評估現有擬真產品線之銷售效益，並盤點潔淨標示與原型蔬食產品的研發進度。",
    owner: "品牌行銷",
    source: "鏈新聞 ABMedia",
    url: "https://news.google.com/rss/articles/CBMiVEFVX3lxTE1pUXY3azR3TkprM0MwUEVYaFEyblljTFp5SHZZTjNycU9zcmhYREYzZV9MT1A3STAzVzdHelNBdnRxT0ZNX0RaWktoVkxGOGw5dl9lXw?oc=5",
    priority: "高",
    publishedAt: "2025-03-14",
    collectedAt: "2026-08-06",
    score: 92,
  },
{
    id: 56213711,
    region: "台灣",
    topic: "法規標示",
    title: "《食品安全衛生管理法》修法：全面強化食安管理與守護全民健康",
    summary: "行政院院會通過《食品安全衛生管理法》修正草案，重點旨在強化食安管理體系。修法內容涵蓋升級食品追溯追蹤機制、加強源頭管控、嚴格規範產品成分與標示真實性，並提高對違規業者的罰則金額。此法案亦特別關注植物基與素食產品之原料供應鏈透明度，要求明確落實標示合規，以守護國人飲食健康。",
    impact: "修法提高供應鏈稽核與標示合規要求，齋之味需重新檢視素食原料來源透明度、追溯機制及純素標示，確保產品全面符合新規，降低法規風險並強化品牌食安信任度。",
    action: "全面盤點現有產品標示與原料追溯履歷，評估包材更新需求並落實合規供應商管理。",
    owner: "品保法規",
    source: "ey.gov.tw",
    url: "https://news.google.com/rss/articles/CBMihwFBVV95cUxPMlBlTFhES3Z5N2pwS3FydTlsVVJpZ19QeUxuZlh2RUNuU18xMjNtSzlSdGtPZVZiMU5UbWl4SEdXUUtBZ05udkdwSkhRWHdZZ2ROdWN4VUZlUnVWenczT2tWMDJfRk9kemY0TkEtVmdIaTNTWjROTTRIS2VhNDlDZWJhRkxRT2M?oc=5",
    priority: "高",
    publishedAt: "2026-07-31",
    collectedAt: "2026-08-06",
    score: 92,
  },
{
    id: 28144157,
    region: "台灣",
    topic: "法規標示",
    title: "行政院拍板食安法修正案：食品業者須於24小時內通報，隱匿最高重罰3000萬元",
    summary: "行政院通過《食品安全衛生管理法》修正草案，針對食安事件強化業者責任。新法規定食品業者若發現產品有危害衛生安全之虞，必須於24小時內自主通報主管機關並採取預防性下架。若有隱匿或未依限通報者，最高可處以新台幣3000萬元罰鍰。此舉旨在提升食安事件處理效率，保障消費者權益。",
    impact: "新法大幅提高食安通報時效要求與罰鍰上限。對齋之味而言，極度考驗供應鏈追溯與品質監控應變能力，若有潛在品質異常需更迅速反應，否則面臨重大營運與商譽風險。",
    action: "檢視並優化內部食安通報標準作業流程，建立24小時緊急應變小組與產品追溯機制。",
    owner: "品保法規",
    source: "Yahoo新聞",
    url: "https://news.google.com/rss/articles/CBMirgNBVV95cUxQN2lpLUFQY0N5LWkwcElvejhzS29kRUl0clM0SDFIczBvZlFKRktRbE9PUXZOZkQxSzlPQzQ1YnFKWEp0eGJ5cWMzalBnNTBJV1FhRTBHNElMYjNGdkxzTm5Uand5UUlYcldyc1BHckNkMlIxSUpWOE96ZEhsLVJ6TWJ2M3ViV0JzMXY3ZmR0QktJeGo0OVY0NkxCUTlSZ3FXaUhJWUcwdzA3dmJzdDZmSEVsUllmMkM2VVBpeTRvTHJiRnFRSW1nZkdJWlhqNlNxU0J1ejVzbmtKdmlxdGNRZzRFUkRKUnlYZ1kwX3Q2WTJ0TzRnZlN0SXZkQmRCVnE3ZTRsYXRtcE1zbmpUdVJsUWstdU55MXdxSXpZaWRtaEVnRkJMNWtRS0cxbG10d0ZrXzNYM0QxUjJZU3lzTkl6dFA3R2tjR0hya2hYOTQ5aWJPS0g1TVNpUXdLS0trS0prblNzNmctVXJjS3BJb0NOVXNKbzBaYk9EZlFRUzBWQU5jVHdqcWk5N1gzTzRvd2pwRnhsRE9HRDIxdFlWd2F0ZS0yaGFpMlVTTFQybmFn?oc=5",
    priority: "高",
    publishedAt: "2026-07-22",
    collectedAt: "2026-08-06",
    score: 92,
  },
{
    id: 27542253,
    region: "台灣",
    topic: "法規標示",
    title: "食安法修法：行政院擬要求食品業者設立或委託第三方認證實驗室加強自主檢驗",
    summary: "行政院推動《食安法》修法，要求一定規模之食品業者須設立或委託第三方認證實驗室執行產品自我檢驗。此舉意在提升食品產業自主品管能力，強化整體食品安全防護網，預防違規添加物或標示不實問題發生。政府亦將研擬相關配套措施，輔導業者建立符合國際標準之檢驗機制。",
    impact: "食安修法將直接增加檢驗營運成本。對齋之味而言，極需確保原料與成品之植物性純度、無農藥殘留與無交叉污染，必須盤點委外檢驗預算，強化品管防線以維持品牌信任度。",
    action: "盤點目前合作之第三方認證實驗室，檢視檢驗項目與頻率，並評估合規成本與升級品管流程。",
    owner: "品保法規",
    source: "中央社 CNA",
    url: "https://news.google.com/rss/articles/CBMiX0FVX3lxTE5PcXhsX3I2TEtqa1VqQkZQTHIwdXB2UWk0VjJpWkJvSmIteEtsZk5DeU5KRVdoSk9iVEk5RC1hSFp4VzFtUTZyWHlYaUhTUFlLM2cza3VNMFJHQXBtaDFr?oc=5",
    priority: "高",
    publishedAt: "2026-07-18",
    collectedAt: "2026-08-06",
    score: 92,
  },
{
    id: 15296911,
    region: "美國",
    topic: "消費趨勢",
    title: "植物性蛋白市場規模預計於2034年達430.7億美元，受彈性素食需求與潔淨標示創新驅動",
    summary: "根據最新市場研究，植物性蛋白市場規模預計於2034年達到430.7億美元。此顯著增長主要得益於全球彈性素食者族群的迅速擴大，以及消費者對健康與環保意識的提升。此外，潔淨標示（Clean-Label）的技術創新亦成為關鍵推動力，驅使製造商開發成分更天然、加工度更低且高營養價值的植物蛋白產品，以滿足主流市場需求。",
    impact: "全球潔淨標示與彈性素食趨勢明確，齋之味需關注成分天然與少添加產品。這為品牌外銷及產品升級提供契機，可提升健康形象並吸引更多非傳統素食人口。",
    action: "盤點現有產品成分表，啟動潔淨標示（Clean-Label）產品線升級計畫，優化天然原料比例。",
    owner: "產品研發",
    source: "Yahoo Finance",
    url: "https://news.google.com/rss/articles/CBMigwFBVV95cUxQdGN3NW9IV2pFMzlNSTZBN2l5OXF6bHFZTXp4TU1mc2txcGVmOXJpNzlfNkIxd1YyR3ZDWjh4V0RWb01ZRkNnbWxQTEFZUVlGcDNnRk5lOXZ3ZDRHb0ZoZmctdzZzMzM4NXNOREhSanNtZ25YVkhzTWhXNHZzampKWlRjbw?oc=5",
    priority: "高",
    publishedAt: "2025-09-24",
    collectedAt: "2026-08-05",
    score: 92,
  },
{
    id: 94829123,
    region: "台灣",
    topic: "法規標示",
    title: "行政院提出食安法修法十項重點 強化食品安全與管理機制",
    summary: "行政院針對食品安全法規提出十項修法重點，旨在全面升級國內食安管理機制。內容涵蓋加重違規業者罰則、落實食品追溯追蹤系統、擴大檢驗項目與頻率、加強進口食品邊境查驗，以及完善問題產品的下架回收機制。政府盼透過修法落實源頭管理與風險控管，精準打擊不法業者，建構更完善的食品安全防護網，維護消費大眾健康與市場秩序。",
    impact: "食安法修法將提升植物基產品供應鏈稽核與標示合規要求。齋之味需加強原料來源追溯，嚴格評估供應商合規性，防範標示不符風險，維護品牌信譽。",
    action: "盤點現有產品標示與供應鏈追溯紀錄，配合新法修訂品保標準作業流程，確保零違規。",
    owner: "品保法規",
    source: "工商時報",
    url: "https://news.google.com/rss/articles/CBMiX0FVX3lxTE9XdkxxY05MV1dGbTF4a09OQ1hWUEFOa204M04xcGdULU9OVWRoMzdxcnYtYjdEeG02N1B4Qk9GYm81SkFRMDJrbEFqUGVyWXRub1RuWWZZb3ZFQ3BaRG9B?oc=5",
    priority: "高",
    publishedAt: "2026-07-21",
    collectedAt: "2026-08-05",
    score: 92,
  },
{
    id: 86660328,
    region: "台灣",
    topic: "法規標示",
    title: "2026台灣食安法修法解析：10大重點與最高3000萬罰則新舊對比",
    summary: "本文解析台灣2026年《食品安全衛生管理法》修法重點，涵蓋10項重大變更。修法大幅提高違規罰則，最高罰鍰達3000萬元，並強化追溯追蹤制度、產地與成分標示規範及源頭管理。新舊罰則對比顯示政府對食安違規採取零容忍態度，企業需全面審視供應鏈與合規性以降低營運風險。",
    impact: "修法提高罰則與標示要求，將增加齋之味在原料進貨檢驗、成分標示審查及供應鏈溯源管理之營運成本與合規壓力；若違反規定將面臨高額罰款與品牌形象重創。",
    action: "立即盤點全系列產品包裝標示與供應鏈溯源文件，並全面審查原料廠商之合規檢驗報告。",
    owner: "品保法規",
    source: "商周",
    url: "https://news.google.com/rss/articles/CBMiYkFVX3lxTE1ydTNsaFYwV0ZhbWY4M29lWFVuU2YwZUxpdVQ3N21nLTEwY0hsYjZOTnRoQm85SFFXajhDSExoUFRJWmhBSHNZSkQyZllyOEU3bGlfOU8weW5SazUxakUyVk93?oc=5",
    priority: "高",
    publishedAt: "2026-07-23",
    collectedAt: "2026-08-05",
    score: 92,
  },
{
    id: 69065753,
    region: "台灣",
    topic: "競品",
    title: "市值從150億跌至2.7億美元：植物奶巨頭Oatly的衰退啟示與重生轉型",
    summary: "植物奶龍頭Oatly市值從高峰的150億美元驟降至2.7億美元。這家曾憑藉精品咖啡通路策略與強烈品牌行銷席捲全球的企業，因過度擴張供應鏈、產能建立過慢錯失熱潮，加上通膨導致消費者轉向平價替代品，面臨嚴重虧損。如今Oatly正透過收縮產能、專注核心產品與改善營運結構進行重生轉型。",
    impact: "Oatly的跌落提醒齋之味，強大的品牌行銷若缺乏穩健的供應鏈與成本控管，極易遭遇危機。拓展新產品線時應避免盲目擴產，需維持產品性價比與營運韌性。",
    action: "評估現有素食產品線的生產成本與供應鏈風險，盤點核心主力產品並優化定價與營運結構。",
    owner: "品牌行銷",
    source: "Meet創業小聚",
    url: "https://news.google.com/rss/articles/CBMiWEFVX3lxTE1BSjIyaFhZVzI2SzkzRmxZVVFkZU1OVnFLQWx2WkVHeU1aZTVBVTFIU0dWYWtQc2lENWsteUxlSzhLRTVSaTdsVExMTGhxaGZfZnNFQWw3NTg?oc=5",
    priority: "高",
    publishedAt: "2025-09-16",
    collectedAt: "2026-08-04",
    score: 92,
  },
{
    id: 3040904,
    region: "美國",
    topic: "消費趨勢",
    title: "植物基市場已死，還是正在轉型演進？",
    summary: "本報導探討北美植物基食品市場的最新趨勢，指出植物基產業並非面臨終局，而是進入「轉型演進」階段。過去過度炒作導致市場放緩，現今消費者更回歸理性，注重產品的口感體驗、成分潔淨度（Clean Label）、營養價值與價格合理性。產業正淘汰劣質產品，朝向高質感、微加工與更具健康效益的新世代植物基產品邁進。",
    impact: "北美市場趨勢顯示消費者對過度加工植物肉熱情退燒。對齋之味而言，極需重視「潔淨標籤」與天然營養，若未能及時升級產品口感與健康訴求，將面臨流失新一代蔬食客群的風險。",
    action: "評估現有產品線之成分潔淨度，並研發低添加、高營養且美味的新世代蔬食產品。",
    owner: "產品研發",
    source: "DairyReporter.com",
    url: "https://news.google.com/rss/articles/CBMiiAFBVV95cUxNVWthUHhRSHh1MFI3UjJLVDQ5SXJlcmRGcFdGYUxfaHpKcnlqdFlmVzNzT2FqY0dnV2NVNW5OX05xakR1d0JKMzlKcG05NUNjNF9wb1hkUS1aWU5UV2FXcjJud3JiVlpGMnJZZmlRbVE3N2R6RGJhdjEycFU5ZjR3ZW1oMFlXTWM4?oc=5",
    priority: "高",
    publishedAt: "2025-12-18",
    collectedAt: "2026-08-03",
    score: 92,
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
    region: "台灣", signal: "分化", note: "風味轉型與食安升級", value: 78,
    headline: "台灣蔬食走向精緻異國化，食安修法同步強化供應鏈溯源透明。",
    drivers: ["精緻異國風味浪潮：法式與泰式蔬食打破傳統印象，掀起體驗式飲食風尚。", "健康與永續理念升級：八分飽與無抗生素風險觀念加速消費轉向植物基。", "食安法規嚴格溯源：政府推動原料透明化與數位治理，提高品質控管門檻。"],
    opportunity: "可聚焦研發異國特色風味與高質感植物肉產品，結合原料溯源透明化與低碳永續訴求，利用體驗行銷與線下市集吸引年輕與健康消費族群。",
    risk: "食安法修法強制要求原料溯源，大幅增加供應鏈合規與檢驗成本；若產品缺乏風味創新或難脫傳統素食標籤，將面臨市佔率被稀釋的風險。",
    watch: ["食安法修法進度與原料來源透明化之法規細則", "異國風味植物基冷凍調理包於主流通路的動能", "精緻純素體驗餐飲對零售產品線開發的導引效應", "美國FSMA供應鏈追溯新規對外銷外銷供應鏈之衝擊"],
  },
  {
    region: "美國", signal: "分化", note: "告別炒作、質感重整", value: 68,
    headline: "美國市場告別炒作走向理性，聚焦潔淨標示與質地突破。",
    drivers: ["60%高家庭滲透率下，彈性素食族群推動轉型與潔淨標示需求。", "植物酪蛋白與蛋白加工技術突破，解決熔解度與異味痛點。", "區域市場滲透率差異顯著，帶動在地化與精準通路佈局策略。"],
    opportunity: "瞄準潔淨標示與微加工趨勢，針對西岸與東北部高滲透區域，開發兼具高營養、天然成分與逼真質地的植物性海鮮與即食產品。",
    risk: "消費者過度加工疑慮升溫與價格敏感度增加，若產品未達天然潔淨標準或無法展現口感優勢，易面臨快速淘汰與通路上架壓力。",
    watch: ["植物基酪蛋白等關鍵技術商業化落地速度", "美國西岸與東北部以外區域的滲透率成長動能", "潔淨標示（Clean Label）產品之消費者重複購買率", "主流通路對微加工與新一代植物海鮮的排面調整"],
  },
  {
    region: "澳洲", signal: "分化", note: "肉基承壓、乳基成長", value: 55,
    headline: "澳洲植物基市場走向分化，植物肉承壓而植物乳穩步成長。",
    drivers: ["通膨與高度加工疑慮促使消費者轉向原型食物與潔淨標示。", "在地傳統烤肉文化深植，植物肉高價與風味落差成普及瓶頸。", "健康焦點轉移帶動機能性與高蛋白植物乳製品強勁成長。"],
    opportunity: "聚焦潔淨標示與平價高蛋白植物基產品，結合澳洲在地燒烤情境開發低加工感新選項，並填補超市熱門蔬食主食下架後的缺口。",
    risk: "大型超市通路架位調整與無預警下架風險高，加上資本退潮引發行業洗牌，若無法克服風味落差與高價格痛點將面臨滯銷。",
    watch: ["Woolworths 等主要零售通路架位與產品下架動向", "植物肉與原型肉品間之價差與促銷敏感度", "潔淨標示與高蛋白機能性產品之銷售成長率", "澳洲在地植物肉新創併購整合與市場洗牌進展"],
  },
  {
    region: "歐洲", signal: "分化", note: "法規限制與需求強勁", value: 72,
    headline: "歐洲植物基需求強勁，惟面臨肉類命名禁令之法規衝擊。",
    drivers: ["健康意識抬頭與環境永續關注，推動彈性素食族群顯著增加。", "植物基技術升級帶動風味與口感突破，促進產品回購率。", "起司與即食替代品等新興品類快速擴張，注入市場新成長動能。"],
    opportunity: "應把握植物肉與即食替代品翻倍成長浪潮，運用技術優勢研發符合歐洲風味的創新產品，並提早佈局非肉類聯想的品牌命名策略。",
    risk: "歐盟及英國擬禁素食產品使用漢堡、香腸等肉類名稱，強制業者更新包裝與重新行銷，大幅增加企業營運成本與消費者識別障礙。",
    watch: ["歐盟與英國肉類命名禁令法規正式定案與實施時程", "植物基產品包裝重新定位與命名轉換之消費者接受度", "植物基起司與即食替代品等新興品類的市場成長率", "主要連鎖通路對植物基新品牌的上架排面與促銷政策"],
  }
];

const dailyBriefing = {
  title: "植物基邁入深水區，競爭焦點轉向<strong>技術革新與潔淨標示</strong>。",
  subtitle: "全球植物基市場持續擴增，但大眾滲透面臨瓶頸與法規限制。產業焦點正全面轉向潔淨標示、精緻異國風味及突破性技術創新。",
  decisionTitle: "聚焦<strong>極致口感與潔淨配方</strong>，升級品牌價值。",
  decisionDetail: "消費者對過度加工疑慮上升，轉向追求潔淨與美味。我方應加速潔淨標章與質地突破，鎖定彈性素食族群。"
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
              <p className="eyebrow">2026年8月6日・星期四</p>
            </div>
            <div className="summary-line">今日彙整 {freshIntelligence.length} 則 · {highPriorityCount} 則核心關注</div>
          </div>
        </div>

        <div className="subline-bar">
          <div>台灣 / 美國 / 澳洲 / 歐洲市場 · 每日自動更新</div>
          <div>最後更新：<time dateTime="2026-08-06T06:40:53+08:00">2026/08/06 06:40</time></div>
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
              <p>每日 08:30 檢查公開評價與品牌提及；Google 評論最近查核：2026/08/06 06:40。</p>
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
