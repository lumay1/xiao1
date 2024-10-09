import React, { useState, useEffect } from 'react';
import { X, Mail, Smartphone, Lock, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phonePassword' | 'phoneVerification'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: number;
    if (countdown > 0) {
      timer = window.setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSendVerificationCode = () => {
    if (countdown > 0) return;
    // 在这里发送验证码
    console.log('Sending verification code');
    setCountdown(60);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setMessage('密码不匹配，请重新输入');
      return;
    }
    // 这里处理表单提交逻辑
    console.log('Form submitted', { isLogin, loginMethod, email, phone, password, verificationCode });
    
    // 模拟登录成功
    const username = loginMethod === 'email' ? email.split('@')[0] : phone;
    setMessage(isLogin ? '登录成功！' : '注册成功！');
    onLogin(username);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">{isLogin ? '登录' : '注册'}</h2>
        <form onSubmit={handleSubmit}>
          {isLogin ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  登录方式
                </label>
                <div className="flex flex-wrap">
                  <button
                    type="button"
                    className={`flex-1 py-2 px-4 ${
                      loginMethod === 'email' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => setLoginMethod('email')}
                  >
                    邮箱登录
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-2 px-4 ${
                      loginMethod === 'phonePassword' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => setLoginMethod('phonePassword')}
                  >
                    手机密码登录
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-2 px-4 ${
                      loginMethod === 'phoneVerification' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => setLoginMethod('phoneVerification')}
                  >
                    手机验证码登录
                  </button>
                </div>
              </div>
              {loginMethod === 'email' && (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    邮箱地址
                  </label>
                  <input
                    type="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              )}
              {(loginMethod === 'phonePassword' || loginMethod === 'phoneVerification') && (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    手机号码
                  </label>
                  <input
                    type="tel"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              )}
              {(loginMethod === 'email' || loginMethod === 'phonePassword') && (
                <div className="mb-6 relative">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    密码
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-6"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              )}
              {loginMethod === 'phoneVerification' && (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    验证码
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r ${
                        countdown > 0 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onClick={handleSendVerificationCode}
                      disabled={countdown > 0}
                    >
                      {countdown > 0 ? `${countdown}s` : '发送验证码'}
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  注册方式
                </label>
                <div className="flex">
                  <button
                    type="button"
                    className={`flex-1 py-2 px-4 ${
                      loginMethod === 'email' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => setLoginMethod('email')}
                  >
                    邮箱注册
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-2 px-4 ${
                      loginMethod === 'phonePassword' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => setLoginMethod('phonePassword')}
                  >
                    手机注册
                  </button>
                </div>
              </div>
              {loginMethod === 'email' ? (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    邮箱地址
                  </label>
                  <input
                    type="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              ) : (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    手机号码
                  </label>
                  <input
                    type="tel"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="mb-4 relative">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  密码
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-6"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="mb-4 relative">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  确认密码
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-6"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  验证码
                </label>
                <div className="flex">
                  <input
                    type="text"
                    className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r ${
                      countdown > 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={handleSendVerificationCode}
                    disabled={countdown > 0}
                  >
                    {countdown > 0 ? `${countdown}s` : '发送验证码'}
                  </button>
                </div>
              </div>
            </>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isLogin ? '登录' : '注册'}
            </button>
            <button
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              type="button"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? '没有账号？注册' : '已有账号？登录'}
            </button>
          </div>
        </form>
        {message && (
          <p className="mt-4 text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AuthModal;