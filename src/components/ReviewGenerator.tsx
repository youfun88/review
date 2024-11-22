import React, { useState } from 'react';
import { Star, RefreshCw, ExternalLink, Camera, AlertCircle } from 'lucide-react';
import { generateReview } from '../services/reviewService';
import { openGoogleMapsReview } from '../services/mapsService';

interface Props {
  keywords: string[];
  review: string;
  rating: number;
  onReviewChange: (review: string) => void;
  onRatingChange: (rating: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ReviewGenerator({
  keywords,
  review,
  rating,
  onReviewChange,
  onRatingChange,
  onNext,
  onBack
}: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGenerateReview = () => {
    setIsGenerating(true);
    try {
      const newReview = generateReview(keywords);
      onReviewChange(newReview);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await openGoogleMapsReview(review);
      setTimeout(() => {
        onNext();
      }, 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-800">撰寫評論</h2>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => onRatingChange(value)}
              className="focus:outline-none"
            >
              <Star
                className={`w-6 h-6 ${
                  value <= rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-4">
        <div className="flex items-center gap-2 text-amber-800 font-medium mb-2">
          <Camera size={20} />
          <h3>提升您的在地嚮導積分！</h3>
        </div>
        <p className="text-sm text-amber-700">
          記得在 Google Maps 評論時上傳照片和影片：
        </p>
        <ul className="text-sm text-amber-700 list-disc list-inside mt-2 space-y-1">
          <li>店面環境照片</li>
          <li>專業驗光設備</li>
          <li>服務過程紀錄</li>
          <li>成品展示</li>
        </ul>
        <p className="text-sm text-amber-800 font-medium mt-3">
          ※ 上傳照片和影片能大幅提升您的 Google 在地嚮導等級！
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-2">
          {keywords.map((keyword, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {keyword}
            </span>
          ))}
        </div>

        <button
          onClick={handleGenerateReview}
          disabled={isGenerating}
          className="relative w-full group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-200"></div>
          <div className="relative flex items-center justify-center gap-2 py-3 bg-white text-blue-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 rounded-xl transition-all duration-200 shadow-sm hover:shadow-lg">
            <RefreshCw className={`${isGenerating ? 'animate-spin' : ''}`} size={20} />
            生成評論
          </div>
        </button>

        <textarea
          value={review}
          onChange={(e) => onReviewChange(e.target.value)}
          placeholder="請輸入您的評論..."
          className="w-full h-48 p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 resize-none"
        />
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>已輸入 {review.length} 個字</span>
          <span className={review.length < 210 ? 'text-red-500' : 'text-green-500'}>
            建議字數：210字 ({review.length >= 210 ? '已達到' : '未達到'})
          </span>
        </div>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
          <h4 className="text-gray-800 font-medium flex items-center gap-2 mb-2">
            <AlertCircle size={16} />
            評論步驟
          </h4>
          <ol className="text-sm text-gray-600 list-decimal list-inside space-y-2">
            <li>點擊「生成評論」按鈕產生評論內容</li>
            <li>檢視並按需要修改評論內容</li>
            <li>點擊「前往評論」按鈕開啟 Google Maps</li>
            <li>將評論內容複製到 Google Maps</li>
            <li className="font-medium text-blue-700">記得上傳照片和影片</li>
            <li>確認內容後點擊「發布」完成</li>
          </ol>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            返回
          </button>
          <button
            onClick={handleSubmit}
            disabled={!review.trim() || review.length < 210 || isSubmitting}
            className="relative flex-1 group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-200"></div>
            <div className="relative flex items-center justify-center gap-2 py-3 bg-white text-blue-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 rounded-xl transition-all duration-200 shadow-sm hover:shadow-lg disabled:from-gray-400 disabled:to-gray-500 disabled:shadow-none">
              {isSubmitting ? (
                <>
                  <RefreshCw className="animate-spin" size={20} />
                  處理中...
                </>
              ) : (
                <>
                  <ExternalLink size={20} />
                  前往評論
                </>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}