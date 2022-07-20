import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REFRESH_TOKEN
} from "../actions/types";
import TokenService from "../../api/token.service";

const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
};
const curentUserFormated = (token) => {
  let { nameid, role, unique_name } = parseJwt(token);
  return { nameid, role, unique_name };
}
const userToken = TokenService.getUserToken();
const currentUser = userToken && curentUserFormated(userToken.token);
const initialState = userToken
                      ? { isLoggedIn: true, userToken, currentUser }
                      : { isLoggedIn: false, userToken: null, currentUser: null };

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userToken: payload.userToken,
        currentUser: curentUserFormated(payload.userToken.token)
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userToken: null,
        currentUser: null
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userToken: null,
        currentUser: null
      };
    case REFRESH_TOKEN:
      return {
        ...state,
        userToken: { ...userToken, token: payload },
        currentUser: parseJwt(payload)
      };
    default:
      return state;
  }
};

export default auth;