import React from "react";
import "../Post/post.css";
import { MediaCont } from "./MediaCont";
import FollowBtn from "./FollowBtn";
import { LikeBtn } from "./LikeBtn";

import { Comment } from "./Comment";
export const Post = ({ postObj }) => {
  return (
    <div className="post_cont">
      <div className="post_info">
        <div className="post_user_pic_box">
          <img
            src={postObj.userProfile}
            alt="Profile Pic"
            className="post_user_pic"
          />
        </div>
        <div className="post_user_name_box">
          <h4 className="post_user_name">{postObj.userName}</h4>
          <p className="post_user_description">
            {postObj.userAbout && postObj.userAbout}
          </p>
          <p className="post_date">
            Posted on : {new Date(postObj.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="followBtn_box">
          <FollowBtn userId={postObj.userId} />
        </div>
      </div>

      <div className="post_media_cont">
        <p className="post_text">{postObj.postText}</p>
        <MediaCont imgArr={postObj.postImg} vidArr={postObj.postVideo} />
      </div>
      <div className="post_action_btn_cont">
        <div className="post_action_btn_box">
          <LikeBtn postObj={postObj} />
          <Comment postObj={postObj} />
        </div>
        <div className="post_comment">
          {postObj.comments.map((commentObj, i) => {
            return (
              <div className="comment_box" key={i}>
                <h3 className="comment_user_name" style={{ margin: "0" }}>
                  {commentObj.name} :-
                  {/* chandan marghade :- */}
                </h3>
                <div className="comment">{commentObj.commentText}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
