import { defineStore } from 'pinia';
import tokenService from '../../../services/token.service';
import { computed } from 'vue';
import { useState } from './state';

export const useGetters = defineStore('auth.getters', () => {
  const state = useState();
  const getAuthenticationState = computed((): boolean => state.isAuthenticated);
  const getuser = computed((): any => {
    if (state.user) {
      return state.user;
    }
    const user = tokenService.getUser();
    return user;
  });
  return { getAuthenticationState, getuser };
});
