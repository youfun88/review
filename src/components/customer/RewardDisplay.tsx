import React from 'react';

interface Props {
  couponCode: string;
  expiryDate: string;
}

export function RewardDisplay({ couponCode, expiryDate }: Props) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">感謝您的評論！</h2>
      <p className="text-gray-600 mb-6">這是您的專屬優惠碼：</p>
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <code className="text-xl font-mono text-indigo-600">{couponCode}</code>
      </div>
      <p className="text-sm text-gray-500">
        優惠碼有效期限：{expiryDate}
      </p>
    </div>
  );
}