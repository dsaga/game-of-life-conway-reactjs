import * as React from "react";
import { RangeContainer } from "./SelectRange.styles";

type RangeProps = {
  currentHistoryCount: number;
  currentGeneration: number;
  onMovePointer: (point: number) => void;
};

export function SelectRange(props: RangeProps) {
  return (
    <RangeContainer>
      <div className="slidecontainer">
        <span className="min value ">{props.currentHistoryCount > 0 ? 1 : 0}</span>
        <input
          type="range"
          min="1"
          max={props.currentHistoryCount}
          value={props.currentGeneration}
          className="slider"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.onMovePointer(e.target.valueAsNumber);
          }}
        />
        <span className="max value">{props.currentHistoryCount}</span>
      </div>
    </RangeContainer>
  );
}
