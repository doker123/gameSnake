import type { Point } from "../interface/types";
import { Food } from "./Food";
import { Snake } from "./Snake";

export class SnakeGame {
  public snake: Snake;
  public food: Food;

  public score: number = 0;
  public isGameOver: boolean = false;
  private gridSize: number;
  
  constructor(gridSize: number = 20) {
    this.gridSize = gridSize;
    const centerPoint: Point = {
      x: Math.floor(this.gridSize / 2),
      y: Math.floor(this.gridSize / 2),
    };
    this.snake = new Snake(centerPoint);
    this.food = new Food(this.gridSize);
    this.reset();
  }

  public reset(): void {
    const centerPoint: Point = {
      x: Math.floor(this.gridSize / 2),
      y: Math.floor(this.gridSize / 2),
    };
    this.snake.reset(centerPoint);
    this.score = 0;
    this.isGameOver = false;
    this.food.spawn(this.snake.body);
  };
  
  private isOutOfBounds(point: Point): boolean {
    return point.x < 0 || point.x >= this.gridSize || point.y < 0 || point.y >= this.gridSize;
  }

  public tick(): void {
    if (this.isGameOver) return;
    const nextHead = this.snake.getNextHeadPossition();

    if (this.isOutOfBounds(nextHead) || this.snake.isBitingItself(nextHead)) {
      this.isGameOver = true;
      return;
    }
    
    this.snake.moveForward(nextHead);

    if (nextHead.x === this.food.position.x && nextHead.y === this.food.position.y) {
      this.score++;
      this.food.spawn(this.snake.body);
    } else {
      this.snake.cutTail();
    }
    
  }
}
