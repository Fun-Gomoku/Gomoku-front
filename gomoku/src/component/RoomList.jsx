import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

// const RoomList = () => {
//     // Example room data
//     const rooms = [
//         { id: 1, title: 'Room 1', description: 'Description for Room 1' },
//         { id: 2, title: 'Room 2', description: 'Description for Room 2' },
//         { id: 3, title: 'Room 3', description: 'Description for Room 3' },
//     ];
//
//     return (
//         <RoomListWrapper>
//             {rooms.map((room) => (
//                 <RoomCard key={room.id}>
//                     <RoomTitle>{room.title}</RoomTitle>
//                     <RoomDescription>{room.description}</RoomDescription>
//                     <RoomLink to={`/room/${room.id}`}>Join Room</RoomLink>
//                 </RoomCard>
//             ))}
//         </RoomListWrapper>
//     );
// };
//
// export default RoomList;


const RoomList = () => {
    const [rooms, setRooms] = useState([]);

    const handleCreateRoom = () => {
        const newRoomId = generateRoomId(); // Generate a unique room ID
        const newRoom = { roomId: newRoomId, players: [] };

        setRooms([...rooms, newRoom]);
    };

    const generateRoomId = () => {
        // Generate a unique room ID using your preferred method
        // Example: You can use a library like nanoid to generate unique IDs
        // const newRoomId = nanoid();

        // For simplicity, using a random number as the room ID in this example
        const newRoomId = Math.floor(Math.random() * 100000);

        return newRoomId;
    };

    return (
        <div>
            <h1>Room List</h1>
            <button onClick={handleCreateRoom}>Create Room</button>
            <RoomListWrapper>
                    {rooms.map((room) => (
                        <RoomCard key={room.roomId}>
                            <RoomLink to={`/room/${room.roomId}`}>Room {room.roomId}</RoomLink>
                        </RoomCard>
                    ))}
            </RoomListWrapper>
        </div>
    );
};

export default RoomList;