import { createSlice } from "@reduxjs/toolkit";

import * as API from "../../../api/authApi";
import { initialState } from "../../../utils/authUtils";

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.user = null;
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    authError: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    authLogout: (state) => {
      state.loading = false;
      state.user = null;
      state.error = { state: false, message: "" };
    },
  },
});

export const loginAction = (authData) => async (dispatch) => {
  dispatch(authStart());
  try {
    const { data } = await API.loginHandler(authData);
    dispatch(authSuccess(data.data));
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      console.log(error);
      dispatch(authError({ state: true, message: error.message }));
    } else {
      dispatch(
        authError({ state: true, message: error.response.data.message })
      );
    }
  }
};

export const signupAction = (authData) => async (dispatch) => {
  dispatch(authStart());
  try {
    const { data } = await API.signupHandler(authData);
    dispatch(authSuccess(data.data));
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      console.log(error);
      dispatch(authError({ state: true, message: error.message }));
    } else {
      dispatch(
        authError({ state: true, message: error.response.data.message })
      );
    }
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    await API.logoutHandler();
    dispatch(authLogout());
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      console.log(error);
      dispatch(authError({ state: true, message: error.message }));
    } else {
      dispatch(
        authError({ state: true, message: error.response.data.message })
      );
    }
  }
};

export const { authError, authStart, authSuccess, authLogout } =
  userSlice.actions;

export default userSlice.reducer;
