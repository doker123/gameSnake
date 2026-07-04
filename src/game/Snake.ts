import type { Point, Direction } from "../interface/types";

export class Snake {
  public body: Point[] = [];
  public direction: Direction = "UP";

  constructor(startHead: Point) {
    this.reset(startHead);
  }

  public reset(startHead: Point): void {
    this.body = [
      { x: startHead.x, y: startHead.y },
      { x: startHead.x, y: startHead.y + 1 },
      { x: startHead.x, y: startHead.y + 2 },
    ];
    this.direction = "UP";
  }

  public changeDirection(newDirection: Direction): void {
    if (this.direction === "UP" && newDirection === "DOWN") return;
    if (this.direction === "DOWN" && newDirection === "UP") return;
    if (this.direction === "LEFT" && newDirection === "RIGHT") return;
    if (this.direction === "RIGHT" && newDirection === "LEFT") return;

    this.direction = newDirection;
  }

  public getNextHeadPossition(): Point {
    const currentHead: Point = this.body[0] || { x: 0, y: 0 };

    const head: Point = { x: currentHead.x, y: currentHead.y };

    switch (this.direction) {
      case "UP":
        head.y -= 1;
        break;
      case "DOWN":
        head.y += 1;
        break;
      case "LEFT":
        head.x -= 1;
        break;
      case "RIGHT":
        head.x += 1;
        break;
    }
    return head;
  }
  public moveForward(newHead: Point): void {
    this.body.unshift(newHead);
  }
  public cutTail(): Point {
    return this.body.pop()!;
  }

  public isBitingItself(newHead: Point): boolean {
    return this.body.some(
      (segment) => segment.x === newHead.x && segment.y === newHead.y,
    );
  }
}
