import * as React from "react";
import styled from "styled-components";

const RangeWrap = styled.div`
  .slidecontainer {
    position: relative;
  }
  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 2px;
    background: rgba(0, 0, 0, 0.8);
    outline: none;
    opacity: 0.7;
  }

  .value {
    color: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 30px;
  }
  .min.value {
    left: 10px;
  }
  .max.value {
    right: 10px;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    border-radius: 50%;
    border: 2px solid rgba(0, 0, 0, 0.8); /* Green 
  background */
    background: #fff;
    cursor: pointer; /* Cursor on hover */
  }

  .slider::-moz-range-thumb {
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.89); /* Green background */
    cursor: pointer; /* Cursor on hover */
  }
`;

type RangeProps = {
  currentHistoryCount: number;
  currentGeneration: number;
  onMovePointer: (point: number) => void;
};

export function SelectRange(props: RangeProps) {
  return (
    <RangeWrap>
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
    </RangeWrap>
  );
}
