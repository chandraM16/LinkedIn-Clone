import React from "react";
export const NavbarIcon = ({ text, iconObj, handleLogoutClick }) => {
  return (
    <div className="icon" onClick={handleLogoutClick}>
      <span className="material-symbols-outlined icon_img">
        {iconObj[text]}
      </span>
      <span className="icon_text">{text}</span>
    </div>
  );
};
