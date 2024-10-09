import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuxuryItem } from '../types';
import { LUXURY_ITEMS, GRID_SIZE } from '../constants';
import { Zap, Sparkles, DollarSign } from 'lucide-react';

interface GridProps {
  grid: LuxuryItem[];
  onItemClick: (index: number) => void;
  selectedItems: number[];
}

const Grid: React.FC<GridProps> = ({ grid, onItemClick, selectedItems }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/300?text=Image+Not+Found';
  };

  return (
    <div className="game-grid" style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
      gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
      gap: '0.5rem',
      width: '100%',
      aspectRatio: '1 / 1',
    }}>
      <AnimatePresence>
        {grid.map((item, index) => (
          <motion.button
            key={`${item.id}-${index}`}
            className={`game-item ${item.matched ? 'opacity-50' : ''} ${
              selectedItems.includes(index) ? 'border-4 border-yellow-400' : ''
            } ${
              item.special === 'line'
                ? 'border-4 border-blue-400'
                : item.special === 'explosion'
                ? 'border-4 border-red-500'
                : item.special === 'money'
                ? 'border-4 border-green-500'
                : ''
            }`}
            onClick={() => onItemClick(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            {LUXURY_ITEMS[item.type] && (
              <img
                src={LUXURY_ITEMS[item.type]}
                alt={item.type}
                className="w-full h-full object-cover rounded-lg"
                onError={handleImageError}
              />
            )}
            {item.special && (
              <div className="absolute inset-0 flex items-center justify-center">
                {item.special === 'line' && <Zap className="text-blue-400" size={24} />}
                {item.special === 'explosion' && <Sparkles className="text-red-500" size={24} />}
                {item.special === 'money' && <DollarSign className="text-green-500" size={24} />}
              </div>
            )}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Grid;