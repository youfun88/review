import React from 'react';
import { Gift } from 'lucide-react';

interface Props {
  couponCode: string;
  expiryDate: string;
  onBack: () => void;
}

export function RewardDisplay({ couponCode, expiryDate, onBack }: Props) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Gift className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">感謝您的評論！</h2>
        <p className="text-gray-600 mt-2">這是您的專屬優惠碼</p>
      </div>

      <div className="bg-gray-100 p-6 rounded-xl mb-6">
        <code className="text-2xl font-mono text-blue-600">{couponCode}</code>
        <p className="text-sm text-gray-500 mt-2">
          優惠碼有效期限：{expiryDate}
        </p>
      </div>

      <button
        onClick={onBack}
        className="text-blue-600 hover:text-blue-700 font-medium"
      >
        返回首頁
      </button>
    </div>
  );
}