import React, { useState } from "react";
import PropTypes from "prop-types";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import UploadImgBtn from "./ImagePost";
import UploadVideoBtn from "./Video";
import PostBtn from "./PostBtn";
import Alert from "@mui/material/Alert";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Blog() {
  const [currPost, setCurrPost] = useState({
    postText: "",
    postImg: [],
    postVideo: [],
  });
 
  const [localError, setLocalError] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function deletePreview_img(id, type) {
    if (type) {
      setCurrPost({
        ...currPost,
        postImg: currPost.postImg.filter((imgObj) => imgObj.id !== id),
      });
    } else {
      setCurrPost({
        ...currPost,
        postVideo: currPost.postVideo.filter((vidObj) => vidObj.id !== id),
      });
    }
  }

 
  return (
    <div style={{ width: "100%" }}>
      <div onClick={handleClickOpen} className="blog_btn">
        Create a Article
      </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Create a Article
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <TextField
            id="filled-multiline-static"
            placeholder="Write Something...."
            multiline
            rows={10}
            variant="filled"
            style={{ width: "30rem" }}
            value={currPost.postText}
            onChange={(e) => {
              setCurrPost({ ...currPost, postText: e.target.value });
            }}
          />
          {currPost.postImg.length !== 0 && (
            <div className="currPost_img_cont">
              {" "}
              {currPost.postImg.map((img) => {
                return (
                  <div className="currPostImages" key={img.id}>
                    <img src={img.url} alt="" className="preview_img" />
                    <span
                      className="material-symbols-outlined preview_img_close"
                      onClick={() => {
                        deletePreview_img(img.id, "imageArr");
                      }}
                    >
                      close
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          {currPost.postVideo.length !== 0 && (
            <div className="currPost_vid_cont">
              {currPost.postVideo.map((vid) => {
                return (
                  <div className="currPostVideo" key={vid.id}>
                    <video src={vid.url} className="preview_vid"></video>
                    <span
                      className="material-symbols-outlined preview_img_close"
                      onClick={() => {
                        deletePreview_img(vid.id);
                      }}
                    >
                      close
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <div className="post_action_btn">
            <div className="media_upload_btn">
              <UploadImgBtn setCurrPost={setCurrPost} currPost={currPost} />
              <UploadVideoBtn
                setCurrPost={setCurrPost}
                currPost={currPost}
                setLocalError={setLocalError}
              />
            </div>
            <div className="post_submit_btn">
              {localError && (
                <Alert severity="error" className="postLocalError">
                  {localError}
                </Alert>
              )}
              <PostBtn
                currPost={currPost}
                handleClose={handleClose}
                setLocalError={setLocalError}
                setCurrPost={setCurrPost}
              />
            </div>
          </div>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
