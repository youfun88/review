import { useState, useEffect } from 'react';
import axios from 'axios';

interface SubscriptionStatus {
  isActive: boolean;
  subscription: {
    plan: string;
    status: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
  };
}

export function useSubscription(storeId: string | null) {
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!storeId) {
      setLoading(false);
      return;
    }

    const checkSubscription = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/api/subscription/${storeId}`);
        setStatus(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setStatus(null);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [storeId]);

  const cancelSubscription = async (subscriptionId: string) => {
    try {
      await axios.post(`http://localhost:3001/api/subscription/${subscriptionId}/cancel`);
      setStatus(prev => prev ? {
        ...prev,
        subscription: {
          ...prev.subscription,
          cancelAtPeriodEnd: true
        }
      } : null);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const resumeSubscription = async (subscriptionId: string) => {
    try {
      await axios.post(`http://localhost:3001/api/subscription/${subscriptionId}/resume`);
      setStatus(prev => prev ? {
        ...prev,
        subscription: {
          ...prev.subscription,
          cancelAtPeriodEnd: false
        }
      } : null);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return {
    status,
    loading,
    error,
    cancelSubscription,
    resumeSubscription
  };
}