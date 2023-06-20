import { defineStore, type StoreGetters } from 'pinia';
import { type DashboardState } from './types';

export const getters: StoreGetters<DashboardState> = {
  welcomeTextText: (state: DashboardState) => (state.welcomeText ? 'Welcome' : 'Goodbye')
};
import { computed } from 'vue';
import { useState } from './state';
import { base64ToArrayBuffer } from 'utils/index';
import { readLocal } from 'utils/localStorage';

export const useGetters = defineStore('dashboard.getters', () => {
  const state = useState();
  const getText = computed((): string => `foo-${state.welcomeText.toString()}`);
  const getUserAvatar = computed((): string => {
    if (state.userAvatar) {
      return state.userAvatar.toString();
    }
    const avatarsrc = readLocal('avatar');
    let userAvatarLink;
    if (avatarsrc.length) {
      const convertAvatarSrc = base64ToArrayBuffer(avatarsrc);
      const avatarBlob = new Blob([convertAvatarSrc], { type: 'image/jpeg' });
      userAvatarLink = URL.createObjectURL(avatarBlob);
    }
    return avatarsrc.length
      ? userAvatarLink
      : new URL('@/assets/images/ltv_logo.png', import.meta.url).href;
  });
  return {
    getText,
    getUserAvatar
  };
});
