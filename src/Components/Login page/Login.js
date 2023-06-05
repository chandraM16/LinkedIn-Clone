import React, { useEffect, useState } from "react";
import "../Login page/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../Firebase/firebase";
import { useDispatch } from "react-redux";
import {
  updateCurrUserObj,
  updateLoginCheck,
} from "../../Redux/actions/action";
import { Divider } from "@mui/material";
export const Login = () => {
  const { logInUserWithEmailAndPassword, signUpWithGoogle, getDocument } =
    useFirebase();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localError, setLocalError] = useState("");
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  function handleUserInputChange(type, text) {
    if (type === "email") {
      setUserInput({ ...userInput, email: text });
    } else if (type === "password") {
      setUserInput({ ...userInput, password: text });
    }
  }

  function handleAndSetUserData(userData) {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isLogin", true);
    dispatch(updateCurrUserObj(userData));
    dispatch(updateLoginCheck(true));
    navigate("/home");
  }

  async function handleDemo() {
    try {
      setIsLoading1(true);
      const loginResponse = await logInUserWithEmailAndPassword(
        "user1@gmail.com",
        "123456789"
      );
      const userId = loginResponse.user.uid;
      const userData = await getDataFromDataBase("users", userId);
      handleAndSetUserData(userData);
    } catch (userLoginError) {
      console.log({ userLoginError });
      manageLocalError("Incorrect Email or Password");
    } finally {
      setIsLoading1(false);
    }
  }

  async function handleUserLoginBtnClick() {
    if (!userInput.email || !userInput.password) {
      manageLocalError("Fill Both the Fields");
      return;
    } else if (userInput.password.length < 6) {
      manageLocalError("Password is too small");
      return;
    } else {
      try {
        setIsLoading1(true);
        const loginResponse = await logInUserWithEmailAndPassword(
          userInput.email,
          userInput.password
        );
        const userId = loginResponse.user.uid;
        const userData = await getDataFromDataBase("users", userId);
        handleAndSetUserData(userData);
      } catch (userLoginError) {
        console.log({ userLoginError });
        manageLocalError("Incorrect Email or Password");
      } finally {
        setIsLoading1(false);
      }
    }
  }

  // login with google
  async function handleGoogleLogin() {
    try {
      setIsLoading2(true);
      const response = await signUpWithGoogle();
      //get the data of user from fireStore
      const userData = await getDataFromDataBase("users", response.user.uid);
      handleAndSetUserData(userData);
    } catch (googleLoginError) {
      console.log({ googleLoginError });
      manageLocalError("User Not Found! Resister Please");
    } finally {
      setIsLoading2(false);
    }

    // redirected to feed section
  }

  // manageLocal and then remove it after 2 second
  function manageLocalError(text) {
    setLocalError(text);
    setTimeout(() => {
      setLocalError("");
    }, 2000);
  }

  // get a fireStoreData of user with given 'id' in 'users' collection of
  async function getDataFromDataBase(path, id) {
    const userDataObjFromDb = await getDocument(path, id);
    return userDataObjFromDb;
  }

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      dispatch(updateCurrUserObj(userData));
      navigate("/home");
    }
  }, []);

  return (
    <>
      <div className="login_page">
        <div className="login_container">
          <div className="login_box">
            <h1>Welcome to your professional community</h1>

            <div className="login_input_box">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="login_input"
                value={userInput.email}
                onChange={(e) => {
                  handleUserInputChange("email", e.target.value);
                }}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="login_input"
                value={userInput.password}
                onChange={(e) => {
                  handleUserInputChange("password", e.target.value);
                }}
              />

              <p className="forgot_password">Forgot Password ?</p>

              <button
                type="button"
                className="btn btn-primary"
                id="login_submit_btn"
                onClick={handleUserLoginBtnClick}
                disabled={isLoading1 || isLoading2}
              >
                Log In
                {isLoading1 && (
                  <div
                    className="spinner-border spinner-border-sm text-dark"
                    role="status"
                    style={{ margin: "0 0.5rem" }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                id="login_submit_btn"
                onClick={handleDemo}
                disabled={isLoading1 || isLoading2}
              >
                Try Demo
                {isLoading1 && (
                  <div
                    className="spinner-border spinner-border-sm text-dark"
                    role="status"
                    style={{ margin: "0 0.5rem" }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </button>
              {localError && (
                <div className="alert alert-danger" role="alert">
                  {localError}
                </div>
              )}
              <Divider className="login_break">or</Divider>

              <button
                type="button"
                className="btn btn-light "
                id="google_login_btn"
                onClick={handleGoogleLogin}
                disabled={isLoading1 || isLoading2}
              >
                <img
                  src="https://img.icons8.com/color/48/null/google-logo.png"
                  alt="google icon"
                  className="login_google_icon"
                />
                Continue with Google
                {isLoading2 && (
                  <div
                    className="spinner-border spinner-border-sm text-dark"
                    role="status"
                    style={{ margin: "0 0.5rem" }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </button>

              <Link to={"/signUp"} style={{ textDecoration: "none" }}>
                <button type="button" className="btn btn-light login_join_btn">
                  New to LinkedIn? Join now
                </button>
              </Link>
            </div>
          </div>

          <div className="login_bg_img_cont">
            <img
              src="https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4"
              alt="Background_img"
              className="login_bg_img"
            />
          </div>
        </div>
      </div>
    </>
  );
};
