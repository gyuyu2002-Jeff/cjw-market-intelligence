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
    collectedAt: "2026-07-27",
    score: 70,
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
    collectedAt: "2026-07-27",
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
    collectedAt: "2026-07-27",
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
    collectedAt: "2026-07-27",
    score: 70,
  },
  {
    id: 74756944,
    region: "台灣",
    topic: "消費趨勢",
    title: "一簞食的蔬食實驗：從在地米食到農友協作 打造深溝村的飲食系統 - 食力 foodNEXT",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'一簞食的蔬食實驗：從在地米食到農友協作 打造深溝村的飲食系統 - 食力 foodNEXT'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiakFVX3lxTE9yYUFkNHdOOHNUZU1teFhCZnZvSTFXRTBNeFpjRGM2TUxYQkJodDdicm9rSGhrN3daMmUzMlBjalp0cnVtN2NqUTVEd21aRlJ6ZzZvTUdzbS1OOVI5WFB0NlNkWU1rNWlGSnc?oc=5",
    priority: "中",
    publishedAt: "2026-03-09",
    collectedAt: "2026-07-27",
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
    collectedAt: "2026-07-27",
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
    collectedAt: "2026-07-27",
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
    collectedAt: "2026-07-27",
    score: 72,
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
    collectedAt: "2026-07-27",
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
    collectedAt: "2026-07-27",
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
    collectedAt: "2026-07-27",
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
    collectedAt: "2026-07-27",
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
    collectedAt: "2026-07-27",
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
    collectedAt: "2026-07-27",
    score: 75,
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
    collectedAt: "2026-07-27",
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
    collectedAt: "2026-07-27",
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
    collectedAt: "2026-07-27",
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
    collectedAt: "2026-07-27",
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
    collectedAt: "2026-07-27",
    score: 85,
  },
  {
    id: 27542253,
    region: "台灣",
    topic: "原料技術",
    title: "食安法修法卓榮泰：業者須設第3方認證實驗室| 政治 - 中央社 CNA",
    summary: "食品安全與品質與品質管控事件：'食安法修法卓榮泰：業者須設第3方認證實驗室| 政治 - 中央社 CNA'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "中央社 CNA",
    url: "https://news.google.com/rss/articles/CBMiX0FVX3lxTE5PcXhsX3I2TEtqa1VqQkZQTHIwdXB2UWk0VjJpWkJvSmIteEtsZk5DeU5KRVdoSk9iVEk5RC1hSFp4VzFtUTZyWHlYaUhTUFlLM2cza3VNMFJHQXBtaDFr?oc=5",
    priority: "高",
    publishedAt: "2026-07-18",
    collectedAt: "2026-07-27",
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
    publishedAt: "2026-07-16",
    collectedAt: "2026-07-27",
    score: 85,
  },
  {
    id: 53212687,
    region: "台灣",
    topic: "原料技術",
    title: "多少毒油吃下肚？7-11、全家退費資訊、中標品項哪裡查？官方回應了…發票載具APP再推「食安快篩」 - 今周刊",
    summary: "食品安全與品質與品質管控事件：'多少毒油吃下肚？7-11、全家退費資訊、中標品項哪裡查？官方回應了…發票載具APP再推「食安快篩」 - 今周刊'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "今周刊",
    url: "https://news.google.com/rss/articles/CBMigAFBVV95cUxNRVZVa2M5a2J0dVpkdnZGWFdrMEZXVm9hQmUwQ2VxanhJWWV5c1QtalZsUTJUVGVqU0Q3djEta01hM0ctTEhWRy1FRE1FRFdnaDBNX0l1N21mX3pyR2FhbEdDc1BnM0s2ZmlHa3EwNXd0TG4waTcwX2VxR1dlUV9QYw?oc=5",
    priority: "高",
    publishedAt: "2026-07-19",
    collectedAt: "2026-07-27",
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
    collectedAt: "2026-07-27",
    score: 85,
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
    collectedAt: "2026-07-27",
    score: 85,
  },
  {
    id: 67838791,
    region: "台灣",
    topic: "原料技術",
    title: "NC環孢子蟲病疫情突破300例；農民強調食品安全 - ABC11 News",
    summary: "食品安全與品質與品質管控事件：'NC環孢子蟲病疫情突破300例；農民強調食品安全 - ABC11 News'。事件提醒業界加強供應鏈檢驗。",
    impact: "此食安風險警示我方需加強審查原料供應商與生產品質管制，避免相似風險對商譽造成衝擊。",
    action: "盤點並抽檢主力產品之相關原料品保檢驗報告。",
    owner: "採購品保",
    source: "ABC11 News",
    url: "https://news.google.com/rss/articles/CBMiowFBVV95cUxPN010UEFhdGRBaG9yTkZtUndzbEtOSXBFQTNzZWlRT3lPbzJGeEVkdEIzQkZzeFJmWm84UlNfbXprcGd6NXFkamp5cXJmbmUtS0JRTlJoOTF4eDJKMlp1S1J1b2J0Y05uS3FnaDFUU2hyUzNraEwwQ0FjVXNSVTZ6b1FhU3hQNDFNTERHUWhpN2ZBRFBscm5qRjl3OGtqTzJLY0Nj0gGoAUFVX3lxTE1rRmM4MU5td1Q2bjU5aVF1SUxaSE9CeG03ek1ETm1XSE1YQUtiX2haQVpVb3pwNmRVbkhWSUtLaWF2TzM1MnhjdlJHU29MQVdrS0JuVVNUTkFFdHpDbzFLVVFKbzh3enJoTEhVcXNEOWRPb3ItQTMxQWZNd1ppZ3ctcVQ0a0U2VW93R1FHRTdqcUhuXy1yeGd6VkctREo2YmJRT0ZTSE5nQw?oc=5",
    priority: "高",
    publishedAt: "2026-07-18",
    collectedAt: "2026-07-27",
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
    collectedAt: "2026-07-27",
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
    publishedAt: "2026-07-24",
    collectedAt: "2026-07-27",
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
    collectedAt: "2026-07-27",
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
    collectedAt: "2026-07-27",
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
    collectedAt: "2026-07-27",
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
    collectedAt: "2026-07-27",
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
    collectedAt: "2026-07-27",
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
    collectedAt: "2026-07-27",
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
    collectedAt: "2026-07-27",
    score: 80,
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
    collectedAt: "2026-07-26",
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
    collectedAt: "2026-07-26",
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
    collectedAt: "2026-07-26",
    score: 70,
  },
{
    id: 79378257,
    region: "台灣",
    topic: "消費趨勢",
    title: "Oatbedient 奇亞籽即溶燕麥奶 素食、乳糖不耐最安心的飲品選擇 - 食力 foodNEXT",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'Oatbedient 奇亞籽即溶燕麥奶 素食、乳糖不耐最安心的飲品選擇 - 食力 foodNEXT'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiZ0FVX3lxTE5vWC03VkdOMlBSZDJFMjdHSTRXYlhGUHBmZXIyRC14ZmlEYXE1QTJTN2lmVG9naVZJclZhNVFJU1FlcXV5TnlDT3BvR3JUTDY3ZXIwSmdPTFFLd2JUMUthOExLdXU2VTg?oc=5",
    priority: "中",
    publishedAt: "2025-06-12",
    collectedAt: "2026-07-26",
    score: 70,
  },
{
    id: 41675041,
    region: "台灣",
    topic: "消費趨勢",
    title: "慈濟60週年特展7/3～7/12華山登場 50家蔬食品牌進駐打造零廢棄市集 - 食力 foodNEXT",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'慈濟60週年特展7/3～7/12華山登場 50家蔬食品牌進駐打造零廢棄市集 - 食力 foodNEXT'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "食力 foodNEXT",
    url: "https://news.google.com/rss/articles/CBMiZEFVX3lxTFBBTDFpb3Z2czhaamJOdHRMNkNBdDBlSGgtS0pQdzFlSWVXclFFNU15cmZjTDBEb1JQekJ6WHcyYVRYaFU3OFBVNUw3XzNhSUN1TVlDLURBVnpGV091MER4QWltdVI?oc=5",
    priority: "中",
    publishedAt: "2026-05-22",
    collectedAt: "2026-07-26",
    score: 70,
  },
{
    id: 47148721,
    region: "美國",
    topic: "消費趨勢",
    title: "植物性食品市場規模、份額|產業報告 [2034] - 財富商業洞察",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'植物性食品市場規模、份額|產業報告 [2034] - 財富商業洞察'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Fortune Business Insights",
    url: "https://news.google.com/rss/articles/CBMiekFVX3lxTE9SaFFqWlI2aW1RQUFfS3NtRUVRWlhmSDB6VldjQVhWNTd6WjJfVXp0aEUyTmR3NGJ1NDZtNVZ4Q291T1lybm9wVXhQbHE2ZHVsUHRpSkl6UGhwQW9mVEsxZWUtZ1E2RF9rOVFZTUdwZndqUFQ4eXB2ak5R?oc=5",
    priority: "中",
    publishedAt: "2026-07-06",
    collectedAt: "2026-07-26",
    score: 70,
  },
{
    id: 72579308,
    region: "美國",
    topic: "消費趨勢",
    title: "Good Food Institute：2025 年植物性食品的表現如何？ - 食品成分第一",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'Good Food Institute：2025 年植物性食品的表現如何？ - 食品成分第一'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Food Ingredients First",
    url: "https://news.google.com/rss/articles/CBMilgFBVV95cUxQN3EtdGEtNHNFbGRtT3JOM0U3M29IX0FtT2FZSEdyLUJaeEE5bXgySzF5WW1raEZSZ3YtMS12VmJVZzdQQ2F1cTFSS3JLc3FlYmlUUXNzMTRxMFRVN3U2SkZTSDEtYUlibnBpT2FlVFdLdWo5ZTlZOWpQQmFBRnNXdHphSThvSkxYbV9IWHktbXlVU19WSXc?oc=5",
    priority: "中",
    publishedAt: "2026-01-08",
    collectedAt: "2026-07-26",
    score: 70,
  },
{
    id: 69608295,
    region: "美國",
    topic: "消費趨勢",
    title: "植物性牛皮紙通心粉和起司杯的味道和原味一樣好嗎？ - 叉子",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'植物性牛皮紙通心粉和起司杯的味道和原味一樣好嗎？ - 叉子'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Sporked",
    url: "https://news.google.com/rss/articles/CBMifkFVX3lxTE9vMHFweXhkb25wS21wYXhfckdQaUNnbWFid1JuOC14cWZPTWU3VDMwbVA4M09UektKc0FlUkFySGZmMk5MZHU5YU9KVlRIR1NnZDhUdVBjMVcwWjZ3cVllNFdOTFlpTlBMODFOVjFBeFNFUm5Wd1ljckU1ZEpLUQ?oc=5",
    priority: "中",
    publishedAt: "2025-08-27",
    collectedAt: "2026-07-26",
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
    collectedAt: "2026-07-26",
    score: 75,
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
    collectedAt: "2026-07-26",
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
    collectedAt: "2026-07-26",
    score: 70,
  },
{
    id: 32536850,
    region: "歐洲",
    topic: "消費趨勢",
    title: "對歐盟禁止素食產品上使用肉類產品名稱的法案感到沮喪 - 歐洲新聞室",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'對歐盟禁止素食產品上使用肉類產品名稱的法案感到沮喪 - 歐洲新聞室'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "European Newsroom",
    url: "https://news.google.com/rss/articles/CBMikwFBVV95cUxPaVlibGpUbWdGVE8tSTRocWQtZTlUbGw1dklkY1M1cklYRnk5RGhPQnN3ZHNkdDZ0dUR3bThqSVpoQldVVG9tak9nQjNHU2c5dUI4ZmVtVDJNcDVVSWZVSlVORUFDQWpnTUpSVjM5cTBiM0MxX1BXLU5JUmhQaFZsRmtXcG1YYXp3cGExQUZZOGFjY0U?oc=5",
    priority: "中",
    publishedAt: "2025-10-07",
    collectedAt: "2026-07-26",
    score: 70,
  },
{
    id: 97361474,
    region: "歐洲",
    topic: "消費趨勢",
    title: "歐盟提議禁止植物性產品中的“肉類”術語對任何人都沒有好處 - 歐洲動物集團",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'歐盟提議禁止植物性產品中的“肉類”術語對任何人都沒有好處 - 歐洲動物集團'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "Eurogroup for Animals",
    url: "https://news.google.com/rss/articles/CBMirwFBVV95cUxQLXlzMTI0cnNhRFhwVFBnU1lHOFp2Znl2bW53V2RELUswYWN4R3RqYlE4YkEwRGNEbmNjdzZfWTFPMzRYRlVFRXRXMWdCM1FQNTliTE9WMnJkdXV2S3NWdzR0TWNGX1hfY2s1RGJ4WnFKODJQSWVVLUVURW5OWlM0VGRhMEdaVHlPUXFzZGQ4VFlVVFpSQTZ4S2x4ZWFFUEx2MnNDaGM4ZnVQU2lPUVpn?oc=5",
    priority: "中",
    publishedAt: "2025-07-25",
    collectedAt: "2026-07-26",
    score: 70,
  },
{
    id: 6168204,
    region: "歐洲",
    topic: "消費趨勢",
    title: "到 2035 年，植物性食品市場可能會成長兩倍 - FoodNavigator.com",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'到 2035 年，植物性食品市場可能會成長兩倍 - FoodNavigator.com'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "FoodNavigator.com",
    url: "https://news.google.com/rss/articles/CBMilgFBVV95cUxPX2Ftd3d0dUpqQ0NjRHQ3YTZXUHAwRkZYQXdSRFV4NTRMc09jY0JaZDAwU2EyX3JiU2gyamZWY2dPdmdpczNIcU5RaFNXb0tUNjJ6ZDlSWEY1UWVhQ0R6VDB1NXNQdjR4cm1UZGFIM1pCNkQwU1NITi1wZFNVZFlDcjBwUk5ic2xzaDRUYzIycWR5ZDVoUXc?oc=5",
    priority: "中",
    publishedAt: "2025-08-01",
    collectedAt: "2026-07-26",
    score: 70,
  },
{
    id: 48975630,
    region: "歐洲",
    topic: "消費趨勢",
    title: "不再吃素漢堡了嗎？歐盟國會投票禁止植物性食品使用肉類名稱 - BBC",
    summary: "這是一則關於蔬食與植物基市場趨勢與消費分析的新聞。標題為：'不再吃素漢堡了嗎？歐盟國會投票禁止植物性食品使用肉類名稱 - BBC'。",
    impact: "密切關注此類市場趨勢變化，作為開發下一季度素食調味包或熟食產品的定位依據。",
    action: "追蹤此趨勢發展，評估是否納入下一階段產品規劃。",
    owner: "品牌行銷",
    source: "BBC",
    url: "https://news.google.com/rss/articles/CBMiWkFVX3lxTE5JeDhDVVlHSVNFcWptaDlBVmM3Y09sNk9yS1MwdHdwOTcwQk9Ha0N1VmVwQ0Mtbjk3OW5qdnhlTjRDSUUweDNFQ2tEbUlnRV9aQ1k4eE1vMS1oUQ?oc=5",
    priority: "中",
    publishedAt: "2025-10-08",
    collectedAt: "2026-07-26",
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
  }
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
              <p className="eyebrow">2026年7月27日・星期一</p>
            </div>
            <div className="summary-line">今日彙整 {freshIntelligence.length} 則 · {highPriorityCount} 則核心關注</div>
          </div>
        </div>

        <div className="subline-bar">
          <div>台灣 / 美國 / 澳洲 / 歐洲市場 · 每日自動更新</div>
          <div>最後更新：<time dateTime="2026-07-27T04:12:43+08:00">2026/07/27 04:12</time></div>
        </div>

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
              {filtered.length > 5 && <button className="load-more" onClick={() => setShowAll(!showAll)}>{showAll ? "收合情報" : `查看其餘 ${filtered.length - 5} 則情報`}</button>}
          </div>
        </section>

        <section className="reputation-section">
          <div className="reputation-panel">
            <div className="reputation-intro">
              <p className="section-kicker">REPUTATION WATCH</p>
              <h2>齋之味網路風評</h2>
              <p>每日 08:30 檢查公開評價與品牌提及；Google 評論最近查核：2026/07/27 04:12。</p>
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
