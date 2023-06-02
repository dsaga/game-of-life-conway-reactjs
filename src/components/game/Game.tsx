import * as React from "react";
import { Stage } from "../stage/Stage";
import { GameControlls } from "./GameControlls";
import { useGameControlls } from "./useGameControlls";
import { createCellsFromStageSize } from "./utils";
import { useGameLogic } from "./useGameLogic";

export type GameCellPos = {
  x: number;
  y: number;
  checked: boolean;
};

export interface ICreateStageProps {
  stageSize: number;
}

export function Game() {
  const {
    currentGeneration,
    setCurrentGeneration,
    isAutoPlaying,
    setIsAutoPlaying,
    stageSize,
    setStageSize,
  } = useGameControlls();

  const { cells, cellHistory, resetCells, updateCell, setCells } = useGameLogic(currentGeneration);

  const handleNextGen = () => {
    setCurrentGeneration(currentGeneration + 1);
  };

  const handleCreateStage = ({ stageSize }: ICreateStageProps) => {
    // make sure to restart everything
    resetCells();
    setIsAutoPlaying(false);
    setCurrentGeneration(0);
    setStageSize(stageSize);
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
    if (stageSize >= 2) setCells(createCellsFromStageSize(stageSize));
  }, [stageSize]);


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
