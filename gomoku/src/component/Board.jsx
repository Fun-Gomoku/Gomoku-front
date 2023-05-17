import React from "react";
import styled from "styled-components";

import useBoard from "../../src/hooks/useBoard";
import Cell from "../component/Cell";

const Title = styled.h1`
  color: #333;
  text-align: center;
`;

const Wrapper = styled.div`
  text-align: center;
`;

const Checkerboard = styled.div`
  display: inline-block;
  margin-top: 0;
`;

const Row = styled.div`
  display: flex;
`;

const WinnerModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const ModalInner = styled.div`
  background: white;
  color: black;
  height: 300px;
  width: 300px;
  padding: 24px;
  text-align: center;
`;

export default function Board() {
  const { board, winner, handleGomokuClick, cellData } = useBoard();
  console.log("cellData", cellData);

  return (
    <div>
      <Title>오목</Title>
      {winner && (
        <WinnerModal>
          <ModalInner>
            {winner === "draw" && "비김"}
            {winner === "black" && "흑이 이김"}
            {winner === "white" && "백이 이김"}
            <br />
            <button onClick={() => window.location.reload()}>
              한번 더 플레이
            </button>
          </ModalInner>
        </WinnerModal>
      )}
      <Wrapper>
        <Checkerboard>
          {board.map((row, rowIndex) => {
            return (
              <Row key={rowIndex}>
                {row.map((col, colIndex) => {
                  return (
                    <Cell
                      key={colIndex}
                      row={rowIndex}
                      col={colIndex}
                      value={board[rowIndex][colIndex]}
                      onClick={handleGomokuClick}
                    />
                  );
                })}
              </Row>
            );
          })}
        </Checkerboard>
      </Wrapper>
    </div>
  );
}
