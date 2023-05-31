import styled from "styled-components";

export const StyledStageContainer = styled("table")`
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