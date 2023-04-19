import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { uuidv4 } from "@firebase/util";
export default function UploadImgBtn({ setCurrPost, currPost }) {
  function handleImgInputChange(e) {
    const obj = { ...{ ...e.target.files } };
    let arr = [];
    for (const key in obj) {
      const id = uuidv4();
      const url = URL.createObjectURL(obj[key]);
      arr.push({ id, url, file: obj[key] });
    }
    setCurrPost({ ...currPost, postImg: arr });
  }

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input
          hidden
          accept="image/*"
          type="file"
          multiple
          onChange={(e) => {
            handleImgInputChange(e);
          }}
        />
        <PhotoCamera color="action" />
      </IconButton>
    </Stack>
  );
}
