import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getRandomUserId } from "../utils/userId";
import omku from "../images/omku.png";
import gomokuStones from "../images/gomokuStones.png";
import CreateRoomModal from "./CreateRoomModal";
import { Grid, Avatar, Typography } from "@mui/material";

const StyledRoomList = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const RoomListWrapper = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
//   gap: 20px;
//   justify-items: start;
// `;

const RoomCard = styled.div`
  // width: 400px;
  padding: 20px;
  margin: 20px;
  border: 2px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  color: ${({ hover }) => (hover ? "white" : "black")};
  background-color: ${({ hover }) => (hover ? "#000000" : "transparent")};
`;

const RoomTitle = styled.h2`
  //margin: 0 0 10px;
  font-size: 18px;
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
  display: flex;
  text-align: center;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 20px;
  color: ${({ hover }) => (hover ? "white" : "#000000")};
`;

const RoomList = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);

  // const generateRoomId = () => {
  //   // Generate a unique room ID using your preferred method
  //   // Example: You can use a library like nanoid to generate unique IDs
  //   // const newRoomId = nanoid();

  //   // For simplicity, using a random number as the room ID in this example
  //   return Math.floor(Math.random() * 100000);
  // };

  useEffect(() => {
    fetch("http://52.79.86.109:8080/gomoku-room")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data.gomokuRoomList);
      });
  }, []);

  const createRoom = async (roomName) => {
    // const newRoomName = generateRoomId(); // Generate a unique room ID
    await fetch("http://52.79.86.109:8080/gomoku-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomName: roomName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRooms((prev) => [
          ...prev,
          { roomName: data.roomName, roomId: data.roomId },
        ]);
        navigate(`/room/${data.roomId}?userId=${getRandomUserId()}&color=W`);
      });
    // setRooms((prev) => [
    //   ...prev,
    //   { roomName: newRoomName, roomId: newRoomName },
    // ]);
  };

  const handleCreateRoom = async () => {
    setIsCreateRoomModalOpen(true);
    // const newRoom = { roomName: newRoomId };
    //
    // setRooms((prev) => [...prev, newRoom]);
    // navigate(`/room/${newRoom.roomName}?userId=${getRandomUserId()}&color=W`);
  };

  return (
    <>
      <StyledRoomList>
        <h1>오목방 목록</h1>
        <img
          src={omku}
          width="300"
          height="250"
          alt="omok"
          style={{ marginBottom: "10px" }}
        />
        <CreateRoomButton onClick={handleCreateRoom}>
          방 만들기
        </CreateRoomButton>
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          sx={{ px: "100px", py: "20px" }}
        >
          {rooms.map((room, index) => (
            <Grid item sm={12} md={6} key={room.roomId}>
              <RoomCard
                hover={hoveredIndex === index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <RoomLink
                  hover={hoveredIndex === index}
                  to={`/room/${
                    room.roomName
                  }?userId=${getRandomUserId()}&color=B`}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      src={gomokuStones}
                      width="30"
                      height="25"
                      alt="gomokuStones"
                    />
                    <RoomTitle>{room.roomName}</RoomTitle>
                  </div>
                  <div>
                    <Typography sx={{ color: "red" }}>1/2</Typography>
                  </div>
                </RoomLink>
              </RoomCard>
            </Grid>
          ))}
        </Grid>
      </StyledRoomList>
      <CreateRoomModal
        open={isCreateRoomModalOpen}
        onClose={() => setIsCreateRoomModalOpen(false)}
        create={createRoom}
      />
    </>
  );
};

export default RoomList;
