<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from "vue";
import { SnakeGame } from "../game/SnakeGame";

const GRID_SIZE = 20;

const game = reactive(new SnakeGame(GRID_SIZE));

let gameTimer: number | null = null;

const isSnakeHead = (x: number, y: number): boolean => {
  const head = game.snake.body[0];
  return head ? head.x === x && head.y === y : false;
};

const isSnakeBody = (x: number, y: number): boolean => {
  return game.snake.body.slice(1).some(segment => segment.x === x && segment.y === y);
};

const handleKeyDown = (e: KeyboardEvent): void => {
  switch (e.key) {
    case 'ArrowUp': case 'w': case 'W': case 'ц': case 'Ц': 
      game.snake.changeDirection('UP'); 
      break;
    case 'ArrowDown': case 's': case 'S': case 'ы': case 'Ы': 
      game.snake.changeDirection('DOWN'); 
      break;
    case 'ArrowLeft': case 'a': case 'A': case 'ф': case 'Ф': 
      game.snake.changeDirection('LEFT'); 
      break;
    case 'ArrowRight': case 'd': case 'D': case 'в': case 'В': 
      game.snake.changeDirection('RIGHT'); 
      break;
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  gameTimer = window.setInterval(() => {
    game.tick();
  }, 150);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  if (gameTimer) clearInterval(gameTimer);
});
</script>
<template>
    <div class="game-container">
        <div class="header">
            <h1>Snake Game</h1>
            <div class="score-board">СЧЕТ: <span>{{ game.score }}</span></div>
        </div>
        <div class="grid">
            <div v-for="y in GRID_SIZE" :key="'row-' + y" class="row">
                <div v-for="x in GRID_SIZE"
                :key="'cell-' + x"
                class="cell"
                :class ="{
                  'snake-head': isSnakeHead(x - 1, y - 1),
                  'snake-body': isSnakeBody(x - 1, y - 1),
                  'food': game.food.position.x === x - 1 && game.food.position.y === y - 1
                }"
                </div>
            </div>
        </div>
        <div v-if="game.isGameOver" class="game-over-overlay">
              <div class="game-over-box">
                <h2>Игра окончена! 🎯</h2>
                <p>Ваш финальный счет: {{ game.score }}</p>
                <button @click="game.reset()">Играть снова</button>
              </div>
        </div>
    </div>
</template>
<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #f1f5f9;
  position: relative;
  padding: 32px;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border-radius: 24px;
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.header {
  text-align: center;
  margin-bottom: 28px;
}

h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 12px 0;
  background: linear-gradient(135deg, #22c55e 0%, #10b981 50%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  text-shadow: 0 0 40px rgba(34, 197, 94, 0.3);
}

.score-board {
  font-size: 1.25rem;
  font-weight: 700;
  color: #94a3b8;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.score-board span {
  color: #22c55e;
  font-size: 1.5rem;
  margin-left: 8px;
}

.grid {
  display: flex;
  flex-direction: column;
  border: 3px solid #334155;
  border-radius: 12px;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.05),
    0 20px 40px -10px rgba(0, 0, 0, 0.4),
    0 0 60px -20px rgba(34, 197, 94, 0.15);
  background: #0f172a;
}

.row {
  display: flex;
}

.cell {
  width: 26px;
  height: 26px;
  background-color: #1e293b;
  border: 1px solid #0f172a;
  transition: all 0.08s ease-out;
  box-sizing: border-box;
}

.cell.snake-head {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  border-radius: 6px;
  box-shadow:
    0 0 12px rgba(34, 197, 94, 0.6),
    0 0 24px rgba(34, 197, 94, 0.3);
  position: relative;
}

.cell.snake-head::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  right: 3px;
  bottom: 3px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.cell.snake-body {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
}

.cell.snake-body::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
}

.cell.food {
  background: radial-gradient(circle at 30% 30%, #f87171 0%, #ef4444 50%, #dc2626 100%);
  border-radius: 50%;
  box-shadow:
    0 0 16px rgba(239, 68, 68, 0.6),
    0 0 32px rgba(239, 68, 68, 0.3);
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow:
      0 0 16px rgba(239, 68, 68, 0.6),
      0 0 32px rgba(239, 68, 68, 0.3);
  }
  50% {
    transform: scale(1.08);
    box-shadow:
      0 0 20px rgba(239, 68, 68, 0.8),
      0 0 40px rgba(239, 68, 68, 0.4);
  }
}

.game-over-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.92);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  z-index: 10;
}

.game-over-box {
  background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);
  padding: 40px 60px;
  border-radius: 20px;
  text-align: center;
  border: 2px solid rgba(239, 68, 68, 0.5);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.05),
    0 25px 50px -12px rgba(0, 0, 0, 0.5),
    0 0 60px -15px rgba(239, 68, 68, 0.3);
}

.game-over-box h2 {
  color: #f87171;
  margin: 0 0 16px 0;
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.01em;
}

.game-over-box p {
  color: #94a3b8;
  font-size: 1.1rem;
  margin: 0 0 28px 0;
}

button {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  border: none;
  padding: 14px 32px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow:
    0 4px 14px rgba(34, 197, 94, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

button:hover {
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  transform: translateY(-2px);
  box-shadow:
    0 6px 20px rgba(34, 197, 94, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.15) inset;
}

button:active {
  transform: translateY(0);
  box-shadow:
    0 2px 8px rgba(34, 197, 94, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}
</style>
