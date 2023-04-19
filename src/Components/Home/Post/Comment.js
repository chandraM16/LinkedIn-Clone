import React, { useEffect, useState } from "react";
import { useFirebase } from "../../Firebase/firebase";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { uuidv4 } from "@firebase/util";
import { updatePostArr } from "../../../Redux/actions/action";
export const Comment = ({ postObj }) => {
  const { updateTheCompleteDoc } = useFirebase();
  const {
    currUser: { userName },
    postsArr,
  } = useSelector((store) => store.currUserInfo);
  const dispatch = useDispatch();
  // console.log({ userName });
  // console.log({ postObj });

  const [localComment, setLocalComment] = useState("");

  async function handleSetLocalCommentInPostObj() {
    const newCommentsArr = [
      {
        name: userName,
        id: uuidv4(),
        commentText: localComment,
      },
      ...postObj.comments,
    ];

    postObj.comments = [
      {
        name: userName,
        id: uuidv4(),
        commentText: localComment,
      },
      ...postObj.comments,
    ];
    dispatch(updatePostArr([...postsArr]));

    updateTheCompleteDoc("posts", postObj.postId, {
      comments: newCommentsArr,
    });
    updateTheCompleteDoc(`users/${postObj.userId}/posts`, postObj.postId, {
      comments: newCommentsArr,
    });
    setLocalComment("");
  }

  return (
    <div className="post_comment_box">
      <div className="comment_input_cont">
        <input
          type="text"
          className="comment_input"
          placeholder="Say Something"
          value={localComment}
          onChange={(e) => {
            setLocalComment(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleSetLocalCommentInPostObj();
            }
          }}
        />
        <Button
          variant="secondary"
          id="comment_btn"
          onClick={handleSetLocalCommentInPostObj}
        >
          <span className="material-symbols-outlined">send</span>
        </Button>{" "}
      </div>
    </div>
  );
};
