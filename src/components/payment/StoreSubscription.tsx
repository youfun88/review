import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { CreditCard } from 'lucide-react';
import { SubscriptionPlans } from './SubscriptionPlans';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface Plan {
  id: string;
  name: string;
  price: number;
  priceId: string;
  interval: 'month' | 'year';
  features: string[];
}

interface Props {
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function StoreSubscription({ onSuccess, onError }: Props) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowPaymentForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    setLoading(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');

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
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <SubscriptionPlans
        selectedPlan={selectedPlan}
        onSelectPlan={handlePlanSelect}
      />

      {showPaymentForm && selectedPlan && (
        <div className="mt-8 pt-8 border-t">
          <h3 className="text-xl font-semibold mb-6">付款資訊</h3>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
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
                  訂閱 {selectedPlan.name} (${selectedPlan.price}/{selectedPlan.interval === 'month' ? '月' : '年'})
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}