import type { IForgotPassDto, ILoginDto, IRegisterDto } from 'src/types/user';
import api from './api';
import TokenService from './token.service';
import { removeLocal, saveLocal } from '../utils/localStorage';
import { arrayBufferToBase64 } from '../utils/index';
class AuthService {
  login(userDto: ILoginDto) {
    return api
      .post('/auth/login', userDto)
      .then((response) => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }
        return response.data;
      })
      .catch((_e) => {});
  }

  logout() {
    TokenService.removeUser();
  }

  register(userDto: IRegisterDto) {
    return api
      .post('/user/signup', userDto)
      .then((response) => {
        return response.data;
      })
      .catch((_e) => {
        console.log(_e);
      });
  }

  forgotPass(forgotPassDto: IForgotPassDto) {
    return api
      .put('/user/forgot-password', forgotPassDto)
      .then((response) => {
        return response.data;
      })
      .catch((_e) => {
        console.log(_e);
      });
  }

  async getUserInfo() {
    return await api
      .get('auth/current')
      .then((response) => {
        return response.data;
      })
      .catch((_e) => {
        console.log(_e);
      });
  }

  async getAvatar() {
    return await api
      .get('user/avatar', { responseType: 'arraybuffer' })
      .then((res) => {
        if (res.data) {
          saveLocal('avatar', arrayBufferToBase64(res.data));
          const avatarBlob = new Blob([res.data], { type: 'image/jpeg' });
          const userAvatarLink = URL.createObjectURL(avatarBlob);
          return userAvatarLink;
        }
      })
      .catch((_e) => {
        removeLocal('avatar');
      });
  }
}

export default new AuthService();
