import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import SendIcon from "@mui/icons-material/Send";
import { useFirebase } from "../../Firebase/firebase";
import { uuidv4 } from "@firebase/util";
import { useSelector, useDispatch } from "react-redux";
import { updatePostArr } from "../../../Redux/actions/action";

export default function PostBtn({
  currPost,
  handleClose,
  setLocalError,
  setCurrPost,
}) {
  const { uploadFileInStorage, getUrlOfPost, createObjInDatabase } =
    useFirebase();

  const userInfo = useSelector((store) => store.currUserInfo);
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = async () => {
    let errorId;
    if (
      !currPost.postText &&
      !currPost.postImg.length &&
      !currPost.postVideo.length
    ) {
      clearTimeout(errorId);
      errorId = setLocalError("Can't Post Empty Article");
      setTimeout(() => {
        setLocalError("");
      }, 2000);
    } else {
      try {
        setLoading(true);
        setSuccess(false);
        let updatedPostImgArr = [];
        let updatedPostVidArr = [];
        if (currPost.postImg.length !== 0) {
          let updatedPostImgPromiseArr = await uploadFilesInStorage(
            currPost.postImg,
            "images",
            {
              contentType: "image/jpeg",
            }
          );
          updatedPostImgArr = await Promise.all(updatedPostImgPromiseArr);
        }
        if (currPost.postVideo.length !== 0) {
          let updatedPostVidPromiseArr = await uploadFilesInStorage(
            currPost.postVideo,
            "videos",
            {
              contentType: "video/mp4",
            }
          );
          updatedPostVidArr = await Promise.all(updatedPostVidPromiseArr);
        }

        let postId = uuidv4();
        // create the obj about post
        const postInfoObj = {
          postText: currPost.postText,
          postImg: updatedPostImgArr,
          postVideo: updatedPostVidArr,
          likes: [],
          comments: [],
          postId,
          userId: userInfo.currUser.userId,
          userName: userInfo.currUser.userName,
          userProfile: userInfo.currUser.userProfilePicUrl,
          createdAt: Date.now(),
        };
        console.table(postInfoObj);
        // updated AllPost array with new Post
        await createObjInDatabase("posts", postId, postInfoObj);
        await createObjInDatabase(
          `users/${userInfo.currUser.userId}/posts`,
          postId,
          postInfoObj
        );

        dispatch(updatePostArr([postInfoObj, ...userInfo.postsArr]));
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          handleClose();
          setCurrPost({ postText: "", postImg: [], postVideo: [] });
        }, 700);
      } catch (uploadError) {
        console.log({ uploadError });
      } finally {
        setLoading(false);
      }
    }
  };

  async function uploadFilesInStorage(fileArr, type) {
    const urlArr = await fileArr.map(async (fileObj) => {
      // upload in post folder in Storage
      const fullPath = await uploadFileInStorage(
        fileObj.file,
        `${type}/${fileObj.id}/${fileObj.name}`
      );
      let url = await getUrlOfPost(fullPath);
      return { id: fileObj.id, url };
    });
    return urlArr;
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ m: 1, position: "relative" }}>
        <Fab
          aria-label="save"
          color="action"
          sx={buttonSx}
          onClick={handleButtonClick}
        >
          {success ? <CheckIcon /> : <SendIcon />}
        </Fab>
        {loading && (
          <CircularProgress
            size={68}
            sx={{
              color: green[500],
              position: "absolute",
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </Box>
  );
}
