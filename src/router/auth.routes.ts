const Profile = () => import('modules/profile/views/index.vue');
const Login = () => import('modules/auth/views/login.vue');
const Register = () => import('modules/auth/views/register.vue');
const ForgotPassword = () => import('modules/auth/views/forgot-password.vue');
import { UserIcon } from '@heroicons/vue/outline';
export default [
  {
    path: '/profile',
    component: Profile,
    name: 'Profile',
    meta: {
      title: 'Profile',
      icon: UserIcon,
      color: 'text-success-50',
      isDarkBackground: true,
      isFullWidthLayout: true,
      requiresAuth: true,
      parentPath: 'Home'
    }
  },
  {
    path: '/register',
    component: Register,
    name: 'register',
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
    name: 'forgot-password',
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: {
      requiresAuth: false
    }
  }
];
