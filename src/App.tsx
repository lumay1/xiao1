import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import useGame from './hooks/useGame';
import Grid from './components/Grid';
import GameInfo from './components/GameInfo';
import Dialog from './components/Dialog';
import Tutorial from './components/Tutorial';
import LevelComplete from './components/LevelComplete';
import AuthModal from './components/AuthModal';
import UserMenu from './components/UserMenu';
import HistoryModal from './components/HistoryModal';
import StoreModal from './components/StoreModal';

function App() {
  const [showTutorial, setShowTutorial] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [username, setUsername] = useState('');

  const {
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
  } = useGame();

  useEffect(() => {
    if (gameState.score >= gameState.requiredScore) {
      setGameState((prevState) => ({
        ...prevState,
        showLevelCompleteDialog: true,
        isGameStarted: false,
      }));
    }
  }, [gameState.score, gameState.requiredScore, setGameState]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 text-white p-4">
      <UserMenu
        username={username}
        onLogout={() => setUsername('')}
        onOpenHistory={() => setShowHistoryModal(true)}
        onOpenStore={() => setShowStoreModal(true)}
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">奢华消消乐</h1>
        <GameInfo
          level={gameState.currentLevel}
          score={gameState.score}
          money={gameState.money}
          timeLeft={gameState.timeLeft}
          lives={gameState.lives}
          requiredScore={gameState.requiredScore}
          stars={gameState.stars}
          movesLeft={gameState.movesLeft}
        />
        {gameState.isGameStarted ? (
          <Grid
            grid={gameState.grid}
            onItemClick={handleItemClick}
            selectedItems={gameState.selectedItems}
          />
        ) : (
          <motion.button
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-lg text-2xl font-bold shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
          >
            <Play className="inline-block mr-2" /> 开始游戏
          </motion.button>
        )}
        <Dialog
          isOpen={gameState.showLevelCompleteDialog}
          onClose={() => setGameState(prev => ({ ...prev, showLevelCompleteDialog: false }))}
          onRestart={resetLevel}
          onRestartGame={restartGame}
          onNextLevel={nextLevel}
          title="关卡完成"
          message={`恭喜！你完成了第 ${gameState.currentLevel} 关！`}
          showNextButton={true}
          showRestartButton={false}
          showRestartGameButton={false}
          lives={gameState.lives}
        />
        <Dialog
          isOpen={gameState.showGameOverDialog}
          onClose={() => setGameState(prev => ({ ...prev, showGameOverDialog: false }))}
          onRestart={resetLevel}
          onRestartGame={restartGame}
          title="游戏结束"
          message="很遗憾，游戏结束了。要再试一次吗？"
          showNextButton={false}
          showRestartButton={true}
          showRestartGameButton={true}
          lives={gameState.lives}
        />
        <Tutorial isOpen={showTutorial} onClose={() => setShowTutorial(false)} />
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={(name) => {
            setUsername(name);
            setShowAuthModal(false);
          }}
        />
        <HistoryModal
          isOpen={showHistoryModal}
          onClose={() => setShowHistoryModal(false)}
          history={gameState.history}
          onSaveGame={saveGame}
          onLoadGame={loadGame}
        />
        <StoreModal
          isOpen={showStoreModal}
          onClose={() => setShowStoreModal(false)}
          onPurchase={handlePurchase}
          currentLives={gameState.lives}
          currentMoney={gameState.money}
          currentLevel={gameState.currentLevel}
        />
      </div>
    </div>
  );
}

export default App;