import React, { useState, useEffect } from 'react';
import { BarChart3, Star, Users, Ticket, AlertTriangle } from 'lucide-react';
import { StatsCard } from '../admin/StatsCard';
import { CouponManager } from '../admin/CouponManager';
import { useSubscription } from '../../hooks/useSubscription';
import { StoreSubscription } from '../payment/StoreSubscription';

export function StoreDashboard() {
  const storeId = localStorage.getItem('storeId');
  const { status, loading, error } = useSubscription(storeId);
  const [usageCount, setUsageCount] = useState(0);
  const [showSubscription, setShowSubscription] = useState(false);

  const stats = [
    { title: '本月評論數', value: '128', icon: Star, change: '+12.3%' },
    { title: '平均評分', value: '4.8', icon: BarChart3, change: '+0.2' },
    { title: '新增顧客', value: '256', icon: Users, change: '+18.5%' },
    { title: '已兌換優惠', value: '96', icon: Ticket, change: '+8.1%' },
  ];

  useEffect(() => {
    const count = parseInt(localStorage.getItem('usageCount') || '0');
    setUsageCount(count);
  }, []);

  const handleAction = () => {
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem('usageCount', newCount.toString());

    if (newCount >= 1 && !status?.isActive) {
      setShowSubscription(true);
    }
  };

  const handleSubscriptionSuccess = () => {
    setShowSubscription(false);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">載入中...</p>
        </div>
      </div>
    );
  }

  if (showSubscription) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">升級您的帳戶</h2>
            <p className="text-gray-600 mb-6">
              您已使用完免費額度。訂閱我們的服務以繼續使用所有功能。
            </p>
          </div>
          <StoreSubscription
            onSuccess={handleSubscriptionSuccess}
            onError={(error) => console.error(error)}
          />
        </div>
      </div>
    );
  }

  if (error || (!status?.isActive && usageCount >= 1)) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">需要訂閱</h2>
          <p className="text-gray-600 mb-6">
            您已使用完免費額度。請訂閱以繼續使用所有功能。
          </p>
          <button
            onClick={() => setShowSubscription(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            立即訂閱
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">店家管理後台</h1>
          {status?.isActive && (
            <div className="text-sm text-gray-600">
              訂閱到期日：{new Date(status.subscription.currentPeriodEnd).toLocaleDateString()}
              {status.subscription.cancelAtPeriodEnd && (
                <span className="ml-2 text-red-600">
                  (將於到期後取消)
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6">
          <CouponManager onAction={handleAction} />
        </div>
      </div>
    </div>
  );
}