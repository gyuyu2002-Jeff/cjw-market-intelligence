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
    id: 29993117,
    region: "台灣",
    topic: "原料技術",
    title: "密爾瓦基每天都會進行食品安全檢查，包括夜市 - FOX6 新聞 密爾瓦基",
    summary: "食品安全與品質與品質管控事件：'密爾瓦基每天都會進行食品安全檢查，包括夜市 - FOX6 新聞 密爾瓦基'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "FOX6 News Milwaukee",
    url: "https://news.google.com/rss/articles/CBMigAFBVV95cUxPZ2hIWF9BSDBnRDZpUGFOZjJGYmp3VWNJcWpFSkVFUHVoNGVKSnRMOElvM21ldzF1bXVjRGFtZ1RRLW91bDZEclNsYnEtUG9ZaEM2VGYzdVFwVlktb2JfbzQ3NFlMeTd3WUt1T1FzWXBkUHg2cUQyUi0yWFdQSTg1Nw?oc=5",
    priority: "高",
    publishedAt: "2026-07-23",
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
    id: 18669309,
    region: "台灣",
    topic: "原料技術",
    title: "墨西哥捲餅因未申報大豆而被召回 - foodsafetynews.com",
    summary: "食品安全與品質與品質管控事件：'墨西哥捲餅因未申報大豆而被召回 - foodsafetynews.com'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "foodsafetynews.com",
    url: "https://news.google.com/rss/articles/CBMiiwFBVV95cUxNUVE4MWlESHp6SFNYOFpUMXJRd2NoMklfTzBDMnVCY2tsZ1F0QzV6cnltRzlydmlyNFR4V20wajB4M3NxRzlwZ2UzYkZwX2dZckVIbUNObEdRLVV3c1ZvQW4tOTBoU2JoY0VvQ3hKa0xwMWlEVzFWTURxeXhDZldWNlFEQXlRQW8zTXNF?oc=5",
    priority: "高",
    publishedAt: "2026-07-23",
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
    id: 30957435,
    region: "台灣",
    topic: "消費趨勢",
    title: "「Vegan」可以帶來和平？國際蔬食教父想推廣的生活方式到底是什麼？ - 食力 foodNEXT",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'「Vegan」可以帶來和平？國際蔬食教父想推廣的生活方式到底是什麼？ - 食力 foodNEXT'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBZUmVQYmY1M2dHd0ttaGIzdWZhNFVqR2ZzTGNabnBQeWdFS1NIOFVISUdjUG5QekV1VVBmeDQ5c19DWnAxVGFyMVZOcVE0cjhIUW9vWDBPRDFkLXhzSkpxdnZBbFFoY0E?oc=5",
    priority: "中",
    publishedAt: "2020-01-13",
    collectedAt: "2026-07-23",
    score: 70,
  },
{
    id: 8007208,
    region: "台灣",
    topic: "新品",
    title: "顛覆蔬食框架！「上善豆家」推出最沒負擔的潮文青蔬食 - 食力 foodNEXT",
    summary: "新品上市動向：'顛覆蔬食框架！「上善豆家」推出最沒負擔的潮文青蔬食 - 食力 foodNEXT'。這顯示了該地區在替代蛋白或素食創新產品上的最新趨勢。",
    impact: "研究該新品的口味、配方與主打客群，有助於齋滋味發掘適合台灣或出口市場的潛在產品方向。",
    action: "評估此類新品是否有進行本地化開發與改良的商業價值。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMibEFVX3lxTE0zMGVYeHJYeUdyYmg0X2VuR2ZiSldubmt1cy1HUTBKbVl1MjdRX0JyLXQ2VWFpaG9KODJsdnAzTl9yN1RFTloydWhwSElOVlEzOUtYdk9Pd1VmbDV5alg0d1FxMTFrMkNYTmQwYw?oc=5",
    priority: "中",
    publishedAt: "2021-08-10",
    collectedAt: "2026-07-23",
    score: 75,
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
    id: 20908258,
    region: "美國",
    topic: "競品",
    title: "Beyond Sausage by Beyond Meat - 植物性連結擴展了產品陣容 - Ad-hoc-news.de",
    summary: "同業大廠最新動態：'Beyond Sausage by Beyond Meat - 植物性連結擴展了產品陣容 - Ad-hoc-news.de'。此動作反映了素食產業競爭格局的最新進展。",
    impact: "分析同業大廠的市場佈局與產品定位，以制定我方的競爭防禦策略與產品研發策略。",
    action: "評估同業此項動作對我方主力產品線的潛在競爭影響。",
    owner: "產品研發",
    source: "Ad-hoc-news.de",
    url: "https://news.google.com/rss/articles/CBMiwgFBVV95cUxOaUgyR3JjaEctbkNkdEhoY1RtMVp3WmsxRlVyWWVUQzBYTkxHQ2M5OXFaOE52MUlHMWRleGhCMFQ0bnc5aWhoOVRlQU9ldkRvUGxvdnV6bnFwdVpLRHRBeXJwRngzT3IzUzBJOXZhLTktZENwUW90eExsbE96aTRQYjFKSU5PcmdYd1IwbUVPa3FkM3JaOU1zS3kzai1XNUs3UVVBOWFXU3lmRV9NMW1iRXNzYzdNNDM2TmxqbG5YcGJsUQ?oc=5",
    priority: "中",
    publishedAt: "2026-07-21",
    collectedAt: "2026-07-23",
    score: 80,
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
          <time dateTime="2026-07-23T09:31:13+08:00">2026/07/23 09:31</time>
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
              <p>每日 08:30 檢查公開評價與品牌提及；Google 評論最近查核：2026/07/23 09:31。</p>
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
