import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { CreditCard, CheckCircle, Package } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  priceId: string;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: '基本方案',
    price: 9.99,
    priceId: 'price_basic',
    features: ['基本功能', '每月 100 次評論', '基本數據分析'],
  },
  {
    id: 'pro',
    name: '專業方案',
    price: 29.99,
    priceId: 'price_pro',
    features: ['進階功能', '無限次評論', '進階數據分析', '優先支援'],
  },
];

interface SubscriptionFormProps {
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function SubscriptionForm({ onSuccess, onError }: SubscriptionFormProps) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    setLoading(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');

      // Create payment method
      const { paymentMethod, error: pmError } = await stripe.createPaymentMethod({
        type: 'card',
        card: {
          number: cardNumber,
          exp_month: parseInt(expiry.split('/')[0]),
          exp_year: parseInt(expiry.split('/')[1]),
          cvc,
        },
      });

      if (pmError) throw new Error(pmError.message);

      // Create subscription
      const { data } = await axios.post('http://localhost:3001/api/create-subscription', {
        email,
        paymentMethod: paymentMethod.id,
        priceId: selectedPlan.priceId,
      });

      const { error } = await stripe.confirmCardPayment(data.clientSecret);
      if (error) throw new Error(error.message);

      onSuccess();
    } catch (error) {
      onError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-2 mb-8">
        <Package className="text-blue-600" />
        <h2 className="text-2xl font-semibold">選擇方案</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan)}
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
            <p className="text-3xl font-bold mb-4">
              ${plan.price}
              <span className="text-sm text-gray-500">/月</span>
            </p>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              電子郵件
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                卡號
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                maxLength={16}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="4242 4242 4242 4242"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  到期日
                </label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  maxLength={5}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  CVC
                </label>
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                  maxLength={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {loading ? (
              '處理中...'
            ) : (
              <>
                <CreditCard size={20} />
                訂閱 {selectedPlan.name}
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}