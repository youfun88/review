import React, { useState } from 'react';
import { RefreshCw, Plus, X } from 'lucide-react';
import { generateKeywordSets } from '../services/keywordService';

interface Props {
  selectedKeywords: string[];
  onKeywordToggle: (keyword: string) => void;
  onNext: () => void;
}

export function KeywordSelector({ selectedKeywords, onKeywordToggle, onNext }: Props) {
  const [keywordSets, setKeywordSets] = useState(() => generateKeywordSets());
  const [customKeyword, setCustomKeyword] = useState('');

  const refreshKeywordSets = () => {
    setKeywordSets(generateKeywordSets());
  };

  const handleAddCustomKeyword = () => {
    const trimmedKeyword = customKeyword.trim();
    if (trimmedKeyword && !selectedKeywords.includes(trimmedKeyword)) {
      onKeywordToggle(trimmedKeyword);
      setCustomKeyword('');
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-slate-800">選擇關鍵字組合</h2>
        <button
          onClick={refreshKeywordSets}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors rounded-lg hover:bg-blue-50"
        >
          <RefreshCw size={18} />
          換一批
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {keywordSets.map((keywords, index) => (
          <div
            key={index}
            className="p-4 border-2 rounded-xl hover:border-blue-200 transition-duration-300"
          >
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, kidx) => (
                <button
                  key={`${index}-${kidx}`}
                  onClick={() => onKeywordToggle(keyword)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedKeywords.includes(keyword)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-6 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={customKeyword}
            onChange={(e) => setCustomKeyword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddCustomKeyword()}
            placeholder="輸入自訂關鍵字"
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            maxLength={10}
          />
          <button
            onClick={handleAddCustomKeyword}
            disabled={!customKeyword.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {selectedKeywords.length > 0 && (
        <div className="border-t pt-6 mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">已選擇的關鍵字</h3>
          <div className="flex flex-wrap gap-2">
            {selectedKeywords.map((keyword, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {keyword}
                <button
                  onClick={() => onKeywordToggle(keyword)}
                  className="hover:text-blue-600"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onNext}
        disabled={selectedKeywords.length === 0}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none"
      >
        {selectedKeywords.length === 0 ? '請選擇關鍵字' : '下一步：撰寫評論'}
      </button>
    </div>
  );
}