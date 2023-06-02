import React from "react";
import { GameCellPos, makeGameLogic } from ".";

export type UpdateCellProps = {
  cell: GameCellPos;
  cells: GameCellPos[];
  override: boolean | null;
};

export function useGameLogic(currentGeneration: number) {
  const [cellHistory, setCellHistory] = React.useState<{
    [gen: number]: GameCellPos[];
  }>({});
  const [cells, setCells] = React.useState<GameCellPos[]>([]);

  const updateCell = ({ cell, cells, override }: UpdateCellProps) => {
    return cells.map((currentCell) => {
      if (currentCell.x === cell.x && currentCell.y === cell.y) {
        return {
          ...currentCell,
          checked: override !== null ? override : !currentCell.checked,
        };
      }
      return currentCell;
    });
  };

  const performGameLogic = () => {
    const gameLogic = makeGameLogic(cells);
    return gameLogic.performGameLogic();
  };

  const generationAdvance = () => {
    if (cellHistory[currentGeneration]) {
      setCells(cellHistory[currentGeneration]);
    } else if (
      cellHistory[currentGeneration] === undefined &&
      cells.length > 0
    ) {
      const currentCells = performGameLogic();
      setCells(currentCells);
      setCellHistory({ ...cellHistory, [currentGeneration]: currentCells });
    }
  };

  const handleResetCells = () => {
    setCells([]);
    setCellHistory({});
  };

  React.useEffect(() => {
    generationAdvance();
  }, [currentGeneration]);

  return {
    cells,
    cellHistory,
    setCells,
    updateCell,
    resetCells: handleResetCells,
  };
}
