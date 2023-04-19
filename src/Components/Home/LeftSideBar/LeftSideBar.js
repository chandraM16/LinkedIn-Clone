import React from "react";
import "../LeftSideBar/leftSideBar.css";
import { useSelector } from "react-redux";
export const LeftSideBar = ({ userData }) => {
  const userInfo = useSelector((store) => store.currUserInfo);
  return (
    <>
      <div className="left_profile_cont">
        <div className="profile_bg_box">
          <img
            src="	https://static.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq"
            alt=""
            className="profile_bg_img"
          />
        </div>
        <img
          src={userData.userProfilePicUrl}
          alt="Profile Pic"
          className="left_profile_pic"
        />
        <div className="profile_sec_box"></div>
        <h3 className="left_user_name">{userInfo.currUser.userName}</h3>
        <p className="left_user_info">
          {userData.about ? userData.about : <span>Yourself...</span>}
        </p>
        <p className="left_user_info">
          {userData.contactNo && userData.contactNo}
        </p>
      </div>
      <div className="left_connection_cont">
        <div className="connection_first_cont">
          <p className="temp1">
            <span style={{ color: "#989898" }}>Connections</span>{" "}
            <span style={{ color: "blue", fontWeight: "500" }}>
              {userData.connections?.length}
            </span>
          </p>
          <p>Connect with alumni</p>
        </div>
        <div className="connection_sec_cont">
          <p className="temp2">
            <span>Followings</span>{" "}
            <span style={{ color: "blue", fontWeight: "500" }}>
              {userData.followings?.length}
            </span>
          </p>
        </div>
      </div>
      <div className="myItems_cont">
        <span className="material-symbols-outlined">bookmarks</span>{" "}
        <p
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 0.5rem",
            margin: "0",
          }}
        >
          {" "}
          My Items
        </p>
      </div>
    </>
  );
};
