export const INITIAL_LIVES = 10;
export const GRID_SIZE = 8;
export const GAME_TIME = 150; // 设置游戏时间为150秒

export const LUXURY_ITEMS: { [key: string]: string } = {
  watch: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=300&q=80',
  ring: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&q=80',
  necklace: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&q=80',
  perfume: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&q=80',
  handbag: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&q=80',
  sunglasses: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&q=80',
  shoes: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&q=80',
  tie: 'https://images.unsplash.com/photo-1589756823695-278bc923f962?w=300&q=80', // Updated tie image URL
};

export const LEVELS = [
  { id: 1, type: 'score', requiredScore: 50, timeLimit: GAME_TIME, gridSize: GRID_SIZE, moves: 20, targetItem: 'watch' },
  { id: 2, type: 'score', requiredScore: 100, timeLimit: GAME_TIME, gridSize: GRID_SIZE, moves: 25, targetItem: 'ring' },
  { id: 3, type: 'score', requiredScore: 200, timeLimit: GAME_TIME, gridSize: GRID_SIZE, moves: 30, targetItem: 'necklace' },
  { id: 4, type: 'score', requiredScore: 400, timeLimit: GAME_TIME, gridSize: GRID_SIZE, moves: 35, targetItem: 'perfume' },
  { id: 5, type: 'score', requiredScore: 800, timeLimit: GAME_TIME, gridSize: GRID_SIZE, moves: 40, targetItem: 'handbag' },
  // 添加更多关卡...
];