import { defineStore } from 'pinia';
import { type AuthState } from './types';
import tokenService from '../../../services/token.service';

export const useState = defineStore({
  id: 'auth.state',
  state: (): AuthState => {
    return {
      user: tokenService.getUser(),
      isAuthenticated: Object.keys(tokenService.getUser()).length !== 0 ? true : false
    };
  }
});
