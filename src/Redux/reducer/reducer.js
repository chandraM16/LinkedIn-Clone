import { LOGIN_CHECK, UPDATE_CURR_USER, LOCAL_POST_ARR } from "../constants";

const initializeUserData = {
  currUser: {},
  postsArr: [],
  isLogin: localStorage.getItem("isLogin"),
};

export const currUserInfo = (currState = initializeUserData, action) => {
  switch (action.type) {
    case LOGIN_CHECK:
      return {
        ...currState,
        isLogin: action.isLogin,
      };
    case UPDATE_CURR_USER:
     
      return {
        ...currState,
        currUser: { ...action.userObj },
      };
    case LOCAL_POST_ARR:
      return {
        ...currState,
        postsArr: action.postObj,
      };
    default:
      return currState;
  }
};
