import axios from "axios";
const instance = axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: "http://109.200.155.118:5000/api/v1/",
  headers: {
    "Accept": 'application/json',
    "Content-Type": "application/json;charset=utf-8",
  },
});
export default instance;