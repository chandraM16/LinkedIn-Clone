import React, { useState, useEffect } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useFirebase } from "../../Firebase/firebase";
import { useSelector } from "react-redux";

export const LikeBtn = ({ postObj }) => {
  const { updateTheCompleteDoc } = useFirebase();
  const {
    currUser: { userId },
  } = useSelector((store) => store.currUserInfo);
  const [isLike, setIsLike] = useState(false);
  const [likeClass, setLikeClass] = useState("normal");

  async function handleLikeBtn() {
    if (!isLike) {
      setIsLike((prev) => !prev);
      setLikeClass("likeBtn");
      const newLikeArr = [...postObj.likes, userId];
      postObj.likes = newLikeArr;

      await updateTheCompleteDoc("posts", postObj.postId, {
        likes: newLikeArr,
      });
      await updateTheCompleteDoc(
        `users/${postObj.userId}/posts`,
        postObj.postId,
        {
          likes: newLikeArr,
        }
      );
      console.log("like Done");
    } else {
      setIsLike((prev) => !prev);
      setLikeClass("normal");
      const [userId, ...newLikeArr] = postObj.likes;
      postObj.likes = newLikeArr;

      await updateTheCompleteDoc("posts", postObj.postId, {
        likes: newLikeArr,
      });
      await updateTheCompleteDoc(
        `users/${postObj.userId}/posts`,
        postObj.postId,
        {
          likes: newLikeArr,
        }
      );
      console.log("unlike Done");
    }
  }

  useEffect(() => {
    if (postObj.likes.includes(userId)) {
      setIsLike(true);
      setLikeClass("likeBtn");
    }
  }, []);
  return (
    <div className="post_likes_cont">
      <ThumbUpIcon
        fontSize="large"
        className={likeClass}
        onClick={handleLikeBtn}
      />
      <h4 className="post_like_count">{postObj.likes?.length} </h4>
    </div>
  );
};
