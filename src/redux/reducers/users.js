import {
  FETCH_EMPLOYEES,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_FAIL,
  FETCH_ROLES,
  FETCH_ROLES_FAIL,
  FETCH_ROLES_SUCCESS,
  REMOVE_DATA
} from "../actions/types";

const initialState = {
  isLoaded: false,
  employees: [],
  roles: []
};

const users = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case FETCH_EMPLOYEES:
      return {
        ...state,
        isLoaded: true,
      };
    case FETCH_EMPLOYEES_FAIL:
      return {
        ...state,
        isLoaded: false,
      };
    case FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoaded: false,
        employees: payload
      };
    case FETCH_ROLES:
      return {
        ...state,
        isLoaded: true,
      };
    case FETCH_ROLES_FAIL:
      return {
        ...state,
        isLoaded: false,
      };
    case FETCH_ROLES_SUCCESS:
      return {
        ...state,
        isLoaded: false,
        roles: payload
      };
    case REMOVE_DATA:
      return {
        ...state,
        isLoaded: false,
        roles: [],
        employees: [],
      };
    default:
        return state;
  }
};

export default users;