import React from 'react';
import { motion } from 'framer-motion';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  onRestartGame: () => void;
  onNextLevel?: () => void;
  title: string;
  message: string;
  showNextButton: boolean;
  showRestartButton: boolean;
  showRestartGameButton: boolean;
  lives: number;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  onRestart,
  onRestartGame,
  onNextLevel,
  title,
  message,
  showNextButton,
  showRestartButton,
  showRestartGameButton,
  lives
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-brown-300 bg-opacity-80 rounded-lg p-8 max-w-sm w-full"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
        <p className="mb-6 text-white">{message}</p>
        <div className="flex justify-end space-x-4">
          {showRestartButton && (
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={onRestart}
            >
              再来一次 (剩余生命: {lives})
            </button>
          )}
          {showRestartGameButton && (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={onRestartGame}
            >
              重新开始
            </button>
          )}
          {showNextButton && onNextLevel && (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={onNextLevel}
            >
              下一关
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dialog;