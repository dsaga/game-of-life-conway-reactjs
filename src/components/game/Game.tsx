import * as React from "react";
import { Stage } from "../stage/Stage";
import { GameControlls } from "./GameControlls";
import { useGameControlls } from "./useGameControlls";
import { makeGameLogic } from ".";
import { createCellsFromStageSize } from "./utils";

export type GameCellPos = {
  x: number;
  y: number;
  checked: boolean;
};

export type UpdateCellProps = {
  cell: GameCellPos;
  cells: GameCellPos[];
  override: boolean | null;
};

export interface ICreateStageProps {
  stageSize: number;
}

export function Game() {
  const [cellHistory, setCellHistory] = React.useState<{
    [gen: number]: GameCellPos[];
  }>({});
  const [cells, setCells] = React.useState<GameCellPos[]>([]);
  const [stageSize, setStageSize] = React.useState<number>(0);

  const { currentGeneration, setCurrentGeneration, isAutoPlaying, setIsAutoPlaying } =
    useGameControlls();


  const handleNextGen = () => {
    setCurrentGeneration(currentGeneration + 1);
  };

  const handleCreateStage = ({ stageSize }: ICreateStageProps) => {
    // make sure to restart everything
    setCells([]);
    setCellHistory({});
    setIsAutoPlaying(false);
    setCurrentGeneration(0);
    setStageSize(stageSize);
  };


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

  const handleUpdateCell = (
    cell: GameCellPos,
    override: boolean | null = null
  ) => {
    const updatedCells = updateCell({
      cell,
      cells,
      override,
    });
    setCells(updatedCells);
    // on every update validate neighbours (find)
  };


  React.useEffect(() => {

    if (stageSize >= 2)
      setCells(createCellsFromStageSize(stageSize));

  }, [stageSize]);

  React.useEffect(() => {
    if (cellHistory[currentGeneration]) {
      setCells(cellHistory[currentGeneration]);
    } else if (
      cellHistory[currentGeneration] === undefined &&
      cells.length > 0
    ) {

      const gameLogic = makeGameLogic(cells);
      const currentCells = gameLogic.performGameLogic();

      setCells(currentCells);
      setCellHistory({ ...cellHistory, [currentGeneration]: currentCells });
    }
  }, [currentGeneration]);

  return (
    <>
      <Stage
        cells={cells}
        onUpdateCell={handleUpdateCell}
        stageSize={stageSize}
      />

      <GameControlls
        onSetAutoPlay={setIsAutoPlaying}
        onNextGen={handleNextGen}
        onCreatStage={handleCreateStage}
        onSetCurrentGeneration={setCurrentGeneration}
        stageSize={stageSize}
        autoPlay={isAutoPlaying}
        currentGeneration={currentGeneration}
        cellHistory={cellHistory}
      />
    </>
  );
}
