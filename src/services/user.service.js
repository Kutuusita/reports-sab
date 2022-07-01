import api from './api';
import axios from "axios";
const API_URL = "http://109.200.155.118:5000/api/v1/";

const getPublicContent = () => {
  return api.get('/test/all');
}
const getUserBoard = () => {
  return api.get('/test/user');
}
const getModeratorBoard = () => {
  return api.get('/test/mod');
}
const getAdminBoard = () => {
  return api.get('/test/admin');
}
const getEmployee = () => {
  return axios.post(API_URL + 'Employee/GetEmployees', { headers:{ "Accept": 'application/json',
                                                                    "Content-Type": "application/json;charset=utf-8",} })
}

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getEmployee
}
export default UserService;