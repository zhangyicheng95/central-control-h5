/**
 * 路由配置
 * 更多路由请查询 https://umijs.org/zh-CN/docs/routing
 */
export default [
  { path: '/', redirect: '/tab-bar/index' },
  {
    path: '/',
    layout: false,
    component: '@/pages/home/index',
  },
  { path: '/login', component: '@/pages/login/index', layout: false },
  { path: '/home', component: '@/pages/home/index', layout: false },
  { path: '/*', component: '@/pages/404', layout: false },
  { path: '/**/*', redirect: '/404', layout: false },
];
