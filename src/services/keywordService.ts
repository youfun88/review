const opticalKeywords = {
  service: ['服務專業', '態度親切', '解說詳細', '技術精湛'],
  quality: ['品質優良', '價格實惠', '品牌齊全', '款式多樣'],
  facility: ['設備完善', '環境整潔', '位置方便', '空間舒適'],
  expertise: ['驗光仔細', '配鏡精準', '建議專業', '保固完善'],
  experience: ['過程順暢', '選擇豐富', '溝通良好', '售後貼心'],
  extra: ['回訪意願高', '好評推薦', '信任度高', '用心服務']
};

export function generateKeywordSets(): string[][] {
  const categories = Object.values(opticalKeywords);
  const sets: string[][] = [];
  
  // 生成3組不重複的關鍵字組合
  while (sets.length < 3) {
    const set = categories
      .map(category => category[Math.floor(Math.random() * category.length)])
      .slice(0, 4);
    
    if (!sets.some(existingSet => 
      existingSet.some(keyword => set.includes(keyword))
    )) {
      sets.push(set);
    }
  }
  
  return sets;
}