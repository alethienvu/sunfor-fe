import { LOGIN_DATA_KEY } from 'core/constants';
import { readLocal, saveLocal, removeLocal } from 'utils/localStorage';

class TokenService {
  getLocalRefreshToken() {
    const user = readLocal(LOGIN_DATA_KEY);
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = readLocal(LOGIN_DATA_KEY);
    return user?.accessToken;
  }

  updateLocalToken(accessToken: string, refreshToken: string) {
    const user = readLocal(LOGIN_DATA_KEY);
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    saveLocal(LOGIN_DATA_KEY, user);
  }

  getUser() {
    return readLocal(LOGIN_DATA_KEY);
  }

  setUser(user: any) {
    saveLocal(LOGIN_DATA_KEY, user);
  }

  removeUser() {
    removeLocal(LOGIN_DATA_KEY);
  }
}

export default new TokenService();
