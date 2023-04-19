import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import VideocamIcon from "@mui/icons-material/Videocam";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { uuidv4 } from "@firebase/util";
export default function UploadVideoBtn({
  setCurrPost,
  currPost,
  setLocalError,
}) {
  function handleVidInputChange(e) {
    const obj = { ...{ ...e.target.files } };
    let arr = [];
    let errorId;
    for (const key in obj) {
      clearTimeout(errorId);
      const id = uuidv4();
      const url = URL.createObjectURL(obj[key]);
      const size = obj[key].size;
      if (size / (1024 * 1024) > 50) {
        // Error handling
        setLocalError("Video size should be less than 50mb");
        setTimeout(() => {
          setLocalError("");
        }, 3000);
      } else {
        arr.push({ id, url, file: obj[key] });
      }
    }
    clearTimeout(errorId);
    setCurrPost({ ...currPost, postVideo: arr });
  }

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input
          hidden
          accept="video/*"
          type="file"
          multiple
          onChange={(e) => {
            handleVidInputChange(e);
          }}
        />
        <VideocamIcon color="action" />
      </IconButton>
    </Stack>
  );
}
