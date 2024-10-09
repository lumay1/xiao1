import React from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface TutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass-effect p-6 max-w-md w-full relative"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <button
          className="absolute top-2 right-2 text-white hover:text-yellow-300"
          onClick={() => {
            console.log("Tutorial close button clicked");
            onClose();
          }}
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-white mb-4 art-text">游戏规则</h2>
        <ul className="list-disc pl-5 space-y-2 text-white">
          <li>点击并交换相邻的奢侈品来创建匹配。</li>
          <li>匹配三个或更多相同的物品可以消除它们。</li>
          <li>通过匹配物品获得积分，完成关卡目标。</li>
          <li>特殊组合可以创造强大效果：
            <ul className="list-circle pl-5 mt-1">
              <li>4个相同物品：创建一个直线消除特效。</li>
              <li>L或T形（5个物品）：创建爆炸效果，清除周围12个物品。</li>
              <li>5个一行：创建魔法物品，清除所有相同类型的物品。</li>
            </ul>
          </li>
          <li>交换两个特殊物品会触发华丽效果。</li>
          <li>在时间限制内完成关卡目标。</li>
          <li>如果在完成目标后还有剩余时间，特殊物品会随机出现帮助你获得更高分数！</li>
          <li>根据你的得分获得星级评价，挑战更困难的关卡！</li>
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default Tutorial