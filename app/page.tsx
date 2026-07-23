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
    id: 7714599,
    region: "台灣",
    topic: "原料技術",
    title: "【投書】中聯苯駢芘事件是「餿水油翻版」嗎？從檢驗科學看懂兩起食安事件的關鍵差異 - 食力 foodNEXT",
    summary: "食品安全與品質與品質管控事件：'【投書】中聯苯駢芘事件是「餿水油翻版」嗎？從檢驗科學看懂兩起食安事件的關鍵差異 - 食力 foodNEXT'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMia0FVX3lxTFBxdHhmUjVGMU1nM0lNT293NldUdldjMkxRdWJETDUtdmM0anV0WGNVaUZoOUI2NmxoSzdJUGRwTVdyUllHVkQwSjB4U0JqZGpWNjNnU2lfMUJUOFNNNkliOXh0U0U1OFNueFRr?oc=5",
    priority: "高",
    publishedAt: "2026-07-18",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 75587208,
    region: "台灣",
    topic: "消費趨勢",
    title: "2025台灣零售市佔版圖揭曉！全聯、好市多持續擴大優勢 電商進入本土與外資對決新階段 - 食力 foodNEXT",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'2025台灣零售市佔版圖揭曉！全聯、好市多持續擴大優勢 電商進入本土與外資對決新階段 - 食力 foodNEXT'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiZkFVX3lxTE5fbFR5WTUyWDBoajNMQmRMN1EzMkI5QVNFdUV2X3ZCa2NGUjNwRzM1eU9lMElKTVNiTTN1NW1JV3lpWE00V2hrWmZ4c0lEOFpuVzFRY3JiMU9GVjBacndXeWU0dGlrdw?oc=5",
    priority: "中",
    publishedAt: "2026-07-19",
    collectedAt: "2026-07-23",
    score: 70,
  },
  {
    id: 73064959,
    region: "台灣",
    topic: "消費趨勢",
    title: "慈濟60週年「微光食刻」蔬食市集7/3華山開跑 50家品牌、台味到異國料理一次體驗 - 食力 foodNEXT",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'慈濟60週年「微光食刻」蔬食市集7/3華山開跑 50家品牌、台味到異國料理一次體驗 - 食力 foodNEXT'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiZEFVX3lxTE1FdVJSTVhTUHVYcVVGLVJFWFVJd2tLS1YtLThMcmg1bWFrY1NzWnRaRm1UbXIwZVJBdENGYW5tUWJFYXI2X1hwRjduWW9oZFJiRGZHRXk2bHpSSDR5ZlZOTDk0Rjc?oc=5",
    priority: "中",
    publishedAt: "2026-07-03",
    collectedAt: "2026-07-23",
    score: 70,
  },
  {
    id: 26502772,
    region: "台灣",
    topic: "消費趨勢",
    title: "當蔬食遇見策展思維：一場打破所有想像的飲食革命 - 食力 foodNEXT",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'當蔬食遇見策展思維：一場打破所有想像的飲食革命 - 食力 foodNEXT'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiakFVX3lxTE03Z2l1ejJkcTAtUW4wWWpPTl93S1ZaMkVRZE9XckVWRTY3OFBVRzB5RE9jNXFnd1prTUhGdzZGNmdfNVZPWmtRdzRhSUJJZVkxMGtCVVFwOUhWZDY2RWxuRDVHTVdVZU9uNkE?oc=5",
    priority: "中",
    publishedAt: "2026-07-17",
    collectedAt: "2026-07-23",
    score: 70,
  },
  {
    id: 3847255,
    region: "台灣",
    topic: "消費趨勢",
    title: "搶攻素食六百億商機 詹姆士素麵單周狂賣六萬包 - 食力 foodNEXT",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'搶攻素食六百億商機 詹姆士素麵單周狂賣六萬包 - 食力 foodNEXT'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiuwFBVV95cUxNV2ZYdHRvTTlwNWJKTXppWDhVeUJjUVZYWlowQjZydWNycWE1OHZrV0JaS21LU2pzLXVxbXBoTU1yUUlUMlo1MFR2UFYtUUxsZzNKTkl6Tks3bGdiUVhON190aTZyVGVsRHlyY1BMSTBPZEZnUzJIY00tNWpJS1VxZG9hdENyd3pnSld1MUVKX1lUaEhiOG1nWEpZNXhxUnVvUlRndE45Y01oWVYyNWk2bVV3aUlfc0phWEhJ?oc=5",
    priority: "中",
    publishedAt: "2020-04-10",
    collectedAt: "2026-07-23",
    score: 70,
  },
  {
    id: 34426039,
    region: "美國",
    topic: "消費趨勢",
    title: "植物飲料熱潮引發對抗細菌孢子的新鬥爭 - DairyReporter.com",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'植物飲料熱潮引發對抗細菌孢子的新鬥爭 - DairyReporter.com'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "DairyReporter.com",
    url: "https://news.google.com/rss/articles/CBMipwFBVV95cUxNem94cjhTZE92TzhVc1lEampoMV9nSlVGcUpDTmFCZ3hjbkI2d0llcFV2aEV5VzB3Z3pHM2RXMVB3ZmVadXhMZjJ4cTI2YUlwamdkdkNaVWQyRFVvS1BKRVBabTVXWWs5Uk50dTJjb2JsbGw4Zk1QalJTb3luZXR5VFM4cFFwMUpIMHNfeFQ3NGVJdmM2MmNiS0YzVUVlcGxHcmtST3Flcw?oc=5",
    priority: "中",
    publishedAt: "2026-07-22",
    collectedAt: "2026-07-23",
    score: 70,
  },
  {
    id: 93148972,
    region: "美國",
    topic: "新品",
    title: "隨著植物性飲料需求的加速，Mamey Sapote 飲料市場到 2030 年將達到 16.4 億美元 - GlobeNewswire",
    summary: "新品上市動向：'隨著植物性飲料需求的加速，Mamey Sapote 飲料市場到 2030 年將達到 16.4 億美元 - GlobeNewswire'。這顯示了該地區在替代蛋白或素食創新產品上的最新趨勢。",
    impact: "研究該新品的口味、配方與主打客群，有助於齋滋味發掘適合台灣或出口市場的潛在產品方向。",
    action: "評估此類新品是否有進行本地化開發與改良的商業價值。",
    owner: "品牌行銷",
    source: "GlobeNewswire",
    url: "https://news.google.com/rss/articles/CBMihwJBVV95cUxOMGhMUWVsM1FXS283UThwMUV6ZnpsX194eDFzeGZBNUlvT1lPWU5LXzZKRWpIVGIwMThqNXd3SnU3QUtlaVBrWDNmSGtXN29abVM2VUJNcGZnOUYwMUtjWExxYkdUZUtoMThSSVQ3WTNxSXFpUTZ6SU9VQmJRV0lpQ21TOFRWdFQ2bXdMUC11TnFEdDc2SzhkeG1wY01td0Itbl83UW9rSG4tWFhUZWs1eWlaV0lITDRjQXNJQTg4RTdWM2x2SEUyWllUVElxendhSG5tOVVhWlVDWWpsQlpNVUtEd2QzMmRuYVFOenFNRTZBRG9qRVRLM3RzYUlIVzNUSGVXSlFVZw?oc=5",
    priority: "中",
    publishedAt: "2026-07-22",
    collectedAt: "2026-07-23",
    score: 75,
  },
  {
    id: 92487629,
    region: "美國",
    topic: "原料技術",
    title: "到 2035 年，植物性創新和對營養豐富的食品解決方案的需求不斷增長將推動健康食品市場增長 - EIN Presswire",
    summary: "食品科技突破：'到 2035 年，植物性創新和對營養豐富的食品解決方案的需求不斷增長將推動健康食品市場增長 - EIN Presswire'。這項替代蛋白或食品加工技術的突破，可為素食口感帶來革新。",
    impact: "新原料與技術可應用於改善植物肉、素海鮮等質地，有助於我方研發團隊提升產品的保水與乳化性。",
    action: "收集該項新技術或新原料的規格說明與法規核准進度。",
    owner: "產品研發",
    source: "EIN Presswire",
    url: "https://news.google.com/rss/articles/CBMi-gFBVV95cUxPVF9IQTVsMnFnWW5zLU9rLWdpUEo1Vy13UEVmUnlMbUZkX3VRbEpjeUpCQl9WRExPbV9xYnd0Smc0amVFdGZkQ2RtMGY3NzV2QkliVWJhbXVYcGR4MUhvOU84RGZNS3Ewdlpwb19zR0Y4d3ZfdlNFZjU4eXd1M2ZRQVFzREpXSkI0bXo3b29nR2ZnX05ONk1MQkU5TjVrcjMxZi1TUkh1dU5Ob3ZWYmotV3N3dnBqQ0RpaHV2RHZOTG1lNlFjbHRkc080d2gzaXZxM2xRcEdZbFRlVlFsdEtzUjQwRlNMWGttSGtWZlMtVVlWZEUtb2ltWUxB?oc=5",
    priority: "中",
    publishedAt: "2026-07-22",
    collectedAt: "2026-07-23",
    score: 72,
  },
  {
    id: 96215453,
    region: "美國",
    topic: "消費趨勢",
    title: "產業聯盟發布植物性飲料中細菌孢子新指南 - Food Ingredients First",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'產業聯盟發布植物性飲料中細菌孢子新指南 - Food Ingredients First'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Food Ingredients First",
    url: "https://news.google.com/rss/articles/CBMihwFBVV95cUxPYUI3U0g4a1JZT3Q3c2k3MUlVaTB3VXhDVEtKczRyMzlKMTAtdDVHc3dOSjZnNWhyc3VJQUFJZm53b0hQQmc2YzVJNEdrXzZpUFY5S1dGWjBxYWx3TldUWk5lbE5OZnprNmpjMUVoelZudkRESHpEMThZMU05dDFkeW5HSC02V1U?oc=5",
    priority: "中",
    publishedAt: "2026-07-21",
    collectedAt: "2026-07-23",
    score: 70,
  },
  {
    id: 20237752,
    region: "美國",
    topic: "新品",
    title: "隨著植物性健康成分需求的加速，大豆異黃酮市場將強勁成長 - EIN News",
    summary: "新品上市動向：'隨著植物性健康成分需求的加速，大豆異黃酮市場將強勁成長 - EIN News'。這顯示了該地區在替代蛋白或素食創新產品上的最新趨勢。",
    impact: "研究該新品的口味、配方與主打客群，有助於齋滋味發掘適合台灣或出口市場的潛在產品方向。",
    action: "評估此類新品是否有進行本地化開發與改良的商業價值。",
    owner: "品牌行銷",
    source: "EIN News",
    url: "https://news.google.com/rss/articles/CBMi2wFBVV95cUxNRWpQRjV5Tk1WcFZnSHVEOHNBRlIzZ2wta2Z3WWxhNFJkZm9fTmJCZFJ6UGJFVlNsSFhkZEhpeXltazliMGQ1dzRaQUszRnhjbGZtUzZ3Nld1aHBhWFJzSEp2dnlkZkZHNHpNWWdZY1dBaG5TODVwVkFiMW4wMFZpaTFsWUFpTWNLRTA3OGJPYmdwN0xCNzk5OENsbmpCQTRsWjNwZ2ptcTRjV001WC04SVFuWHNvbXh6LXJ0UXVPc3FZcTVIQ0NTSHNya1JKRHNXQUNhaU1idVZoNms?oc=5",
    priority: "中",
    publishedAt: "2026-07-22",
    collectedAt: "2026-07-23",
    score: 75,
  },
  {
    id: 48319183,
    region: "歐洲",
    topic: "消費趨勢",
    title: "歐洲植物基市場達 163 億歐元 - 食品製造",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'歐洲植物基市場達 163 億歐元 - 食品製造'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Food Manufacture",
    url: "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPQ0k0OTRaX21xcHMzNE1RZnJwUmxYLVJzRlpsQ0w2a2NoX0RQeVZQemx1dzh5SGppWlB2RnJFRDAycmFjaHFoYmgwQmk3N0R0emR6NnFjaTZMNW1XRFpVMVZ4YzdNZnRXaDJTcEExMTNZQjVYNzBiTENSaTdWamlFalRWTWEzUUZxVXZCa0J1c2c5cnVNSjBOdjUyTnVvVHhlUVNuczk0RmlNcDVmV2IwWWJzdE1QLWE3?oc=5",
    priority: "中",
    publishedAt: "2026-04-09",
    collectedAt: "2026-07-23",
    score: 70,
  },
  {
    id: 67694178,
    region: "歐洲",
    topic: "消費趨勢",
    title: "除了替代品之外，日常產品推動歐洲植物性市場成長 5% - Green Queen Media",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'除了替代品之外，日常產品推動歐洲植物性市場成長 5% - Green Queen Media'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Green Queen Media",
    url: "https://news.google.com/rss/articles/CBMiigFBVV95cUxPMWpDTnY4Qk1uUWw1RjQyRnNZQ0FlYVRQYUZwa1ByX181Q3VaMlBDNTBLcDNlb1JWUnFTbXpMTTlJNTcxRmxxUDVvN0Y5eFhZTGRMdEJ5REhscGdyV0UzRFlITk5jQ0pKd3hxTUVsTWpUc2ljY1h0d1o3VnNMdzkwTnR5UnhUZVRoN2c?oc=5",
    priority: "中",
    publishedAt: "2026-04-10",
    collectedAt: "2026-07-23",
    score: 70,
  },
  {
    id: 47148721,
    region: "歐洲",
    topic: "消費趨勢",
    title: "植物性食品市場規模、份額|產業報告 [2034] - 財富商業洞察",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'植物性食品市場規模、份額|產業報告 [2034] - 財富商業洞察'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Fortune Business Insights",
    url: "https://news.google.com/rss/articles/CBMiekFVX3lxTE9SaFFqWlI2aW1RQUFfS3NtRUVRWlhmSDB6VldjQVhWNTd6WjJfVXp0aEUyTmR3NGJ1NDZtNVZ4Q291T1lybm9wVXhQbHE2ZHVsUHRpSkl6UGhwQW9mVEsxZWUtZ1E2RF9rOVFZTUdwZndqUFQ4eXB2ak5R?oc=5",
    priority: "中",
    publishedAt: "2026-06-29",
    collectedAt: "2026-07-23",
    score: 70,
  },
  {
    id: 93322994,
    region: "歐洲",
    topic: "原料技術",
    title: "歐洲純素食品市場規模及展望，2027-2033 - Grand View Research",
    summary: "食品科技突破：'歐洲純素食品市場規模及展望，2027-2033 - Grand View Research'。這項替代蛋白或食品加工技術的突破，可為素食口感帶來革新。",
    impact: "新原料與技術可應用於改善植物肉、素海鮮等質地，有助於我方研發團隊提升產品的保水與乳化性。",
    action: "收集該項新技術或新原料的規格說明與法規核准進度。",
    owner: "產品研發",
    source: "Grand View Research",
    url: "https://news.google.com/rss/articles/CBMif0FVX3lxTE85WkxvNHFwQVRhZE9rbXMzbTZuUVdyN3ZCckYtZmxvZ3ZTRHhlN3Riay0tbXVpb1BsSFdHQV9UcEJKYl9BQjB2SGdkM3c1RlAwbHhCYXg1VGotQlJTMldkckpGNnFrdFdOVjlGVU85ZXVlcHhLNmw5NkxNbXBrWFU?oc=5",
    priority: "中",
    publishedAt: "2026-01-23",
    collectedAt: "2026-07-23",
    score: 72,
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
    collectedAt: "2026-07-23",
    score: 70,
  },
  {
    id: 37718949,
    region: "澳洲",
    topic: "消費趨勢",
    title: "儘管植物奶蓬勃發展，維他奶仍虧損 - AFR",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'儘管植物奶蓬勃發展，維他奶仍虧損 - AFR'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "AFR",
    url: "https://news.google.com/rss/articles/CBMiqgFBVV95cUxPeXJoVGpHd05UUXlnVkl3R09DaTAyblFZM3RQeHM3SUJMdmR3TjVkckRwM2RDLWt6ZVB0dEJRVi1vd1UxRUNhSUg3RU11bV9Kd3VqdXBxTE5sWlBVRnFiNlNfcWRTWWxQYi1PRzU4dHZ5MkRkNUlrNDEzZ29TZUY4YV96bHEzVmZhdEQtUEdxUEx4bEdqZzVhUXlYZC1McDlKQ0xEb2lYb0dGdw?oc=5",
    priority: "中",
    publishedAt: "2026-06-26",
    collectedAt: "2026-07-23",
    score: 70,
  },
  {
    id: 27561022,
    region: "澳洲",
    topic: "消費趨勢",
    title: "植物性食品標籤產業實踐守則 - FoodProcessing.com.au",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'植物性食品標籤產業實踐守則 - FoodProcessing.com.au'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "FoodProcessing.com.au",
    url: "https://news.google.com/rss/articles/CBMi1wFBVV95cUxPVUtvRGVRaUppaUt2elk2a2sxMjVVRDZud1Q0QTd0dUJFSllHRHR5bnN2YU95U2NkTTQ0TmNLMkFWMHI0aXRRamY1TDRJdlNtUE5scHBob05abEVFYmR5SGd3ZF9NSUNoZ3paNTVLaFYyZFlSajQwT1hDOHVfMkNYQmlOcXY5eWFEb1lLT1M3REVGOVlWdFZKQ1lUU05GQ05VYVhxeDdsUXB6V25OYlFKeFo5S3dKaHI4eTg0bmVpT3VyYzFjSkNLalRsRm5JNGtMMUZfRGRRWQ?oc=5",
    priority: "中",
    publishedAt: "2026-02-02",
    collectedAt: "2026-07-23",
    score: 70,
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
    id: 72156862,
    region: "澳洲",
    topic: "消費趨勢",
    title: "想要撼動植物奶市場的小人物 - BeanScene",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'想要撼動植物奶市場的小人物 - BeanScene'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "BeanScene",
    url: "https://news.google.com/rss/articles/CBMilAFBVV95cUxQREluWDBReG42dnZlSW9qdVUzLVFWY2Fuc2xRV2ppNHhFbDZ5d1JEWHprNlZwd2RhN29KM0JDU2p1d3U0MnZpTUpJT1NSVlJnZEpNVFZIbnJmM2JTUUtkcDItS1VqdVdSc1NmTk9MRm8wQks2QXhNd2Jscy1QR2hTM0FqeFlYTUJTZkNZMm91ZWI4WXJJ?oc=5",
    priority: "中",
    publishedAt: "2026-04-13",
    collectedAt: "2026-07-23",
    score: 70,
  },
  {
    id: 12147283,
    region: "台灣",
    topic: "原料技術",
    title: "食安議題不該成為政治惡鬥的工具 - ETtoday新聞雲",
    summary: "食品安全與品質與品質管控事件：'食安議題不該成為政治惡鬥的工具 - ETtoday新聞雲'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "ETtoday新聞雲",
    url: "https://news.google.com/rss/articles/CBMiT0FVX3lxTFBpd0Nka3JJV0hXcEtFN3RzZXhuam9BcmlIZlMzUEJKR3ZHTS1tMzhHNTZYamgxS1Y0RDd1R3F5ckktT1ZISndpMHFoWlBBc03SAU5BVV95cUxQMDVPdlV2YWJEZzdiRG1zRGhJSFRGaGxyWWRQcW5ZN1EzSUpnc2lOMG9odld3TEJfY3VjT096bUNsTjVVd3FtbnQzLXhRdnc?oc=5",
    priority: "高",
    publishedAt: "2026-07-23",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 24640917,
    region: "台灣",
    topic: "原料技術",
    title: "衛福部認查驗量能不足 王育敏：50億前瞻食安預算花到哪去？ - UDN",
    summary: "食品安全與品質與品質管控事件：'衛福部認查驗量能不足 王育敏：50億前瞻食安預算花到哪去？ - UDN'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "UDN",
    url: "https://news.google.com/rss/articles/CBMiU0FVX3lxTFBuMnozNUcxU25GNUJKS2d0VFNaWGNhcFVxZVl0dlBsZmZtbndSM2dNenBIWWVaVE9FRS1IRWdIbEQ3blVJV0VENlpCN1VONDBURGhB0gFYQVVfeXFMTlB2djFvVVZXZXR5MEVMYzhFSnVBZFAwcEktQ1VDTDdwVE5lMUhWdG5VODZBYTR0aW9fNEk3dEc5OXJ2aGpoOUtXY1d4TUpMZjhwaEJLNUJqRw?oc=5",
    priority: "高",
    publishedAt: "2026-07-23",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 67707569,
    region: "台灣",
    topic: "原料技術",
    title: "見韓國瑜早退食安會！他揭蔣萬安725上凱道內幕：目的是2026、2028選舉 - Yahoo新聞",
    summary: "食品安全與品質與品質管控事件：'見韓國瑜早退食安會！他揭蔣萬安725上凱道內幕：目的是2026、2028選舉 - Yahoo新聞'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "Yahoo新聞",
    url: "https://news.google.com/rss/articles/CBMihgNBVV95cUxOZEhXYTUtUktoTUdxN0ZRY0NIdW45YU1TODF1b1BnYlBENWN0Sm1aZmFHS2RJMmM4Y04xVFo3djdhVkdtSlpGYzQ3U3hySkdRa3lUaGVQX2FoZkhXelk0ejN2VVlUVzlWdlNieTRlbC1tZVY2VzBOblNHTURaNHhXOENDNHRhMURQczU4QVZpT0RhWV9ZWU5VbEVWdjZ3T0hkSmRfYlBRQ182bUYyMlM5NUNNYUVIZlRRMWRPR291TFpvVmdxN1pVVG1CUFNGekQ1Z2VyRXB6cmhaTy1rVm9XMlFIck0zbjZLaEd3ZUpjaU5oMlBSaGxFMmt0YzEzU1hYWFA0dE1BQUZCY25VbjFES1dEUXdDZFVCa3FNeXhtbEJHVFNlSW9nQkl6cFRWb3l4WG1BLWRfclM5SHVhVlRHLTlXdzdrTjVjNnhCSFVOT3ZUSkQ3LTlPZkhvVTZNUFNjdHhOZEYxZGZ0OEpscGx2azRRZENTSklQUmpDUkpYN0RpTmY1TFE?oc=5",
    priority: "高",
    publishedAt: "2026-07-23",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 9411118,
    region: "台灣",
    topic: "原料技術",
    title: "珍奶推手開富食品以公益、國際食安打造方舟庇護永續 - peopo.org",
    summary: "食品安全與品質與品質管控事件：'珍奶推手開富食品以公益、國際食安打造方舟庇護永續 - peopo.org'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "peopo.org",
    url: "https://news.google.com/rss/articles/CBMiSEFVX3lxTFBnTDdEZXpUZWhIRVRMMDQ5TDhQbWFHRjRuRW1NdEh3UDNHUmRPdU15aDdQQ0E3SHBfWGJpU2lFTUVBRWZXQ2lYYw?oc=5",
    priority: "高",
    publishedAt: "2026-07-23",
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
    id: 81572620,
    region: "台灣",
    topic: "原料技術",
    title: "衛生檢查員檢查密爾瓦基夜市的食品安全 - TMJ4 新聞",
    summary: "食品安全與品質與品質管控事件：'衛生檢查員檢查密爾瓦基夜市的食品安全 - TMJ4 新聞'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "TMJ4 News",
    url: "https://news.google.com/rss/articles/CBMizgFBVV95cUxQYS1VYjdHTnJkdVVicExuLWJDbkxqbTg0NnFoLWxCdW1RMW5NTFpXMC1VWkswZW9iVEM2T2pPOHJieUh3Yi00SWJVaGctLTRWM04xalB0aWdyXzFTelhyNjhlcjl5MVJLUEFhTFhfOWtMRTZfM2YzZjUtVUdYOUI4YUl4cEx2c3U1ZEx3dFlJZE0yemRQcVZDaGZzZG9TNmdXbDh4OXBQRlI3bEtqdnpKREZtVmwyUGhvWEFhN0JiRHlxQWF2R3dIcHpaNEd6dw?oc=5",
    priority: "高",
    publishedAt: "2026-07-23",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 20424825,
    region: "台灣",
    topic: "原料技術",
    title: "「我們已經來了」：環孢子蟲病爆發揭示了食品安全系統中的漏洞 - 約翰霍普金斯大學彭博公共衛生學院",
    summary: "食品安全與品質與品質管控事件：'「我們已經來了」：環孢子蟲病爆發揭示了食品安全系統中的漏洞 - 約翰霍普金斯大學彭博公共衛生學院'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "Johns Hopkins Bloomberg School of Public Health",
    url: "https://news.google.com/rss/articles/CBMigAFBVV95cUxOV0xlUWNJdmREVTRHNE80RFBfQmY2N0l6djM4RENxQnhybmNJOHNRYXNoR1YyNS1HamEtN2hHWTRHWWtoN2FRbHFDb05faklJZkM0aXpWWVk1LWU5WUg0X1JQTnFva1VIZ0Nrb281XzFoVDVWVlI2YzJ1eTVTVFd2dA?oc=5",
    priority: "高",
    publishedAt: "2026-07-22",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 82498591,
    region: "台灣",
    topic: "原料技術",
    title: "由於食品污染問題，歐洲食品安全局大幅削減反式脂肪酸安全限量 - FoodNavigator.com",
    summary: "食品安全與品質與品質管控事件：'由於食品污染問題，歐洲食品安全局大幅削減反式脂肪酸安全限量 - FoodNavigator.com'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "FoodNavigator.com",
    url: "https://news.google.com/rss/articles/CBMiywFBVV95cUxOV3RNaWdUcHpjYmt1ZkpkZWJXUjNWVVZmLUU1ZXV0bXhrelM0N2cyYWNfaWJaaEVqZkVSX2VZTjVpcUVDdGxBTmZ5dkwzLW8wRmpZTkdoMFU2TFg2TktqemF1SUxONFY5UWdRVDlzVGpsNTNPMWt1aUd6NzNheXEyOGJ2aUhLMnBBTHpMMnprQkZkVHV3TnJ2bjdDbGtDWVNXWXpSUTVDQVJhTFZIRVl6R1UtT2VJQWNGV0lhekJnM1JkLUZINFBkbHpzYw?oc=5",
    priority: "高",
    publishedAt: "2026-07-23",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 12865885,
    region: "台灣",
    topic: "原料技術",
    title: "歐盟食品安全機構降低了「永遠的化學物質」TFA的每日安全攝取 - Euronews.com",
    summary: "食品安全與品質與品質管控事件：'歐盟食品安全機構降低了「永遠的化學物質」TFA的每日安全攝取 - Euronews.com'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "Euronews.com",
    url: "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNc3B4aEhZQ21WMmJIaFpiYkhJQWdsWFJkUnN5cF9lWWJrOVZ0dWNFdVl2dDNwVXhZQy1JTmVvd3FaX0F1YXNxUEhwM2JNMUtISWREVm8wQ2k5dlNUQTBVamdUbnBCbnBaWGN6SEh2cmF2WmV4bGFoeHdpOU0wSWtZeWNGQXRIby1NRFBQZ2VOZ1cxYURuSnJBZUhqVzdIMDBaVEFoTXhmWjE1UzVGYVp0aXNJZ1F0bFFLcXNKTlRlWTlnUQ?oc=5",
    priority: "高",
    publishedAt: "2026-07-22",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 48431873,
    region: "台灣",
    topic: "原料技術",
    title: "7 月 13 日至 19 日當週中心縣食品安全檢查 - Spotlight PA",
    summary: "食品安全與品質與品質管控事件：'7 月 13 日至 19 日當週中心縣食品安全檢查 - Spotlight PA'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "Spotlight PA",
    url: "https://news.google.com/rss/articles/CBMixgFBVV95cUxQeTZyaXFkSk9XUG4zY3Y2SlczZTVxdmxOTmVkVzlmekNWRkd5a3VhM09uQVh6SzBmYlI2RDF4WXRka0l2aWxES2haTUhQT2Izd3FRR3dWbTVtZHNaMlFybHdLTU5WcEFCUVB2SnJvS1lDdHpRbEFmWWRPZ19Mb1FYRWVpdmFpYkNNUkRheU1ndUw2TlA1WlczY09YVEotbUtBN19GTzdKNFM4ZV9vMTNBaGZMelQ2SFluQWlBaFlteXNLVFI4U1E?oc=5",
    priority: "高",
    publishedAt: "2026-07-21",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 8218005,
    region: "台灣",
    topic: "競品",
    title: "素食市場成長！知名大廠投入4億建台灣首座素食鮮食綠電智慧工廠 - 自由財經",
    summary: "同業大廠最新動態：'素食市場成長！知名大廠投入4億建台灣首座素食鮮食綠電智慧工廠 - 自由財經'。此動作反映了素食產業競爭格局的最新進展。",
    impact: "分析同業大廠的市場佈局與產品定位，以制定我方的競爭防禦策略與產品研發策略。",
    action: "評估同業此項動作對我方主力產品線的潛在競爭影響。",
    owner: "產品研發",
    source: "自由財經",
    url: "https://news.google.com/rss/articles/CBMiX0FVX3lxTFBLUzk5bHJqcEFxWnFHTDItRzlzZlE1SVRhanFNUkxYNkpNU3ZMU29vbjcta05JTkZtN1J2d1Z4VWRVYTBJMHJrSXAzeVM3V1hxUXhwVGJSYXhPbkxaalZn0gFkQVVfeXFMUFpvRXhlSmJnTDNLWHRjT290aW9zdmJ1c0k5ZmdfZUNXaUVNaFA4blNRWTJPc2c0Wm9ObmNfdzNuLXl3TEhsb0ZWaGdlMDl5Y3pNMi1LZm9tOU9RV0tUMVlaMXA5Ug?oc=5",
    priority: "中",
    publishedAt: "2026-02-22",
    collectedAt: "2026-07-23",
    score: 80,
  },
  {
    id: 12407390,
    region: "台灣",
    topic: "競品",
    title: "（有影片）／弘陽生技4億打造綠電智慧工廠 綠能AI冷鏈布局全球素食市場 - 觀傳媒",
    summary: "同業大廠最新動態：'（有影片）／弘陽生技4億打造綠電智慧工廠 綠能AI冷鏈布局全球素食市場 - 觀傳媒'。此動作反映了素食產業競爭格局的最新進展。",
    impact: "分析同業大廠的市場佈局與產品定位，以制定我方的競爭防禦策略與產品研發策略。",
    action: "評估同業此項動作對我方主力產品線的潛在競爭影響。",
    owner: "產品研發",
    source: "觀傳媒",
    url: "https://news.google.com/rss/articles/CBMiV0FVX3lxTE50V2lkU0hIWEpPMzMya0pfbXJfdkI1c2huVTl4UlRtczdSSllxSEZaMndKTDlkaFBkemlRbWtsNnZtZ2lTVF91OFEzRG1PQ0xaZEJrZ2pydw?oc=5",
    priority: "中",
    publishedAt: "2026-02-22",
    collectedAt: "2026-07-23",
    score: 80,
  },
  {
    id: 56954528,
    region: "台灣",
    topic: "競品",
    title: "台灣素食龍頭弘陽食品 投資4億打造首座綠電智慧新廠 - UDN",
    summary: "同業大廠最新動態：'台灣素食龍頭弘陽食品 投資4億打造首座綠電智慧新廠 - UDN'。此動作反映了素食產業競爭格局的最新進展。",
    impact: "分析同業大廠的市場佈局與產品定位，以制定我方的競爭防禦策略與產品研發策略。",
    action: "評估同業此項動作對我方主力產品線的潛在競爭影響。",
    owner: "產品研發",
    source: "UDN",
    url: "https://news.google.com/rss/articles/CBMiUEFVX3lxTE1Bd2NJeXEySTBCX2NYc1QtWUdOZUJfY1F0WlZwRmRLM2lmdjlyR09ZN0ZQOG9uYUVxVUhxMGhUYVRCTFhjZXB0N09pUHExN09a0gFWQVVfeXFMTnFaRkVRSHc4dWVIMVZhczFERjZnZFh0Vm0tUGVtbWZBSXd5Um96a2tnbmNzUTg5czRwejFBc3NUbXBFbW02VTktOVlHV3phT2Z0UXhHRmc?oc=5",
    priority: "中",
    publishedAt: "2026-02-22",
    collectedAt: "2026-07-23",
    score: 80,
  },
  {
    id: 94918796,
    region: "台灣",
    topic: "競品",
    title: "Beyond Meat股價暴升原因是什麼？分析素食食品市場前景與挑戰 - 股股學院",
    summary: "同業大廠最新動態：'Beyond Meat股價暴升原因是什麼？分析素食食品市場前景與挑戰 - 股股學院'。此動作反映了素食產業競爭格局的最新進展。",
    impact: "分析同業大廠的市場佈局與產品定位，以制定我方的競爭防禦策略與產品研發策略。",
    action: "評估同業此項動作對我方主力產品線的潛在競爭影響。",
    owner: "產品研發",
    source: "股股學院",
    url: "https://news.google.com/rss/articles/CBMiakFVX3lxTE5fZlRpUFgtaDVFbmRlcXhGTFZUYW9vazd0MFAwa0NYci1FVU1RMHBtcHNpLTVpR01fMUE2LXp1blBKdHRMb1dnd2x4WVA3VUxIZWFFSHRfaVVENm5JcnlsRy1kUnNkS2JpekE?oc=5",
    priority: "中",
    publishedAt: "2025-10-27",
    collectedAt: "2026-07-23",
    score: 80,
  },
  {
    id: 28051245,
    region: "台灣",
    topic: "競品",
    title: "領跑素食王國就靠口味研發這一招！ 松珍跳脫傳統素食圈、破350種產品銷全球 - 食力 foodNEXT",
    summary: "同業大廠最新動態：'領跑素食王國就靠口味研發這一招！ 松珍跳脫傳統素食圈、破350種產品銷全球 - 食力 foodNEXT'。此動作反映了素食產業競爭格局的最新進展。",
    impact: "分析同業大廠的市場佈局與產品定位，以制定我方的競爭防禦策略與產品研發策略。",
    action: "評估同業此項動作對我方主力產品線的潛在競爭影響。",
    owner: "產品研發",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiZkFVX3lxTE55bVNFRmJ0YWRRN1NpcF9OM3Ewc0pfXzhtRDNYbXJ3VmVrOXJ0SmhzTWZWTzc0Y0pVaW9sMS1TejdRTTZTcWx1SXU4V21zTkt3OGtiUlNfZWl0MldyOUZFTV9XWXd6Zw?oc=5",
    priority: "中",
    publishedAt: "2022-03-11",
    collectedAt: "2026-07-23",
    score: 80,
  },
{
    id: 33649094,
    region: "台灣",
    topic: "消費趨勢",
    title: "素食者小心缺乏維生素B12會造成貧血！可以選擇哪些食物來補充？ - 食力 foodNEXT",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'素食者小心缺乏維生素B12會造成貧血！可以選擇哪些食物來補充？ - 食力 foodNEXT'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiakFVX3lxTE5CaE1XRjBPV1hidHQzRWx6U3RFMmhRZGxWZldqQ0k2S2Y4QktWR1ZjQlpPcEdiOVdpTmtLZXBMYThDTjV5MXQ5YnJWeWd0dm1iU1lYYkl3VFVtUmJLMDM0bHhTbTIzQU94dnc?oc=5",
    priority: "中",
    publishedAt: "2024-05-31",
    collectedAt: "2026-07-23",
    score: 70,
  },
{
    id: 47506638,
    region: "台灣",
    topic: "原料技術",
    title: "素食加工品常見添加超標與摻葷兩大問題 - 食力 foodNEXT",
    summary: "食品安全與品質與品質管控事件：'素食加工品常見添加超標與摻葷兩大問題 - 食力 foodNEXT'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiW0FVX3lxTE1tQ0ducG9NWFpKR2dYeE12WmgwS3JkMVhIbGQ4UFBxNFJCSmNjcDY4RFNhS0F5bThqWThxc0o3Vy10LXlsRXdnRTR3TUhncFlaYk5SSFBoSTRlSlU?oc=5",
    priority: "高",
    publishedAt: "2016-09-14",
    collectedAt: "2026-07-23",
    score: 85,
  },
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
    id: 68722781,
    region: "台灣",
    topic: "消費趨勢",
    title: "全球「彈性素食主義」人口已達42%！年輕人吃素竟與社群媒體有關？ - 食力 foodNEXT",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'全球「彈性素食主義」人口已達42%！年輕人吃素竟與社群媒體有關？ - 食力 foodNEXT'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiZkFVX3lxTE5PaWxwVUVzeFY4U0xFMjVEY0NHcGN0YTdfenhmUXg2RTFtSmJXSHdxdElyeVh3UDZoM1lBdllXR0J6cGZER0FPY3RJRmd4Ni1jTmxBZVFXWFlsdWplQzBYdjhEOHFKdw?oc=5",
    priority: "中",
    publishedAt: "2021-04-13",
    collectedAt: "2026-07-23",
    score: 70,
  },
{
    id: 24276721,
    region: "台灣",
    topic: "消費趨勢",
    title: "不用雞蛋也能製造出金黃表皮！素食者的新福音來了 - 食力 foodNEXT",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'不用雞蛋也能製造出金黃表皮！素食者的新福音來了 - 食力 foodNEXT'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiakFVX3lxTFBIc3ROeVdBZ3c1RTlJOEV5Wk9oN0ozRkpnUlBadEJ3YmJveEVWMEtyeXhldVFBQlNTWmRxajFPQ3dVellEZ25XM0xiN1I1QXNNSWVDRjg0X3pnY2tLRVpGU2NPMEd2SzZiVFE?oc=5",
    priority: "中",
    publishedAt: "2021-10-12",
    collectedAt: "2026-07-23",
    score: 70,
  },
{
    id: 44369296,
    region: "美國",
    topic: "新品",
    title: "植物肉品牌在韋格曼斯首次推出新產品 - 民主黨和紀事報",
    summary: "新品上市動向：'植物肉品牌在韋格曼斯首次推出新產品 - 民主黨和紀事報'。這顯示了該地區在替代蛋白或素食創新產品上的最新趨勢。",
    impact: "研究該新品的口味、配方與主打客群，有助於齋滋味發掘適合台灣或出口市場的潛在產品方向。",
    action: "評估此類新品是否有進行本地化開發與改良的商業價值。",
    owner: "品牌行銷",
    source: "Democrat and Chronicle",
    url: "https://news.google.com/rss/articles/CBMiwAFBVV95cUxNLUJjaW1wTl9GZlJWTFc1dG1ad0ZqbU9IVVVLZWNpMTJRdzJPNWdwS0xLaTNCRi10SUwyMWJZb3FIY1hJcVc2UTdXSEJFSXZHQXd4UTN3c0JBQ09odXhYYUFHMWg2bUFXUm9SYVF0d1BSMG5UbFZOOHdYR19oSldkUjR6V0tUZmVJdFY5VDJDVHlwR2pPWG5PMVgtbkxPN0xYZlQtZXNQQ3AtVEtxSElRaFFtajB1VktZb1FtZEFDbFk?oc=5",
    priority: "中",
    publishedAt: "2026-07-06",
    collectedAt: "2026-07-23",
    score: 75,
  },
{
    id: 2564431,
    region: "美國",
    topic: "消費趨勢",
    title: "Steakholder Foods 將植物性肉類生產線運往美國市場 - Investing.com",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'Steakholder Foods 將植物性肉類生產線運往美國市場 - Investing.com'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Investing.com",
    url: "https://news.google.com/rss/articles/CBMitAFBVV95cUxQcTBPVzg2UGdJWTZxYWhaOVNlUTdPdC01NjN4bHQyTU1ueHo5eXY0TURQbnN1bUJqYUVLMVZqcXNQbU81eklsVVJpSWFxMWNpWDFkMmw4Y2QwN0Rwa1VkUy16YUI3bENxWUUxTlF5VnJSVXh3cWJMd3pUdThVUzgzYXdBT2dxSDQ5aXc5YTN6b2I4S3VqR1VwVm5qNkxFTmJsVHRLdUlQNGxCTWdFZy1Pc2h2MlQ?oc=5",
    priority: "中",
    publishedAt: "2026-07-14",
    collectedAt: "2026-07-23",
    score: 70,
  },
{
    id: 32465321,
    region: "美國",
    topic: "消費趨勢",
    title: "Steakholder Foods 開始將 Perfecta™ 優質植物肉進入美國市場 - 亞洲食品雜誌",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'Steakholder Foods 開始將 Perfecta™ 優質植物肉進入美國市場 - 亞洲食品雜誌'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Asia Food Journal",
    url: "https://news.google.com/rss/articles/CBMirwFBVV95cUxPVlc5ZmNqUTJzTThkNm5oUVdfejZlV2trQ2hiS0ZtWm92eTMxdkUzaGl4cEhpbnJRM2h3VG1aS0JuTUY4SnRqVGtzMWxKS282YngyWTZpZ2RNVGhiN1MwQkNweWEydjZ2NWZxcDkwTHhTLWdQZkEyWUstcWg4VTYweUo4emRKdjlQUEN3MFp6MFh4Wmo5VzBXaW9CTWF6b09fUUJULWYyT2wweFI3NzFV?oc=5",
    priority: "中",
    publishedAt: "2026-07-16",
    collectedAt: "2026-07-23",
    score: 70,
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
    id: 27239778,
    region: "美國",
    topic: "新品",
    title: "Steakholder Foods 將在美國推出植物性產品線 - foodengineeringmag.com",
    summary: "新品上市動向：'Steakholder Foods 將在美國推出植物性產品線 - foodengineeringmag.com'。這顯示了該地區在替代蛋白或素食創新產品上的最新趨勢。",
    impact: "研究該新品的口味、配方與主打客群，有助於齋滋味發掘適合台灣或出口市場的潛在產品方向。",
    action: "評估此類新品是否有進行本地化開發與改良的商業價值。",
    owner: "品牌行銷",
    source: "foodengineeringmag.com",
    url: "https://news.google.com/rss/articles/CBMirgFBVV95cUxOX0pvMEhoLXBoejB3ZFZGcFpoSWViZHRjdm41RXNsYjhRNGZNci1DVkRld2t1a0QxVHI4dHlkWkx0d2o4RFJPakRreTR3OUhndU5JOUVVZEdXR0pPclc2LUpkWUNqLW56UG1aOEhGOElvcUpOdEh0Q2dYNTZ6Wm1WZHFtOVBqYTBOR251U0ZqT0tONHptemdqZ3pXSlp3TXU0ZGtha1lVNWdhNUstRkE?oc=5",
    priority: "中",
    publishedAt: "2026-05-21",
    collectedAt: "2026-07-23",
    score: 75,
  },
{
    id: 90115350,
    region: "歐洲",
    topic: "新品",
    title: "「沒有明顯的環境效益」：歐盟對「肉類」植物性標籤的打擊引發氣候擔憂 - Euronews.com",
    summary: "新品上市動向：'「沒有明顯的環境效益」：歐盟對「肉類」植物性標籤的打擊引發氣候擔憂 - Euronews.com'。這顯示了該地區在替代蛋白或素食創新產品上的最新趨勢。",
    impact: "研究該新品的口味、配方與主打客群，有助於齋滋味發掘適合台灣或出口市場的潛在產品方向。",
    action: "評估此類新品是否有進行本地化開發與改良的商業價值。",
    owner: "品牌行銷",
    source: "Euronews.com",
    url: "https://news.google.com/rss/articles/CBMixAFBVV95cUxNVDZaN0NSTDlLQjZ6aG5vUlBmdVBZdG1QdlB3VUZudlh3bEZtVEg3cmVGRjZRQ2NXNW5xYU1uVnJGTjJCSUM3czNHbmJjZmdiREtMTlcwRUxNYlRtaHk3VGMzUlNwQXBLMEkzWV83MGg2SUw0UFJnWkhpVmtVbXAzNW85clVacHdTVE1oNlBhTUlCUWpHNjU0Y1VQYWN5VXBpNFY3M0d5N0hlSl9Yc3lFcGpuT3daa290NHRqcDd4aXRUVGx5?oc=5",
    priority: "中",
    publishedAt: "2026-06-03",
    collectedAt: "2026-07-23",
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
    collectedAt: "2026-07-23",
    score: 70,
  },
{
    id: 31611026,
    region: "歐洲",
    topic: "消費趨勢",
    title: "歐盟同意禁止數十種植物性食品的肉類名稱 - 新食品",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'歐盟同意禁止數十種植物性食品的肉類名稱 - 新食品'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "New Food",
    url: "https://news.google.com/rss/articles/CBMirAFBVV95cUxNS0ttd2pwY0hfZGwxTnRNbk5fX21xeHU3Rnhlek5YUzFLR1hPNzVhOTBMMjVCWDJFQ0JxVVE3OHNUU2VldzUxLUdtNEhWTXZpVHZIU21qXzZjdnRQYkRnbE5CX1hQZWdpSTd5Nl9kajBYcDVRNGRzQXZPTDF0NEI5OGFFdE5sVUd5SXNxMTRGWHE5T05XZkZDYXZabzhnOFRhckVxYkliWmp3ekN4?oc=5",
    priority: "中",
    publishedAt: "2026-03-06",
    collectedAt: "2026-07-23",
    score: 70,
  },
{
    id: 60572962,
    region: "歐洲",
    topic: "消費趨勢",
    title: "為什麼素食培根將打破歐盟的標籤禁令 - politico.eu",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'為什麼素食培根將打破歐盟的標籤禁令 - politico.eu'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "politico.eu",
    url: "https://news.google.com/rss/articles/CBMikAFBVV95cUxQS09keFhiSTdlUXAxZ1NQcmp4YllOOXdmT0IzVHpsRHdjSXZyYk5hVnRVM1R5bVV4cDkydkZkcnR0NUt5RWVUb2xxRjZPVXh0SnpuQVhla3k3V2plWnExMjhfT1lCSkJGd3lwYXRZVG1FSU1vdmdXd253VUdlMmZ1N1lGTVZxU2JTNk1mOG94M3Q?oc=5",
    priority: "中",
    publishedAt: "2026-03-15",
    collectedAt: "2026-07-23",
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
          <time dateTime="2026-07-23T03:41:36+08:00">2026/07/23 03:41</time>
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
              <p>每日 08:30 檢查公開評價與品牌提及；Google 評論最近查核：2026/07/23 03:41。</p>
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
