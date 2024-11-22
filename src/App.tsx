import React, { useState, useEffect } from 'react';
import { KeywordSelector } from './components/KeywordSelector';
import { ReviewGenerator } from './components/ReviewGenerator';
import { RewardDisplay } from './components/RewardDisplay';
import { Dashboard } from './components/admin/Dashboard';
import { StoreDashboard } from './components/store/StoreDashboard';
import { KeyRound, Eye, EyeOff, Store, Shield } from 'lucide-react';

function App() {
  const [step, setStep] = useState(1);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStore, setIsStore] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginType, setLoginType] = useState<'admin' | 'store' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const storeLoggedIn = localStorage.getItem('isStoreLoggedIn') === 'true';
    setIsAdmin(adminLoggedIn);
    setIsStore(storeLoggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('isStoreLoggedIn');
    localStorage.removeItem('storeId');
    localStorage.removeItem('usageCount');
    setIsAdmin(false);
    setIsStore(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginType === 'store' && username === 'store' && password === 'store123') {
      setIsStore(true);
      localStorage.setItem('isStoreLoggedIn', 'true');
      localStorage.setItem('storeId', 'store-1');
      localStorage.setItem('usageCount', '0');
      setShowLoginModal(false);
      setLoginError('');
    } else if (loginType === 'admin' && username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('isAdminLoggedIn', 'true');
      setShowLoginModal(false);
      setLoginError('');
    } else {
      setLoginError('帳號或密碼錯誤');
    }
    setUsername('');
    setPassword('');
  };

  const openLogin = (type: 'admin' | 'store') => {
    setLoginType(type);
    setShowLoginModal(true);
    setLoginError('');
  };

  if (isAdmin) {
    return (
      <div className="relative">
        <button
          onClick={handleLogout}
          className="fixed top-4 right-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          登出
        </button>
        <Dashboard />
      </div>
    );
  }

  if (isStore) {
    return (
      <div className="relative">
        <button
          onClick={handleLogout}
          className="fixed top-4 right-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          登出
        </button>
        <StoreDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4 relative overflow-hidden">
      {/* 登入按鈕群組 */}
      <div className="fixed top-4 right-4 flex gap-2">
        <button
          onClick={() => openLogin('store')}
          className="px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Store size={18} />
          店家登入
        </button>
        <button
          onClick={() => openLogin('admin')}
          className="px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Shield size={18} />
          系統管理
        </button>
      </div>

      <div className="max-w-2xl mx-auto relative">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            自己的評論系統
          </h1>
          <p className="mt-3 text-gray-600 text-lg">
            分享您的體驗，獲得專屬優惠
          </p>
        </div>

        {step === 1 && (
          <KeywordSelector
            selectedKeywords={selectedKeywords}
            onKeywordToggle={(keyword) => {
              setSelectedKeywords(prev =>
                prev.includes(keyword)
                  ? prev.filter(k => k !== keyword)
                  : [...prev, keyword]
              );
            }}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <ReviewGenerator
            keywords={selectedKeywords}
            review={review}
            rating={rating}
            onReviewChange={setReview}
            onRatingChange={setRating}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <RewardDisplay
            couponCode="THANK2024"
            expiryDate="2024年12月31日"
            onBack={() => setStep(1)}
          />
        )}
      </div>

      {/* 登入彈窗 */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {loginType === 'store' ? (
                  <Store className="w-8 h-8 text-blue-600" />
                ) : (
                  <Shield className="w-8 h-8 text-blue-600" />
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {loginType === 'store' ? '店家登入' : '系統管理員登入'}
              </h2>
              <p className="text-gray-600 mt-2">請輸入您的帳號密碼</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {loginError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                  {loginError}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">帳號</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                  placeholder="請輸入帳號"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">密碼</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                    placeholder="請輸入密碼"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  登入
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {loginType === 'store' ? (
                  <>
                    預設帳號：store<br />
                    預設密碼：store123
                  </>
                ) : (
                  <>
                    預設帳號：admin<br />
                    預設密碼：admin123
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;