import { shuffle } from '../utils/array';

const reviewStyles = [
  {
    name: '專業型',
    templates: [
      `這次在{storeName}的驗光配鏡體驗非常專業。{keywords}讓人印象深刻。驗光師運用先進儀器進行全方位檢查，細心解說每項數據指標，讓我深入理解自己的視力狀況。驗光師的專業態度展現在每個細節：從精準的瞳距測量到鏡片的細部調校，都一絲不苟。特別值得一提的是，驗光師對於不同度數和鏡片類型都有詳細的建議和說明，讓我能夠做出最適合的選擇。整個驗光過程中，驗光師的專業解說讓人感受到他們對視力保健的重視。店內環境整潔明亮，驗光設備齊全現代化，給人很好的第一印象。這樣專業且貼心的服務，確實值得推薦給重視視力保健的朋友。`,
      
      `在{storeName}的驗光配鏡經驗，展現了專業眼鏡行應有的水準。{keywords}都令人印象深刻。驗光師以專業的態度進行詳盡檢查，解說清晰專業，讓我對自己的視力狀況有更清楚的認識。店內配置高端驗光設備，從基礎視力到眼壓檢測一應俱全。驗光師在鏡框選配上的專業建議，充分考量了個人需求與適用性。整體服務流程順暢，從諮詢到驗光、配鏡，每個環節都做得很到位。驗光師特別注意我平時的用眼習慣，並根據這些資訊提供合適的建議。對於鏡片材質的選擇也很專業，會根據預算和需求推薦最適合的選項。這樣專業細緻的服務態度，讓人感受到他們對專業品質的堅持。`
    ]
  },
  {
    name: '輕鬆自然型',
    templates: [
      `今天來{storeName}配眼鏡，整個過程超順利的！{keywords}真的讓人很放心。一進門就被親切的招呼，完全沒有壓力。驗光師很有耐心地跟我解釋視力狀況，用很容易理解的方式說明。選鏡框的時候，店員給了很多實用的建議，最後找到一個很適合的款式。整個過程中感覺很輕鬆自在，驗光師會一直關心我的感受，確保每個步驟都很舒適。店裡的環境也很舒服，燈光明亮但不刺眼。最後配好的眼鏡戴起來超舒服，度數和框架都剛剛好。真心推薦給大家，這裡的服務品質真的沒話說！`,

      `剛好路過{storeName}，就順便進去看看，沒想到是個驚喜！{keywords}讓我印象特別深刻。店裡的驗光師超親切，不會給人壓力，反而像朋友一樣跟你聊天。驗光的時候很仔細，會一直確認我的感受。選鏡框時給了很多中肯的建議，不會一直推銷貴的。最後選到一副很適合的眼鏡，價格也很實在。整個過程輕輕鬆鬆的，完全不會有壓力。店裡環境很舒適，設備也很新。配好的眼鏡戴起來很舒服，度數很準確。真的很推薦大家來這邊配眼鏡！`
    ]
  },
  {
    name: '細節描述型',
    templates: [
      `這次在{storeName}配鏡的體驗很不錯，特別是{keywords}讓我留下深刻印象。驗光師很專業，會特別注意一些細節，比如我平常用眼的習慣、工作性質等。驗光過程中用了很多精密的儀器，每個步驟都講解得很清楚。選鏡框時，店員會根據臉型特徵給建議，還會提醒哪些細節要注意。價格也很透明，不會有什麼隱藏收費。配鏡完成後，驗光師還特別叮嚀了保養方式和注意事項。整體來說，服務很細心，讓人感受到他們對專業的堅持。推薦給想配眼鏡的朋友們！`,

      `在{storeName}配眼鏡的經驗很棒，{keywords}都讓人感到很貼心。從一開始的詢問到最後的取鏡，每個環節都做得很仔細。驗光師會特別關心平時的用眼習慣，根據這些資訊來調整檢查方式。選鏡框時，店員會提供專業的建議，考慮到臉型、膚色等因素。價格方面很合理，而且會詳細說明每個項目的費用。最後配好的眼鏡非常合適，無論是度數還是配戴感都很好。整體來說是一次很愉快的配鏡經驗，值得推薦！`
    ]
  },
  {
    name: '故事分享型',
    templates: [
      `因為工作需要長時間用眼，決定來{storeName}配一副新眼鏡。{keywords}讓我覺得這次選對地方了！驗光師很認真地了解我的工作性質和用眼習慣，根據這些來進行詳細的檢查。過程中發現原來我的散光度數有些變化，驗光師很耐心地解釋原因，還給了一些護眼建議。選鏡框時，考慮到我經常戴眼鏡的需求，特別推薦了一些輕量化的材質。最後配好的眼鏡戴起來特別舒服，工作時也不會有疲勞感。真的很感謝這裡專業的團隊！`,

      `朋友推薦來{storeName}配眼鏡，果然沒讓人失望！{keywords}特別令人印象深刻。一進門就感受到濃濃的專業氛圍，驗光師很親切地詢問需求。檢查過程中發現我的老花度數需要調整，驗光師很細心地解釋，還建議了一些實用的解決方案。選鏡框時，店員會考慮到日常生活的需求，推薦適合的款式。最後配好的眼鏡無論是清晰度還是舒適度都很完美。這樣專業又貼心的服務，真的讓人很放心！`
    ]
  },
  {
    name: '生活體驗型',
    templates: [
      `最近視力有點模糊，就來{storeName}檢查一下。{keywords}讓整個體驗變得很愉快。驗光師很親切，不會讓人有壓力，反而像是在跟朋友聊天一樣輕鬆。檢查過程中會一直確認我的感受，很貼心。選鏡框的時候，店員給了很多實用的建議，不會一直推銷。最後選到一副很適合的眼鏡，價格也很合理。整個過程都很順暢，完全沒有壓力。店裡環境很舒適，設備也很新穎。配好的眼鏡戴起來很舒服，度數很準確。真心推薦給大家！`,

      `這次來{storeName}配眼鏡，整個體驗都很棒！{keywords}讓人特別有印象。驗光師很專業，會詳細詢問平時的用眼習慣，根據這些來進行檢查。過程中會解釋每個步驟，讓人很安心。選鏡框時，店員會根據臉型和個人風格給建議，不會強迫推銷。價格也很透明，不會有額外收費。最後配好的眼鏡很合適，戴起來很舒服。整體來說是一次很愉快的配鏡經驗，推薦給需要配眼鏡的朋友！`
    ]
  }
];

export function generateReview(keywords: string[]): string {
  const style = shuffle(reviewStyles)[0];
  const template = shuffle(style.templates)[0];
  const keywordsText = keywords.join('、');
  
  return template
    .replace('{keywords}', keywordsText)
    .replace('{storeName}', '自己的眼鏡');
}