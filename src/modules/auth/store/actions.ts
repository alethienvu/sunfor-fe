import { defineStore } from 'pinia';
import { ILoginDto, IRegisterDto } from 'src/types/user';
import AuthService from '../../../services/auth.service';
import tokenService from '../../../services/token.service';
import { useState } from './state';
import router from 'router/index';

export const useActions = defineStore('auth.actions', () => {
  const state = useState();

  const actLogin = async (userDto: ILoginDto) => {
    const loginUser = await AuthService.login(userDto);
    if (!loginUser) {
      return;
    }
    state.user = loginUser;
    state.isAuthenticated = true;
    tokenService.setUser(state.user);
    return loginUser;
  };

  const actLogout = () => {
    state.user = null;
    state.isAuthenticated = false;
    AuthService.logout();
    router.push('/login');
  };

  const actRegister = async (userDto: IRegisterDto) => {
    const registered = await AuthService.register(userDto);
    return registered;
  };

  const actRefreshToken = (accessToken: string) => {
    state.isAuthenticated = true;
    state.user = { ...state.user, accessToken: accessToken };
  };

  return {
    actLogin,
    actLogout,
    actRegister,
    actRefreshToken
  };
});
