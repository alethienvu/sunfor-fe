import { AlertType } from '../types/alert';
import axiosInstance from './api';
import TokenService from './token.service';
import useStore, { useGlobalStore } from 'store';
const setup = () => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        config.headers['access-token'] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      console.error(err.response);
      const globalStore = useGlobalStore();
      globalStore.actLoading(false);
      // globalStore.actAlert({ type: AlertType.error, message: err.response?.data?.message || err.message });
      const originalConfig = err.config;
      if (originalConfig.url !== '/auth/login' && err.response) {
        // Access Token was expired
        if (err.response.status === 401) {
          try {
            const rs = await axiosInstance.post('/auth/refresh-access-token', {
              refreshToken: TokenService.getLocalRefreshToken()
            });
            const { accessToken, refreshToken } = rs.data;
            const store = useStore();
            TokenService.updateLocalToken(accessToken, refreshToken);
            store.auth.actRefreshToken(accessToken);
            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;
