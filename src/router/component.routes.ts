const ComponentLayout = () => import('components/ComponentLayout/index.vue');
const Table = () => import('modules/table/views/index.vue');
const Grid = () => import('modules/grid/views/index.vue');
const Notification = () => import('modules/notification/views/index.vue');
const Button = () => import('modules/buttons/views/index.vue');
const Typography = () => import('modules/typography/views/index.vue');
const Card = () => import('modules/cards/views/index.vue');
const Icons = () => import('modules/icons/views/index.vue');
import {
  ViewGridIcon,
  CursorClickIcon,
  DocumentTextIcon,
  StarIcon,
  ViewBoardsIcon,
  BellIcon,
  ColorSwatchIcon
} from '@heroicons/vue/outline';
import { CreditCardIcon } from '@heroicons/vue/solid';

export default {
  path: '/components/:componentItem?',
  component: ComponentLayout,
  name: 'Components',
  sensitive: true,
  meta: {
    title: 'Components',
    icon: ColorSwatchIcon,
    color: 'text-info',
    requiresAuth: true,
    parentPath: 'Components'
  },
  children: [
    {
      path: 'buttons',
      name: 'Buttons',
      component: Button,
      meta: {
        title: 'Buttons',
        icon: CursorClickIcon,
        color: 'text-danger-50',
        requiresAuth: true
      }
    },
    {
      path: 'notifications',
      component: Notification,
      name: 'Notifications',
      meta: {
        title: 'Notifications',
        icon: BellIcon,
        color: 'text-success-50',
        requiresAuth: true
      }
    },
    {
      path: 'tables',
      component: Table,
      name: 'Tables',
      meta: {
        title: 'Tables',
        icon: ViewBoardsIcon,
        color: 'text-indigo-410',
        requiresAuth: true
      }
    },
    {
      path: 'grid',
      component: Grid,
      name: 'Grid',
      meta: {
        title: 'Grid',
        icon: ViewGridIcon,
        color: 'text-info',
        requiresAuth: true
      }
    },
    {
      path: 'typography',
      component: Typography,
      name: 'Typography',
      meta: {
        title: 'Typography',
        icon: DocumentTextIcon,
        color: 'text-yellow-310',
        requiresAuth: true
      }
    },
    {
      path: 'cards',
      component: Card,
      name: 'Cards',
      meta: {
        title: 'Cards',
        icon: CreditCardIcon,
        color: 'text-warning-50',
        requiresAuth: true
      }
    },
    {
      path: 'icons',
      component: Icons,
      name: 'Icons',
      meta: {
        title: 'Icons',
        icon: StarIcon,
        color: 'text-red-410',
        requiresAuth: true
      }
    }
  ]
};
