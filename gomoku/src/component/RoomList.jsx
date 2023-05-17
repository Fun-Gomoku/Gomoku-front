import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getRandomUserId } from "../utils/userId";

const RoomListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const RoomCard = styled.div`
  width: 300px;
  padding: 20px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const RoomTitle = styled.h2`
  margin: 0 0 10px;
  font-size: 18px;
`;

const RoomDescription = styled.p`
  margin: 0 0 20px;
  font-size: 14px;
  color: #666;
`;

const RoomLink = styled(Link)`
  display: block;
  text-align: center;
  text-decoration: none;
  color: #fff;
  background-color: #007bff;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const RoomList = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("http://52.79.86.109:8080/gomoku-room")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data.gomokuRoomList);
      });
  }, []);

  const handleCreateRoom = async () => {
    const newRoomId = generateRoomId(); // Generate a unique room ID
    await fetch("http://52.79.86.109:8080/gomoku-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomName: String(newRoomId),
      }),
    });
    const newRoom = { roomName: newRoomId };

    setRooms((prev) => [...prev, newRoom]);
    navigate(`/room/${newRoom.roomName}?userId=${getRandomUserId()}&color=W`);
  };

  const generateRoomId = () => {
    // Generate a unique room ID using your preferred method
    // Example: You can use a library like nanoid to generate unique IDs
    // const newRoomId = nanoid();

    // For simplicity, using a random number as the room ID in this example
    return Math.floor(Math.random() * 100000);
  };

  return (
    <div>
      <h1>Room List</h1>
      <button onClick={handleCreateRoom}>Create Room</button>
      <RoomListWrapper>
        {rooms.map((room) => (
          <RoomCard key={room.roomId}>
            <RoomLink
              to={`/room/${room.roomName}?userId=${getRandomUserId()}&color=B`}
            >
              Room {room.roomName}
            </RoomLink>
          </RoomCard>
        ))}
      </RoomListWrapper>
    </div>
  );
};

export default RoomList;
