import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, Store, Link, Copy, Tag } from 'lucide-react';
import { KeywordManager } from './KeywordManager';

interface StoreData {
  id: string;
  name: string;
  owner: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
  createdAt: string;
  reviewLink: string;
  googleMapsLink: string;
  keywords: string[];
}

export function StoreManager() {
  const [stores, setStores] = useState<StoreData[]>([
    {
      id: '1',
      name: '自己的眼鏡',
      owner: '王大明',
      email: 'store1@example.com',
      phone: '02-1234-5678',
      address: '台北市中山區中山北路二段99號',
      status: 'active',
      createdAt: '2024-01-15',
      reviewLink: `${window.location.origin}/review/1`,
      googleMapsLink: 'https://g.page/r/CfyHjuFJXOZYEAE/review',
      keywords: ['服務親切', '環境整潔', '專業用心']
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStore, setEditingStore] = useState<StoreData | null>(null);
  const [showKeywordModal, setShowKeywordModal] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [newStore, setNewStore] = useState<Partial<StoreData>>({
    name: '',
    owner: '',
    email: '',
    phone: '',
    address: '',
    status: 'active',
    googleMapsLink: '',
    keywords: []
  });
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [newKeyword, setNewKeyword] = useState('');

  const handleAddStore = () => {
    if (newStore.name && newStore.email) {
      const storeId = Date.now().toString();
      const reviewLink = `${window.location.origin}/review/${storeId}`;
      
      setStores(prev => [...prev, {
        id: storeId,
        name: newStore.name!,
        owner: newStore.owner!,
        email: newStore.email!,
        phone: newStore.phone!,
        address: newStore.address!,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        reviewLink,
        googleMapsLink: newStore.googleMapsLink || '',
        keywords: []
      }]);
      setShowAddModal(false);
      setNewStore({
        name: '',
        owner: '',
        email: '',
        phone: '',
        address: '',
        status: 'active',
        googleMapsLink: '',
        keywords: []
      });
    }
  };

  const handleUpdateStore = () => {
    if (editingStore) {
      setStores(prev => prev.map(store => 
        store.id === editingStore.id ? editingStore : store
      ));
      setEditingStore(null);
    }
  };

  const handleDeleteStore = (id: string) => {
    if (confirm('確定要刪除此店家嗎？')) {
      setStores(prev => prev.filter(store => store.id !== id));
    }
  };

  const toggleStoreStatus = (id: string) => {
    setStores(prev => prev.map(store =>
      store.id === id
        ? { ...store, status: store.status === 'active' ? 'inactive' : 'active' }
        : store
    ));
  };

  const copyToClipboard = async (text: string, storeId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(storeId);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleAddKeyword = (storeId: string) => {
    if (newKeyword.trim()) {
      setStores(prev => prev.map(store => {
        if (store.id === storeId) {
          return {
            ...store,
            keywords: [...store.keywords, newKeyword.trim()]
          };
        }
        return store;
      }));
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (storeId: string, keyword: string) => {
    setStores(prev => prev.map(store => {
      if (store.id === storeId) {
        return {
          ...store,
          keywords: store.keywords.filter(k => k !== keyword)
        };
      }
      return store;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">店家管理</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          新增店家
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">店家名稱</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">負責人</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">聯絡方式</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">評論連結</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">關鍵字</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">狀態</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {stores.map((store) => (
              <tr key={store.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Store size={20} className="text-gray-400" />
                    <span className="font-medium text-gray-900">{store.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{store.address}</span>
                </td>
                <td className="px-6 py-4 text-gray-500">{store.owner}</td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    <div>{store.email}</div>
                    <div>{store.phone}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Link size={16} className="text-gray-400" />
                      <button
                        onClick={() => copyToClipboard(store.reviewLink, `review-${store.id}`)}
                        className="group relative text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1"
                      >
                        <span className="truncate max-w-[200px]">系統評論連結</span>
                        <Copy size={14} />
                        {copySuccess === `review-${store.id}` && (
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded">
                            已複製
                          </span>
                        )}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link size={16} className="text-gray-400" />
                      <button
                        onClick={() => copyToClipboard(store.googleMapsLink, `maps-${store.id}`)}
                        className="group relative text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1"
                      >
                        <span className="truncate max-w-[200px]">Google Maps 連結</span>
                        <Copy size={14} />
                        {copySuccess === `maps-${store.id}` && (
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded">
                            已複製
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {store.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                      >
                        {keyword}
                      </span>
                    ))}
                    <button
                      onClick={() => {
                        setSelectedStoreId(store.id);
                        setShowKeywordModal(true);
                      }}
                      className="px-2 py-1 text-blue-600 hover:bg-blue-50 rounded-full text-xs flex items-center gap-1"
                    >
                      <Tag size={12} />
                      管理關鍵字
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    store.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {store.status === 'active' ? '使用中' : '已停用'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleStoreStatus(store.id)}
                      className={`p-1 rounded-lg ${
                        store.status === 'active'
                          ? 'text-red-600 hover:bg-red-50'
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                    >
                      {store.status === 'active' ? <X size={18} /> : <Check size={18} />}
                    </button>
                    <button
                      onClick={() => setEditingStore(store)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteStore(store.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 新增店家彈窗 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">新增店家</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  店家名稱
                </label>
                <input
                  type="text"
                  value={newStore.name}
                  onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  負責人
                </label>
                <input
                  type="text"
                  value={newStore.owner}
                  onChange={(e) => setNewStore({ ...newStore, owner: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newStore.email}
                  onChange={(e) => setNewStore({ ...newStore, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  電話
                </label>
                <input
                  type="tel"
                  value={newStore.phone}
                  onChange={(e) => setNewStore({ ...newStore, phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  地址
                </label>
                <input
                  type="text"
                  value={newStore.address}
                  onChange={(e) => setNewStore({ ...newStore, address: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Google Maps 評論連結
                </label>
                <input
                  type="url"
                  value={newStore.googleMapsLink}
                  onChange={(e) => setNewStore({ ...newStore, googleMapsLink: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="https://g.page/r/..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={handleAddStore}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                新增
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 編輯店家彈窗 */}
      {editingStore && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">編輯店家資料</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  店家名稱
                </label>
                <input
                  type="text"
                  value={editingStore.name}
                  onChange={(e) => setEditingStore({
                    ...editingStore,
                    name: e.target.value
                  })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  負責人
                </label>
                <input
                  type="text"
                  value={editingStore.owner}
                  onChange={(e) => setEditingStore({
                    ...editingStore,
                    owner: e.target.value
                  })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editingStore.email}
                  onChange={(e) => setEditingStore({
                    ...editingStore,
                    email: e.target.value
                  })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  電話
                </label>
                <input
                  type="tel"
                  value={editingStore.phone}
                  onChange={(e) => setEditingStore({
                    ...editingStore,
                    phone: e.target.value
                  })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  地址
                </label>
                <input
                  type="text"
                  value={editingStore.address}
                  onChange={(e) => setEditingStore({
                    ...editingStore,
                    address: e.target.value
                  })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Google Maps 評論連結
                </label>
                <input
                  type="url"
                  value={editingStore.googleMapsLink}
                  onChange={(e) => setEditingStore({
                    ...editingStore,
                    googleMapsLink: e.target.value
                  })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="https://g.page/r/..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditingStore(null)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={handleUpdateStore}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 關鍵字管理彈窗 */}
      {showKeywordModal && selectedStoreId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">管理關鍵字</h3>
              <button
                onClick={() => {
                  setShowKeywordModal(false);
                  setSelectedStoreId(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="輸入新關鍵字"
                  className="flex-1 px-3 py-2 border rounded-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword(selectedStoreId)}
                />
                <button
                  onClick={() => handleAddKeyword(selectedStoreId)}
                  disabled={!newKeyword.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
                >
                  新增
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {stores.find(s => s.id === selectedStoreId)?.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {keyword}
                    <button
                      onClick={() => handleRemoveKeyword(selectedStoreId, keyword)}
                      className="hover:text-red-600"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}