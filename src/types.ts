export interface LuxuryItem {
  id: number;
  type: string;
  matched: boolean;
  special?: SpecialEffect;
}

export type SpecialEffect = 'line' | 'explosion' | 'money';

export interface Level {
  id: number;
  type: 'score';
  requiredScore: number;
  timeLimit: number;
  gridSize: number;
  moves: number;
  targetItem: string;
}

export interface GameState {
  currentLevel: number;
  score: number;
  money: number;
  timeLeft: number;
  movesLeft: number;
  lives: number;
  grid: LuxuryItem[];
  selectedItems: number[];
  stars: number;
  targetItem: string;
  isGameStarted: boolean;
  showLevelCompleteDialog: boolean;
  showGameOverDialog: boolean;
  requiredScore: number;
  history: {
    lastLevel: number;
    scores: { level: number; score: number; stars: number; date: string }[];
  };
}

// ... (any other types you might have)