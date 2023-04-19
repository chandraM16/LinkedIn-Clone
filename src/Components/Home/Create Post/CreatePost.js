import React from "react";
import "../Create Post/createPost.css";
import { useSelector } from "react-redux";
import Blog from "./Blog";
export const CreatePost = () => {
  const userInfo = useSelector((store) => store.currUserInfo);
  
  return (
    <div className="createPost_cont">
      <div className="center_profilePic_box">
        <img
          src={userInfo.currUser.userProfilePicUrl}
          alt=""
          className="center_profile_pic"
        />
      </div>
      <div className="blog_box">
        <Blog />
      </div>
    </div>
  );
};
