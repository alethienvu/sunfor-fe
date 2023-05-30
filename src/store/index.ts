import { useDashboardStore } from 'modules/dashboard/store';
import { useAuthStore } from 'modules/auth/store';
import { defineStore } from 'pinia';
import type { IAlert } from '../types/alert';
export const useGlobalStore = defineStore('global', {
  state: () => ({
    loading: false,
    alert: <IAlert | null>null
  }),
  actions: {
    async actLoading(status: boolean) {
      this.loading = status;
    },
    actAlert(alert: IAlert) {
      this.alert = alert;
    },
    clearAlert() {
      this.alert = null;
    }
  }
});

const useStore: any = () => ({
  dashboard: useDashboardStore(),
  auth: useAuthStore(),
  global: useGlobalStore()
});

export default useStore;
