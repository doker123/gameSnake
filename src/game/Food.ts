import type { Point } from "../interface/types";
import { Snake } from "./Snake";

export class Food {
  public position: Point = { x: 0, y: 0 };
  private gridSize: number;

  constructor(gridSize: number) {
    this.gridSize = gridSize;
    this.spawn([])
  }
  public spawn(snakeBody: Point[]): void {
    let newPosition: Point
    do {
      newPosition = {
      x: Math.floor(Math.random() * this.gridSize),
      y: Math.floor(Math.random() * this.gridSize),
      }
    } while (this.isOnSnake(newPosition, snakeBody))
    this.position = newPosition;
  }
  private isOnSnake(newPosition: Point, snakeBody: Point[]): boolean {
    return snakeBody.some(segment => segment.x === newPosition.x && segment.y === newPosition.y);
  }
}
