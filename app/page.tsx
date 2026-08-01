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
    id: 27333767,
    region: "歐洲",
    topic: "法規標示",
    title: "Ban on veggie ‘burgers’: plant-based products may lose meaty names in UK under EU law | Food & drink industry - The Guardian",
    summary: "法規政策更新：'Ban on veggie ‘burgers’: plant-based products may lose meaty names in UK under EU law | Food & drink industry - The Guardian'。食品標籤、命名或進出口限制法規的變動將直接影響商業運作。",
    impact: "法規調整將影響產品包裝標示、出口合規性。我方需確保主力 SKU 之標示符合最新政策規範。",
    action: "檢查目標出口市場之產品包裝標示與法規合規性。",
    owner: "品保法規",
    source: "The Guardian",
    url: "https://news.google.com/rss/articles/CBMivgFBVV95cUxNTG9jd0NSeXJIQWw4RG9XNE5NN1JyS1RhRzlfNjlYMVdwSTdpdGZSWVN4cW9WTkhiX25hdVZvbEd2T2xtNXhYVEpnV3lOOG9CVUZZd2NuVDhSWVVDV2tEak43Rjc5Qi1PenJvcVJqeTlYYmxoREl4b21VSlFVX3kxa1BqQjNSd2dPeFNOVEZmX0s1VkloWXlNaFB4R2tqQ0VTaDFCSGpnTTN2bjR3ZW9yajBKbll4blh6Vlo3UjFn?oc=5",
    priority: "高",
    publishedAt: "2025-11-20",
    collectedAt: "2026-07-31",
    score: 90,
  },
{
    id: 69503139,
    region: "美國",
    topic: "法規標示",
    title: "Klobuchar 被植物性產品委員會認可為生物經濟冠軍 - 美國參議員 Amy Klobuchar (.gov)",
    summary: "法規政策更新：'Klobuchar 被植物性產品委員會認可為生物經濟冠軍 - 美國參議員 Amy Klobuchar (.gov)'。食品標籤、命名或進出口限制法規的變動將直接影響商業運作。",
    impact: "法規調整將影響產品包裝標示、出口合規性。我方需確保主力 SKU 之標示符合最新政策規範。",
    action: "檢查目標出口市場之產品包裝標示與法規合規性。",
    owner: "品保法規",
    source: "U.S. Senator Amy Klobuchar (.gov)",
    url: "https://news.google.com/rss/articles/CBMi0gFBVV95cUxNMHZlSGhseHFkUnlLZ3RuTmRBck95b2VzbEFPeHZSUllicjUwUlBwS2dmbldqTTlFNzAzLUg5UVNhbzdZQXVBak5temtaX25NRmNlYTBObFk0ODVEUndadmktNVVQd2Y5U21McGF5YXpZM09WQ3NCcU8yRFM3dFZkS0RTLTFJYklMVkUwd1JKMmhpSW41aTE4QlhlMnBsamVzUHZjd19jbWJNQ0xfWEtqTXBvR3lsNUpadFBuOTNHSTU0aE40eEpOX3FiU1JFb2E5b2c?oc=5",
    priority: "高",
    publishedAt: "2026-05-15",
    collectedAt: "2026-07-27",
    score: 90,
  },
  {
    id: 94829123,
    region: "台灣",
    topic: "原料技術",
    title: "食安修法 政院列10重點 - ctee.com.tw",
    summary: "食品安全與品質與品質管控事件：'食安修法 政院列10重點 - ctee.com.tw'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "ctee.com.tw",
    url: "https://news.google.com/rss/articles/CBMiX0FVX3lxTE9XdkxxY05MV1dGbTF4a09OQ1hWUEFOa204M04xcGdULU9OVWRoMzdxcnYtYjdEeG02N1B4Qk9GYm81SkFRMDJrbEFqUGVyWXRub1RuWWZZb3ZFQ3BaRG9B?oc=5",
    priority: "高",
    publishedAt: "2026-07-21",
    collectedAt: "2026-08-01",
    score: 85,
  },
  {
    id: 11096756,
    region: "台灣",
    topic: "原料技術",
    title: "油品致癌物超標，台灣食安12年來的共犯結構 - peopo.org",
    summary: "食品安全與品質與品質管控事件：'油品致癌物超標，台灣食安12年來的共犯結構 - peopo.org'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "peopo.org",
    url: "https://news.google.com/rss/articles/CBMiSEFVX3lxTFBRcUFwcDhWMW5rVkNMa0xROHVxSGtRXzh0d2ZJRnRKV3VCMW1ObklxUTIwVkRfLTR1ZU5VazQyM3lidTBreWg2TQ?oc=5",
    priority: "高",
    publishedAt: "2026-07-04",
    collectedAt: "2026-08-01",
    score: 85,
  },
  {
    id: 37260906,
    region: "台灣",
    topic: "原料技術",
    title: "致癌油風暴延燒 食安辦卻失聲 國民黨：社會信任已破產，政府不能將食安風險交由人民承擔 - kmt.org.tw",
    summary: "食品安全與品質與品質管控事件：'致癌油風暴延燒 食安辦卻失聲 國民黨：社會信任已破產，政府不能將食安風險交由人民承擔 - kmt.org.tw'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "kmt.org.tw",
    url: "https://news.google.com/rss/articles/CBMiXEFVX3lxTE5tMldOQjdMT1Q2cnNYcUZOUTFkRWpYLXJVb05SMDNySFczQ3puNk5Nc0hCdkoyZVBlN3MwMjRybmQ1Sy1DMHFqQjRnUDg0eFRHaGVpQjBvLWZmQkF2?oc=5",
    priority: "高",
    publishedAt: "2026-07-13",
    collectedAt: "2026-08-01",
    score: 85,
  },
  {
    id: 39485565,
    region: "台灣",
    topic: "原料技術",
    title: "中國桂花驗出蘇丹紅！1700公斤全銷毀中國香料乾燥植物明年6/16前邊境逐批查驗- 營養好食 - TVBS 健康2.0",
    summary: "食品安全與品質與品質管控事件：'中國桂花驗出蘇丹紅！1700公斤全銷毀中國香料乾燥植物明年6/16前邊境逐批查驗- 營養好食 - TVBS 健康2.0'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "TVBS 健康2.0",
    url: "https://news.google.com/rss/articles/CBMiVkFVX3lxTFBCb3hscFhsYzMxc2dNRVVxellWcUVIZGtqcDZNTnUzLVRvRXVTRk9Lbk93TjJxN1BQbVduaHlBX2ZuVGdSTWpKbUVUckwyaDREWDFCUFl3?oc=5",
    priority: "高",
    publishedAt: "2026-06-30",
    collectedAt: "2026-08-01",
    score: 85,
  },
  {
    id: 21333405,
    region: "台灣",
    topic: "原料技術",
    title: "油品食安危機延燒！網點名1企業「完美躲過」 掀兩派熱議 - udn.com",
    summary: "食品安全與品質與品質管控事件：'油品食安危機延燒！網點名1企業「完美躲過」 掀兩派熱議 - udn.com'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "udn.com",
    url: "https://news.google.com/rss/articles/CBMiU0FVX3lxTE5XbEptVWhtbDIySzI4ZDZfd0lkbkJsTEE3bUJFOVRLSG4yd21XUlhORV9xVEpkMk9HZ2VaMlpVMjdHbTgxbS1YNF9vMVlHcENWeHBZ0gFYQVVfeXFMUHdSSDJId1F0VUFWd1VVVVcxVEY0WFdJVEJCbEd3VmNaNU9NVUk0dGJobmNrM0ZqUTZ0OEVjT3hpWWl1VG5HSURxY0syLTFJUWVXeEplb2VfRg?oc=5",
    priority: "高",
    publishedAt: "2026-07-17",
    collectedAt: "2026-08-01",
    score: 85,
  },
  {
    id: 33783750,
    region: "台灣",
    topic: "原料技術",
    title: "啟動糧農組織報告「再生塑膠和替代食品接觸材料（FCM）對食品安全的影響」的網路研討會 – 2026 年 5 月 13 日 - 糧食及 農業組織",
    summary: "食品安全與品質與品質管控事件：'啟動糧農組織報告「再生塑膠和替代食品接觸材料（FCM）對食品安全的影響」的網路研討會 – 2026 年 5 月 13 日 - 糧食及 農業組織'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "Food and Agriculture Organization",
    url: "https://news.google.com/rss/articles/CBMilgJBVV95cUxONV83ZU9RX2l2YVpsSXhaUjhXQ2I3dUMxUWE4U1h0RENzVjZuREV1eDB2Q2hXWGRJZlVSeXB1Ml9qTGhwSWFoUzNjWUJmRzd6QXJQNkFEUlRWeFBRb3B0MGJrbFk2WUk0QTBzWEhzOGxZSDUyU2xYSUFDRjJKTmd3T3hkcXZCaGtZc1NkUGxXWjRWa3Job1UxVkVuLW5nemk0dmtXLW1ybW9fX21NX2YxeXljaWdpdjBIb0Eyb1NXZzBFS0pxMzFIWTB4ajFkNzhkdjRfZzVzdWh5eWMtODNBSWJfNHZuVkpua0xCcVd5NVJMOFNPNVJrdDBwVnJoQ1VTaHZ4WWYtUWxXSnEzYmpuYnh4YXJydw?oc=5",
    priority: "高",
    publishedAt: "2026-04-15",
    collectedAt: "2026-08-01",
    score: 85,
  },
  {
    id: 87199837,
    region: "台灣",
    topic: "原料技術",
    title: "Krishnamoorthi 重新引入嬰兒食品安全法，對嬰幼兒食品中的有毒金屬設定可執行限制 - House.gov",
    summary: "食品安全與品質與品質管控事件：'Krishnamoorthi 重新引入嬰兒食品安全法，對嬰幼兒食品中的有毒金屬設定可執行限制 - House.gov'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "House.gov",
    url: "https://news.google.com/rss/articles/CBMiygFBVV95cUxQeXI5ck5fSlJmUFBTQ0MtS05sNVp5NmpmZHZ2YkxEb3J3ajRvTjhjNlp2ZU5YSC1kd0ZDejFUMnBPR1pvMFpwZlRhN2U1cG9YYWxyNlBwTG42OVMwVWlvOWJEcU1TbGg0OWpPaGcyV3FNMXowWHNzbWo4czgtV21aeWVzOERISGtMekh5VUFTZG5VRWRPXzJsNUpzT1BWN2xuZnpVYllYb2VKRkZtY1RPLTZHSWpGejgySTdGWEZJRWhjQXdFTG1Md0Z3?oc=5",
    priority: "高",
    publishedAt: "2026-04-22",
    collectedAt: "2026-08-01",
    score: 85,
  },
  {
    id: 32936235,
    region: "台灣",
    topic: "原料技術",
    title: "食品安全警報：因沙門氏菌問題而召回調味料 - 梅薩縣",
    summary: "食品安全與品質與品質管控事件：'食品安全警報：因沙門氏菌問題而召回調味料 - 梅薩縣'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "Mesa County",
    url: "https://news.google.com/rss/articles/CBMiqAFBVV95cUxOQnVYcEZMWnNDdjhsRTdSWmQwSjZ5VURqVGo0d2FJQ2ZKYkVkTG9GN29mOFNpYmNqcEFXZkt2Z0llTWlVMlFTR1NjTF9leEVtVGJ3NVBINE45Ty1LclJ3Vnk5aVZBc0lHUEpwWUE2enBMVUphaldEWWgtQV8tLW9FVS1uRFpJdGd6RHo1UHBJWnRJaVhLMWlIUXg0VVU5MG1iRzA1Z2RjNXc?oc=5",
    priority: "高",
    publishedAt: "2026-05-19",
    collectedAt: "2026-08-01",
    score: 85,
  },
  {
    id: 17647193,
    region: "台灣",
    topic: "原料技術",
    title: "2026 年世界食品安全日：EFSA 透過科學推廣更安全的食品 - EFSA",
    summary: "食品安全與品質與品質管控事件：'2026 年世界食品安全日：EFSA 透過科學推廣更安全的食品 - EFSA'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "EFSA",
    url: "https://news.google.com/rss/articles/CBMipgFBVV95cUxPTXR0c2RnVHVaY0JlTmFyc0sxU2dCQUd3NWEyemdFQUUyUjJXSm00U3d2Rko5azVtWjgwb3JTZk9UMHNzUnh4VEdPT3o3SkJrV3A4eFpSMURENlVGWVY4NjN6V3hRMVZ0ajRrRDZScDEzbHFKbEJ3enlDTHU0N0FNd0hDSG13ZkV6M3pRZjAxNXpFOV81SFRjYW9rdTE0d1E0NGZVOTl3?oc=5",
    priority: "高",
    publishedAt: "2026-06-05",
    collectedAt: "2026-08-01",
    score: 85,
  },
  {
    id: 66754462,
    region: "台灣",
    topic: "原料技術",
    title: "FDA 和 FSIS 的召回食品數量急劇增加 - foodsafetynews.com",
    summary: "食品安全與品質與品質管控事件：'FDA 和 FSIS 的召回食品數量急劇增加 - foodsafetynews.com'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "foodsafetynews.com",
    url: "https://news.google.com/rss/articles/CBMiuAFBVV95cUxOenRyQ3ZkUWpUUEM0V01HaVFCMnJqZ0hkaVFaQ0lhSnFIYVhZb0tReXRUMV83ZUZITUYxTnF0RW94MDFveGhIb1pkcjFRRms1M2Q1UzlhWVFLTU5BMzJyS29Tc2pGbzlBQVlydG1Ua09YTENXZm5KelY4ampwanJ2b2xWVXViVndydFFMYkNvSkFGREVpTGRHVDk4SVVkS3JINEF3cUpBZnJhcW1rWl80YlZZNnV5S25L?oc=5",
    priority: "高",
    publishedAt: "2025-12-05",
    collectedAt: "2026-08-01",
    score: 85,
  },
{
    id: 20426306,
    region: "台灣",
    topic: "原料技術",
    title: "早安世界》政院提修食安法 業者發現異常須24小時內通報、隱匿最高罰3000萬 - 中央社 CNA",
    summary: "食品安全與品質與品質管控事件：'早安世界》政院提修食安法 業者發現異常須24小時內通報、隱匿最高罰3000萬 - 中央社 CNA'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "中央社 CNA",
    url: "https://news.google.com/rss/articles/CBMiX0FVX3lxTFB0MDV5VUp0TmtCaUlHUTNPRlVCRndVcWNfUEstU1o1WnQ5SXN1N3ZnR09nU3NxR1ZPM0podWtWU0llcllOSFVRX1p6UWRUbVdYNnJLZE1GdTc3SDZTdW04?oc=5",
    priority: "高",
    publishedAt: "2026-07-23",
    collectedAt: "2026-08-01",
    score: 85,
  },
{
    id: 14934181,
    region: "台灣",
    topic: "原料技術",
    title: "行政院通過《食安法》修法草案 提高業者自主檢驗頻率 通報延遲罰鍰提高到3千萬元 - 農傳媒",
    summary: "食品安全與品質與品質管控事件：'行政院通過《食安法》修法草案 提高業者自主檢驗頻率 通報延遲罰鍰提高到3千萬元 - 農傳媒'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "農傳媒",
    url: "https://news.google.com/rss/articles/CBMiVkFVX3lxTE8tMU5HRzJzTDU1d0FIeTJvTHBvSUxBNWpBcjJ6cjFEVFRxVW5zSkZiSmUwY01LaFRLeWMzZE83SmpoSzRyQkJNVFRLN1hXZFFsT3VfQWR3?oc=5",
    priority: "高",
    publishedAt: "2026-07-23",
    collectedAt: "2026-08-01",
    score: 85,
  },
{
    id: 75562629,
    region: "台灣",
    topic: "原料技術",
    title: "「食品安全 基本人權」 黃敏惠市長出席「反毒油線上國是會議」研商聯防機制 守護市民食安 - 嘉義市政府衛生局",
    summary: "食品安全與品質與品質管控事件：'「食品安全 基本人權」 黃敏惠市長出席「反毒油線上國是會議」研商聯防機制 守護市民食安 - 嘉義市政府衛生局'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "嘉義市政府衛生局",
    url: "https://news.google.com/rss/articles/CBMifEFVX3lxTFBZT2hoUml0SVQ2WGlzVTR1V3haczNHa0w3WVdCOERfMWdqeWJ0N0NLTEo0b2JmWE1HMzVYbnFKNXI3Q3laQTh6V3FKd3VXaVdlWDhaRkhOd1RaNml1QlhqdDNpUGZyMnY4LUpPUFB1V3phUmFBXzI2UDc1LXU?oc=5",
    priority: "高",
    publishedAt: "2026-07-28",
    collectedAt: "2026-08-01",
    score: 85,
  },
{
    id: 63476539,
    region: "台灣",
    topic: "原料技術",
    title: "政院通過《食品安全衛生管理法》部分條文修正草案強化源頭管理、製程管理、異常通報、品質管理及數位治理|發展臺灣 - 僑新聞",
    summary: "食品安全與品質與品質管控事件：'政院通過《食品安全衛生管理法》部分條文修正草案強化源頭管理、製程管理、異常通報、品質管理及數位治理|發展臺灣 - 僑新聞'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "僑新聞",
    url: "https://news.google.com/rss/articles/CBMiS0FVX3lxTFBSUk1VcW5YV05taERvYW85YVFpVnRwZUpQaHJ2ODZkMkI5Z1RFRUIzRXVCZmphSHRRTm9oTk5WZ01ET29NWXg5dzVOcw?oc=5",
    priority: "高",
    publishedAt: "2026-07-23",
    collectedAt: "2026-08-01",
    score: 85,
  },
{
    id: 30589980,
    region: "台灣",
    topic: "原料技術",
    title: "詹長權觀點：《食品安全衛生管理法》可以怎麼修？ - 信傳媒",
    summary: "食品安全與品質與品質管控事件：'詹長權觀點：《食品安全衛生管理法》可以怎麼修？ - 信傳媒'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "信傳媒",
    url: "https://news.google.com/rss/articles/CBMiWkFVX3lxTE8zZ1VLQkc3UWdnQ2V3ZGNnNkhVZDdaYnpLNXVnd1JtaTVzU1dGbjJpZFdRZzMzQUxORmxDTS1wV1Nwd1VnaHVOMDJqSHZtVU43c2dRYjNIaWFKZw?oc=5",
    priority: "高",
    publishedAt: "2026-07-21",
    collectedAt: "2026-08-01",
    score: 85,
  },
{
    id: 29694607,
    region: "台灣",
    topic: "原料技術",
    title: "抗藥性、食品和食用動物|食品安全 - 疾病管制與預防中心 |疾病預防控制中心 (.gov)",
    summary: "食品安全與品質與品質管控事件：'抗藥性、食品和食用動物|食品安全 - 疾病管制與預防中心 |疾病預防控制中心 (.gov)'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "Centers for Disease Control and Prevention | CDC (.gov)",
    url: "https://news.google.com/rss/articles/CBMiakFVX3lxTFBqZ0tIS25zUlZINjBnMnNSbjVWZzdvb3RQUWhvWGs4VzV3VmxYWXBmcW5pYjJyd096LU93dVRyWG5kdHFvdU9mRnE0V0dFeHZPX2E0N1NORTBubERPaW9oaV9pUE5OdEtrMGc?oc=5",
    priority: "高",
    publishedAt: "2025-11-25",
    collectedAt: "2026-08-01",
    score: 85,
  },
{
    id: 83017179,
    region: "台灣",
    topic: "原料技術",
    title: "不，您不應因環孢菌而避免食用水果和蔬菜 - 消費者報告",
    summary: "食品安全與品質與品質管控事件：'不，您不應因環孢菌而避免食用水果和蔬菜 - 消費者報告'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "Consumer Reports",
    url: "https://news.google.com/rss/articles/CBMivwFBVV95cUxOTWdEUHV5a2xOOXZlRHNIUC1yQVhtSnk4RzF5LURocnNiY3hPZzZOTU5jVXFIT3Z4NmRwOWVQNjNjdkxlQkZ3OWE2V0huV2NRM1FDMWJuYlVXWWN2cm82MTdBaWlOYmdEZE41bDF2dWE0bDh0d0VVNDlWdUpuNFo4S2NwU0sxcEVWSUlxUHd2dV9aVlFra0c2VVU2STg3bnVNWF82LUJnLUJpRVp2OENHZEkzN0xRU000eVRIMDFOYw?oc=5",
    priority: "高",
    publishedAt: "2026-07-24",
    collectedAt: "2026-08-01",
    score: 85,
  },
{
    id: 74493146,
    region: "台灣",
    topic: "原料技術",
    title: "食品安全應以風險而非零檢測為指導 - news.cornell.edu",
    summary: "食品安全與品質與品質管控事件：'食品安全應以風險而非零檢測為指導 - news.cornell.edu'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "news.cornell.edu",
    url: "https://news.google.com/rss/articles/CBMikwFBVV95cUxOUHZDNWVFTUpFZF8zSVZIU3dYYjhheDJsSmNmcHZBRy1BSmVEZnZLcHVQUmN5ekp4QzV6SmdsSUFPamNqU2dNVUtSQjQ2TkY2SXdXRWNIYVdnM1d3YW83djM3Znd0Qm5XblVrUEE1LW4xMnpfazBTRVBPeVVmY1hrV1R2MDZxSFlBMjh4MmVGcWhpc2M?oc=5",
    priority: "高",
    publishedAt: "2026-03-17",
    collectedAt: "2026-08-01",
    score: 85,
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
              <p className="eyebrow">2026年8月1日・星期六</p>
            </div>
            <div className="summary-line">今日彙整 {freshIntelligence.length} 則 · {highPriorityCount} 則核心關注</div>
          </div>
        </div>

        <div className="subline-bar">
          <div>台灣 / 美國 / 澳洲 / 歐洲市場 · 每日自動更新</div>
          <div>最後更新：<time dateTime="2026-08-01T16:47:51+08:00">2026/08/01 16:47</time></div>
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
              <p>每日 08:30 檢查公開評價與品牌提及；Google 評論最近查核：2026/08/01 16:47。</p>
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
