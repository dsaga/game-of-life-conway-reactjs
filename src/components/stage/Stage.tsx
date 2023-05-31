import * as React from "react";
import { GameCellPos } from "../game";
import { StyledStageContainer } from "./Stage.styles";


interface IStage {
  cells: GameCellPos[];
  onUpdateCell: (cell: any) => void;
  stageSize: number;
}

interface IFormatCells {
  cells: GameCellPos[];
  stageSize: number;
}

const formatCells = ({ cells, stageSize }: IFormatCells) => {
  const array: { [pos: number]: GameCellPos[] } = {};
  for (let _xi = 0; _xi < stageSize; _xi++) {
    array[_xi] = cells.filter((_) => {
      return _.x === _xi;
    });
  }

  return array;
};

export function Stage({ cells, onUpdateCell, stageSize }: IStage) {
  const formattedCells = formatCells({ cells, stageSize });

  return (
    <StyledStageContainer>
      <tbody>
        {Object.entries(formattedCells).map(([_xpos, _cells]) => {
          return (
            <tr key={_xpos}>
              {_cells.map((cell) => {
                return (
                  <td key={cell.x + cell.y}>
                    <input
                      type="checkbox"
                      checked={cell.checked}
                      onChange={() => {
                        onUpdateCell(cell);
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </StyledStageContainer>
  );
}
