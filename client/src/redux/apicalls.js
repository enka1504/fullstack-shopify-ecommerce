import { publicRequest } from "../requestMethods";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerStart,
  registerFailure,
  registerSuccess,
} from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const response = await publicRequest.post("/auth/login", user);
    console.log(response.data);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const response = await publicRequest.post("/auth/register", user);
    console.log(response.data);
    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(registerFailure());
  }
};
