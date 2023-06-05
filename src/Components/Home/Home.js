import React, { useEffect } from "react";
import "../Home/home.css";
import { CreatePost } from "./Create Post/CreatePost";
import { RightSideBar } from "./RightSideBar";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrUserObj } from "../../Redux/actions/action";
import { Divider } from "@mui/material";
import { LeftSideBar } from "./LeftSideBar/LeftSideBar";
import { Post } from "./Post/Post";
import { useFirebase } from "../Firebase/firebase";
import { updatePostArr } from "../../Redux/actions/action";
export const Home = () => {
  const dispatch = useDispatch();
  const { getAllPostData } = useFirebase();
  const userInfo = useSelector((store) => store.currUserInfo);
  useEffect(() => {
    dispatch(updateCurrUserObj(JSON.parse(localStorage.getItem("user"))));
  }, []);
  useEffect(() => {
    (async function () {
      // whenever user login, we fetch the data form 'post' collection of fireStore and store in current state 'allPosts' and at the end sort those allPosts array on basis of created property of each object, so that latest post come first.
      const arrOfPostObj = await getAllPostData("posts");
      dispatch(
        updatePostArr(arrOfPostObj.sort((a, b) => b.createdAt - a.createdAt))
      );
    })();
  }, []);
  return (
    <>
      <div className="home_cont">
        <div className="home_container">
          <div style={{paddingRight : "1rem"}} >
            <LeftSideBar userData={userInfo.currUser} />
          </div>
          <div className="center_cont">
            <CreatePost />
            <Divider className="break_center"></Divider>
            <div className="feed_cont">
              {userInfo.postsArr.length !== 0 ? (
                userInfo.postsArr.map((postObj) => (
                  <Post postObj={postObj} key={postObj.postId} />
                ))
              ) : (
                <>
                  <div className = "default_msg">
                    <h4>There are no posts. </h4>
                    <h5>Create new one</h5>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="rightSide_cont">
            <RightSideBar />
          </div>
        </div>
      </div>
    </>
  );
};
