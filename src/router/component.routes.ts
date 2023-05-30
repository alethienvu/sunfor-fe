const ComponentLayout = () => import('components/ComponentLayout/index.vue');
const Tables = () => import('modules/table/views/index.vue');
import { ViewBoardsIcon, ColorSwatchIcon } from '@heroicons/vue/outline';

export default {
  path: '/components',
  component: ComponentLayout,
  name: 'Components',
  meta: {
    title: 'Components',
    icon: ColorSwatchIcon,
    color: 'text-info',
    requiresAuth: true,
    parentPath: 'Components'
  },
  children: [
    {
      path: 'tables',
      component: Tables,
      name: 'Tables',
      meta: {
        title: 'Tables',
        icon: ViewBoardsIcon,
        color: 'text-indigo-410',
        requiresAuth: true
      }
    }
  ]
};
