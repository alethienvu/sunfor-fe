/* eslint-disable vue/no-reserved-component-names */
import 'assets/css/index.scss';
import '../assets/css/element-plus';
import { App } from 'vue';
import Main from './Main/index.vue';
import Sidebar from './Sidebar/index.vue';
import AuthNavigation from './Navigation/AuthenticationNav.vue';
import Footer from './Footer/index.vue';
import BreadCrumb from './BreadCrumb/index.vue';
import SearchBar from './SearchBar/index.vue';
import Pagination from './Pagination/index.vue';
import Loading from './Loading/index.vue';

export default {
  install: (app: App) => {
    // Register it globally
    app.component('Main', Main);
    app.component('Sidebar', Sidebar);
    app.component('AuthNavigation', AuthNavigation);
    app.component('Footer', Footer);
    app.component('BreadCrumb', BreadCrumb);
    app.component('SearchBar', SearchBar);
    app.component('Pagination', Pagination);
    app.component('Loading', Loading);
  }
};
