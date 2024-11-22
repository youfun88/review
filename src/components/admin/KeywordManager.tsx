import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { keywords } from '../../data/keywords';

export function KeywordManager() {
  const [newKeyword, setNewKeyword] = useState('');

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">關鍵字管理</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          placeholder="新增關鍵字"
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={() => setNewKeyword('')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {keywords.map(keyword => (
          <div
            key={keyword.id}
            className="px-4 py-2 bg-gray-100 rounded-full flex items-center gap-2"
          >
            <span>{keyword.text}</span>
            <button className="text-gray-500 hover:text-red-500">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}