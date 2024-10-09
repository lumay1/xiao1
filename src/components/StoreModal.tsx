import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Heart, Star, DollarSign } from 'lucide-react';

interface StoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (item: string, cost: number, currency: 'levels' | 'money') => void;
  currentLives: number;
  currentMoney: number;
  currentLevel: number;
}

const StoreModal: React.FC<StoreModalProps> = ({
  isOpen,
  onClose,
  onPurchase,
  currentLives,
  currentMoney,
  currentLevel,
}) => {
  const [selectedItem, setSelectedItem] = useState<'levels' | 'money'>('levels');

  if (!isOpen) return null;

  const handlePurchase = () => {
    if (selectedItem === 'levels') {
      onPurchase('life', 10, 'levels');
    } else {
      onPurchase('life', 1000, 'money');
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg p-8 max-w-md w-full relative text-white shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <button
          className="absolute top-2 right-2 text-white hover:text-yellow-300 transition-colors"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-300">奢华商店</h2>
        <div className="mb-6">
          <p className="text-lg mb-2">当前状态：</p>
          <div className="flex flex-col space-y-2">
            <span><Heart className="inline mr-2" size={20} /> 生命值：{currentLives}</span>
            <span><DollarSign className="inline mr-2" size={20} /> 金钱：{currentMoney.toLocaleString()}万</span>
            <span><Star className="inline mr-2" size={20} /> 当前关卡：{currentLevel}</span>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">购买生命值</h3>
          <div className="flex space-x-4">
            <button
              className={`flex-1 py-2 px-4 rounded ${
                selectedItem === 'levels'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-600 text-gray-200'
              }`}
              onClick={() => setSelectedItem('levels')}
            >
              关卡兑换
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded ${
                selectedItem === 'money'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-600 text-gray-200'
              }`}
              onClick={() => setSelectedItem('money')}
            >
              金钱兑换
            </button>
          </div>
        </div>
        <div className="mb-6">
          <p className="text-lg mb-2">兑换详情：</p>
          {selectedItem === 'levels' ? (
            <p>使用 10 关卡进度兑换 1 生命值</p>
          ) : (
            <p>使用 1000 万金钱兑换 1 生命值</p>
          )}
        </div>
        <button
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          onClick={handlePurchase}
        >
          确认购买
        </button>
      </motion.div>
    </motion.div>
  );
};

export default StoreModal;