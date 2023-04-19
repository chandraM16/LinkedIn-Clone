import { LOCAL_POST_ARR, LOGIN_CHECK, UPDATE_CURR_USER } from "../constants";

export function updateCurrUserObj(userObj) {
  localStorage.setItem("user", JSON.stringify(userObj));
  return {
    type: UPDATE_CURR_USER,
    userObj,
  };
}
export function updateLoginCheck(isLogin) {
  return {
    type: LOGIN_CHECK,
    isLogin,
  };
}
export function updatePostArr(postObj) {
  return {
    type: LOCAL_POST_ARR,
    postObj,
  };
}
