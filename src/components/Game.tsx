import * as React from "react";
import styled from "styled-components";
import { SelectRange } from "./SelectRange";

type GameCellPos = {
  x: number;
  y: number;
  checked: boolean;
};

type UpdateCellProps = {
  cell: GameCellPos;
  cells: GameCellPos[];
  override: boolean | null;
};

const IntroMessage = styled.h2`
  font-family: sans-serif;
  text-align: center;
  color: #333333;
`;

const ActionItem = styled.div`
  padding: 20px 0;

  display: flex;
  justify-content: flex-start;
  > div {
    padding-right: 15px;
    width: 100%;
  }
`;

const StyledStageWrap = styled("div")`
  padding-top: 30px;
  padding-bottom: 30px;
  td {
    border: 1px solid rgba(0, 0, 0, 0.63);
  }
  input[type="checkbox"] {
    appearance: none;
    display: block;
    margin: 0px;
    padding: 0;
    height: 30px;
    width: 30px;
  }
  input[type="checkbox"]:checked {
    /* background-color: rgb(15, 15, 15); */
    box-shadow: 0 0 0 20px #000 inset;
  }
`;

export function Game() {
  const [currentGeneration, setCurrentGeneration] = React.useState<number>(0);
  const [cellHistory, setCellHistory] = React.useState<{
    [gen: number]: GameCellPos[];
  }>({});
  const [cells, setCells] = React.useState<GameCellPos[]>([]);
  const [autoPlay, setAutoPlay] = React.useState<boolean>(false);
  const [intervalInstance, setIntervalInstance] = React.useState<
    number | null
  >();
  const [stageCountInput, setStageCountInput] = React.useState<number>(0);
  const [stageSize, setStageSize] = React.useState<number>(0);

  const handleNextGen = () => {
    setCurrentGeneration(currentGeneration + 1);
  };

  const handleCreateStage = () => {
    // make sure to restart everything
    setCells([]);
    setCellHistory({});
    setAutoPlay(false);
    setCurrentGeneration(0);
    setStageSize(stageCountInput);
  };

  const updateCell = (props: UpdateCellProps) => {
    const initialValue: GameCellPos[] = [];
    return props.cells.reduce((previousValue, currentValue) => {
      if (currentValue.x === props.cell.x && currentValue.y === props.cell.y) {
        return [
          ...previousValue,
          {
            ...currentValue,
            checked:
              props.override !== null ? props.override : !currentValue.checked,
          },
        ];
      }

      return [...previousValue, currentValue];
    }, initialValue);
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

  const handleFindLiveCells = (cells: GameCellPos[]) => {
    return cells.filter((__) => __.checked === true);
  };

  const handleFindDeadCells = (cells: GameCellPos[]) => {
    return cells.filter((__) => __.checked === false);
  };

  const handleFindNeigbourCells = (cell: GameCellPos) => {
    return cells.filter((__) => {
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
  };

  const handleEnableAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  const reformat = () => {
    const array: { [pos: number]: GameCellPos[] } = {};
    for (let _xi = 0; _xi < stageSize; _xi++) {
      array[_xi] = cells.filter((_) => {
        return _.x === _xi;
      });
    }

    return array;
  };

  React.useEffect(() => {
    let newCells: GameCellPos[] = [];
    for (let _xi = 0; _xi < stageSize; _xi++) {
      for (let _yi = 0; _yi < stageSize; _yi++) {
        newCells.push({
          x: _xi,
          y: _yi,
          checked: false,
        });
      }
    }

    setCells(newCells);
  }, [stageSize]);

  React.useEffect(() => {
    if (cellHistory[currentGeneration]) {
      setCells(cellHistory[currentGeneration]);
    } else if (
      cellHistory[currentGeneration] === undefined &&
      cells.length > 0
    ) {
      let currentCells = cells;

      // new stage
      const liveCells = handleFindLiveCells(currentCells);
      const deadCells = handleFindDeadCells(currentCells);

      const dieQueue: GameCellPos[] = [];
      const bornQueue: GameCellPos[] = [];
      liveCells.forEach((__cell) => {
        const liveNeighbours = handleFindNeigbourCells(__cell);

        // fewer than two live neighbours dies
        if (liveNeighbours.length < 2) dieQueue.push(__cell);

        // more than three live neighbours dies
        if (liveNeighbours.length > 3) dieQueue.push(__cell);
      });

      deadCells.forEach((__cell) => {
        const liveNeighbours = handleFindNeigbourCells(__cell);

        // fewer than two live neighbours dies
        if (liveNeighbours.length === 3) bornQueue.push(__cell);
      });

      // do something with dieQueue and bornQueue
      dieQueue.forEach((__cell) => {
        currentCells = updateCell({
          cell: __cell,
          cells: currentCells,
          override: false,
        });
      });
      bornQueue.forEach((__cell) => {
        currentCells = updateCell({
          cell: __cell,
          cells: currentCells,
          override: true,
        });
      });

      setCells([...currentCells]);
      setCellHistory({ ...cellHistory, [currentGeneration]: currentCells });
    }
  }, [currentGeneration]);

  React.useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrentGeneration((_current) => _current + 1);
      }, 1000);
      setIntervalInstance(interval);
    } else {
      if (intervalInstance) {
        clearInterval(intervalInstance);
        setIntervalInstance(null);
      }
    }

    return () => {
      if (intervalInstance) clearInterval(intervalInstance);
    };
  }, [autoPlay, setIntervalInstance]);

  return (
    <>
      <StyledStageWrap>
        <table>
          <tbody>
            {Object.entries(reformat()).map(([_xpos, _cells]) => {
              return (
                <tr key={_xpos}>
                  {_cells.map((__) => {
                    return (
                      <td key={__.x + __.y}>
                        <input
                          type="checkbox"
                          checked={__.checked}
                          onChange={() => {
                            handleUpdateCell(__);
                          }}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </StyledStageWrap>

      {stageSize > 0 ? (
        <>
          <ActionItem>
            <div>Current Gen: {currentGeneration} </div>
            <div>Total Gen History: {Object.entries(cellHistory).length} </div>
            <div>
              <button onClick={handleNextGen}>Next Gen</button>
            </div>
          </ActionItem>
          {Object.entries(cellHistory).length >= 2 && (
            <ActionItem>
              <div>
                <SelectRange
                  currentGeneration={currentGeneration}
                  currentHistoryCount={Object.entries(cellHistory).length}
                  onMovePointer={(newValue: number) => {
                    setAutoPlay(false);
                    if (
                      newValue >= 0 &&
                      newValue <= Object.entries(cellHistory).length
                    )
                      setCurrentGeneration(newValue);
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
          <button onClick={handleCreateStage}>Create Stage</button>
        </div>
      </ActionItem>
    </>
  );
}
