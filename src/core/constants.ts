import env from 'core/env';
export const PAGE_SIZE = env('VITE_PAGE_SIZE', 10);
export const LOGIN_DATA_KEY = 'app/token';
export const baseUrl = env('VITE_API_URL', '/');
