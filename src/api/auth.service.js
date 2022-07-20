import api from './api';
import TokenService from "./token.service";

const register = (login, email, password) => {
  return api.post('Authorization/signup', {
    login,
    email,
    password
  });
};

const login = (login, password) => {
  return api.post('Authorization/SignIn', {
    login,
    password
  })
    .then(response => {
      if (response.data.token) {
        TokenService.setUserToken(response.data);
      }

      return response.data;
    });
};

const logout = () => {
  TokenService.removeUserToken();
  // return api.post('/Authorization/SignOut');
};

const getCurrentUserId = () => {
  return TokenService.getUserTokenId();
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUserId,
};
export default AuthService;