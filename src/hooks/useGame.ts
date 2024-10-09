import { useState, useEffect, useCallback } from 'react';
import { GameState, LuxuryItem } from '../types';
import { LUXURY_ITEMS, GRID_SIZE, LEVELS, INITIAL_LIVES, GAME_TIME } from '../constants';

const createInitialGrid = (): LuxuryItem[] => {
  return Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => ({
    id: index,
    type: Object.keys(LUXURY_ITEMS)[Math.floor(Math.random() * Object.keys(LUXURY_ITEMS).length)],
    matched: false,
  }));
};

const initialGameState: GameState = {
  currentLevel: 1,
  score: 0,
  money: 0,
  timeLeft: GAME_TIME,
  movesLeft: LEVELS[0].moves,
  lives: INITIAL_LIVES,
  grid: createInitialGrid(),
  selectedItems: [],
  stars: 0,
  targetItem: LEVELS[0].targetItem,
  isGameStarted: false,
  showLevelCompleteDialog: false,
  showGameOverDialog: false,
  requiredScore: LEVELS[0].requiredScore,
  history: {
    lastLevel: 1,
    scores: [],
  },
};

const useGame = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const handleItemClick = useCallback((index: number) => {
    setGameState((prevState) => {
      const newSelectedItems = [...prevState.selectedItems];
      const clickedItemIndex = newSelectedItems.indexOf(index);

      if (clickedItemIndex === -1) {
        newSelectedItems.push(index);
      } else {
        newSelectedItems.splice(clickedItemIndex, 1);
      }

      if (newSelectedItems.length === 2) {
        // Check if items are adjacent
        const [first, second] = newSelectedItems;
        const isAdjacent =
          Math.abs(first % GRID_SIZE - second % GRID_SIZE) +
          Math.abs(Math.floor(first / GRID_SIZE) - Math.floor(second / GRID_SIZE)) === 1;

        if (isAdjacent) {
          // Swap items
          const newGrid = [...prevState.grid];
          [newGrid[first], newGrid[second]] = [newGrid[second], newGrid[first]];

          // Check for matches after swapping
          const matchedItems = checkForMatches(newGrid);
          if (matchedItems.length > 0) {
            // Remove matched items and update score
            const updatedGrid = removeMatchedItems(newGrid, matchedItems);
            return {
              ...prevState,
              grid: updatedGrid,
              selectedItems: [],
              score: prevState.score + matchedItems.length,
              money: prevState.money + matchedItems.length * 10, // Add money for matches
              movesLeft: prevState.movesLeft - 1,
            };
          } else {
            // If no match, swap back
            [newGrid[first], newGrid[second]] = [newGrid[second], newGrid[first]];
          }
        }
        return { ...prevState, selectedItems: [] };
      }

      return { ...prevState, selectedItems: newSelectedItems };
    });
  }, []);

  const checkForMatches = (grid: LuxuryItem[]): number[] => {
    const matchedItems: number[] = [];

    // Check horizontal matches
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE - 2; col++) {
        const index = row * GRID_SIZE + col;
        if (
          grid[index].type === grid[index + 1].type &&
          grid[index].type === grid[index + 2].type
        ) {
          matchedItems.push(index, index + 1, index + 2);
        }
      }
    }

    // Check vertical matches
    for (let col = 0; col < GRID_SIZE; col++) {
      for (let row = 0; row < GRID_SIZE - 2; row++) {
        const index = row * GRID_SIZE + col;
        if (
          grid[index].type === grid[index + GRID_SIZE].type &&
          grid[index].type === grid[index + GRID_SIZE * 2].type
        ) {
          matchedItems.push(index, index + GRID_SIZE, index + GRID_SIZE * 2);
        }
      }
    }

    return [...new Set(matchedItems)];
  };

  const removeMatchedItems = (grid: LuxuryItem[], matchedItems: number[]): LuxuryItem[] => {
    const newGrid = [...grid];
    
    // Mark matched items
    matchedItems.forEach((index) => {
      newGrid[index] = {
        ...newGrid[index],
        matched: true,
      };
    });

    // Move items down and generate new items
    for (let col = 0; col < GRID_SIZE; col++) {
      let emptySpaces = 0;
      for (let row = GRID_SIZE - 1; row >= 0; row--) {
        const index = row * GRID_SIZE + col;
        if (newGrid[index].matched) {
          emptySpaces++;
        } else if (emptySpaces > 0) {
          newGrid[index + emptySpaces * GRID_SIZE] = newGrid[index];
          newGrid[index] = {
            id: index,
            type: Object.keys(LUXURY_ITEMS)[Math.floor(Math.random() * Object.keys(LUXURY_ITEMS).length)],
            matched: false,
          };
        }
      }

      // Fill the top with new items
      for (let i = 0; i < emptySpaces; i++) {
        newGrid[i * GRID_SIZE + col] = {
          id: i * GRID_SIZE + col,
          type: Object.keys(LUXURY_ITEMS)[Math.floor(Math.random() * Object.keys(LUXURY_ITEMS).length)],
          matched: false,
        };
      }
    }

    return newGrid;
  };

  const resetLevel = useCallback(() => {
    setGameState((prevState) => ({
      ...initialGameState,
      currentLevel: prevState.currentLevel,
      lives: prevState.lives - 1,
      history: prevState.history,
    }));
  }, []);

  const restartGame = useCallback(() => {
    setGameState(initialGameState);
  }, []);

  const startGame = useCallback(() => {
    setGameState((prevState) => ({
      ...prevState,
      isGameStarted: true,
      grid: createInitialGrid(),
    }));
  }, []);

  const nextLevel = useCallback(() => {
    setGameState((prevState) => {
      const nextLevel = prevState.currentLevel + 1;
      const levelConfig = LEVELS[nextLevel - 1] || LEVELS[LEVELS.length - 1];
      return {
        ...initialGameState,
        currentLevel: nextLevel,
        requiredScore: levelConfig.requiredScore,
        targetItem: levelConfig.targetItem,
        movesLeft: levelConfig.moves,
        timeLeft: levelConfig.timeLimit,
        lives: prevState.lives,
        money: prevState.money,
        history: prevState.history,
      };
    });
  }, []);

  const saveGame = useCallback(() => {
    // Implement save game logic here
    console.log('Game saved');
  }, [gameState]);

  const loadGame = useCallback((level: number) => {
    // Implement load game logic here
    console.log('Game loaded', level);
  }, []);

  const handlePurchase = useCallback((item: string, cost: number, currency: 'levels' | 'money') => {
    setGameState((prevState) => {
      if (currency === 'levels' && prevState.currentLevel >= cost) {
        return {
          ...prevState,
          currentLevel: prevState.currentLevel - cost,
          lives: prevState.lives + 1,
        };
      } else if (currency === 'money' && prevState.money >= cost) {
        return {
          ...prevState,
          money: prevState.money - cost,
          lives: prevState.lives + 1,
        };
      }
      return prevState;
    });
  }, []);

  useEffect(() => {
    if (gameState.isGameStarted && gameState.timeLeft > 0) {
      const timer = setInterval(() => {
        setGameState((prevState) => ({
          ...prevState,
          timeLeft: prevState.timeLeft - 1,
        }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState.isGameStarted, gameState.timeLeft]);

  useEffect(() => {
    if (gameState.timeLeft === 0 || gameState.movesLeft === 0) {
      setGameState((prevState) => ({
        ...prevState,
        showGameOverDialog: true,
        isGameStarted: false,
      }));
    }
  }, [gameState.timeLeft, gameState.movesLeft]);

  return {
    gameState,
    setGameState,
    handleItemClick,
    resetLevel,
    restartGame,
    startGame,
    nextLevel,
    saveGame,
    loadGame,
    handlePurchase,
  };
};

export default useGame;