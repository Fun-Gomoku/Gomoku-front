import React, { memo, useCallback } from "react";
import styled from "styled-components";

const Col = styled.div`
  width: 30px;
  height: 30px;
  background: #c19d38;
  position: relative;

  &:before {
    content: "";
    height: 100%;
    width: 2px;
    background: black;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    ${(props) =>
      props.$row === 0 &&
      `
      top: 50%;
    `}

    ${(props) =>
      props.$row === 18 &&
      `
      height: 50%;
    `}
  }

  &:after {
    content: "";
    width: 100%;
    height: 2px;
    background: black;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);

    ${(props) =>
      props.$col === 0 &&
      `
      left: 50%;
    `}

    ${(props) =>
      props.$col === 18 &&
      `
      width: 50%;
    `}
  }
`;

const GomokuElement = styled.div`
  width: 90%;
  height: 90%;
  background: transparent;
  opacity: 0.6;
  border: none;
  position: absolute;
  cursor: pointer;
  transform: translate(5%, 5%);
  border-radius: 100%;
  z-index: 1;
  &:hover {
    background: ${(props) =>
      props.turn === "W"
        ? "radial-gradient(circle at 30% 30%, white, #868484)"
        : "radial-gradient(circle at 30% 30%, #5f5f5f, #000)"};
  }
  &:active {
    opacity: 1;
    background: ${(props) =>
      props.turn === "B"
        ? "radial-gradient(circle at 30% 30%, white, #868484)"
        : "radial-gradient(circle at 30% 30%, #5f5f5f, #000)"};
  }

  &:focus {
    outline: none;
  }

  ${(props) =>
    props.turn === "B" &&
    `
       opacity: 1;
    background: radial-gradient(circle at 30% 30%, #5f5f5f, #000);
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.5);
   
  `}

  ${(props) =>
    props.turn === "W" &&
    `
       opacity: 1;
    background: radial-gradient(circle at 30% 30%, white, #868484);
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.5);
  `}

  &:disabled:hover {
    cursor: not-allowed;
  }

  @keyframes pulse {
    0% {
      border-color: rgba(18, 255, 235, 0.8);
      background: transparent;
      transform: scale(1.1) rotateZ(360deg);
    }
    to {
      border-color: transparent;
      border-width: 6px;
      transform: scale(1.9) rotateZ(360deg);
    }
  }
`;

const Cell = ({ row, col, value, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(row, col, value);
  }, [row, col, value, onClick]);

  return (
    <Col $row={row} $col={col} onClick={handleClick}>
      <GomokuElement turn={value} />
    </Col>
  );
};

export default memo(Cell);
