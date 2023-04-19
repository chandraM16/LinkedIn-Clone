import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import "../Modal/modal.css";
import { useSelector, useDispatch } from "react-redux";
import { useFirebase } from "../Firebase/firebase";
import { uuidv4 } from "@firebase/util";
import { updateCurrUserObj } from "../../Redux/actions/action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  //   border : "2px solid #eaeaea"
};

function ChildModal() {
  const {
    uploadFileInStorage,
    getUrlOfPost,
    updateTheCompleteDoc,
    getDocument,
  } = useFirebase();
  const { currUser } = useSelector((store) => {
    return store.currUserInfo;
  });
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState({
    oldPawd: "",
    newPawd: "",
    confPawd: "",
  });

  const [error, setError] = useState("");
  const [isOk, setIsOk] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function handlePasswordSubmit() {
    if (userInput.newPawd != userInput.confPawd) {
      setError("New Password and Confirm Password are not matched.");
      setIsOk(false);
      return;
    } else if (userInput.oldPawd != currUser.userPassword) {
      setError("Wrong Old Password");
      setIsOk(false);
      return;
    } else {
      await updateTheCompleteDoc("users/", currUser.userId, {
        userPassword: userInput.newPawd,
      });
      const updatedUser = await getDocument("users", currUser.userId);
      dispatch(updateCurrUserObj({ ...updatedUser }));
      setError("");
      setIsOk(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  }

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Change Password</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "26rem", borderRadius: "0.6rem" }}>
          <h2 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>
            Change Password:
          </h2>
          {error != "" && <Alert severity="error">{error}</Alert>}
          {isOk && <Alert severity="success">Password Updated!</Alert>}
          <TextField
            id="outlined-basic"
            label="Current Password"
            variant="outlined"
            margin={"dense"}
            type="password"
            value={userInput.oldPawd}
            onChange={(e) => {
              setUserInput({ ...userInput, oldPawd: e.target.value });
            }}
          />
          <TextField
            id="outlined-basic"
            label="New Password"
            variant="outlined"
            margin={"dense"}
            type="password"
            value={userInput.newPawd}
            onChange={(e) => {
              setUserInput({ ...userInput, newPawd: e.target.value });
            }}
          />
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            margin={"dense"}
            type="password"
            value={userInput.confPawd}
            onChange={(e) => {
              setUserInput({ ...userInput, confPawd: e.target.value });
            }}
          />

          <Button
            onClick={handlePasswordSubmit}
            variant="outlined"
            style={{
              position: "absolute",
              right: "34px",
              bottom: "30px",
              fontSize: "1rem",
            }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function MyModal() {
  const {
    uploadFileInStorage,
    getUrlOfPost,
    updateTheCompleteDoc,
    getDocument,
  } = useFirebase();
  const { currUser } = useSelector((store) => {
    return store.currUserInfo;
  });
  console.table(currUser);
  const dispatch = useDispatch();
  //   console.table(currUser);
  const [userInput, setUserInput] = useState({
    userName: currUser.userName,
    about: currUser.about ?? "",
    city: currUser.city ?? "",
    contactNo: currUser.contactNo ?? "",
  });
  const [error, setError] = useState("");
  const [isOk, setIsOk] = useState(false);
  const [fileObj, setFileObj] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function handleInfoUpdateSubmit() {
    if (userInput.contactNo.length !== 10) {
      setIsOk(false);
      setError("Contact No. Is Invalid");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    try {
      if (fileObj) {
        console.table(fileObj);
        // generate the uid for post
        const fileId = uuidv4();

        // // process of uploading in Storage is start
        // setIsLoading(true);

        // // upload in post folder in Storage
        let [imgUrlPromise] = await uploadFilesInStorage(
          [{ fileObj, id: fileId, name: fileObj.name }],
          "allProfilePic"
        );
        const { url } = await imgUrlPromise;
        dispatch(updateCurrUserObj({ ...currUser, userProfilePicUrl: url }));

        await updateTheCompleteDoc("users/", currUser.userId, {
          userProfilePicUrl: url,
        });
        setIsLoading(false);
      }

      await updateTheCompleteDoc("users/", currUser.userId, userInput);
      const updatedUser = await getDocument("users", currUser.userId);
      dispatch(updateCurrUserObj({ ...updatedUser }));
      setIsOk(true);
      setError("");

      setTimeout(() => {
        handleClose();
        setIsOk(false);
      }, 1000);
    } catch (err) {
      console.log(err);
      setError("Something Went Wrong");
      setIsOk(false);
    }
  }

  async function uploadFilesInStorage(fileArr, type) {
    console.log(fileArr);
    const urlArr = await fileArr.map(async (fileObj) => {
      // upload in post folder in Storage
      const fullPath = await uploadFileInStorage(
        fileObj.fileObj,
        `${type}/${fileObj.id}/${fileObj.name}`
      );
      console.log({ fullPath });
      let url = await getUrlOfPost(fullPath);
      return { id: fileObj.id, url };
    });
    return urlArr;
  }
  return (
    <div>
      <Button onClick={handleOpen}>
        <Avatar alt="Remy Sharp" src= {currUser.userProfilePicUrl} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: "40rem", borderRadius: "0.4rem" }}>
          <div className="modal_cont">
            <h2 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>
              {currUser.userName}
            </h2>
            {error != "" && <Alert severity="error">{error}</Alert>}
            {isOk && <Alert severity="success">Profile Updated!</Alert>}
            <TextField
              id="outlined-basic"
              label="User Name"
              variant="outlined"
              margin={"dense"}
              value={userInput.userName}
              onChange={(e) => {
                setUserInput({ ...userInput, userName: e.target.value });
              }}
            />

            <TextField
              id="outlined-basic"
              label="About"
              variant="outlined"
              margin={"dense"}
              value={userInput.about}
              onChange={(e) => {
                setUserInput({ ...userInput, about: e.target.value });
              }}
            />

            <TextField
              id="outlined-basic"
              label="Contact No."
              variant="outlined"
              margin={"dense"}
              type="number"
              value={userInput.contactNo}
              onChange={(e) => {
                setUserInput({ ...userInput, contactNo: e.target.value });
              }}
            />
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              margin={"dense"}
              value={userInput.city}
              onChange={(e) => {
                setUserInput({ ...userInput, city: e.target.value });
              }}
            />

            <h5 style={{ fontSize: "1rem" }}>Profile Photo:-</h5>
            {fileObj && (
              <p style={{ fontSize: "0.8rem", margin: "0" }}>
                File Uploaded :- {fileObj.name}
              </p>
            )}
            <Button variant="outlined" component="label">
              Upload
              <input
                hidden
                accept="image/*"
                multiple
                disabled={isLoading}
                type="file"
                onChange={(e) => {
                  setFileObj(e.target.files[0]);
                }}
              />
            </Button>
            <div className="update-action-box">
              {currUser.userPassword !== "googleSignIn" && (
                <div className="changePasswordModal">
                  <ChildModal />
                </div>
              )}

              <Button
                disabled={isLoading}
                onClick={handleInfoUpdateSubmit}
                variant="outlined"
              >
                Submit
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
