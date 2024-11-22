export async function openGoogleMapsReview(review: string): Promise<void> {
  try {
    // 複製評論內容到剪貼簿
    await navigator.clipboard.writeText(review);
    
    // 自己的眼鏡的 Google Maps 評論連結
    const GOOGLE_MAPS_REVIEW_URL = 'https://g.page/r/CfyHjuFJXOZYEAE/review';
    
    // 開啟新視窗
    window.open(GOOGLE_MAPS_REVIEW_URL, '_blank');

    // 顯示提示訊息
    alert('評論內容已複製！\n\n請在 Google Maps 中：\n\n1. 長按評論框\n2. 點選「貼上」\n3. 點選「新增照片」上傳照片\n4. 確認後點擊「發布」\n\n※ 別忘了上傳照片，這樣可以提高您的在地嚮導等級！');
  } catch (error) {
    console.error('無法複製評論:', error);
    alert('請在 Google Maps 中手動輸入評論內容。\n\n記得上傳照片以提升您的在地嚮導等級！');
    window.open(GOOGLE_MAPS_REVIEW_URL, '_blank');
  }
}