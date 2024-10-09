import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import MoneyRainEffect from './MoneyRainEffect'

interface LevelCompleteProps {
  isOpen: boolean
  level: number
  score: number
  requiredScore: number
  onNextLevel: () => void
}

const LevelComplete: React.FC<LevelCompleteProps> = ({ isOpen, level, score, requiredScore, onNextLevel }) => {
  const stars = score >= requiredScore * 1.5 ? 3 : score >= requiredScore * 1.25 ? 2 : 1

  if (!isOpen) return null;

  return (
    <>
      <MoneyRainEffect isVisible={true} />
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg p-8 max-w-md w-full text-center relative"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">第 {level} 关完成！</h2>
          <p className="text-xl text-gray-600 mb-2">你的得分: {score}</p>
          <p className="text-lg text-gray-500 mb-6">目标分数: {requiredScore}</p>
          <div className="flex justify-center mb-6">
            {[1, 2, 3].map((starNumber) => (
              <motion.div
                key={starNumber}
                initial={{ scale: 0 }}
                animate={{ scale: starNumber <= stars ? 1 : 0 }}
                transition={{ delay: starNumber * 0.2 }}
              >
                <Star
                  size={48}
                  className={starNumber <= stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                />
              </motion.div>
            ))}
          </div>
          <button
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-colors"
            onClick={onNextLevel}
          >
            下一关
          </button>
        </motion.div>
      </motion.div>
    </>
  )
}

export default LevelComplete