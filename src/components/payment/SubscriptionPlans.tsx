import React from 'react';
import { CheckCircle, Package } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  priceId: string;
  interval: 'month' | 'year';
  features: string[];
}

const plans: Plan[] = [
  {
    id: 'monthly',
    name: '月付方案',
    price: 500,
    priceId: 'price_monthly',
    interval: 'month',
    features: [
      '完整評論管理系統',
      '無限評論收集',
      '客製化優惠券系統',
      '基礎數據分析',
      '每週數據報表',
      '電子郵件支援'
    ]
  },
  {
    id: 'yearly',
    name: '年付方案',
    price: 3600,
    priceId: 'price_yearly',
    interval: 'year',
    features: [
      '所有月付方案功能',
      '優先技術支援',
      '進階數據分析',
      '自訂關鍵字組合',
      '多管理員帳號',
      '專屬客戶經理',
      '節省 2400 元'
    ]
  }
];

interface Props {
  selectedPlan: Plan | null;
  onSelectPlan: (plan: Plan) => void;
}

export function SubscriptionPlans({ selectedPlan, onSelectPlan }: Props) {
  const calculateMonthlyPrice = (plan: Plan) => {
    return plan.interval === 'year' ? Math.round(plan.price / 12) : plan.price;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-8">
        <Package className="text-blue-600" />
        <h2 className="text-2xl font-semibold">選擇訂閱方案</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => onSelectPlan(plan)}
            className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
              selectedPlan?.id === plan.id
                ? 'border-2 border-blue-500 bg-blue-50'
                : 'border-2 border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              {selectedPlan?.id === plan.id && (
                <CheckCircle className="text-blue-600" />
              )}
            </div>
            
            <div className="mb-4">
              <p className="text-3xl font-bold">
                ${plan.price}
                <span className="text-sm text-gray-500">/{plan.interval === 'month' ? '月' : '年'}</span>
              </p>
              {plan.interval === 'year' && (
                <p className="text-sm text-gray-600 mt-1">
                  約 ${calculateMonthlyPrice(plan)}/月
                </p>
              )}
            </div>

            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => onSelectPlan(plan)}
              className={`w-full mt-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedPlan?.id === plan.id
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              選擇方案
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}