import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getRandomUserId } from "../utils/userId";
import omku from "../images/omku.png";

const StyledRoomList = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoomListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const RoomCard = styled.div`
  width: 300px;
  padding: 20px;
  margin: 20px;
  border: 2px solid #ccc;
  border-radius: 8px;
  //color: black;
  color: ${({ hover }) => (hover ? "white" : "black")};
  background-color: ${({ hover }) => (hover ? "#000000" : "transparent")};
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

const CreateRoomButton = styled.button`
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 20px;
  background-color: #ffffff;
  border: 2px solid #000000;
  cursor: pointer;
  &:hover {
    background-color: #000000;
    color: #ffffff;
  }
`;

const RoomLink = styled(Link)`
  display: block;
  text-align: center;
  text-decoration: none;
  //color: #000000;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 20px;
  color: ${({ hover }) => (hover ? "white" : "#000000")};
`;

const RoomList = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
    <StyledRoomList>
      <h1>오목방 목록</h1>
      <img
        src={omku}
        width="300"
        height="250"
        alt="omok"
        style={{ marginBottom: "10px" }}
      />
      <CreateRoomButton onClick={handleCreateRoom}>방 만들기</CreateRoomButton>
      <RoomListWrapper>
        {rooms.map((room, index) => (
          <RoomCard
            key={room.roomId}
            hover={hoveredIndex === index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <RoomLink
              hover={hoveredIndex === index}
              to={`/room/${room.roomName}?userId=${getRandomUserId()}&color=B`}
            >
              Room {room.roomName}
            </RoomLink>
          </RoomCard>
        ))}
      </RoomListWrapper>
    </StyledRoomList>
  );
};

export default RoomList;
