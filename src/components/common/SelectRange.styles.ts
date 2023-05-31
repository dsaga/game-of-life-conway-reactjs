import styled from "styled-components";

export const RangeContainer = styled.div`
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
