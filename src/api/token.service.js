const TokenService =  {
  getLocalRefreshToken: () => {
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    return userToken?.refreshToken;
  },
  getLocalAccessToken: () => {
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    return userToken?.token;
  },
  updateLocalAccessToken(token) {
    let userToken = JSON.parse(localStorage.getItem('userToken'));
    userToken.token = token;
    localStorage.setItem('userToken', JSON.stringify(userToken));
  },

  getUserToken() {
    return JSON.parse(localStorage.getItem('userToken'));
  },
  getUserTokenId() {
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    return userToken.id;
  },
  setUserToken(userToken) {
    localStorage.setItem('userToken', JSON.stringify(userToken));
  },
  removeUserToken() {
    localStorage.removeItem('userToken');
  }
}

export default TokenService;