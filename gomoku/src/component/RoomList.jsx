import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
            <ul>
                {rooms.map((room) => (
                    <li key={room.roomId}>
                        <Link to={`/room/${room.roomId}`}>Room {room.roomId}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoomList;