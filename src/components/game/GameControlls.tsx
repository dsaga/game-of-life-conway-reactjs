import * as React from "react";
import { SelectRange } from "./SelectRange";
import { ICreateStageProps } from "./Game";
import { ActionItem, IntroMessage } from "./GameControlls.styles";

interface IGameControlls {
  currentGeneration: number;
  cellHistory: any;
  stageSize: number;
  autoPlay: boolean;
  onSetAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
  onSetCurrentGeneration: React.Dispatch<React.SetStateAction<number>>;
  onNextGen: () => void;
  onCreatStage: (props: ICreateStageProps) => void;
}

export function GameControlls({
  currentGeneration,
  cellHistory,
  stageSize,
  autoPlay,
  onSetAutoPlay,
  onNextGen,
  onSetCurrentGeneration,
  onCreatStage,
}: IGameControlls) {
  const [stageCountInput, setStageCountInput] = React.useState<number>(0);

  const handleEnableAutoPlay = () => {
    onSetAutoPlay(!autoPlay);
  };

  return (
    <>
      {stageSize > 0 ? (
        <>
          <ActionItem>
            <div>Current Gen: {currentGeneration} </div>
            <div>Total Gen History: {Object.entries(cellHistory).length} </div>
            <div>
              <button onClick={onNextGen}>Next Gen</button>
            </div>
          </ActionItem>
          {Object.entries(cellHistory).length >= 2 && (
            <ActionItem>
              <div>
                <SelectRange
                  currentGeneration={currentGeneration}
                  currentHistoryCount={Object.entries(cellHistory).length}
                  onMovePointer={(newValue: number) => {
                    onSetAutoPlay(false);
                    if (
                      newValue >= 0 &&
                      newValue <= Object.entries(cellHistory).length
                    )
                      onSetCurrentGeneration(newValue);
                  }}
                />
              </div>
            </ActionItem>
          )}

          <ActionItem>
            <div>Auto Play: {autoPlay ? "ON" : "OFF"} </div>
            <div>
              <button onClick={handleEnableAutoPlay}>
                {autoPlay ? "Disable" : "Enable"}{" "}
              </button>
            </div>
          </ActionItem>
        </>
      ) : (
        <>
          <IntroMessage>Please Define Stage Size</IntroMessage>
        </>
      )}

      <ActionItem>
        <div> Stage Size: </div>
        <div>
          <input
            type="number"
            value={stageCountInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setStageCountInput(e.target.valueAsNumber);
            }}
          />
        </div>
        <div>
          <button onClick={() => onCreatStage({ stageSize: stageCountInput })}>
            Create Stage
          </button>
        </div>
      </ActionItem>
    </>
  );
}
