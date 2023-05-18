import { useState, useRef, useCallback, useEffect } from "react";
import { findWinner } from "../utils/count";
import { Stomp as webstomp } from "@stomp/stompjs";
const SIZE = 19;

export default function useBoard() {
  const searchParams = new URLSearchParams(window.location.search);
  const userId = searchParams.get("userId") || "";
  const color = searchParams.get("color") || "B";
  const roomId = window.location.pathname.split("/")[2] || "";
  const [stompClient, setStompClient] = useState(null);
  const [isCurrentUserTurn, setIsCurrentUserTurn] = useState(true);

  const [board, setBoard] = useState(Array(SIZE).fill(Array(SIZE).fill(null)));
  const [cellData, setCellData] = useState({
    userId,
    color: "B",
    location: null,
    roomId,
  });
  const [winner, setWinner] = useState();

  useEffect(() => {
    const websocket = new WebSocket("ws://52.79.86.109:8080/gomoku-game");
    const client = webstomp.over(websocket);

    client.connect({}, function (frame) {
      setStompClient(client);
      client.subscribe("/subscribe/gomoku-room/1", function (message) {
        setCellData({
          roomId: roomId,
          userId: userId,
          color: message.headers.color,
          location: message.headers.location.split(",").map((v) => Number(v)),
        });
        const [y, x] = message.headers.location
          .split(",")
          .map((v) => Number(v));

        // Check if it's the current user's turn based on the received userId
        updateBoard(y, x, message.headers.color);
        const isCurrentUserTurn = message.headers.userId === userId;
        setIsCurrentUserTurn(isCurrentUserTurn);
      });
    });

    return () => {
      client.disconnect();
    };
  }, []);

  useEffect(() => {
    const sendData = () => {
      if (!stompClient) return;
      stompClient.send("/subscribe/gomoku-room/1", {
        ...cellData,
      });
    };
    sendData();
  }, [stompClient, JSON.stringify(cellData)]);

  const lastRow = useRef();
  const lastCol = useRef();

  const updateBoard = useCallback((y, x, newValue) => {
    setBoard((board) =>
      board.map((row, currentY) => {
        if (currentY !== y) return row;

        return row.map((col, currentX) => {
          if (currentX !== x) return col;
          return newValue;
        });
      })
    );
  }, []);

  const handleGomokuClick = useCallback(
    (row, col, value) => {
      if (!isCurrentUserTurn || value) return;
      setCellData((prev) => ({
        ...prev,
        color: color,
        location: [row, col],
      }));

      lastRow.current = row;
      lastCol.current = col;
    },
    [isCurrentUserTurn, updateBoard]
  );

  useEffect(() => {
    if (lastRow.current === undefined || lastCol.current === undefined) return;
    setWinner(findWinner(board, lastRow.current, lastCol.current));
  }, [board]);

  return {
    cellData,
    board,
    winner,
    handleGomokuClick,
  };
}
