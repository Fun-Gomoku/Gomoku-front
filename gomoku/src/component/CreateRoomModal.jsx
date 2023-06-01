import React from "react";
import { Box, Button, Dialog, TextField, Typography } from "@mui/material";

const CreateRoomModal = ({ open, onClose, create }) => {
  const [roomName, setRoomName] = React.useState("");
  const onChange = (e) => {
    setRoomName(e.target.value);
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "30px",
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
          방 이름을 적어주세요
        </Typography>
        <TextField
          id="roomName_textField"
          label="방 이름"
          sx={{ display: "block" }}
          onChange={onChange}
          value={roomName}
        />
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button sx={{ height: "30px" }} onClick={onClose}>
            <Typography
              sx={{ fontSize: "16px", fontWeight: 500, color: "black" }}
            >
              취소
            </Typography>
          </Button>
          <Button
            sx={{ height: "30px" }}
            onClick={() => {
              create(roomName);
            }}
          >
            <Typography
              sx={{ fontSize: "16px", fontWeight: 500, color: "black" }}
            >
              방 만들기
            </Typography>
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CreateRoomModal;
