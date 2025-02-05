import { shuffle } from '../utils/array';

const templates = {
  casual: [
    '今天來到這家店，{keywords}讓我印象特別深刻。從踏進店裡的第一刻，就能感受到濃濃的用心。服務人員親切有禮，總是帶著真誠的微笑迎接每位客人，讓人感到賓至如歸。整體環境乾淨舒適，空間寬敞明亮，座位的擺設也很貼心，不會讓人感到擁擠。用餐過程中，服務團隊始終保持專業的服務態度，能夠及時回應客人的需求。最令人驚喜的是，餐點的品質和口味都維持得很好，每一道菜都能感受到主廚的用心。這樣的用餐體驗很值得跟親朋好友分享，相信他們一定也會喜歡這裡的美食和服務。',
    
    '很開心發現這間店，{keywords}都讓人感到驚艷。這裡的服務人員訓練有素，從進門迎賓到結帳離開，每個環節都做得很到位。店內的空間規劃合理，動線流暢不會互相干擾，座位間距適中讓人倍感舒適。環境的維護也做得很好，處處都能看到工作人員用心打掃的痕跡。餐點的呈現方式很講究，無論是擺盤還是食材的選擇都十分用心。最重要的是，每次來都能享受到穩定的品質，這點真的非常值得肯定。整體來說，這是一間把細節做得很好的餐廳，值得特別推薦給重視品質的朋友。',
    
    '這家店帶給我很棒的體驗，特別是{keywords}表現出色。服務團隊展現出高度的專業水準，能夠準確理解並滿足客人的各種需求。店內的環境整潔明亮，空氣流通良好，座位區的規劃也很貼心，特別適合和親友共享美食時光。用餐過程中，每道餐點的溫度和口感都掌握得恰到好處，展現出廚師團隊的專業實力。服務人員在適當的時機主動提供服務，既不會讓人感到打擾，又能確保用餐品質。這樣的用心經營，讓人感受到他們對待每位客人的誠意。整體來說，這是一間非常值得再次造訪的好店。'
  ],
  
  detailed: [
    '這家店有幾個特別值得一提的地方，首先是{keywords}表現優異。服務人員的專業訓練顯而易見，能夠靈活應對各種突發狀況，讓客人感到安心。店內的空間設計別具巧思，不同區域的氛圍營造得宜，無論是商務聚餐還是家庭聚會都很適合。環境的清潔度令人印象深刻，從餐具到桌椅都一塵不染。餐點的製作過程講究衛生，食材的新鮮度把關嚴格，每一道菜都能帶給人驚喜。服務團隊展現出高度的專業素養，讓整個用餐過程都充滿愉悅。這樣的用餐體驗，絕對值得特別推薦給重視品質的朋友。',
    
    '經過幾次造訪，發現這家店在各方面都很用心，尤其是{keywords}令人印象深刻。從預約到結帳，每個服務環節都經過精心設計，讓人感受到他們對待客人的誠意。環境維護得宜，空間寬敞舒適，座位的安排也很合理，不會讓人感到擁擠。餐點的品質始終如一，每道菜都能感受到廚師的用心。服務人員的專業素養很高，能夠及時察覺客人的需求並提供協助。最令人感動的是，即使客人很多的時候，他們依然能夠保持穩定的服務品質。這樣的經營態度，讓人能夠放心地推薦給身邊的朋友。',
    
    '仔細體驗後發現這家店很有特色，{keywords}是最大的亮點。服務人員的態度親切自然，讓人感覺特別溫暖。空間的布置雅致有品味，用餐氛圍溫馨舒適，特別適合和家人朋友共度美好時光。餐點的製作過程非常講究，從食材的挑選到烹調方式都可以感受到廚師的專業。服務團隊的默契十足，能夠讓每位客人都感受到賓至如歸的待遇。環境的清潔維護做得很好，讓人用餐時倍感舒適。這樣的餐廳確實不多見，值得特別推薦給重視品質的朋友。'
  ],
  
  storytelling: [
    '假日和朋友一起來用餐，{keywords}給我們留下深刻的印象。服務人員的專業態度讓人印象深刻，從進門的那一刻就感受到滿滿的誠意。整個用餐過程中，他們始終保持親切的態度，讓我們感到特別放鬆。店內的環境整潔舒適，空間的規劃也很合理，讓人可以自在地享受美食時光。餐點的品質和口味都很棒，每一道菜都能感受到廚師的用心。服務團隊的默契十足，總能在適當的時機提供協助。這樣的用餐體驗真的很難得，讓我們決定之後一定要再來。相信下次帶其他朋友來，他們一定也會喜歡這裡的氛圍和服務。',
    
    '偶然發現這家店，沒想到是一個驚喜。{keywords}都讓人感到驚艷。服務團隊的專業度令人印象深刻，能夠準確理解並滿足客人的各種需求。店內的環境舒適寧靜，空間的規劃很貼心，特別適合放鬆心情享受美食。餐點的製作過程非常講究，從食材的選擇到烹調方式都可以感受到廚師的用心。服務人員在適當的時機提供協助，既不會讓人感到打擾，又能確保用餐品質。這樣的餐廳確實不多見，值得特別推薦給重視品質的朋友。相信每個來過的人都會和我有同樣的感受。',
    
    '朋友推薦來這家店，果然沒有讓人失望。{keywords}都表現得很好。服務人員的專業素養很高，能夠靈活應對各種突發狀況。店內的環境維護得宜，空間寬敞明亮，座位的安排也很合理，不會讓人感到擁擠。用餐過程中，每道餐點的溫度和口感都掌握得恰到好處，展現出廚師團隊的專業實力。服務團隊的默契十足，讓整個用餐過程都充滿愉悅。這樣的用餐體驗很難得，讓人忍不住想要分享給身邊的朋友。相信他們來過之後，一定也會愛上這裡的美食和服務。'
  ]
};

function formatKeywords(keywords: string[]): string {
  if (keywords.length <= 1) return keywords[0];
  const lastKeyword = keywords[keywords.length - 1];
  const restKeywords = keywords.slice(0, -1);
  return `${restKeywords.join('、')}以及${lastKeyword}`;
}

export function generateReviewOptions(keywords: string[]): string[] {
  const formattedKeywords = formatKeywords(shuffle(keywords).slice(0, 3));
  
  return Object.values(templates).map(styleTemplates => {
    const template = shuffle(styleTemplates)[0];
    return template.replace('{keywords}', formattedKeywords);
  });
}