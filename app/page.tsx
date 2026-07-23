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
    title: "到 2035 年，植物性創新和對營養豐富的食品解決方案的需求不斷增長將推動健康食品市場成長 - EIN Presswire",
    summary: "食品科技突破：'到 2035 年，植物性創新和對營養豐富的食品解決方案的需求不斷增長將推動健康食品市場成長 - EIN Presswire'。這項替代蛋白或食品加工技術的突破，可為素食口感帶來革新。",
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
    collectedAt: "2026-07-23",
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
    collectedAt: "2026-07-23",
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
    collectedAt: "2026-07-23",
    score: 75,
  },
  {
    id: 59802072,
    region: "澳洲",
    topic: "消費趨勢",
    title: "Daring Foods 收購 v2food 後將清潔標籤植物雞肉引入澳洲 - Green Queen Media",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'Daring Foods 收購 v2food 後將清潔標籤植物雞肉引入澳洲 - Green Queen Media'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Green Queen Media",
    url: "https://news.google.com/rss/articles/CBMinwFBVV95cUxQZUs5MHMxaEh6aVlnOHdFcW5TRUxyN1l5RW5TS1RXTUl0V2xvN0ZCSXhDU1RXV2toUS1uNzVvc3FISmg2REdsR0NkbE1tNEhVbTBDRGkyc1JqZjNpWkh5YlpuMVFqRkFJbk9XbVRSeno0R1BINmg5bF9GMEZBNVItSjFMYVVxbjdzclFjMFRwcEhjUWJLbTFGRkZ0YWhwV0k?oc=5",
    priority: "中",
    publishedAt: "2026-05-27",
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
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 37968714,
    region: "台灣",
    topic: "原料技術",
    title: "聯合報社論／食安風暴連環爆，卓內閣一路偏袒業者 - UDN",
    summary: "食品安全與品質與品質管控事件：'聯合報社論／食安風暴連環爆，卓內閣一路偏袒業者 - UDN'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "UDN",
    url: "https://news.google.com/rss/articles/CBMiUEFVX3lxTE42amJvSTFIX3I0VFFaR3N0RE1hYVllcENjZFc1aVd3Qmh3LVdXRHlIUldTRkpYN0JFWHFkU21tQ1IyMmJ0RW0yc2hIbWVKUzJQ0gFWQVVfeXFMUGdhdnYzd0JMbk44QzRBTlJLYWxTU1RPeGd3VEJDTFBFT2czV09yUmtOVEQyR1UzVy0xeno1SUx3bEEwMDhqWDd5OFBHY1ZZVVlwR00yTWc?oc=5",
    priority: "高",
    publishedAt: "2026-07-15",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 68614438,
    region: "台灣",
    topic: "原料技術",
    title: "劉建國籲建立食安分級指揮機制 全面檢討下架標準、中央全程督導問題油銷毀 - 台灣新聞雲",
    summary: "食品安全與品質與品質管控事件：'劉建國籲建立食安分級指揮機制 全面檢討下架標準、中央全程督導問題油銷毀 - 台灣新聞雲'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "台灣新聞雲",
    url: "https://news.google.com/rss/articles/CBMiR0FVX3lxTE1jMVJ3TGhBLWhMc1pILU5vX0xwc3BKT044U2dRRXdyaTRMUF9vU1lFYnVUNG05T3E3bmxneTVPajhQX1Fzejlv?oc=5",
    priority: "高",
    publishedAt: "2026-07-22",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 1871260,
    region: "台灣",
    topic: "原料技術",
    title: "【錯誤】網傳台灣最多農藥的10種水果？食安危機影片？缺乏實務觀念的不實描述！專家詳解 - 客新聞 HakkaNews",
    summary: "食品安全與品質與品質管控事件：'【錯誤】網傳台灣最多農藥的10種水果？食安危機影片？缺乏實務觀念的不實描述！專家詳解 - 客新聞 HakkaNews'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "客新聞 HakkaNews",
    url: "https://news.google.com/rss/articles/CBMiUEFVX3lxTE5KRlNVMzBhdE9nMjI0blZvVG80Y1l2eU9GMFdLb1VwVnFrMzUzTHhsMU04NlpvRnU3cDFQQ3JuTnNQTXpwUldwd1h0UEFuR0dv?oc=5",
    priority: "高",
    publishedAt: "2026-07-22",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 53649717,
    region: "台灣",
    topic: "原料技術",
    title: "觀點投書：從中聯油脂案看《食安法》大修─24小時預通報與數位圍籬的「理想」與「現實」 | 魏季宏 | 評論 - 風傳媒",
    summary: "食品安全與品質與品質管控事件：'觀點投書：從中聯油脂案看《食安法》大修─24小時預通報與數位圍籬的「理想」與「現實」 | 魏季宏 | 評論 - 風傳媒'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "風傳媒",
    url: "https://news.google.com/rss/articles/CBMiTkFVX3lxTE5MN0E0ZDlCeFBvVmRCLXZ4ZzFQbzI4VDhQb1pZSU1ycmN3VU1qYjk3RHg3MTkyYVlmOTA3azhiNlY0NExGYVhlcTA2Q2hWZw?oc=5",
    priority: "高",
    publishedAt: "2026-07-22",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 32740068,
    region: "台灣",
    topic: "原料技術",
    title: "環孢菌爆發期間食品安全專家吃什麼 - 時代雜誌",
    summary: "食品安全與品質與品質管控事件：'環孢菌爆發期間食品安全專家吃什麼 - 時代雜誌'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "Time Magazine",
    url: "https://news.google.com/rss/articles/CBMijAFBVV95cUxQNHJZWXhJMlZOdnpuN2E4RW5YVVozUXhfVzFTaGpMWXU4bGlrcEdqZUxKTHViZDV5ajJHS1RiRXkxNDlSd0lDY3VMeUJPY2U5X0l0OGxIODZQcGhTSWVsY3hlM3JEbU1OS3RNWUFyY1piQUhfZW9RbWIyNUR0YXRXdHR4OVp1QVZjdHB6OQ?oc=5",
    priority: "高",
    publishedAt: "2026-07-22",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 69576916,
    region: "台灣",
    topic: "原料技術",
    title: "環孢子蟲爆發揭示了我們的食物系統 - 為什麼",
    summary: "食品安全與品質與品質管控事件：'環孢子蟲爆發揭示了我們的食物系統 - 為什麼'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "WHYY",
    url: "https://news.google.com/rss/articles/CBMijgFBVV95cUxOZ2R1T1hiczVaaVYwMXB1a2cxcngxN2x6Nk9DeEpaZzNJVXVJRmEzNnFTRmY2Vy1mVk56Z0tCb1Rka3h3cWN5TlBuVlJmT2tnaXV0R1dfN2V2Zm83TVZnaGdSZ0Vaa3VTLTdRSk9EUGNHRmhBTlczNkNaRm5vQTZQTXQ1b29PdTdxZU1IZlZB?oc=5",
    priority: "高",
    publishedAt: "2026-07-22",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 29017112,
    region: "台灣",
    topic: "原料技術",
    title: "調查發現人們對食品安全風險日益擔憂 - foodsafetynews.com",
    summary: "食品安全與品質與品質管控事件：'調查發現人們對食品安全風險日益擔憂 - foodsafetynews.com'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "foodsafetynews.com",
    url: "https://news.google.com/rss/articles/CBMilgFBVV95cUxPdjZlN3dpX3VfN3BCNDFkVFF0V3ZHd0lqSWljQ3k2SkVRcEVyLVlJaVB5enVIYndaSWZzclhlSE9wUl9WMWdTSmp6YTFManJJSmdQLUZwVnBaTVB4UmtELU5sYUh5azhBcTI0MXh1QVZ6bUNhdk1Bal81RkxVWFUwZTg0bG83LW5aa3JGeEFpWTFna1BiMFE?oc=5",
    priority: "高",
    publishedAt: "2026-07-22",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 4581373,
    region: "台灣",
    topic: "原料技術",
    title: "FDA 撤銷對兩種過時食品染料用途的授權 - 食品安全雜誌",
    summary: "食品安全與品質與品質管控事件：'FDA 撤銷對兩種過時食品染料用途的授權 - 食品安全雜誌'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "Food Safety Magazine",
    url: "https://news.google.com/rss/articles/CBMipAFBVV95cUxNaFExaU1ZTWxtNFpNVjZVVGMwNHN6elJ0SWpZVjRDZFhOWW1oeDE1MGJHaGJUT3A0MmE5amZOcjZUdU03Z3N0U2NQWTNBZTUwTDZ6UFdiN2NHR0dEUUc5ZmlCT1NUbE9EUmd1UDRWNE9jVmhnc29hZWd1dFFXN1UzUHFoQ3NFVzh6QWxoamtDM3M4cDNtWVJFZDZFVF85bzJxY0lNcw?oc=5",
    priority: "高",
    publishedAt: "2026-07-22",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 33701768,
    region: "台灣",
    topic: "原料技術",
    title: "以下是 7 月 22 日瑟斯頓縣食品安全得分 - The Olympian",
    summary: "食品安全與品質與品質管控事件：'以下是 7 月 22 日瑟斯頓縣食品安全得分 - The Olympian'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "The Olympian",
    url: "https://news.google.com/rss/articles/CBMibEFVX3lxTE9WUl9xNVczOTU0azBsUzFUaUlfQTNIWk9UZHRpekZvWmp5NURCbU15VW9JOFB5X242OWd3X2hYbkdxSzJpLWVHM0oyb1BLbTJGRG1QNDZsMGtlSk5weTFVUlpmbmJxYUhNQWdjddIBbEFVX3lxTE9pOHU3bWk1bE52dzBpLXYwRUU5eFhUZzRhcnQ0T1M1bHFZekdpemFRQVlrdGJSdFQtamoySVY5VFBrTUJYYnVNYUIzbS0xQ0NvWTVFeDVkQ1JOT2VqN1ltOVFndVdXVXVybHROZA?oc=5",
    priority: "高",
    publishedAt: "2026-07-22",
    collectedAt: "2026-07-23",
    score: 85,
  },
  {
    id: 94027042,
    region: "台灣",
    topic: "競品",
    title: "陪伴30年…台灣國民泡麵停產 網哭：從小吃到大的回憶 - UDN",
    summary: "同業大廠最新動態：'陪伴30年…台灣國民泡麵停產 網哭：從小吃到大的回憶 - UDN'。此動作反映了素食產業競爭格局的最新進展。",
    impact: "分析同業大廠的市場佈局與產品定位，以制定我方的競爭防禦策略與產品研發策略。",
    action: "評估同業此項動作對我方主力產品線的潛在競爭影響。",
    owner: "產品研發",
    source: "UDN",
    url: "https://news.google.com/rss/articles/CBMiUEFVX3lxTE9ETHpyUnRydDZsaGJreC1NS0x3N1FEajR5QzVuelExRTFmMTg3NmlOelJQUldrZUVvNHoxcWl0SENpUDRlelRXZDRwRDgwazhH0gFWQVVfeXFMTndCQlF2YjN6QVRraWRoWWtpaU4tTkduOWlleXpQdzhRY1NuajZFalBsU0xxWGMtQlBfZHNtRkFDWXZzT3huTUN5SmJOVE1aOHBEYXVnWXc?oc=5",
    priority: "中",
    publishedAt: "2026-07-17",
    collectedAt: "2026-07-23",
    score: 80,
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
    collectedAt: "2026-07-23",
    score: 80,
  },
  {
    id: 35349604,
    region: "台灣",
    topic: "競品",
    title: "2026台北食品展盛大開跑！ 松珍生技攜泰國國際食品展獲獎蔬食閃耀登場！ - 台灣好新聞",
    summary: "同業大廠最新動態：'2026台北食品展盛大開跑！ 松珍生技攜泰國國際食品展獲獎蔬食閃耀登場！ - 台灣好新聞'。此動作反映了素食產業競爭格局的最新進展。",
    impact: "分析同業大廠的市場佈局與產品定位，以制定我方的競爭防禦策略與產品研發策略。",
    action: "評估同業此項動作對我方主力產品線的潛在競爭影響。",
    owner: "產品研發",
    source: "台灣好新聞",
    url: "https://news.google.com/rss/articles/CBMiywNBVV95cUxNcnpPQXR0bHV0cktZYUN6WFByYlk2ZmVaNjhqRHZOcWpjTWRyVjR3UHo0OHFKQVF3Q1B1N0FFWWp1cFVSMXpha0lBQjRzQ3BZQnpLUHlSNVNscXNFbGpCd005NW1VZHNzMTVqR29zYk40VjY4c29pS0NwN0VUeUM0R3d0cENHN2VoTGlLak1lbFVOMTlDc2Vydi1hM0JnZVV3cUtxb2VaYlZ5N1lETUlnQUNBaHN3T3MtZ01LcXd4N1NUaWpYSkxpVzBYakFYQ1R6UDdLMWF2TlNldmJjSWlZSGR6bDFhLVN4VWxXTnNoVzE0b3d0RUY5dnhvd3RPRks1cUlzU3BMamt6QTFfdnVkQ0x1eFlrNG1jckZGYUtWOFRDQzk0R1hwdm1iUnk0N0hMR3NDSVl6Y0tHbUVfUEVBNTk0elQ4TFhrQ0RxUVh5eG1pcmJRYXZfQm1HSnBxYlRrMElub2hsLWd1WDRnX1dNLVh5Mk0wek1kT2VnVjNpWVdmMEYzcGFReXE4a2VfQUlTYUg4V3FqZGxnMklNUmhXLWh6R2xZUExPV3NERVE3bzBtdmk3djdrdVNPTmR4cktLOXpVOWFMblFXQUk?oc=5",
    priority: "中",
    publishedAt: "2026-06-24",
    collectedAt: "2026-07-23",
    score: 80,
  },
  {
    id: 32409697,
    region: "台灣",
    topic: "競品",
    title: "台灣首座素食綠電智慧工廠動土 弘陽生技打造全球植物性食品新基地 - Yahoo新聞",
    summary: "同業大廠最新動態：'台灣首座素食綠電智慧工廠動土 弘陽生技打造全球植物性食品新基地 - Yahoo新聞'。此動作反映了素食產業競爭格局的最新進展。",
    impact: "分析同業大廠的市場佈局與產品定位，以制定我方的競爭防禦策略與產品研發策略。",
    action: "評估同業此項動作對我方主力產品線的潛在競爭影響。",
    owner: "產品研發",
    source: "Yahoo新聞",
    url: "https://news.google.com/rss/articles/CBMivANBVV95cUxQaEd6d2tnSzZsMVFUdnpubldNZ1hZSXlRakZZVThCeHYzYzlxQkZaZDZpLTVaX3ZIMzRPMTJRQ09oaW51UDZ6Yi0tMmgxU2JLZzJ0NlhDRmVHZkVFV19RbE1kQVdoLWR3SDhfbl9YS3ota1BmRmZrVFc1OE1KemtjU3NZSFJHS0pkTGUwR0R2SFh0Y0Y2ZDQ1aHdHVFVQb0FOWTA2c3BWSDFXOVhKMmhxOUp3YTJiYUlJaWlnR3dlb3B2eVNoT3VFdUQ3R19oc2VNS2R3RzdUcTVJc0VOMkVsY2JvMUNvb0hNbHJ3T05xVEtFNlN2WHd6S3pqVkk0YTYwc0pQQmUzRmwyenpjbjF5QmlIZG1HSm45Q0pFWkJPRUptMVFabE9xbmRQUTZGMTRmVU05QWY2RElucDNGSXBDdHhDTUZJVWxjRVBPNE9IcjhQalJGZWxnbWNGUnZBZ3hlN1Uwd0JqZWNkQkt1dDB3OF83YzlGY1FMMnJ4SkxLVThab1Z1aFhPbWx1TGw5QXUtcTlzV1hhNTdTd1hFUnNPQUNRaTZ4aElNcGtPNko3bXVURmU3TDZjdFl5RTE?oc=5",
    priority: "中",
    publishedAt: "2026-02-23",
    collectedAt: "2026-07-23",
    score: 80,
  },
  {
    id: 36606957,
    region: "台灣",
    topic: "競品",
    title: "弘陽生技打造全國第一座素食綠電智慧工廠 綠電與AI高規格並行 - 台灣好報",
    summary: "同業大廠最新動態：'弘陽生技打造全國第一座素食綠電智慧工廠 綠電與AI高規格並行 - 台灣好報'。此動作反映了素食產業競爭格局的最新進展。",
    impact: "分析同業大廠的市場佈局與產品定位，以制定我方的競爭防禦策略與產品研發策略。",
    action: "評估同業此項動作對我方主力產品線的潛在競爭影響。",
    owner: "產品研發",
    source: "台灣好報",
    url: "https://news.google.com/rss/articles/CBMiU0FVX3lxTE03Zk1ZaG41cG56WnRvRUtXY25iUVQwSjVVMTYxQ2Zvanoxb0d5NlVnT3VidEJrMWl1STJHTkhvOFBtRkdWQXo3enJ6bUpwbVFZTzhr?oc=5",
    priority: "中",
    publishedAt: "2026-02-22",
    collectedAt: "2026-07-23",
    score: 80,
  },
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
    publishedAt: "2026-07-21",
    collectedAt: "2026-07-22",
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
    publishedAt: "2026-07-06",
    collectedAt: "2026-07-22",
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
    publishedAt: "2026-05-07",
    collectedAt: "2026-07-22",
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
    publishedAt: "2026-06-22",
    collectedAt: "2026-07-22",
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
    publishedAt: "2025-04-30",
    collectedAt: "2026-07-22",
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
    publishedAt: "2026-07-20",
    collectedAt: "2026-07-22",
    score: 89,
  },
{
    id: 3,
    region: "台灣",
    topic: "法規標示",
    title: "食藥署提醒素食標示須清楚且與內容物一致",
    summary: "食藥署近期消費資訊再次提醒，素食產品的品名、分類與實際配方須一致，業者應留意標示與廣告用語。",
    impact: "新品資料庫與跨境包裝稿必須保留五辛、蛋、奶三個結構化欄位。",
    action: "盤點現有 SKU，確認官網、包裝與電商頁面的素食分類一致。",
    owner: "品保法規",
    source: "台灣食藥署",
    url: "https://www.fda.gov.tw/TC/csmnewsContent.aspx?id=t623819&mid=267",
    priority: "高",
    publishedAt: "2025-10-13",
    collectedAt: "2026-07-22",
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
    publishedAt: "2024-04-18",
    collectedAt: "2026-07-22",
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
    publishedAt: "2025-01-06",
    collectedAt: "2026-07-22",
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
    publishedAt: "2026-06-09",
    collectedAt: "2026-07-22",
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
    publishedAt: "2026-07-22",
    collectedAt: "2026-07-22",
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
    publishedAt: "2026-06-18",
    collectedAt: "2026-07-22",
    score: 65,
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
  { no: "01", title: "今日摘要", copy: "掌握最重要的訊號", result: "得到今日主題與影響", href: "#today" },
  { no: "02", title: "市場雷達", copy: "拆解四地驅動因素", result: "得到機會 風險與指標", href: "#markets" },
  { no: "03", title: "全部情報", copy: "依市場 主題 來源查找", result: "得到可追溯的情報脈絡", href: "#intelligence" },
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
          <span className="brand-mark">齋</span>
          <span><strong>齋之味</strong><small>市場情報中樞</small></span>
        </a>
        <nav aria-label="主要導覽">
          <a className={`nav-item ${activeSection === "today" ? "active" : ""}`} aria-current={activeSection === "today" ? "page" : undefined} href="#today" onClick={(event) => navigateTo(event, "today")}><span>01</span><div><strong>今日摘要</strong><small>掌握核心情報判讀</small></div></a>
          <a className={`nav-item ${activeSection === "markets" ? "active" : ""}`} aria-current={activeSection === "markets" ? "page" : undefined} href="#markets" onClick={(event) => navigateTo(event, "markets")}><span>02</span><div><strong>市場雷達</strong><small>哪裡有機會或風險</small></div></a>
          <a className={`nav-item ${activeSection === "intelligence" ? "active" : ""}`} aria-current={activeSection === "intelligence" ? "page" : undefined} href="#intelligence" onClick={(event) => navigateTo(event, "intelligence")}><span>03</span><div><strong>全部情報</strong><small>查新聞與原始來源</small></div></a>
        </nav>
        <div className="sidebar-foot">
          <time dateTime="2026-07-23T07:46:00+08:00">2026/07/23 07:46</time>
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
          <div className="guide-intro"><p className="section-kicker">HOW TO USE</p><h2 id="guide-title">三個功能<br />一條判讀路徑</h2><p>先看重點 再理解市場 最後回查來源</p></div>
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
              <p>每日 08:30 檢查公開評價與品牌提及；Google 評論最近查核：2026/07/23 07:46。</p>
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
