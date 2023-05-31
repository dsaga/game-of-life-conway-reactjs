import { GameCellPos } from "./Game";

export class GameLogic {
  constructor(private cells: GameCellPos[]) {}

  private findLiveCells(cells: GameCellPos[]) {
    return this.cells.filter((__) => __.checked === true);
  }

  private findDeadCells(cells: GameCellPos[]) {
    return this.cells.filter((__) => __.checked === false);
  }

  private updateCellState(cell: GameCellPos, born: boolean) {
    const newCell = { ...cell };

    if (born) {
      newCell.checked = true;
    } else {
      newCell.checked = false;
    }
    return newCell;
  }

  private findNeigbourCells(cell: GameCellPos) {
    return this.cells.filter((__) => {
      const leftX = __.x === cell.x + 1 && __.y === cell.y;
      const rightX = __.x === cell.x - 1 && __.y === cell.y;
      const leftY = __.y === cell.y + 1 && __.x === cell.x;
      const rightY = __.y === cell.y - 1 && __.x === cell.x;

      const leftXY = __.y === cell.y - 1 && __.x === cell.x - 1;
      const rightXY = __.y === cell.y + 1 && __.x === cell.x + 1;
      const leftYX = __.y === cell.y - 1 && __.x === cell.x + 1;
      const rightYX = __.y === cell.y + 1 && __.x === cell.x - 1;

      return (
        __.checked === true &&
        (leftX ||
          rightX ||
          leftY ||
          rightY ||
          leftXY ||
          rightXY ||
          leftYX ||
          rightYX)
      );
    });
  }

  performGameLogic() {
    const currentCells: GameCellPos[] = [];

    // // new stage
    // const liveCells = this.findLiveCells(currentCells);
    // const deadCells = this.findDeadCells(currentCells);

    // const dieQueue: GameCellPos[] = [];
    // const bornQueue: GameCellPos[] = [];

    this.cells.forEach((__cell) => {
      const liveNeighbours = this.findNeigbourCells(__cell);

      // fewer than two live neighbours dies
      if (liveNeighbours.length < 2)
        currentCells.push(this.updateCellState(__cell, false));

      // more than three live neighbours dies
      if (liveNeighbours.length > 3)
        currentCells.push(this.updateCellState(__cell, false));

      // exactly three live neighbours born
      if (liveNeighbours.length === 3)
        currentCells.push(this.updateCellState(__cell, true));
    });

    // // do something with dieQueue and bornQueue
    // dieQueue.forEach((__cell) => {
    //   const dies = this.updateCellState({
    //     cell: __cell,
    //     cells: currentCells,
    //     override: false,
    //   });
    //   currentCells.push(dies);
    // });
    // bornQueue.forEach((__cell) => {
    //   const lives = this.updateCellState({
    //     cell: __cell,
    //     cells: currentCells,
    //     override: true,
    //   });
    //   currentCells.push(lives);
    // });

    return currentCells;
  }
}
