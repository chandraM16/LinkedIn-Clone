import React, { useEffect, useState } from "react";
import { NavbarIcon } from "./NavbarIcon";
import "../Navbar/navbar.css";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { homePageNavIcon, loginPageNavIcon } from "./navbarIcons";
import { useSelector, useDispatch } from "react-redux";
import { useFirebase } from "../Firebase/firebase";
import MyModal from "../Modal/Modal";
import {
  updateCurrUserObj,
  updateLoginCheck,
} from "../../Redux/actions/action";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((store) => store.currUserInfo);

  const { singOutFun } = useFirebase();

  const [iconObj, setIconObj] = useState([]);

  function handleLogoutClick() {
    singOutFun();
    localStorage.setItem("user", "");
    localStorage.setItem("isLogin", "");
    dispatch(updateCurrUserObj(null));
    dispatch(updateLoginCheck(false));

    navigate("/");
  }

  useEffect(() => {
    // console.log(userInfo.isLogin);
    if (userInfo.isLogin) {
      setIconObj({ ...homePageNavIcon });
    } else {
      setIconObj({ ...loginPageNavIcon });
    }
  }, [userInfo.isLogin]);
  return (
    <nav className="navbar1">
      <div className="nav_container">
        <div className="nav_left_box">
          <div className="nav_logo_box">
            {!userInfo.isLogin && (
              <Link to={"/"}>
                <img
                  src="https://www.freepnglogos.com/uploads/linkedin-logo-transparent-png-25.png"
                  alt="logo"
                  className="nav_logo"
                />
              </Link>
            )}
            {userInfo.isLogin && (
              <Link to={"/home"}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                  alt="logo"
                  style={{ width: "3rem" }}
                />
              </Link>
            )}
          </div>
          {userInfo.isLogin && (
            <div className="nav_search_box">
              <input
                type="text"
                className="nav_search_input"
                placeholder="Search.."
              />
            </div>
          )}
        </div>
        <div className="nav_right_box">
          <div className="icons_box">
            {Object.keys(iconObj).map((iconText, i) => {
              return <NavbarIcon text={iconText} key={i} iconObj={iconObj} />;
            })}
            {userInfo.isLogin && (
              <div className="avatar">
                <MyModal />
              </div>
            )}
          </div>
          {!userInfo.isLogin && (
            <div className="join_box">
              <Link to={"/signUp"} style={{ textDecoration: "none" }}>
                <button type="button" className="btn btn-light" id="join_btn1">
                  Join
                </button>
              </Link>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <button
                  type="button"
                  className="btn btn-outline-primary "
                  id="join_btn2"
                >
                  Sign In
                </button>
              </Link>
            </div>
          )}

          {userInfo.isLogin && (
            <NavbarIcon
              text={"Logout"}
              iconObj={{ Logout: "logout" }}
              handleLogoutClick={handleLogoutClick}
            />
          )}
        </div>
      </div>
    </nav>
  );
};
