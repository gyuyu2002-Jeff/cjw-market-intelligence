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
    collectedAt: "2026-07-23",
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
    collectedAt: "2026-07-23",
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
    collectedAt: "2026-07-23",
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
    collectedAt: "2026-07-23",
    score: 70,
  },
  {
    id: 68513944,
    region: "台灣",
    topic: "消費趨勢",
    title: "尊重生命的餐桌！「常不輕Dandelion」以四季蔬食從關渡走向世界 - 食力 foodNEXT",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'尊重生命的餐桌！「常不輕Dandelion」以四季蔬食從關渡走向世界 - 食力 foodNEXT'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiZkFVX3lxTE92QXFEUVl6dUdIRnVRMm5BT0dCTEdhdXVpVE1YMUNka2xwaTRmVjd5empRMVI3M3phejNxYjJMRFUwSDZiS0doRzBDU2tIenJFVmRPQ19LTnBuRVhRX2ltUFJOenhVQQ?oc=5",
    priority: "中",
    publishedAt: "2025-08-11",
    collectedAt: "2026-07-23",
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
    collectedAt: "2026-07-23",
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
    collectedAt: "2026-07-23",
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
    collectedAt: "2026-07-23",
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
    collectedAt: "2026-07-23",
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
    collectedAt: "2026-07-23",
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
    collectedAt: "2026-07-23",
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
    collectedAt: "2026-07-23",
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
    collectedAt: "2026-07-23",
    score: 75,
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
    collectedAt: "2026-07-23",
    score: 70,
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
    collectedAt: "2026-07-23",
    score: 70,
  },
  {
    id: 38649730,
    region: "澳洲",
    topic: "原料技術",
    title: "澳洲純素食品市場規模及展望，2027-2033 - Grand View Research",
    summary: "食品科技突破：'澳洲純素食品市場規模及展望，2027-2033 - Grand View Research'。這項替代蛋白或食品加工技術的突破，可為素食口感帶來革新。",
    impact: "新原料與技術可應用於改善植物肉、素海鮮等質地，有助於我方研發團隊提升產品的保水與乳化性。",
    action: "收集該項新技術或新原料的規格說明與法規核准進度。",
    owner: "產品研發",
    source: "Grand View Research",
    url: "https://news.google.com/rss/articles/CBMigwFBVV95cUxNQllILTNsQXZqcUNXTkl0QWNfaXdGZkVmSG5NWlBQUHpZOXc3RHNJdHRKZnBTZmdaeWFKTlBqSHVvaHlfblRMLWpHLTBjbDFCNzJYNG1PX1Jyd1lTdjNnOXBiU1pTVWoyUk05WlZXNXM2azVZSUc0M2lVR0xnZmYtdVcycw?oc=5",
    priority: "中",
    publishedAt: "2026-01-23",
    collectedAt: "2026-07-23",
    score: 72,
  },
  {
    id: 57731230,
    region: "澳洲",
    topic: "原料技術",
    title: "隨著健康關注的加強和創新的升溫，植物性乳製品日趨成熟 - Inside FMCG",
    summary: "食品科技突破：'隨著健康關注的加強和創新的升溫，植物性乳製品日趨成熟 - Inside FMCG'。這項替代蛋白或食品加工技術的突破，可為素食口感帶來革新。",
    impact: "新原料與技術可應用於改善植物肉、素海鮮等質地，有助於我方研發團隊提升產品的保水與乳化性。",
    action: "收集該項新技術或新原料的規格說明與法規核准進度。",
    owner: "產品研發",
    source: "Inside FMCG",
    url: "https://news.google.com/rss/articles/CBMisgFBVV95cUxNNURseVJfUDc0alBMYmVPQTdoRzR3NjZqZUk0RFlnZDZjVVJZWUF3V0VRM1ZqOEE5dGlNSEpRTU42S0VsYWk3bUpOQlV2eWMyb3F5MDF3SjBfTW9SRm5CY0djRVVNWnZ4MkxqTG55WWhDaHBBdWFsdlRZaUVHWnJQcEh1MjdXbTl3eFlQUGFFYVRyWUhORThUU1F4UHUwaWpXYlYwYkw3WEJ0SktfSEVWQUlR?oc=5",
    priority: "中",
    publishedAt: "2025-11-04",
    collectedAt: "2026-07-23",
    score: 72,
  },
  {
    id: 98353707,
    region: "澳洲",
    topic: "消費趨勢",
    title: "澳洲植物基公司清算一週後被 Smart Foods 收購 - Green Queen Media",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'澳洲植物基公司清算一週後被 Smart Foods 收購 - Green Queen Media'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Green Queen Media",
    url: "https://news.google.com/rss/articles/CBMilAFBVV95cUxPcWdQdnBHM005a3lubGpyVFgwQ0NXM0hkamVDY0h2VUR3SzNDN0kwcjc2MmhYRnlQUF9leVp3S1FGem9nTnJFN2x1NmhLaWFQYU5lYzBwT1Fzc0xNOUpGVDE1eEFSTE84QjFrN3VlMjQxM1FEUzBHVC1ndXpWbC1rY3l1WDh0U2NwbzJPcGdzUHVWU3Mz?oc=5",
    priority: "中",
    publishedAt: "2024-10-17",
    collectedAt: "2026-07-23",
    score: 70,
  },
  {
    id: 36327653,
    region: "澳洲",
    topic: "消費趨勢",
    title: "重新發明起司輪：新南威爾斯大學食品科學家正在優化植物性乳製品 - UNSW Sydney",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'重新發明起司輪：新南威爾斯大學食品科學家正在優化植物性乳製品 - UNSW Sydney'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "UNSW Sydney",
    url: "https://news.google.com/rss/articles/CBMiogFBVV95cUxOX1FpQ1FzOUV4Z1VVWnJiZlV1RjU5WjBiNHVZb19xcDVMWU9qblhzZGlhYWhRU1hobjRRRHdjVUdoWF9ZVE9yWHVnUHh1VHE1RE9iaENEU2YwVHB4VEMweVZpYmsxYjVkZG5RdUpFVHdjbEZabnJlWEN6UDlaOEpZQ2JEMzVHMFlFSjd2R0l3MG8xZzUydFZCS29zcG1GdFRTcUE?oc=5",
    priority: "中",
    publishedAt: "2025-05-29",
    collectedAt: "2026-07-23",
    score: 70,
  },
  {
    id: 47418512,
    region: "澳洲",
    topic: "原料技術",
    title: "「他們基本上竊取了這個詞」：農民為回收「牛奶」而鬥爭 - ABC 新聞與頭條 – 澳洲廣播公司",
    summary: "食品安全與品質與品質管控事件：'「他們基本上竊取了這個詞」：農民為回收「牛奶」而鬥爭 - ABC 新聞與頭條 – 澳洲廣播公司'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "ABC News & Headlines – Australian Broadcasting Corporation",
    url: "https://news.google.com/rss/articles/CBMisAFBVV95cUxNbjN6VlpBX2lJSkZ6WS11Sy1LMmtnN1hHXy1rRnZWeFVMUTJ5SmZ6UTNzb3djZWV1dlFmaWN0VjNURDZXbXFUQTdPQWhhV3JOTU5MZ1IxMnVqLUdJaFN2cE1iMEttY2wtSUpQakVsLUhyN3ItTW9sNmZ3eC1CMmFHempPcktZRVY1aHo2N3I4NmZhVnd3NHhMSlFyeFJ6VUk3SFFHWlNya2FXMHQ3X3dSNA?oc=5",
    priority: "高",
    publishedAt: "2026-03-01",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 23495823,
    region: "台灣",
    topic: "原料技術",
    title: "衛福部擬修食安法美國豆變巴西豆要試製、太晚通報也要罰- 生活 - 工商時報",
    summary: "食品安全與品質與品質管控事件：'衛福部擬修食安法美國豆變巴西豆要試製、太晚通報也要罰- 生活 - 工商時報'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "工商時報",
    url: "https://news.google.com/rss/articles/CBMiX0FVX3lxTE01cDlCaXNxWU9IdERZbjdKZTZHX2pDYjFVS3VOR0NiVDUyQXhHcFVvNEFBRU9tekJPTXVIRjVnakphU1BtTkZoR1lDT0tsTWpTWnN0ZWgyRmEzUVM1M1I0?oc=5",
    priority: "高",
    publishedAt: "2026-07-12",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 17184302,
    region: "台灣",
    topic: "原料技術",
    title: "因應中央家戶廚餘禁餵令 盧市長：台中依規焚化並推動多元去化措施 - health.taichung.gov.tw",
    summary: "食品安全與品質與品質管控事件：'因應中央家戶廚餘禁餵令 盧市長：台中依規焚化並推動多元去化措施 - health.taichung.gov.tw'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "health.taichung.gov.tw",
    url: "https://news.google.com/rss/articles/CBMihwFBVV95cUxPY1BlaU9za2xCeXRDeEZUcGU0MzRVSldTTmJCQ3Byc3dOWTRPS3U5TU44dGc1djllcW45c054NVJUaHRzSGV6SFZHNlB5SUw3ZENQTGtXYy12TDJqTmxTLUpPV0xyamF6ZzI3RU0wNDlCZEd5eHR2ZlF1RHc5WEl5NkxYdmlVcEE?oc=5",
    priority: "高",
    publishedAt: "2026-07-21",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 98591953,
    region: "台灣",
    topic: "原料技術",
    title: "政院拍板食安法修法業者隱匿最重可罰3000萬元- 新聞 - MoneyDJ",
    summary: "食品安全與品質與品質管控事件：'政院拍板食安法修法業者隱匿最重可罰3000萬元- 新聞 - MoneyDJ'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "MoneyDJ",
    url: "https://news.google.com/rss/articles/CBMilgFBVV95cUxOdzkweWpHQXE5cF9MNkxxdUEtZENtNDRtSUNDWHJpSk1YN0V6bVVRNEhPc0FsN09IQjl1bTNxMnQ0cVBvbVRNR3ZOTTBLMzBJU0IySTJsbVd5RWRpOC1XWno3dHJEdHNUaWVsXzhrV1F3NGZnZXJCOVlYSUM2MzRTc1JPZHNYV1BuOXlFbTFjbTVDblkxbVE?oc=5",
    priority: "高",
    publishedAt: "2026-07-23",
    collectedAt: "2026-07-23",
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
    collectedAt: "2026-07-23",
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
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 5441014,
    region: "台灣",
    topic: "原料技術",
    title: "美國農業部宣布食品安全和檢驗服務重組，並在愛荷華州建立國家食品安全中心 - USDA (.gov)",
    summary: "食品安全與品質與品質管控事件：'美國農業部宣布食品安全和檢驗服務重組，並在愛荷華州建立國家食品安全中心 - USDA (.gov)'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "USDA (.gov)",
    url: "https://news.google.com/rss/articles/CBMi8gFBVV95cUxNNUYyY3I3RG00OWdSRzJjUjZ3TnFpMWIxN0lXY3NGRlZZUG4xOHhrV0kzZjNNX2loMFFkR2hmSnRoNUtybEg4c2NfWmY5QjlubmJGd00wYWNncFFaaFloM1RUNXZzd2tmbnZrN3MzQnJyOWNSU0FkSlpfdGFyNnpyRGExWU9tVjhpeWpCWDJWdk1ScGg3dGF2VUMxTllOQXlEMlJEVVFkT1pKTDl0TE1GSDhWeW9sV2FBRFlzWWVRX1hhQktjQWZTY09hNmdwWXlFZi14YU9WSUl3SlNWWlFUUHQyVnhERS1lYUtfUGJsRU5ZUQ?oc=5",
    priority: "高",
    publishedAt: "2026-04-23",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 43692559,
    region: "台灣",
    topic: "原料技術",
    title: "FSMA 關於某些食品附加追溯記錄要求的最終規則 - fda.gov",
    summary: "食品安全與品質與品質管控事件：'FSMA 關於某些食品附加追溯記錄要求的最終規則 - fda.gov'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "fda.gov",
    url: "https://news.google.com/rss/articles/CBMizwFBVV95cUxOLUpFeElsTVhoSmhiSmk3bDI3ZWJucWxHd05jN3FXRUNSTGtoSHB1VUpjMTd3aktFMlpsQWdNRF9hU1V2bU01Y1JoZWdWeXZNd05mLW9XX2s3Qk9vWGwtV0o3bm9EUXpFbXAzN3Nsb2VOSGtUNmJqa0dJTHJSalNSNnlxUDNZYzZKblcwMVEzcDY3b3pvb0hSUFdqNlBfN3BFZWlPVXIxdWJmcDQ5cmVKcnh0NERYLVF3RUlaNVBwdWlPYVF3QzhvUGtpeTFSSzA?oc=5",
    priority: "高",
    publishedAt: "2026-07-02",
    collectedAt: "2026-07-23",
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
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 3504456,
    region: "台灣",
    topic: "原料技術",
    title: "吃掉還是丟掉？測試您的食品安全知識。 - 華盛頓郵報",
    summary: "食品安全與品質與品質管控事件：'吃掉還是丟掉？測試您的食品安全知識。 - 華盛頓郵報'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "The Washington Post",
    url: "https://news.google.com/rss/articles/CBMiswFBVV95cUxNNjJqX1lRUjZIVVN3eE84YWIwdVBJczFtd2w2NTBCQ25nTlZ2OG44Q1FFNVZGaldGS0dKc3BZTUhVMUVGWk1NUndPcnkyV05fWE9Ma2xqYVJKX0xuTGwwWElaWlFqdVFfcmxxYU5rNjNUdnZSRTNvZmIzRWFfTGdPaHBBanZWbmJvWVpJN0RvNU1uS0x3bG04VGhWQzZrbERCMG4xYXNkWDg4SldBdmZUejl1dw?oc=5",
    priority: "高",
    publishedAt: "2026-06-09",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 74493146,
    region: "台灣",
    topic: "原料技術",
    title: "食品安全應以風險而非零檢測為指導 - 康乃爾紀事報",
    summary: "食品安全與品質與品質管控事件：'食品安全應以風險而非零檢測為指導 - 康乃爾紀事報'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "Cornell Chronicle",
    url: "https://news.google.com/rss/articles/CBMikwFBVV95cUxOUHZDNWVFTUpFZF8zSVZIU3dYYjhheDJsSmNmcHZBRy1BSmVEZnZLcHVQUmN5ekp4QzV6SmdsSUFPamNqU2dNVUtSQjQ2TkY2SXdXRWNIYVdnM1d3YW83djM3Znd0Qm5XblVrUEE1LW4xMnpfazBTRVBPeVVmY1hrV1R2MDZxSFlBMjh4MmVGcWhpc2M?oc=5",
    priority: "高",
    publishedAt: "2026-03-17",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 47633979,
    region: "台灣",
    topic: "競品",
    title: "再次漂綠還是譜出減碳重生藍圖？Oatly 獲「氣候解方公司」認證 - CSRone 永續智庫",
    summary: "同業大廠最新動態：'再次漂綠還是譜出減碳重生藍圖？Oatly 獲「氣候解方公司」認證 - CSRone 永續智庫'。此動作反映了素食產業競爭格局的最新進展。",
    impact: "分析同業大廠的市場佈局與產品定位，以制定我方的競爭防禦策略與產品研發策略。",
    action: "評估同業此項動作對我方主力產品線的潛在競爭影響。",
    owner: "產品研發",
    source: "CSRone 永續智庫",
    url: "https://news.google.com/rss/articles/CBMiREFVX3lxTE5YMC1oOXBUX1Uxb0JIRGVyQXAyT2NlZmVQRDZMZ1piQnVscC1aeldyTmJfMy15RWUtQ19sWmRkLVh2U01t?oc=5",
    priority: "中",
    publishedAt: "2025-07-10",
    collectedAt: "2026-07-23",
    score: 80,
  },
  {
    id: 4007718,
    region: "台灣",
    topic: "競品",
    title: "大成集團推出兩大蔬食餐飲品牌，用平價、美味植物肉料理刷新蔬食印象 - 遠見雜誌",
    summary: "同業大廠最新動態：'大成集團推出兩大蔬食餐飲品牌，用平價、美味植物肉料理刷新蔬食印象 - 遠見雜誌'。此動作反映了素食產業競爭格局的最新進展。",
    impact: "分析同業大廠的市場佈局與產品定位，以制定我方的競爭防禦策略與產品研發策略。",
    action: "評估同業此項動作對我方主力產品線的潛在競爭影響。",
    owner: "產品研發",
    source: "遠見雜誌",
    url: "https://news.google.com/rss/articles/CBMiTkFVX3lxTE9Yc0dHZkZJTE5oUk1MSC1BVk41YWN2N3U4Z1ZJQkctbHJndE5SX1BYcDBXblVXVHlFN0huRWtzdUxMYWtuSTVrNG5weFdCUQ?oc=5",
    priority: "中",
    publishedAt: "2025-05-02",
    collectedAt: "2026-07-23",
    score: 80,
  },
  {
    id: 13661314,
    region: "台灣",
    topic: "競品",
    title: "素肉不香了？ Beyond Meat 股價只剩 3 美元，到底發生什麼事了？ - 鏈新聞 ABMedia",
    summary: "同業大廠最新動態：'素肉不香了？ Beyond Meat 股價只剩 3 美元，到底發生什麼事了？ - 鏈新聞 ABMedia'。此動作反映了素食產業競爭格局的最新進展。",
    impact: "分析同業大廠的市場佈局與產品定位，以制定我方的競爭防禦策略與產品研發策略。",
    action: "評估同業此項動作對我方主力產品線的潛在競爭影響。",
    owner: "產品研發",
    source: "鏈新聞 ABMedia",
    url: "https://news.google.com/rss/articles/CBMiVEFVX3lxTE1pUXY3azR3TkprM0MwUEVYaFEyblljTFp5SHZZTjNycU9zcmhYREYzZV9MT1A3STAzVzdHelNBdnRxT0ZNX0RaWktoVkxGOGw5dl9lXw?oc=5",
    priority: "中",
    publishedAt: "2025-03-14",
    collectedAt: "2026-07-23",
    score: 80,
  },
  {
    id: 11992331,
    region: "台灣",
    topic: "競品",
    title: "農畜大廠「大成」植物肉戰略再進化！從「新創肉」到雙餐飲品牌、開創產業新價值鏈 - 食力 foodNEXT",
    summary: "同業大廠最新動態：'農畜大廠「大成」植物肉戰略再進化！從「新創肉」到雙餐飲品牌、開創產業新價值鏈 - 食力 foodNEXT'。此動作反映了素食產業競爭格局的最新進展。",
    impact: "分析同業大廠的市場佈局與產品定位，以制定我方的競爭防禦策略與產品研發策略。",
    action: "評估同業此項動作對我方主力產品線的潛在競爭影響。",
    owner: "產品研發",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiZkFVX3lxTE1qenNjUXlIV2dQVjhZTWpiMlJ3b1BFWUJSVEF3cGxPaFY2Q0tNekc4RTQ5ZWJuMGxQbldBMFFwR01fb0djN1RnWmpxeE5adEw5VHlMMHNValdQSzhuV0NQR2kzckJwZw?oc=5",
    priority: "中",
    publishedAt: "2025-04-15",
    collectedAt: "2026-07-23",
    score: 80,
  },
  {
    id: 45258947,
    region: "台灣",
    topic: "競品",
    title: "台灣素食龍頭弘陽食品 投資4億打造首座綠電智慧新廠 - 經濟日報",
    summary: "同業大廠最新動態：'台灣素食龍頭弘陽食品 投資4億打造首座綠電智慧新廠 - 經濟日報'。此動作反映了素食產業競爭格局的最新進展。",
    impact: "分析同業大廠的市場佈局與產品定位，以制定我方的競爭防禦策略與產品研發策略。",
    action: "評估同業此項動作對我方主力產品線的潛在競爭影響。",
    owner: "產品研發",
    source: "經濟日報",
    url: "https://news.google.com/rss/articles/CBMiWkFVX3lxTE5WalFQenFMaV9ZaUQ3bWV6dnlBWEtWTG9Yd1Q3djIzdkMzWUtTcHVyUWxZV1NNUzNuelNoTjRjNjF3RExuWHRJSjlxeXktcWVoSlI5SXNvYmdCQdIBX0FVX3lxTE1xcWI0Q3BNSFNGWVNNRmN4bjdtYUsyNnAyMTNoSkZGNmw0WjRsVG0yWTBPV0F0bkFzMUszTXBPWkVNRlQwWXYtTndNcVRscWR4UGdFQWx2Yjc3MGpBLVBz?oc=5",
    priority: "中",
    publishedAt: "2026-02-22",
    collectedAt: "2026-07-23",
    score: 80,
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
    collectedAt: "2026-07-23",
    score: 85,
  },
{
    id: 66727105,
    region: "台灣",
    topic: "競品",
    title: "原來素食也可以這麼好吃！松珍生技以創新美味與營養 重新定義蔬食 - 食力 foodNEXT",
    summary: "同業大廠最新動態：'原來素食也可以這麼好吃！松珍生技以創新美味與營養 重新定義蔬食 - 食力 foodNEXT'。此動作反映了素食產業競爭格局的最新進展。",
    impact: "分析同業大廠的市場佈局與產品定位，以制定我方的競爭防禦策略與產品研發策略。",
    action: "評估同業此項動作對我方主力產品線的潛在競爭影響。",
    owner: "產品研發",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiZkFVX3lxTFBzeGJaVWJ1YjNrTXV3c3A5YWRXTEtmaHg4UzE5RnFnTDEwOEw4TkcxVE42bk1RVlV2MFl0cVg2c0l3c0JwN3VQeUEwOXJ4WXV4cENSeXEybWw2aHVXM0FfUGJ5U0NsUQ?oc=5",
    priority: "中",
    publishedAt: "2026-07-08",
    collectedAt: "2026-07-23",
    score: 80,
  },
{
    id: 60276782,
    region: "台灣",
    topic: "消費趨勢",
    title: "英國飲食趨勢 素食風潮和快餐實驗店誕生 - 食力 foodNEXT",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'英國飲食趨勢 素食風潮和快餐實驗店誕生 - 食力 foodNEXT'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiW0FVX3lxTE8yRFUyU29wUXFGTFBVeTBoSm9iTEhHdWV3Q25Ha1Fob2F2RTRISWF2RXgwWUpWMFJuM0RPN1Y1RlIzLS10cVZaWnNJMEZMQWhra1hzc1Jfd01TQ1k?oc=5",
    priority: "中",
    publishedAt: "2016-09-14",
    collectedAt: "2026-07-23",
    score: 70,
  },
{
    id: 31642322,
    region: "台灣",
    topic: "消費趨勢",
    title: "植物肉＝全素？號稱「Vegan」的植物肉，未必素食者都能吃！ - 食力 foodNEXT",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'植物肉＝全素？號稱「Vegan」的植物肉，未必素食者都能吃！ - 食力 foodNEXT'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiggJBVV95cUxNUlUyYlhEcUZ6SnhUbnc3blh4SElCVkZfR240VHVXazl0QkthTFdhMDBfZ2lweVByM3B6Y01WbV9iVHZmcWZyckxZN2M1UnhrODZ5Rjg2OVNFeFhhTEtqNmtNaHVKNExBNHJMTzdfUkpGQTkza21KQzdvam16QUN3ZnkwLVBUWWtkT3MzbnF6ZDRvYllhZzQ5MFlaYUFpMDR2ZVBGS1VLV0xZTEt3dlE1SkJWOHNLNzcwUFpWT2R3eElDN05CM28tbVJfa1JrVVBYT3JVVzhlQWM1Uk5OMThVa2dXLWRsNnJjcjlYLUxoS2E5YVBiRUV5c0tZRUhTVTFZaWc?oc=5",
    priority: "中",
    publishedAt: "2022-04-04",
    collectedAt: "2026-07-23",
    score: 70,
  },
{
    id: 99210338,
    region: "台灣",
    topic: "消費趨勢",
    title: "蒟蒻 超Q彈素食食材怎麼來的？ - 食力 foodNEXT",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'蒟蒻 超Q彈素食食材怎麼來的？ - 食力 foodNEXT'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMia0FVX3lxTFB2TWRJQUZUNkFUN1NjRUZaRDc0Vjg0Rmt4eVlUMWNpczFkVkNSNHZjMFp3ZTZaUkFCZl9MMnZ6d0k3cVpfbkJUSUhpZjBYREdXTVk4eHE2TGtsb3BmeTFGSU16MkVaanBEeEVJ?oc=5",
    priority: "中",
    publishedAt: "2016-09-14",
    collectedAt: "2026-07-23",
    score: 70,
  },
{
    id: 26243791,
    region: "美國",
    topic: "消費趨勢",
    title: "Euca 將植物性產品保護引入沖洗配方中 - Symrise",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'Euca 將植物性產品保護引入沖洗配方中 - Symrise'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Symrise",
    url: "https://news.google.com/rss/articles/CBMi1AFBVV95cUxOSUdWczczekc4eE9EZWdoRWRGdHE5MEc0dzFSazBSV2UwLXprMDg5MmMyOUlLellENVA0VzhJMXBhTVBMeVplSkNEX0NJZllLbDFpNGtVYVcyd2pfbUZjanRlSW9wUmZEY0hraXNLWVZTV19oRmxPOENuZHl1aXR1T1F3Q292RFFIZEl4WUxvbzFUb2FvYktkZHJmNzZLTWRuVE5DenFULUVOZFVaVlJHeEY5emNweFJGa1ZNYTIxU3hieU93bWNzWnEtbzBNakthRE41eg?oc=5",
    priority: "中",
    publishedAt: "2026-07-04",
    collectedAt: "2026-07-23",
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
    collectedAt: "2026-07-23",
    score: 70,
  },
{
    id: 99792384,
    region: "美國",
    topic: "原料技術",
    title: "英國純素食品市場規模及展望，2027-2033 - Grand View Research",
    summary: "食品科技突破：'英國純素食品市場規模及展望，2027-2033 - Grand View Research'。這項替代蛋白或食品加工技術的突破，可為素食口感帶來革新。",
    impact: "新原料與技術可應用於改善植物肉、素海鮮等質地，有助於我方研發團隊提升產品的保水與乳化性。",
    action: "收集該項新技術或新原料的規格說明與法規核准進度。",
    owner: "產品研發",
    source: "Grand View Research",
    url: "https://news.google.com/rss/articles/CBMiekFVX3lxTE5fZ3VBWUhxcVZSa0dRNHFJeUlENWFOZjhuRzRoRVFCZTEwelFGNWg4djlmOXhjdm9WYUlvM3BBbFBTLVN4QjVUUzZ4VXBJbGFXaUkwSTNVdU1UcGNDZk9xbmxwd254YWpESTJuNl83ZXdkVGRvNDNkMXFn?oc=5",
    priority: "中",
    publishedAt: "2026-01-23",
    collectedAt: "2026-07-23",
    score: 72,
  },
{
    id: 27183637,
    region: "美國",
    topic: "消費趨勢",
    title: "Steakholder Foods 開始將 Perfecta™ 優質植物肉進入美國市場 - 納斯達克",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'Steakholder Foods 開始將 Perfecta™ 優質植物肉進入美國市場 - 納斯達克'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Nasdaq",
    url: "https://news.google.com/rss/articles/CBMivgFBVV95cUxOSEwteklOSU0tTWt3UWp5M19pTXc1bWltSWJqQnZrSUozNHZIYkxEbXI5RFAxQlBaMGJCMTFkZDZmekdtVW1oSFJxdDdUblltUVMyU2h2M0l5U0N5SkZoa2NHdENHRXBISGkyakY4OFRKUEE5LWg4elo4RUxRbVBMNmJ0X1JKbnhiS3lITGkwVHZPanY4b1FqWHNrQnFDaERMODBFdUlFSXJueTN4STFJRHlwa1pqWTF4Y3RXVXRR?oc=5",
    priority: "中",
    publishedAt: "2026-07-14",
    collectedAt: "2026-07-23",
    score: 70,
  },
{
    id: 26671157,
    region: "美國",
    topic: "消費趨勢",
    title: "PBFA 和索迪斯校園在美國各大學啟動首個地球週植物性品牌活化活動 - 植物性食品協會",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'PBFA 和索迪斯校園在美國各大學啟動首個地球週植物性品牌活化活動 - 植物性食品協會'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Plant Based Foods Association",
    url: "https://news.google.com/rss/articles/CBMizwFBVV95cUxOX3p1SzBZRmZjSE5mSUVoSnpsUHg4Zy1Mb0FfanF0SXZURk5nWTA4T05iNWc5RzZyVXk0eTNfanhuS3hFTFZGZDI0SkNHRW9ZNnlGZjdieTl0SXhacGZIcXhzaW9BTGJrQjhsc1FSR3lZWFdiMFRSOWUwMEZ2WF8wVUVkSkk1MERXQzdHWFEwMzZZSjRHNW9GRVFSM1FhYWtLejJTcG9lUnBHSVlzNjd5bElDNkFvQjNIRW5jUHRoM0wzdHdINmdIYkxFOGFuRkk?oc=5",
    priority: "中",
    publishedAt: "2026-05-01",
    collectedAt: "2026-07-23",
    score: 70,
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
    collectedAt: "2026-07-23",
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
    collectedAt: "2026-07-23",
    score: 75,
  },
{
    id: 39091335,
    region: "歐洲",
    topic: "消費趨勢",
    title: "2025 年，價格競爭力將推動四個歐洲市場的植物性銷售成長 - vegconomist",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'2025 年，價格競爭力將推動四個歐洲市場的植物性銷售成長 - vegconomist'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "vegconomist",
    url: "https://news.google.com/rss/articles/CBMiywFBVV95cUxNcnFkUEtVZDh6Y3l5S3hUTlhPSkFZZC15em5yNzBFSURzc3JQenRQZGEwdnVPaFBhQ1F5WHluc25SLW1WanUxZGNSQ011OGJVN3VKb2NSalNpTHJUMFAweXVLTWhaZ21VSmRhOEdKVXJJb1BLNDdWNDNwZEZXaW1rY1hoZjV0NXZBdjh6djlVbERGb3pvLXNCTVFBTE8yWjhpQzVUQ1VHV3FwWG1PN3E4ZGFHdGx1ZThRcjBrLTdlTU5iTlZRTU1zWVhnOA?oc=5",
    priority: "中",
    publishedAt: "2026-06-09",
    collectedAt: "2026-07-23",
    score: 70,
  },
{
    id: 57554090,
    region: "歐洲",
    topic: "消費趨勢",
    title: "植物性食品和飲料在歐洲達到 €16.3B，但僅佔快速消費品的 2.4% - Circana",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'植物性食品和飲料在歐洲達到 €16.3B，但僅佔快速消費品的 2.4% - Circana'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Circana",
    url: "https://news.google.com/rss/articles/CBMirwFBVV95cUxQWjhQYjZmRVRodGFLRVlvSEJPSXhuUGRHUDlZMmtoYkdkdTBVMlJNWXNhZ0Q3dHJ5RW5pdGJsSUMwRmZkaW1fWHplUTNNWVh3eVFYNDNZcXRZbDVYY21zSVkxbHpvT2VMYkswR0ZybEhxSEFxZjVWSzRVa2FlOUE2anFkeHZzM20yU2M0MFRwMmVHaU5kcDZEendyTGpkSFVzamp3M0FlVzNkb052d3NN?oc=5",
    priority: "中",
    publishedAt: "2026-04-10",
    collectedAt: "2026-07-23",
    score: 70,
  },
{
    id: 97797769,
    region: "歐洲",
    topic: "消費趨勢",
    title: "歐盟對植物奶的需求|全球市場分析報告 - 2036 - 未來市場洞察",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'歐盟對植物奶的需求|全球市場分析報告 - 2036 - 未來市場洞察'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Future Market Insights",
    url: "https://news.google.com/rss/articles/CBMihAFBVV95cUxObjNfWDltU2pMUktiUzMtLU1qejBSZkktQ0tmaThvM0JvMmJtVkxhWjJQaEQzYVRHeFZhZEVLbndPdkxxWncyVVB0dlRDbkZBV0QtWHlqc1ZNMUtyLUhCdFZoM3dpS1FUOUtkT1FEbU1DX251X3BSZVJ3RHB5ZnduRmxoUFk?oc=5",
    priority: "中",
    publishedAt: "2026-03-16",
    collectedAt: "2026-07-23",
    score: 70,
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
      <aside className="sidebar">
        <a className="brand" href="#top" aria-label="齋之味情報中樞首頁">
          <img src="favicon.jpg" alt="齋之味" className="brand-logo-img" />
          <span><strong>齋之味</strong><small>市場情報中樞</small></span>
        </a>
        <nav aria-label="主要導覽">
          <a className={`nav-item ${activeSection === "today" ? "active" : ""}`} aria-current={activeSection === "today" ? "page" : undefined} href="#today" onClick={(event) => navigateTo(event, "today")}><span>01</span><div><strong>今日摘要</strong><small>掌握核心情報判讀</small></div></a>
          <a className={`nav-item ${activeSection === "markets" ? "active" : ""}`} aria-current={activeSection === "markets" ? "page" : undefined} href="#markets" onClick={(event) => navigateTo(event, "markets")}><span>02</span><div><strong>市場雷達</strong><small>哪裡有機會或風險</small></div></a>
          <a className={`nav-item ${activeSection === "intelligence" ? "active" : ""}`} aria-current={activeSection === "intelligence" ? "page" : undefined} href="#intelligence" onClick={(event) => navigateTo(event, "intelligence")}><span>03</span><div><strong>全部情報</strong><small>查新聞與原始來源</small></div></a>
        </nav>
        <div className="sidebar-foot">
          <time dateTime="2026-07-23T15:48:30+08:00">2026/07/23 15:48</time>
        </div>
      </aside>

      <section className="workspace" id="top">
        <header className="topbar">
          <div>
            <p className="eyebrow">2026年7月23日・星期四</p>
            <h1>今日彙整 <em>{freshIntelligence.length} 則</em>情報・{highPriorityCount} 則高重要度</h1>
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
                <div><span className="region-name">{market.region}</span><span className={`signal signal-${market.signal}`}>{market.signal}</span></div>
                <strong>{market.note}</strong>
                <div className="meter-label"><span>機會指數</span><b>{market.value}</b></div>
                <div className="meter"><i style={{ width: `${market.value}%` }} /></div>
              </button>
            ))}
          </div>
          <div className="market-deep-dive" aria-live="polite">
            <div className="deep-dive-head">
              <div><p className="section-kicker">{selectedPulse.region.toUpperCase()} DEEP DIVE</p><h3>{selectedPulse.region}市場判讀</h3></div>
              <p>{selectedPulse.headline}</p>
            </div>
            <div className="deep-dive-grid">
              <section><span>市場為何這樣走</span><ul>{selectedPulse.drivers.map((driver) => <li key={driver}>{driver}</li>)}</ul></section>
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
            <div className="freshness-policy"><strong>資料規則</strong><span>僅顯示近 3 年</span><span>日期不明不納入</span><span>每則標示發布與收錄日期</span></div>
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
                  <div className="card-rail"><span className={`priority priority-${item.priority}`}>{item.priority}</span><b>{item.score}</b><small>情報分數</small></div>
                  <div className="card-body">
                    <div className="card-tags"><span>{item.region}</span><span>{item.topic}</span><time>發布 {formatDate(item.publishedAt)} ・ 收錄 {formatDate(item.collectedAt)}</time></div>
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
        </section>

        <section className="reputation-section">
          <div className="reputation-panel">
            <div className="reputation-intro">
              <p className="section-kicker">REPUTATION WATCH</p>
              <h2>齋之味網路風評</h2>
              <p>每日 08:30 檢查公開評價與品牌提及；Google 評論最近查核：2026/07/23 15:48。</p>
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
