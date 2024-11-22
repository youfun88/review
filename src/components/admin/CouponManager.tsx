// 在 CouponManager 組件的 props 中添加 onAction
interface Props {
  onAction: () => void;
}

export function CouponManager({ onAction }: Props) {
  // 在所有可能觸發使用次數的操作中調用 onAction
  const handleAddCoupon = () => {
    onAction();
    // 原有的添加優惠券邏輯
  };

  const handleUpdateCoupon = () => {
    onAction();
    // 原有的更新優惠券邏輯
  };

  // ... 其餘代碼保持不變
}