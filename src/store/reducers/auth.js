import authTypes from "../actions/types/auth";

const INITIAL_STATE = {
  isLoggedIn: null,
  userId: null,
  email: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authTypes.SIGNUP:
      return {
        ...state,
        isLoggedIn: true,
        userId: action.payload.localId,
        email: action.payload.email,
      };
    case authTypes.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        userId: action.payload.localId,
        email: action.payload.email,
      };
    case authTypes.LOGOUT:
      return {
        ...state,
        email: null,
        userId: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
