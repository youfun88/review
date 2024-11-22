import React, { useState } from 'react';
import { Store, AlertCircle, Plus, Trash2, MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import { StoreManager } from './StoreManager';
import { SupportTickets } from './SupportTickets';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'stores' | 'support'>('stores');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">系統管理後台</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('stores')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                activeTab === 'stores'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Store size={20} />
              店家管理
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                activeTab === 'support'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <AlertCircle size={20} />
              問題處理
            </button>
          </div>
        </div>

        {activeTab === 'stores' ? <StoreManager /> : <SupportTickets />}
      </div>
    </div>
  );
}