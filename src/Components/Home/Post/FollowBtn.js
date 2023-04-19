import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
export default function FollowBtn({ postObj }) {
  const {
    currUser: { userId },
    currUser,
  } = useSelector((store) => store.currUserInfo);
  const [btnInfo, setBtnInfo] = useState({
    btnClass: "primary",
    btnText: "Follow",
    iconText: "add",
  });

  function handleFollowBtnClick() {
    if (btnInfo.btnClass === "primary") {
      setBtnInfo({
        btnClass: "secondary",
        btnText: "Following",
        iconText: "done",
      });
    } else {
      setBtnInfo({
        btnClass: "primary",
        btnText: "Follow",
        iconText: "add",
      });
    }
  }
  return (
    <button
      type="button"
      className={`btn btn-${btnInfo.btnClass} `}
      onClick={handleFollowBtnClick}
      id="followBtn"
    >
      <span className="material-symbols-outlined">{btnInfo.iconText}</span>
      {btnInfo.btnText}
    </button>
  );
}
