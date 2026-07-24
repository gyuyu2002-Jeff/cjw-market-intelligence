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
    id: 4248989,
    region: "台灣",
    topic: "消費趨勢",
    title: "95%客人不是素食者 英國首家米其林星級植物性餐廳怎麼做到？ - 食力 foodNEXT",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'95%客人不是素食者 英國首家米其林星級植物性餐廳怎麼做到？ - 食力 foodNEXT'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiaEFVX3lxTE9fWEtnNERnYWtYVXFCVHc3N3VrTkoxdUN2eVJTTldEaDdLS1oySWU3aURMemFyNF9VTFkwZjQxc1FPUHJGcnpjWUwyTUh5X0stUkVuZzM4UEs2dWNKcXROdTVsYTdkQVFV?oc=5",
    priority: "中",
    publishedAt: "2025-12-18",
    collectedAt: "2026-07-24",
    score: 70,
  },
  {
    id: 69794634,
    region: "台灣",
    topic: "消費趨勢",
    title: "「吃蔬食8分飽」能提高身體代謝？改變吃太多的飲食習慣 讓身體及生態都更和諧！ - 食力 foodNEXT",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'「吃蔬食8分飽」能提高身體代謝？改變吃太多的飲食習慣 讓身體及生態都更和諧！ - 食力 foodNEXT'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiZEFVX3lxTE8yR1M0dGFETk5sUWQzLUNVb1dwTVJ1NXo1cVFvQWVHU3lIcFd6WnVOc2E1NUhyQ0JpMFB2ZXRKdlhtSDNkTUxId25kM2x5SG41QjBpTlo0SW1hcTBrQkxHRVUzWWo?oc=5",
    priority: "中",
    publishedAt: "2024-08-13",
    collectedAt: "2026-07-24",
    score: 70,
  },
  {
    id: 38977097,
    region: "台灣",
    topic: "消費趨勢",
    title: "在市場裡做蔬食法餐？高雄鹽埕市場裡的Vegan法餐秘密基地「The Borage」 - 食力 foodNEXT",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'在市場裡做蔬食法餐？高雄鹽埕市場裡的Vegan法餐秘密基地「The Borage」 - 食力 foodNEXT'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiW0FVX3lxTE1iWHI1TlktQ2s1ODVTa1NHVTBPSWxqZjRjMUVvNi1SdlFZYWhxeFlWRmF3bHVraWJ1VEFGYXBWbV9qWTlmRjlPcWhqYVhzVjEycXlBRTR1MG5IUEU?oc=5",
    priority: "中",
    publishedAt: "2025-05-14",
    collectedAt: "2026-07-24",
    score: 70,
  },
  {
    id: 65358122,
    region: "台灣",
    topic: "消費趨勢",
    title: "素食風潮退燒了嗎？比爾蓋茲「未來肉」公司股價崩跌、肉食搜尋量增87% - 食力 foodNEXT",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'素食風潮退燒了嗎？比爾蓋茲「未來肉」公司股價崩跌、肉食搜尋量增87% - 食力 foodNEXT'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiZ0FVX3lxTE1uTENJZ2ZPREh0dHVaTlpTb2xQWFZWZURiMkpQS3lsS1FZTkN5NFYxeUFBTFowaEdsZ0xEd3labEdISXVpcDVZUU4yWEF6OHBoQndJa1pxeGRicFY2N3BQTEdBdWRSMVk?oc=5",
    priority: "中",
    publishedAt: "2025-02-27",
    collectedAt: "2026-07-24",
    score: 70,
  },
  {
    id: 9539619,
    region: "台灣",
    topic: "消費趨勢",
    title: "泰式料理遇上蔬食革命！泰維根如何從冷凍調理包做到國際市場？ - 食力 foodNEXT",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'泰式料理遇上蔬食革命！泰維根如何從冷凍調理包做到國際市場？ - 食力 foodNEXT'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiakFVX3lxTFBjeDlhUEdCeEtKR0VYMDVGWUpSNmh5RmxqUFVMUk1JdFdOWDZubUpJQ2tQQmlnTENtZ0ZnZUtDc2RYLUR6N1Q3bDFwNzJ3bUw3VUI0UDB0TktZeWtsU3QwTi1Mc1hzNk9MOWc?oc=5",
    priority: "中",
    publishedAt: "2025-10-10",
    collectedAt: "2026-07-24",
    score: 70,
  },
  {
    id: 99167306,
    region: "美國",
    topic: "消費趨勢",
    title: "普渡大學舉辦植物性食品開發與行銷競賽 - 普渡大學 - 農學院",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'普渡大學舉辦植物性食品開發與行銷競賽 - 普渡大學 - 農學院'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Purdue University - College of Agriculture",
    url: "https://news.google.com/rss/articles/CBMitwFBVV95cUxQNTNNS3VCaFNiOW9ndFItb212RmN5Z2RnUkxKRGhTUGczZXdMVkx4SGx6VnFFbXpIQkZqSlhRc2dZV2hnQmc5UEl4bG92QTBEZnVjZC1fa3k1aFo3elFpRXVhNkk3T1ZzZ3BPdFAxd1pNQTIwQm9JUXNySEo0cVRkWFU5c3lTYlFHXzZJZXhPamoyNld5Y04zS1RMckhSMGt5NW9qSWJpWHRnYXNleEhYeFhzR2swRjg?oc=5",
    priority: "中",
    publishedAt: "2025-10-02",
    collectedAt: "2026-07-24",
    score: 70,
  },
  {
    id: 49927134,
    region: "美國",
    topic: "消費趨勢",
    title: "破解密碼：克服植物性產品開發中的挑戰 - RTI International",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'破解密碼：克服植物性產品開發中的挑戰 - RTI International'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "RTI International",
    url: "https://news.google.com/rss/articles/CBMiggFBVV95cUxPNHdlYnBSd3FwcmNRanBpQjlFeGd0a3JNNFFqWXJkcG9yeC1GRml5akZJUjVXbjBHeXdJQ0wtc25Pdy1wSE50eHk2Q3phLWhzTTlTRGhxS0I2QlRxRENkdU5MQnNBd1Z5UHNTUjBDUzZaVWp1djBZMVBDWXF2M3ZORjVn?oc=5",
    priority: "中",
    publishedAt: "2025-11-21",
    collectedAt: "2026-07-24",
    score: 70,
  },
  {
    id: 96155498,
    region: "美國",
    topic: "新品",
    title: "25 種植物性食品將於 2025 年上市 - TriplePundit",
    summary: "新品上市動向：'25 種植物性食品將於 2025 年上市 - TriplePundit'。這顯示了該地區在替代蛋白或素食創新產品上的最新趨勢。",
    impact: "研究該新品的口味、配方與主打客群，有助於齋滋味發掘適合台灣或出口市場的潛在產品方向。",
    action: "評估此類新品是否有進行本地化開發與改良的商業價值。",
    owner: "品牌行銷",
    source: "TriplePundit",
    url: "https://news.google.com/rss/articles/CBMiaEFVX3lxTE9ZZVNBUDVCZTV3aHVQTDNjQVlBU1F3LXkyWWMwTktvWjVSdDNtWjg5cjV3ejd3UTBMeDAyVnNObGlnMnRzaTlLV3EzRE9oMGlsYWVoUngxeHc0RkdMOEtoT09BQkVERW9p?oc=5",
    priority: "中",
    publishedAt: "2024-12-24",
    collectedAt: "2026-07-24",
    score: 75,
  },
  {
    id: 77821710,
    region: "美國",
    topic: "消費趨勢",
    title: "「植物性」產品標籤能告訴你什麼，不能告訴你什麼 - Marketplace.org",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'「植物性」產品標籤能告訴你什麼，不能告訴你什麼 - Marketplace.org'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "marketplace.org",
    url: "https://news.google.com/rss/articles/CBMimwFBVV95cUxPYzFPOXVaSGlydE9tdHdicWVOSnBic2tKbUhQUzZ0WHV1ejFrMnUyUzR3T2N0bkJIREktb2d6T3JzSnhQR1N4bnJ0QkVWMndzaWV6RTRfU1hiRUpTNkpINWlleTM1LWVXcW9RYUxtbUFuV0VJanVUdGp3b0tFQVpNMWV4VHVWa25YdHN0eHo3VXNpSVFTaHNxYVAyNA?oc=5",
    priority: "中",
    publishedAt: "2026-03-16",
    collectedAt: "2026-07-24",
    score: 70,
  },
  {
    id: 3040904,
    region: "美國",
    topic: "消費趨勢",
    title: "植物性食品已經消亡還是正在演化？ - DairyReporter.com",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'植物性食品已經消亡還是正在演化？ - DairyReporter.com'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "DairyReporter.com",
    url: "https://news.google.com/rss/articles/CBMiiAFBVV95cUxNVWthUHhRSHh1MFI3UjJLVDQ5SXJlcmRGcFdGYUxfaHpKcnlqdFlmVzNzT2FqY0dnV2NVNW5OX05xakR1d0JKMzlKcG05NUNjNF9wb1hkUS1aWU5UV2FXcjJud3JiVlpGMnJZZmlRbVE3N2R6RGJhdjEycFU5ZjR3ZW1oMFlXTWM4?oc=5",
    priority: "中",
    publishedAt: "2025-12-18",
    collectedAt: "2026-07-24",
    score: 70,
  },
  {
    id: 26806391,
    region: "歐洲",
    topic: "原料技術",
    title: "歐洲植物性肉品市場趨勢報告 2025-2033 |健康意識、永續發展焦點和不斷變化的消費者偏好推動擴張 – ResearchAndMarkets.com – vegconomist",
    summary: "食品科技突破：'歐洲植物性肉品市場趨勢報告 2025-2033 |健康意識、永續發展焦點和不斷變化的消費者偏好推動擴張 – ResearchAndMarkets.com – vegconomist'。這項替代蛋白或食品加工技術的突破，可為素食口感帶來革新。",
    impact: "新原料與技術可應用於改善植物肉、素海鮮等質地，有助於我方研發團隊提升產品的保水與乳化性。",
    action: "收集該項新技術或新原料的規格說明與法規核准進度。",
    owner: "產品研發",
    source: "vegconomist",
    url: "https://news.google.com/rss/articles/CBMilwFBVV95cUxPdVVfaFVXNEEyWmdoY0x3bC12dXViZjA5R1JyWVFTV2hlaUZWZU1PVHZ6dnVXLVdRS2psVUp4dWowOEVYdVpldjktMVFSRkRrUFFOZkZsbTlHTm9rOTRyVEFPc25UeGlldEVvMnNJdHNra3NHajVkY3BSYVV5YzNENlY5TUh3UllvNUdGaWZydnd2RG5DN3pZ?oc=5",
    priority: "中",
    publishedAt: "2025-08-11",
    collectedAt: "2026-07-24",
    score: 72,
  },
  {
    id: 61063818,
    region: "歐洲",
    topic: "消費趨勢",
    title: "純素食品市場規模、產業報告、2035 年分析 - 市場研究未來",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'純素食品市場規模、產業報告、2035 年分析 - 市場研究未來'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Market Research Future",
    url: "https://news.google.com/rss/articles/CBMid0FVX3lxTFB4eHhqMVhEYVBDcXFQTnBoeGVoUzBVNFQtYm5id1p0RXFKNUhtWmZmSFB1WFppX0NsWldzS0xXbGNQT05GTDU2bGRCbkNmVGhSX0xEUERuRGVOLXQ5UmI4RzJEMlVxaVU2Zkg1UWU5SUFNLTRteDQ0?oc=5",
    priority: "中",
    publishedAt: "2026-04-24",
    collectedAt: "2026-07-24",
    score: 70,
  },
  {
    id: 37624096,
    region: "歐洲",
    topic: "新品",
    title: "到 2030 年，植物性肉品市場「價值將增長一倍以上」 - Plant Based News",
    summary: "新品上市動向：'到 2030 年，植物性肉品市場「價值將增長一倍以上」 - Plant Based News'。這顯示了該地區在替代蛋白或素食創新產品上的最新趨勢。",
    impact: "研究該新品的口味、配方與主打客群，有助於齋滋味發掘適合台灣或出口市場的潛在產品方向。",
    action: "評估此類新品是否有進行本地化開發與改良的商業價值。",
    owner: "品牌行銷",
    source: "Plant Based News",
    url: "https://news.google.com/rss/articles/CBMiggFBVV95cUxNcXNHc3dscmRoSFJSclo3cHlnRlNSWXJWQzBqeDFmZ1ZlakZYZjFBRnhvbmV5S3VBZnJzSkYtM0NLeUpGTHVqVnJnQ2FtNHRvS2xaNGppSDRabW94Uy0tQ0ttMTgtaFZIVEJzUExLOVFKX3JzS1hkUkpJYTJ4ck9XNER3?oc=5",
    priority: "中",
    publishedAt: "2025-03-10",
    collectedAt: "2026-07-24",
    score: 75,
  },
  {
    id: 27333767,
    region: "歐洲",
    topic: "消費趨勢",
    title: "禁止素食“漢​​堡”：根據歐盟法律，植物基產品可能在英國失去肉類名稱食品和飲料行業 - 衛報",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'禁止素食“漢​​堡”：根據歐盟法律，植物基產品可能在英國失去肉類名稱食品和飲料行業 - 衛報'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "The Guardian",
    url: "https://news.google.com/rss/articles/CBMivgFBVV95cUxNTG9jd0NSeXJIQWw4RG9XNE5NN1JyS1RhRzlfNjlYMVdwSTdpdGZSWVN4cW9WTkhiX25hdVZvbEd2T2xtNXhYVEpnV3lOOG9CVUZZd2NuVDhSWVVDV2tEak43Rjc5Qi1PenJvcVJqeTlYYmxoREl4b21VSlFVX3kxa1BqQjNSd2dPeFNOVEZmX0s1VkloWXlNaFB4R2tqQ0VTaDFCSGpnTTN2bjR3ZW9yajBKbll4blh6Vlo3UjFn?oc=5",
    priority: "中",
    publishedAt: "2025-11-20",
    collectedAt: "2026-07-24",
    score: 70,
  },
  {
    id: 48990470,
    region: "歐洲",
    topic: "消費趨勢",
    title: "隨著肉類和乳製品價格差距縮小，歐洲植物基銷售額增長 3% - Green Queen Media",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'隨著肉類和乳製品價格差距縮小，歐洲植物基銷售額增長 3% - Green Queen Media'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Green Queen Media",
    url: "https://news.google.com/rss/articles/CBMinAFBVV95cUxQQkYwQ0x2QWFMQkoxZjU3eEJsQzZfSElJczI0bGw3SW5sRXo2cWh5VGdtZ1JGSWdXMnI3cUNHUzdvbmFOcHB1bUxsRWpqTUh3c2pTNW8yQnBTcVFPUk9oLUM5eDRVV1d4eC14UFI0RzQ1WGlRWVhWRjdfQWwtUzBYTmNncVZZNGVOeVdTUzFmejRWeGh2MDhJXzUtdzA?oc=5",
    priority: "中",
    publishedAt: "2026-06-09",
    collectedAt: "2026-07-24",
    score: 70,
  },
  {
    id: 5923352,
    region: "澳洲",
    topic: "消費趨勢",
    title: "我們是否已經失去了對肉類和乳製品替代品的胃口？ - 對話",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'我們是否已經失去了對肉類和乳製品替代品的胃口？ - 對話'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "The Conversation",
    url: "https://news.google.com/rss/articles/CBMilwFBVV95cUxPR0t4V2VaNEhCTDdUbGV3dWY4N01VZG1PUDhIMFhkaFQ4Z0ZuQS1YYW9tRWgzckttODFWc2M1djF2NFU5cGpOalNuZm10WXpTcVM1MERaeVR3R1dOSS1pWUN3VmNRUGVnaHdVUThVREpwcDc3TmhsZklHTVJqdDB5Zm5jMU8wU3Zma0U3YUxnbjkwV0V1STJZ?oc=5",
    priority: "中",
    publishedAt: "2026-06-16",
    collectedAt: "2026-07-24",
    score: 70,
  },
  {
    id: 47222874,
    region: "澳洲",
    topic: "消費趨勢",
    title: "芭比之戰：是什麼阻礙了澳洲植物肉的發展 - 麥考瑞大學",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'芭比之戰：是什麼阻礙了澳洲植物肉的發展 - 麥考瑞大學'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Macquarie University",
    url: "https://news.google.com/rss/articles/CBMiwwFBVV95cUxNMkJ6WkJBc0NJSHhqUXM5bzFjZGpjSm40V1dKXy1HV1NNSkthM2dfTVhTQ19Pejd4RnFoUEttM1A0cTVRNVhYeTNhRlpVMlNwZHF1MzZRajh3OU93RnN4SGJMTENLckRKQ2pKc3o1X2JKYm5mdHFVOXkzZ2ZEVTF4VVk3aWphOTRGNzQ3ZlR1QV92cDVSclFSdlZ3eUxRYXVySng3TkZlYmRCNVQ4ekFSS1BoSU90dGxVQTdkclpNbEhiV3c?oc=5",
    priority: "中",
    publishedAt: "2025-12-08",
    collectedAt: "2026-07-24",
    score: 70,
  },
  {
    id: 4088628,
    region: "澳洲",
    topic: "新品",
    title: "Doctors For Nutrition 呼籲 Woolworths 提供更多植物性食品 - Medianet News Hub",
    summary: "新品上市動向：'Doctors For Nutrition 呼籲 Woolworths 提供更多植物性食品 - Medianet News Hub'。這顯示了該地區在替代蛋白或素食創新產品上的最新趨勢。",
    impact: "研究該新品的口味、配方與主打客群，有助於齋滋味發掘適合台灣或出口市場的潛在產品方向。",
    action: "評估此類新品是否有進行本地化開發與改良的商業價值。",
    owner: "品牌行銷",
    source: "Medianet News Hub",
    url: "https://news.google.com/rss/articles/CBMivgFBVV95cUxOTWV3Nl91cTNqbzVwS3k0RG1ISUs1MTNoc1EtSktrZnVjeWdGb3hiaWptOFB1VE1ZVktrcHZkOXF2a2k2VE5pd0J3S0ZvdDJLMC00Vnd0SmUtX1hsTWE2MV9jSVlSX3dxaTZXckg2eWlKNmhTZklrb0VLNXR1b1VkVjR2YzFhMDFqbW9sSTRPT1ZlQzExak00M2l5aTNHU2hJbHZGc2Zsc09OYVg0MlFnZ3Y2Ny1paExMX2NqNXN3?oc=5",
    priority: "中",
    publishedAt: "2026-04-29",
    collectedAt: "2026-07-24",
    score: 75,
  },
  {
    id: 72583097,
    region: "澳洲",
    topic: "消費趨勢",
    title: "人造肉大崩盤正在席捲植物漢堡 - AFR",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'人造肉大崩盤正在席捲植物漢堡 - AFR'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "AFR",
    url: "https://news.google.com/rss/articles/CBMiuwFBVV95cUxPRTVDNW5oaWJ5bHdKM21iYllEVnpJbHhSbWFzYy1RcEZCdnNGUlJOWVJCaDZacFVoRjlSUGpfa3N6ckQtMFYzZTNITW5tMy05Sk0tZmtlSWlESHdOMWIyUWpUbE5RQVlsTHp0VXg0cHJYM0lJVmw1ckRURkFPVHFabTRIUzlFX1FlbFNuYmQ5MVJwWHVOaVhVWTdPajZxdG1WOTliTE1qZ3k1dnFRbk9BNTZCcXRRSGlIXzJv?oc=5",
    priority: "中",
    publishedAt: "2026-03-27",
    collectedAt: "2026-07-24",
    score: 70,
  },
  {
    id: 83216176,
    region: "澳洲",
    topic: "消費趨勢",
    title: "以環保的植物性替代品消除時尚界對皮革的依賴 - CSIRO",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'以環保的植物性替代品消除時尚界對皮革的依賴 - CSIRO'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "CSIRO",
    url: "https://news.google.com/rss/articles/CBMihwFBVV95cUxPRGNyWkdwVi1hUW9Wb3I4N05PVnl2NnBGX09ObEQ4MVI2VThKanFsanBPalRhdHotS3pYc1Q5S3U1YTFtQ256Zmw4QkJsa3BYSDdDZmFQdWxkNUh2b1lwbFhFeHdBdVJXaE01dm94U21pVC12cVFtVHh1THZzdklpSzN3OXNackE?oc=5",
    priority: "中",
    publishedAt: "2025-03-28",
    collectedAt: "2026-07-24",
    score: 70,
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
    publishedAt: "2026-07-22",
    collectedAt: "2026-07-24",
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
    collectedAt: "2026-07-24",
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
    collectedAt: "2026-07-24",
    score: 85,
  },
  {
    id: 5650183,
    region: "台灣",
    topic: "原料技術",
    title: "食安可放寬 信任不能打折 - 經濟日報",
    summary: "食品安全與品質與品質管控事件：'食安可放寬 信任不能打折 - 經濟日報'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "經濟日報",
    url: "https://news.google.com/rss/articles/CBMiWkFVX3lxTFA3UldQWHJIaTdKWFFFTzFleXlINzlRTmpHMzlvZkJ0Z2U5cHB4ZjAtS1RkUXBQWmo3OVptWkdaU083UlFIVkx4YVhNSkxOcDNhaEtxV1FMcVRod9IBX0FVX3lxTFBIMmtjbHJzbWFSVGZNd1p4N3F6UW5MSkZXWVZRWS1XRVQyWHFiRWNkLW5SeW1BZnlCZzc0U21sRFJ6OS1FQ3pac2xHRWgzUEh4aFR1VUZ0OFZHNlhubmJn?oc=5",
    priority: "高",
    publishedAt: "2026-07-21",
    collectedAt: "2026-07-24",
    score: 85,
  },
  {
    id: 75101234,
    region: "台灣",
    topic: "原料技術",
    title: "就怕毒油風暴重演！中央擬設「食安指揮中心」：延遲隱匿罰3000萬 - 優活健康網",
    summary: "食品安全與品質與品質管控事件：'就怕毒油風暴重演！中央擬設「食安指揮中心」：延遲隱匿罰3000萬 - 優活健康網'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "優活健康網",
    url: "https://news.google.com/rss/articles/CBMiU0FVX3lxTE5uM1Yxa0FnU1o5R1JiUUtMQzFaUy1BY1gwa1hXS2Q1Ty1aRVZHM25fS3JfQXg4S3dxV1hZTmZRakxrZjJDMmZDejBXNll6d1ZtRUxv?oc=5",
    priority: "高",
    publishedAt: "2026-07-21",
    collectedAt: "2026-07-24",
    score: 85,
  },
  {
    id: 57722165,
    region: "台灣",
    topic: "原料技術",
    title: "馬薩諸塞州環孢子蟲病爆發引發食品安全警報 - WWLP",
    summary: "食品安全與品質與品質管控事件：'馬薩諸塞州環孢子蟲病爆發引發食品安全警報 - WWLP'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "WWLP",
    url: "https://news.google.com/rss/articles/CBMioAFBVV95cUxOVHFwMHp4bm5FT0RaNDBLTmg0Sm5jUHlPOHFlY1hhVGhJd3N5dE01Zjh2eDMyakVsUWIwYUF0SjVCLUZQVzFabXBEUWFOZjRRSjU2RnRtNWFLTGVoSDU0NU5RUFV4VERmVXBnRkhvckJ5eG5nLXVqNjk4VlJRNGtDMk15Z0c1c1djdFd1VXpCRDBDS3hBeDNnaEw2TkNJcTNM0gGmAUFVX3lxTFBPYzJvQkVEWlFDOUx6LWc1RjVQeTNiTzh2OW53elpVUVhIRUdaSVh1TExYcHVKTkJsUWVlX2tMTnRaY0hyX3hnQ2QxZldzRnViNENZcHB2bzduamQ0SlVWdGFlRldfUS1ZWDBNX2hPNjc0em9QWnpRakJROGZGbmNpSDVlRVNrLS1iWE5MRDFnN196QTlPWlBFZENFT0pnM1U4b2c2Zmc?oc=5",
    priority: "高",
    publishedAt: "2026-07-08",
    collectedAt: "2026-07-24",
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
    collectedAt: "2026-07-24",
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
    collectedAt: "2026-07-24",
    score: 85,
  },
  {
    id: 84267605,
    region: "台灣",
    topic: "原料技術",
    title: "病原體和食品安全：從農場到餐桌 - 公共利益科學中心",
    summary: "食品安全與品質與品質管控事件：'病原體和食品安全：從農場到餐桌 - 公共利益科學中心'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "Center for Science in the Public Interest",
    url: "https://news.google.com/rss/articles/CBMiRkFVX3lxTFBETkVDdFN6emlNVXQwVGlsb20tck9MeE5GYmxMa1JQTDQybXFCV0tJdlktd0ZzQ0hZY1FiY09WWUwtVnZNOVE?oc=5",
    priority: "高",
    publishedAt: "2025-11-08",
    collectedAt: "2026-07-24",
    score: 85,
  },
  {
    id: 67948669,
    region: "台灣",
    topic: "原料技術",
    title: "食品安全警報：因塑膠問題而召回植物性產品 - 梅薩縣",
    summary: "食品安全與品質與品質管控事件：'食品安全警報：因塑膠問題而召回植物性產品 - 梅薩縣'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "Mesa County",
    url: "https://news.google.com/rss/articles/CBMiswFBVV95cUxOQTNFWXptWDAxRUVkNzJ4cHV4TkVsUGg1dlY5WWZqcjdZM3oxTm8zclB5bFBhaThVNjVwWmJNaXR1MGJyVmtuVmNXTE5uVXVYUFRTelJwNTZlR0tkdHlTYl96WVg3NTFGSk5YYlp3YmRtb1FTNkZNU1NoVjB2ZE9oWFdveGFmNW1TVzNNQ3FPV0daSWdaYzhvaDZzMmlOLWc4eXYzenpvOTZXYXlXUkhjOWEzOA?oc=5",
    priority: "高",
    publishedAt: "2026-06-24",
    collectedAt: "2026-07-24",
    score: 85,
  },
  {
    id: 69065753,
    region: "台灣",
    topic: "競品",
    title: "從150億到2.7億，Oatly做錯了什麼？植物奶明星企業的殞落與重生 - Meet創業小聚",
    summary: "同業大廠最新動態：'從150億到2.7億，Oatly做錯了什麼？植物奶明星企業的殞落與重生 - Meet創業小聚'。此動作反映了素食產業競爭格局的最新進展。",
    impact: "分析同業大廠的市場佈局與產品定位，以制定我方的競爭防禦策略與產品研發策略。",
    action: "評估同業此項動作對我方主力產品線的潛在競爭影響。",
    owner: "產品研發",
    source: "Meet創業小聚",
    url: "https://news.google.com/rss/articles/CBMiWEFVX3lxTE1BSjIyaFhZVzI2SzkzRmxZVVFkZU1OVnFLQWx2WkVHeU1aZTVBVTFIU0dWYWtQc2lENWsteUxlSzhLRTVSaTdsVExMTGhxaGZfZnNFQWw3NTg?oc=5",
    priority: "中",
    publishedAt: "2025-09-16",
    collectedAt: "2026-07-24",
    score: 80,
  },
  {
    id: 6002629,
    region: "台灣",
    topic: "競品",
    title: "「蔬食版牛肉麵、蔬植漢堡」選擇超多！大成集團２間新品牌插旗台北 - 玩咖Playing",
    summary: "同業大廠最新動態：'「蔬食版牛肉麵、蔬植漢堡」選擇超多！大成集團２間新品牌插旗台北 - 玩咖Playing'。此動作反映了素食產業競爭格局的最新進展。",
    impact: "分析同業大廠的市場佈局與產品定位，以制定我方的競爭防禦策略與產品研發策略。",
    action: "評估同業此項動作對我方主力產品線的潛在競爭影響。",
    owner: "產品研發",
    source: "玩咖Playing",
    url: "https://news.google.com/rss/articles/CBMiUkFVX3lxTE41ZkhjT19NYmk5UWFyQ0F1ZFk0SldPVW81azFVcnlKdmZQNzhmRExTUkVrb1Yyc2hFM2dFejkxeUlWUkNmRXBhR1hEM2xoN3laMUHSAVdBVV95cUxNdmk3S243a1FqVDMzaEM4TWQ5a01HVnVkc2ZoU2hjekNKVFdSendrWVhhdUdLVUxrMWNsczc4dkJzcloyRi1UV3ZsQTVyem01RUtOQUs3WWs?oc=5",
    priority: "中",
    publishedAt: "2025-04-16",
    collectedAt: "2026-07-24",
    score: 80,
  },
  {
    id: 90088318,
    region: "台灣",
    topic: "競品",
    title: "台灣素食龍頭的品牌野心：弘陽生技轉型發展自有品牌，迎戰植物肉大未來 - Meet創業小聚",
    summary: "同業大廠最新動態：'台灣素食龍頭的品牌野心：弘陽生技轉型發展自有品牌，迎戰植物肉大未來 - Meet創業小聚'。此動作反映了素食產業競爭格局的最新進展。",
    impact: "分析同業大廠的市場佈局與產品定位，以制定我方的競爭防禦策略與產品研發策略。",
    action: "評估同業此項動作對我方主力產品線的潛在競爭影響。",
    owner: "產品研發",
    source: "Meet創業小聚",
    url: "https://news.google.com/rss/articles/CBMiWEFVX3lxTE53ZkhEclMtUG9iMmZkX2lXc0JOREdQNVpsaVMtNEpuSE40MUxzaUw3ZWQ3QXN4ekdWem9RX0pubkQ1bmpDZmpXRlJ5UHVuRnZrTlBwNWticEY?oc=5",
    priority: "中",
    publishedAt: "2024-08-10",
    collectedAt: "2026-07-24",
    score: 80,
  },
  {
    id: 59843796,
    region: "台灣",
    topic: "競品",
    title: "弘陽生技斥資4億打造綠電智慧工廠 布局全球植物性健康食品市場 - 台灣民眾電子報",
    summary: "同業大廠最新動態：'弘陽生技斥資4億打造綠電智慧工廠 布局全球植物性健康食品市場 - 台灣民眾電子報'。此動作反映了素食產業競爭格局的最新進展。",
    impact: "分析同業大廠的市場佈局與產品定位，以制定我方的競爭防禦策略與產品研發策略。",
    action: "評估同業此項動作對我方主力產品線的潛在競爭影響。",
    owner: "產品研發",
    source: "台灣民眾電子報",
    url: "https://news.google.com/rss/articles/CBMiSEFVX3lxTE11N3pQTUpXZ05JSEdyQk0waDlZcGZkcE5XU3ZIOGF6YkEyZnpWSURKVTloVUlmeXJPSWs4SzZ5SDJrZkswMGNzYw?oc=5",
    priority: "中",
    publishedAt: "2026-02-22",
    collectedAt: "2026-07-24",
    score: 80,
  },
  {
    id: 72311284,
    region: "台灣",
    topic: "競品",
    title: "響應世界地球日 大成集團推出兩大全新蔬食品牌好蔬上與綠季諾 - 經商新聞",
    summary: "同業大廠最新動態：'響應世界地球日 大成集團推出兩大全新蔬食品牌好蔬上與綠季諾 - 經商新聞'。此動作反映了素食產業競爭格局的最新進展。",
    impact: "分析同業大廠的市場佈局與產品定位，以制定我方的競爭防禦策略與產品研發策略。",
    action: "評估同業此項動作對我方主力產品線的潛在競爭影響。",
    owner: "產品研發",
    source: "經商新聞",
    url: "https://news.google.com/rss/articles/CBMiTkFVX3lxTE8zemVncXBTeVIzekZfV1RNQmw2S1Q1QmM0ZnEyaGFmZVVrX19ucjBwQWp0UlZOb1pBdGJiSjdoRlFOYWNXMXBvUGNCZXhnQQ?oc=5",
    priority: "中",
    publishedAt: "2025-04-16",
    collectedAt: "2026-07-24",
    score: 80,
  },
{
    id: 56026131,
    region: "台灣",
    topic: "原料技術",
    title: "24小時強制通報、延遲隱匿最高重罰3000萬！行政院拍板《食安法》修正17條重點一次看 - 食力 foodNEXT",
    summary: "食品安全與品質與品質管控事件：'24小時強制通報、延遲隱匿最高重罰3000萬！行政院拍板《食安法》修正17條重點一次看 - 食力 foodNEXT'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiZEFVX3lxTE1Cc1h6WC10YnRFdEE4WDVRQkdwWjZUR0xtUFdaSFRwdHRlRmtXUkNrcDhVb2lYRzNLazVyRGF1NWpObkxIRTNBRVo2UkY0X01FWDVMVnBIb3AtV1RRcEVQcE9MeF8?oc=5",
    priority: "高",
    publishedAt: "2026-07-23",
    collectedAt: "2026-07-24",
    score: 85,
  },
{
    id: 86390147,
    region: "台灣",
    topic: "原料技術",
    title: "連淨苦茶油自主驗出苯駢芘超標！新北衛生局勒令停工下架 2批號939罐啟動回收 - 食力 foodNEXT",
    summary: "食品安全與品質與品質管控事件：'連淨苦茶油自主驗出苯駢芘超標！新北衛生局勒令停工下架 2批號939罐啟動回收 - 食力 foodNEXT'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiZkFVX3lxTE1CcDVOMDNzZmdaRHZlNnVyd3dWU2VhTTRWYmQwQXdxOUhqa0F6SzdPLVJKMTYwdERSMmFUdmcyUmh1RTQxM0xwcWlLc2lFSjNTeGpPc1o0QXpQVmZIRTN2Wk9OU0pTQQ?oc=5",
    priority: "高",
    publishedAt: "2026-07-22",
    collectedAt: "2026-07-24",
    score: 85,
  },
{
    id: 92281499,
    region: "台灣",
    topic: "消費趨勢",
    title: "從剪髮到蔬食餐桌 「啼岸」用美學實踐零殘忍的生活日常 - 食力 foodNEXT",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'從剪髮到蔬食餐桌 「啼岸」用美學實踐零殘忍的生活日常 - 食力 foodNEXT'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiZkFVX3lxTE9vX09WeEUySjEyVWFVZGxyWk5XNTZNelQ3VUlVZkprVDE1NFpzd05RTDdQQ2x3U3pQTGh1bWJua3M4TjhpY0VLbzBiMEtWUW9waE1mQWwyMURrU2ttcUd4UXctUDJGQQ?oc=5",
    priority: "中",
    publishedAt: "2025-10-29",
    collectedAt: "2026-07-24",
    score: 70,
  },
{
    id: 33164137,
    region: "台灣",
    topic: "消費趨勢",
    title: "日式老屋變身文青蔬食餐酒館 新築窟融合亞洲風味翻轉素食印象 - 食力 foodNEXT",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'日式老屋變身文青蔬食餐酒館 新築窟融合亞洲風味翻轉素食印象 - 食力 foodNEXT'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiZkFVX3lxTFBUSU5qZ3pDd3VwUjFNUGg4VlVrbEp1T3pjRTVuN2s1eDlBeERoTVp4QnNNYlFZVlUzSVlRVklSeTQxdGFvZnUwTTRoUDdZYUxZeVpmTUVRa2M4SFBwTUNGc2tDc3lodw?oc=5",
    priority: "中",
    publishedAt: "2025-08-30",
    collectedAt: "2026-07-24",
    score: 70,
  },
{
    id: 46175930,
    region: "台灣",
    topic: "消費趨勢",
    title: "手搖飲進軍國際、素食麻辣鍋出圈、芽苗市場崛起！歇腳亭、愛雅辣呦、一寸鮮如何鎖定精準受眾提升品牌吸引力？ - 食力 foodNEXT",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'手搖飲進軍國際、素食麻辣鍋出圈、芽苗市場崛起！歇腳亭、愛雅辣呦、一寸鮮如何鎖定精準受眾提升品牌吸引力？ - 食力 foodNEXT'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiZkFVX3lxTE1tZzgzSHA0SmJrZDF0SmNTd1hFbHRfREJiaW1lWWVJR1BKdi1oTTdLbjZoeXlmaEpyUWVZbWNxd29IYnEwbDNib0xfQlJrQU1wSVV5YnFDcVhibGNyX0cySkFHSFhCQQ?oc=5",
    priority: "中",
    publishedAt: "2024-11-18",
    collectedAt: "2026-07-24",
    score: 70,
  },
{
    id: 70156975,
    region: "美國",
    topic: "消費趨勢",
    title: "60% 的美國家庭購買植物性產品——以下是每個地區的表現 - Green Queen Media",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'60% 的美國家庭購買植物性產品——以下是每個地區的表現 - Green Queen Media'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Green Queen Media",
    url: "https://news.google.com/rss/articles/CBMiqAFBVV95cUxOcUdZM19XWGdndGZ0LU9wb0h0QWxFU1dDbHlXOXoyWWpqcDlCYWctQ3pmY1RyTG1WWGE5RG55MnBUWksxLXRqTWY3dmN0bGhnRjFxU2VQYTIxdXE4NS1DX1pxSjBiYUNLc0FZTm9WVjh5dGRSakM5SUQ0dXpTNkdOdGd0SDBDVHJlQ2g2Z2NKQWtUd25mbjlReE82QzYzQlJlTHlvRjE3Y2E?oc=5",
    priority: "中",
    publishedAt: "2026-06-04",
    collectedAt: "2026-07-24",
    score: 70,
  },
{
    id: 17253527,
    region: "美國",
    topic: "消費趨勢",
    title: "為什麼植物性乳製品比植物性肉類表現好得多？ - FoodNavigator.com",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'為什麼植物性乳製品比植物性肉類表現好得多？ - FoodNavigator.com'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "FoodNavigator.com",
    url: "https://news.google.com/rss/articles/CBMirgFBVV95cUxQTmZBNUNIclo3cGpnRzRKYnBLWWUwQzZrWGlTRl80RF9oNjFVcDZMUW5ZNzF4NXVrMkJjYllGUGtnX2U1aFdNcFNhUk1tZVpPeTNLMXhOWlJMNHprWmRSd3ZKMF8weHJWRlN5UUJtRXhncmU3dTF5ckhEOFUyNUVKS3Y3d25HZ1QyQ1U2RzliNGl5WXBvY1pGNjBmVVFWNFNJM3hSTXlSeGRMSExCQ0E?oc=5",
    priority: "中",
    publishedAt: "2026-05-07",
    collectedAt: "2026-07-24",
    score: 70,
  },
{
    id: 27390828,
    region: "美國",
    topic: "消費趨勢",
    title: "RiboBeauty 作為植物性替代品首次亮相由內而外的美容市場 - 營養展望",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'RiboBeauty 作為植物性替代品首次亮相由內而外的美容市場 - 營養展望'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Nutritional Outlook",
    url: "https://news.google.com/rss/articles/CBMiowFBVV95cUxNbEZlbjRGdHc0aHpkWnFsWjFfeVZGWWQ4MUhldnRPNk1NX3B5aWstTFlkZW9kOEtHX0VkNVpOY3pFa1RFTU1pX2ZEdGtwN0hOcER4dFItNDBFRmxvTkFia1FXN3Jyd3ROOUwydk9IZ3pfZ0tnaDVGN3liTS1JanUxTk50YlpDWEs3TThScTlGR3hmOTgyUkZmd3N0N1htR1ZDMkpv?oc=5",
    priority: "中",
    publishedAt: "2026-03-25",
    collectedAt: "2026-07-24",
    score: 70,
  },
{
    id: 34700379,
    region: "美國",
    topic: "原料技術",
    title: "植物性蛋白質食品對價格變化的敏感度低於動物性食品，收入和教育水平存在差異 - Nature",
    summary: "食品科技突破：'植物性蛋白質食品對價格變化的敏感度低於動物性食品，收入和教育水平存在差異 - Nature'。這項替代蛋白或食品加工技術的突破，可為素食口感帶來革新。",
    impact: "新原料與技術可應用於改善植物肉、素海鮮等質地，有助於我方研發團隊提升產品的保水與乳化性。",
    action: "收集該項新技術或新原料的規格說明與法規核准進度。",
    owner: "產品研發",
    source: "Nature",
    url: "https://news.google.com/rss/articles/CBMiX0FVX3lxTE9HZmozOVljRVM4dENodmZDMzluaUQzamp4aWt6Z3RhbndpNGgzOWhUcFBGQ2xITTR5bHJ2Y2poSlgyRWYyVlhXZ1o0WTktelJRU0hXcHJBRk4xVkFIVXFz?oc=5",
    priority: "中",
    publishedAt: "2026-03-10",
    collectedAt: "2026-07-24",
    score: 72,
  },
{
    id: 94133940,
    region: "美國",
    topic: "新品",
    title: "🎥 新名稱，新策略：Bettani Farms 以「改變遊戲規則」的植物酪蛋白瞄準馬蘇里拉起司市場 - AgFunderNews",
    summary: "新品上市動向：'🎥 新名稱，新策略：Bettani Farms 以「改變遊戲規則」的植物酪蛋白瞄準馬蘇里拉起司市場 - AgFunderNews'。這顯示了該地區在替代蛋白或素食創新產品上的最新趨勢。",
    impact: "研究該新品的口味、配方與主打客群，有助於齋滋味發掘適合台灣或出口市場的潛在產品方向。",
    action: "評估此類新品是否有進行本地化開發與改良的商業價值。",
    owner: "品牌行銷",
    source: "AgFunderNews",
    url: "https://news.google.com/rss/articles/CBMi0wFBVV95cUxPcjU3VElXcnhCTUJpcGx1LW9fTi1ydXdjMmxTbVVrbTFoYVQ1enVhcVBRbXhkUHFCTTRYZTJNQ1UwbXQwQVBxNllBMHg0MFgtbVJKQU5hLWJra3pSU2lfY2t1R1VsckY5cDZPSkw3RUFUNDFreHNvU3hjbFhiOGJLaFpxTHJZNEhlbHdNcF8yN3BhcERkeFJzM0s2bm9pSW1TVFkwWFR0MXh2R0toZkpFN2psaHZldGtMZnZDSFZweUVTRXBqcy1pRFh6NXJwNkVvT3Fz?oc=5",
    priority: "中",
    publishedAt: "2026-04-08",
    collectedAt: "2026-07-24",
    score: 75,
  },
{
    id: 43458714,
    region: "歐洲",
    topic: "消費趨勢",
    title: "歐盟禁止純素食品標籤上出現 31 個與肉類相關的名稱 – 但純素漢堡是安全的 - Vegan Food & Living",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'歐盟禁止純素食品標籤上出現 31 個與肉類相關的名稱 – 但純素漢堡是安全的 - Vegan Food & Living'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Vegan Food & Living",
    url: "https://news.google.com/rss/articles/CBMiqgFBVV95cUxQZHB1alhTOTlPbG5Udl94V2JWaDd3NWZXdVBvWHM0bzBIdjk5aDhSNGY5WnIzOWFXaDNGUWhKN3NabERpQTlvQlFYVXowYmhtQmtCZ1RsY2p3WDB3NE4zRm91cTA1VzVkR0ptNmlKMFg5V0hVSEE3ODVLalJsUUFfUG9fQVpNZ2VFMkhkTjBWd2RxcGhDWjNxTzBaeWRaTWNGOWVCWVNUM3pTUQ?oc=5",
    priority: "中",
    publishedAt: "2026-03-09",
    collectedAt: "2026-07-24",
    score: 70,
  },
{
    id: 72112570,
    region: "歐洲",
    topic: "消費趨勢",
    title: "植物基銷售：德國蓬勃發展，英國、荷蘭衰退 - 全球食品產業新聞",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'植物基銷售：德國蓬勃發展，英國、荷蘭衰退 - 全球食品產業新聞'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Global Food Industry News",
    url: "https://news.google.com/rss/articles/CBMibkFVX3lxTE9tMzhSb1NNM040RVJ2N2IybHVnTVRxRzd6a2xDUklHVVpVdTBlNVQzSGRpLTgtUXlKelpyZWpOV05lb29kT2lOUml5OU81SVFid0tCTjNUZnEzYUhWQlNmQjlMdEhRcVJRaElDU2x3?oc=5",
    priority: "中",
    publishedAt: "2026-06-09",
    collectedAt: "2026-07-24",
    score: 70,
  },
{
    id: 14246175,
    region: "歐洲",
    topic: "消費趨勢",
    title: "西班牙植物基市場在歐洲排名第四，預計到 2025 年將增長 10% - vegconomist",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'西班牙植物基市場在歐洲排名第四，預計到 2025 年將增長 10% - vegconomist'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "vegconomist",
    url: "https://news.google.com/rss/articles/CBMingFBVV95cUxOQ2xybkVvMW1SNDEyRnBpOTRmWVBEUFNLTl9KN3pvZHE1Q2pVdDhKQkdmQXdHOF9sN2hCRXcxbV8wQ01KQW9JWGNqZVlVdzBGeXZPTTFLVzVka0hyTk1vcXRsR0JlYUxxaUNxUF9LdG5wdWtVaDl0QTZGRUo2TUFJbU5kN3B1YWVXZkM5ZTRiT01qS2dqb0RuRjg1SHoydw?oc=5",
    priority: "中",
    publishedAt: "2024-12-03",
    collectedAt: "2026-07-24",
    score: 70,
  },
{
    id: 44120929,
    region: "歐洲",
    topic: "消費趨勢",
    title: "隨著歐洲議會議員重新命名植物性食品，「素食漢堡」可能會從歐盟菜單中消失 - 英國《衛報》",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'隨著歐洲議會議員重新命名植物性食品，「素食漢堡」可能會從歐盟菜單中消失 - 英國《衛報》'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "The Guardian",
    url: "https://news.google.com/rss/articles/CBMiqgFBVV95cUxPbUFacnhxazJ5SlU0eGZyQVl6a0hsTklYTlRQOFlFSGxMUE1HR0tsY0p4NXh3ZnpzTHBjZWpGeUdaMUh1eWNhbFY3VVpBdzNGRXJ4S3lmcTFMYjBzUnpNSEJoUVI1T0lkTUs5UTRVZ1J0Q3k0azZUcVQxcml1VFItU1dBb3BvVGh1a1ZiYThYeGpKcEdFaHd2ZTE1UEk4NXJVaDc2MnYyRF9xQQ?oc=5",
    priority: "中",
    publishedAt: "2025-10-08",
    collectedAt: "2026-07-24",
    score: 70,
  },
{
    id: 78412732,
    region: "歐洲",
    topic: "新品",
    title: "歐洲豆腐市場預計到 2034 年將突破 20 億美元 - Plant Based News",
    summary: "新品上市動向：'歐洲豆腐市場預計到 2034 年將突破 20 億美元 - Plant Based News'。這顯示了該地區在替代蛋白或素食創新產品上的最新趨勢。",
    impact: "研究該新品的口味、配方與主打客群，有助於齋滋味發掘適合台灣或出口市場的潛在產品方向。",
    action: "評估此類新品是否有進行本地化開發與改良的商業價值。",
    owner: "品牌行銷",
    source: "Plant Based News",
    url: "https://news.google.com/rss/articles/CBMikwFBVV95cUxNeklTNUVOeVQzQTNpUExfR2xrWG5GSk93M2QzRFBZOFJZcHkxejVLYkdrZkgzcGdwUFFHY0dSeHBnQlhpSHB0VkRRY3lXaWNERm9vdlVCMGxHSEhsREhIMWhPVzFBNXo4MFJGQkVNd3BocHl0VzV2VWVCZVFzN19fSV96Q05zY0ZmWTZ1RVpOeFlKbVk?oc=5",
    priority: "中",
    publishedAt: "2026-02-11",
    collectedAt: "2026-07-24",
    score: 75,
  }
];

const regions: Region[] = ["全部市場", "台灣", "美國", "澳洲", "歐洲"];
const topics: Topic[] = ["全部主題", "新品", "通路價格", "競品", "消費趨勢", "原料技術", "法規標示"];
const sourceFilters: SourceFilter[] = ["全部來源", "食力 foodNEXT", "上下游新聞"];
const threeYearsAgo = new Date();
threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
const freshIntelligence = intelligence.filter((item) => {
  const publishedAt = new Date(`${item.publishedAt}T00:00:00+08:00`);
  return !Number.isNaN(publishedAt.getTime()) && publishedAt >= threeYearsAgo;
});
const highPriorityCount = freshIntelligence.filter((item) => item.priority === "高").length;
const formatDate = (date: string) => date.replaceAll("-", "/");

const industryWatch = [
  { brand: "弘陽生技", status: "有更新", date: "2026-02-22", update: "投資 4 億元打造綠電智慧新廠，產能與外銷布局值得追蹤。", url: "https://udn.com/news/story/7241/9337788" },
  { brand: "大成新食成", status: "有更新", date: "2026-06-24", update: "植物蛋產品預計 7 月在台上市，關注定價、通路與消費者反應。", url: "https://www.cna.com.tw/news/afe/202606240229.aspx" },
  { brand: "松珍", status: "監測中", date: "2026-07-22", update: "今日未發現可驗證的重大新事件；持續追蹤新品、通路與海外合作。" },
  { brand: "三機食品", status: "監測中", date: "2026-07-22", update: "官網揭露 2026 新加坡國際食品展動向，持續追蹤海外通路成果。", url: "https://sungift.tw/" },
  { brand: "全廣食品", status: "監測中", date: "2026-07-22", update: "持續追蹤新品、產能、代工合作及外銷市場動向。", url: "https://www.ckfoods.com.tw/" },
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
  },
];

export default function Home() {
  const [region, setRegion] = useState<Region>("全部市場");
  const [topic, setTopic] = useState<Topic>("全部主題");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("全部來源");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<number[]>([]);
  const [showAll, setShowAll] = useState(false);
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

  const visible = showAll ? filtered : filtered.slice(0, 5);
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
        <header className="page-header">
          <p className="eyebrow">2026年7月24日・星期五</p>
          <h1>今日彙整 <em>{freshIntelligence.length} 則</em>情報・{highPriorityCount} 則高重要度</h1>
        </header>

        <section className="briefing" id="today">
          <div className="briefing-copy">
            <p className="section-kicker">TODAY’S BRIEFING</p>
            <h2>市場不缺新品，<br />真正稀缺的是<strong>回購理由。</strong></h2>
            <p>跨市場訊號共同指向價格、健康感與使用情境。這三項因素正影響新品能否進入日常餐桌並形成回購。</p>
          </div>
          <div className="decision-card">
            <div className="decision-head"><span>今日核心判讀</span><b>跨市場共通訊號</b></div>
            <h3>價格、健康感與料理便利性共同決定回購</h3>
            <p>各市場的成長速度不同，但資訊都顯示：消費者不只在意是否純素，也會比較成分、每份成本及料理是否方便。</p>
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
            <p>點選市場，展開驅動因素、風險與齋之味機會</p>
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
                <div><h3>{item.brand}</h3><b className={item.status === "有更新" ? "updated" : "watching"}>{item.status}</b></div>
                <time>事件／檢查日期 {formatDate(item.date)}</time>
                <p>{item.update}</p>
                {item.url && <a href={item.url} target="_blank" rel="noreferrer">查看來源 ↗</a>}
              </article>
            ))}
          </div>
        </section>

        <section className="intel-section" id="intelligence">
          <div className="section-title intel-heading">
            <div><p className="section-kicker">INTELLIGENCE FEED</p><h2>今日情報</h2></div>
            <span className="result-count">{filtered.length} 則符合條件</span>
          </div>

          <div className="filters" aria-label="情報篩選">
            <div className="freshness-policy"><span>資料規則：僅顯示近 2 年資料 ・ 日期不明不納入 ・ 每則標示發布與收錄日期</span></div>
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
              {visible.length ? visible.map((item) => (
                <article className="intel-card" key={item.id}>
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
              )) : <div className="empty"><strong>找不到符合條件的情報</strong><p>試著清除搜尋文字或切換市場。</p></div>}
              {filtered.length > 5 && <button className="load-more" onClick={() => setShowAll(!showAll)}>{showAll ? "收合情報" : `查看其餘 ${filtered.length - 5} 則情報`}</button>}
          </div>
        </section>

        <section className="reputation-section">
          <div className="reputation-panel">
            <div className="reputation-intro">
              <p className="section-kicker">REPUTATION WATCH</p>
              <h2>齋之味網路風評</h2>
              <p>每日 08:30 檢查公開評價與品牌提及；Google 評論最近查核：2026/07/24 03:53。</p>
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
    </main>
  );
}
