import authTypes from "./types/auth";

export const signup = (res) => async (dispatch) => {
  dispatch({
    type: authTypes.SIGNUP,
    payload: res.data,
  });
};

export const login = (res) => async (dispatch) => {
  dispatch({
    type: authTypes.LOGIN,
    payload: res.data,
  });
};

export const logout = () => {
  return {
    type: authTypes.LOGOUT,
  };
};
