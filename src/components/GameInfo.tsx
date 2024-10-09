import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Star, Trophy, DollarSign } from 'lucide-react';

interface GameInfoProps {
  level: number;
  score: number;
  money: number;
  timeLeft?: number;
  lives: number;
  requiredScore: number;
  stars: number;
}

const GameInfo: React.FC<GameInfoProps> = ({
  level,
  score,
  money = 0,
  timeLeft,
  lives,
  requiredScore,
  stars,
}) => {
  return (
    <div className="flex flex-wrap justify-between items-center mb-8 text-xl">
      <motion.div
        className="flex items-center bg-purple-500 bg-opacity-50 rounded-full px-4 py-2 mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Trophy className="mr-2 text-white" size={24} />
        <span className="font-semibold text-white">关卡: {level}</span>
      </motion.div>
      <motion.div
        className="flex items-center bg-yellow-500 bg-opacity-50 rounded-full px-4 py-2 mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Star className="mr-2 text-white" size={24} />
        <span className="font-semibold text-white">星级: {stars}</span>
      </motion.div>
      <motion.div
        className="flex items-center bg-pink-500 bg-opacity-50 rounded-full px-4 py-2 mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Star className="mr-2 text-white" size={24} />
        <span className="font-semibold text-white">得分: {score} / {requiredScore}</span>
      </motion.div>
      {timeLeft !== undefined && (
        <motion.div
          className="flex items-center bg-blue-500 bg-opacity-50 rounded-full px-4 py-2 mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Clock className="mr-2 text-white" size={24} />
          <span className="font-semibold text-white">时间: {timeLeft}秒</span>
        </motion.div>
      )}
      <motion.div
        className="flex items-center bg-red-500 bg-opacity-50 rounded-full px-4 py-2 mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Heart className="mr-2 text-white" size={24} />
        <span className="font-semibold text-white">生命: {lives}</span>
      </motion.div>
      <motion.div
        className="flex flex-col items-center mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex items-center">
          <DollarSign className="mr-2 text-white" size={24} />
          <span className="font-semibold text-white">金钱:</span>
        </div>
        <span className="font-bold text-2xl text-yellow-300">{money.toLocaleString()}万</span>
      </motion.div>
    </div>
  );
};

export default GameInfo;