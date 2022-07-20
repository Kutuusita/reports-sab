import axiosInstance from "./api";
import TokenService from "./token.service";
import { refreshToken, logout } from "../redux/actions/auth";

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();

      if (token) {
        // config.headers["x-access-token"] = token; // for Node.js Express back-end
        config.headers["Authorization"] = 'Bearer ' + token; // for API
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      const localAccessToken = TokenService.getLocalAccessToken();
      if (originalConfig.url !== "Authorization/SignIn" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const rs = await axiosInstance.post(
              "Authorization/RefreshToken",
              { refreshToken: TokenService.getLocalRefreshToken() },
              { headers: {"Authorization": 'Bearer ' + localAccessToken} }
            );

            if(rs.data.errorCode) {
              dispatch(logout());
              return Promise.reject(rs.data.errorCode);
            }

            const { token } = rs.data;
            dispatch(refreshToken(token));
            TokenService.updateLocalAccessToken(token);
            return axiosInstance(originalConfig);
          } catch (_error) {
            dispatch(logout());
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );
};

export default setup;

