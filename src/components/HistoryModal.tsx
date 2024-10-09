import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Star, Save, RotateCcw } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: {
    lastLevel: number;
    scores: { level: number; score: number; stars: number; date: string }[];
  };
  onSaveGame: () => void;
  onLoadGame: (level: number) => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, history, onSaveGame, onLoadGame }) => {
  const [showAllHistory, setShowAllHistory] = useState(false);

  if (!isOpen) return null;

  const handleSaveGame = () => {
    onSaveGame();
    // You might want to add some visual feedback here, like a toast notification
  };

  const handleLoadGame = () => {
    onLoadGame(history.lastLevel);
    onClose();
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
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-300">游戏历史</h2>
        <p className="mb-4 text-lg">上次闯关到: <span className="text-yellow-300 font-bold">第 {history.lastLevel} 关</span></p>
        <div className="flex space-x-4 mb-6">
          <button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center"
            onClick={() => setShowAllHistory(!showAllHistory)}
          >
            {showAllHistory ? '隐藏历史成绩' : '显示历史成绩'}
          </button>
          <button
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center"
            onClick={handleSaveGame}
          >
            <Save size={18} className="mr-2" />
            保存游戏
          </button>
          <button
            className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center"
            onClick={handleLoadGame}
          >
            <RotateCcw size={18} className="mr-2" />
            重回历史
          </button>
        </div>
        {showAllHistory && (
          <div className="max-h-60 overflow-y-auto bg-purple-800 bg-opacity-50 rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4 text-center text-yellow-300">历史成绩</h3>
            <ul className="space-y-3">
              {history.scores.map((score, index) => (
                <li key={index} className="flex justify-between items-center bg-purple-700 bg-opacity-50 p-2 rounded">
                  <span className="text-sm">第 {score.level} 关</span>
                  <span className="font-bold">{score.score} 分</span>
                  <span className="flex">
                    {[...Array(score.stars)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-300 fill-current" />
                    ))}
                  </span>
                  <span className="text-xs text-gray-300">{score.date}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default HistoryModal;