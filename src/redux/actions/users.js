import UserService from "../../api/user.service";
import {
  FETCH_EMPLOYEES,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_FAIL,
  FETCH_ROLES,
  FETCH_ROLES_FAIL,
  FETCH_ROLES_SUCCESS,
  REMOVE_DATA,
  SET_MESSAGE
} from "./types";

export const setEmployees = () => (dispatch) => {
  dispatch({
    type: FETCH_EMPLOYEES,
  });
  return UserService.getEmployee()
          .then(res => {
            const {status, errorCode, employee} = res.data;

            if (errorCode) return Promise.reject();

            if (status === 2 && !errorCode) {

              dispatch({
                type: FETCH_EMPLOYEES_SUCCESS,
                payload: employee
              })
            }

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
              type: FETCH_EMPLOYEES_FAIL,
            });

            dispatch({
              type: SET_MESSAGE,
              payload: message
            });

            return Promise.reject();
          });
}
export const setRoles = () => (dispatch) => {
  dispatch({
    type: FETCH_ROLES,
  });
  return UserService.getRoles()
          .then(res => {
            const {status, errorCode, role} = res.data;

            if (errorCode) return Promise.reject();

            if (status === 2 && !errorCode) {

              dispatch({
                type: FETCH_ROLES_SUCCESS,
                payload: role
              })
            }

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
              type: FETCH_ROLES_FAIL,
            });

            dispatch({
              type: SET_MESSAGE,
              payload: message
            });

            return Promise.reject();
          });
}
export const removeData = () => (dispatch) => {
  dispatch({
    type: REMOVE_DATA
  })
}