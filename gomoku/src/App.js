import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomList from "./component/RoomList";
import Board from "./component/Board";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoomList />} />
        <Route path="/room/:roomId" element={<Board />} />
      </Routes>
    </Router>
  );
};

export default App;
