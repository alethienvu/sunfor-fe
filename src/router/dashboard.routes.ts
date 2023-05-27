import Dashboard from 'modules/dashboard/views/index.vue';
import { HomeIcon } from '@heroicons/vue/outline';
export default {
  path: '/',
  component: Dashboard,
  name: 'Dashboard',
  alias: '/home',
  meta: {
    title: 'Dashboard',
    icon: HomeIcon,
    color: 'text-indigo-410',
    requiresAuth: true,
    parentPath: 'Home'
  }
};
