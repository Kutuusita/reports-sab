import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  REFRESH_TOKEN,

} from "./types";
import AuthService from "../../api/auth.service";
import { removeData } from "./users";

export const register = (login, email, password) => (dispatch) => {
  return AuthService.register(login, email, password).then(
    (response) => {

      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message
      });

      return Promise.reject();
    }
  );
};
export const login = (login, password) => (dispatch) => {
  return AuthService.login(login, password).then(
    (data) => {

      if (data.errorCode) {
        dispatch({
          type: LOGIN_FAIL,
        });

        let errorMessage = '';
        switch(data.errorCode) {
          case 1000:
            errorMessage = 'AuthorizationAllow'
            break;
          case 1001:
            errorMessage = 'AuthorizationExpire'
            break;
          case 1002:
            errorMessage = 'AuthorizationFail'
            break;
          case 1003:
            errorMessage = 'AuthorizationInvaild'
            break;
          case 1004:
            errorMessage = 'LoginFail'
            break;
          case 1005:
            errorMessage = 'PasswordFail'
            break;
          case 1006:
            errorMessage = 'EmployeeDeleted'
            break;
          case 1007:
            errorMessage = 'EmployeeNotActive'
            break;
          default:
            errorMessage = `Ошибка авторизации: ${data.errorCode}`
        }

        dispatch({
          type: SET_MESSAGE,
          payload: errorMessage
        });
        return Promise.reject();
      }

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { userToken: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message
      });

      return Promise.reject();
    }
  );
};
export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch(removeData());
  dispatch({
    type: LOGOUT,
  });
};

export const refreshToken = (token) => (dispatch) => {
  dispatch({
    type: REFRESH_TOKEN,
    payload: token,
  })
}