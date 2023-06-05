import React, { useState, useRef } from "react";
import "../Signup/signup.css";
import { useFirebase } from "../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

export const Signup = () => {
  const navigate = useNavigate();
  const { signUpUser, createObjInDatabase, signUpWithGoogle } = useFirebase();
  const [userInput, setUserInput] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [localError, setLocalError] = useState("");
  const [successText, setSuccessText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // function for handle user input
  function handleUserInputChange(type, text) {
    if (type === "email") {
      setUserInput({ ...userInput, email: text });
    } else if (type === "password") {
      setUserInput({ ...userInput, password: text });
    } else {
      setUserInput({ ...userInput, userName: text });
    }
  }


  //Function to handle user Sign up
  async function handleUserSignUpClick() {
    if (!userInput.email || !userInput.password || !userInput.userName) {
      setLocalError("Fill All the Fields!");
      setSuccessText("");
      setTimeout(() => {
        setLocalError("");
      }, 2000);
      return;
    } else if (userInput.password.length < 6) {
      setLocalError("Password length should be at least 6 characters");
      setSuccessText("");
      setTimeout(() => {
        setLocalError("");
      }, 2000);
      return;
    }

    try {
      setIsLoading(true);
      const userSignUpResponse = await signUpUser(
        userInput.email,
        userInput.password
      );
      console.log({ userSignUpResponse });
      const userObj = userSignUpResponse.user;
      console.log(userSignUpResponse.user);
      await putDataObjInDB(
        userInput.userName,
        userInput.email,
        userInput.password,
        userObj.uid,
        userObj.metadata.createdAt
      );
      setSuccessText("Successfully Sign Up!");
      setIsLoading(false);
      setTimeout(() => {
        setSuccessText("");
        navigate("/");
      }, 1000);
    } catch (signUpError) {
      console.log({ signUpError });
      setLocalError("Email is Already in Use");
      setIsLoading(false);
      setSuccessText("");
      setTimeout(() => {
        setLocalError("");
      }, 3000);
    }
  }

  async function handleSignUpWithGoggle() {
    const response = await signUpWithGoogle();
    console.log({ response });

    setSuccessText("Successfully Sign Up!");
    setLocalError("");
    putDataObjInDB(
      response.user.displayName,
      response.user.email,
      "googleSignIn",
      response.user.uid,
      response.user.metadata.createdAt,
      response.user.photoURL
    );

    setTimeout(() => {
      setSuccessText("");
      navigate("/");
    }, 2000);
  }

  async function putDataObjInDB(
    userName,
    userEmail,
    userPassword,
    userId,
    userCreatedAt,
    userProfilePicUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  ) {
    createObjInDatabase("users", userId, {
      userName,
      userEmail,
      userPassword,
      userId,
      userCreatedAt,
      userProfilePicUrl,
      connections: [],
      followings: [],
    });
  }

  return (
    <>
      <div className="signUp_page">
        <div className="signUp_container">
          <div className="signUp_page_box ">
            <h2>Make the most of your professional life</h2>
            <div className="signUp_input_box card">
              <label htmlFor="userName">User Name : </label>
              <input
                type="text"
                id="userName"
                className="signUp_input"
                value={userInput.userName}
                onChange={(e) =>
                  handleUserInputChange("userName", e.target.value)
                }
              />
              <label htmlFor="email">Email : </label>
              <input
                type="email"
                id="email"
                className="signUp_input"
                value={userInput.email}
                onChange={(e) => handleUserInputChange("email", e.target.value)}
              />
              <label htmlFor="password">
                Password (at least 6 character required) :
              </label>
              <input
                type="password"
                id="password"
                className="signUp_input"
                value={userInput.password}
                onChange={(e) =>
                  handleUserInputChange("password", e.target.value)
                }
              />

              <p className="term_and_condition">
                By clicking Agree & Join, you agree to the LinkedIn{" "}
                <span> User Agreement </span>, <span> Privacy Policy </span>,
                and <span>Cookie Policy </span>.
              </p>

              <button
                type="button"
                className="btn btn-primary "
                id="signUp_submit_btn"
                onClick={handleUserSignUpClick}
                disabled={isLoading}
              >
                Agree & Join
                {isLoading && (
                  <div
                    className="spinner-border spinner-border-sm text-dark"
                    role="status"
                    style={{ margin: "0 0.5rem" }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </button>

              {successText && (
                <div className="alert alert-success" role="alert">
                  {successText}
                </div>
              )}
              {localError && (
                <div className="alert alert-warning" role="alert">
                  {localError}
                </div>
              )}

              <Divider className="signUp_break">or</Divider>

              <button
                type="button"
                className="btn btn-light"
                id="google_signUp_btn"
                onClick={handleSignUpWithGoggle}
              >
                <img
                  src="https://img.icons8.com/color/48/null/google-logo.png"
                  alt="google icon"
                  className="login_google_icon"
                />
                Continue with Google
              </button>
              <h4 className="already_user_btn">Already on LinkedIn? Sign in</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
