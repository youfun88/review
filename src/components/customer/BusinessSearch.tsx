import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { searchNearbyBusinesses } from '../../services/locationService';

interface Business {
  name: string;
  address: string;
  type: string;
}

interface Props {
  onBusinessSelect: (business: Business | null) => void;
  selectedBusiness: Business | null;
}

export function BusinessSearch({ onBusinessSelect, selectedBusiness }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Business[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    try {
      const results = await searchNearbyBusinesses(searchTerm, null, null);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">分享您的體驗</h1>
        <p className="text-slate-600 mt-2">讓我們知道您的想法，獲得專屬優惠</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">搜尋店家</h2>
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-green-600" />
            <span className="text-sm text-slate-600">已定位</span>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="請輸入店家名稱"
              className="w-full px-4 py-3 pl-11 border rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching || !searchTerm.trim()}
            className={`px-8 py-3 bg-blue-600 text-white rounded-xl transition-all duration-300 font-medium ${
              isSearching || !searchTerm.trim() 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-700 hover:shadow-lg'
            }`}
          >
            {isSearching ? '搜尋中...' : '搜尋'}
          </button>
        </div>

        {searchResults.length > 0 && (
          <div className="mt-4 space-y-3">
            {searchResults.map((business, index) => (
              <button
                key={index}
                onClick={() => onBusinessSelect(business)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                  selectedBusiness?.name === business.name
                    ? 'bg-blue-50 border-2 border-blue-500'
                    : 'border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <h3 className="font-medium text-slate-900">{business.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{business.address}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}