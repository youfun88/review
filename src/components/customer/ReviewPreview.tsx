import React, { useState, useEffect } from 'react';
import { Star, RefreshCw } from 'lucide-react';
import { generateReviewOptions } from '../../services/reviewGenerator';

interface Props {
  rating: number;
  review: string;
  onRatingChange: (rating: number) => void;
  onReviewChange: (review: string) => void;
  onSubmit: () => void;
  selectedKeywords: string[];
  businessName: string;
}

export function ReviewPreview({
  rating,
  review,
  onRatingChange,
  onReviewChange,
  onSubmit,
  selectedKeywords,
  businessName
}: Props) {
  const [reviewOptions, setReviewOptions] = useState<string[]>([]);

  useEffect(() => {
    setReviewOptions(generateReviewOptions(selectedKeywords));
  }, [selectedKeywords]);

  const regenerateReviews = () => {
    setReviewOptions(generateReviewOptions(selectedKeywords));
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">預覽評論</h2>
          <div className="flex items-center gap-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 cursor-pointer transition-colors ${
                    star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                  onClick={() => onRatingChange(star)}
                />
              ))}
            </div>
            <button
              onClick={regenerateReviews}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <RefreshCw size={16} />
              重新生成
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {reviewOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => onReviewChange(option)}
              className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                review === option
                  ? 'bg-blue-50 border-2 border-blue-500 shadow-md'
                  : 'border-2 border-gray-100 hover:border-blue-200 hover:bg-gray-50'
              }`}
            >
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{option}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            自訂評論內容
          </label>
          <textarea
            value={review}
            onChange={(e) => onReviewChange(e.target.value)}
            className="w-full h-40 p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="您也可以自行編輯評論內容..."
          />
        </div>

        <button
          onClick={onSubmit}
          disabled={!review.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none"
        >
          前往 Google 評論
        </button>
      </div>
    </div>
  );
}