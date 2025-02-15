/**
 * 路由配置
 * 更多路由请查询 https://umijs.org/zh-CN/docs/routing
 */
export default [
  { path: '/', redirect: '/tab-bar/index' },
  {
    path: '/',
    layout: '@/layouts/index',
    routes: [
      {
        path: '/tab-bar/index',
        title: '主页中心',
        icon: 'home',
        component: '@/pages/home/index',
      },
      {
        path: '/tab-bar/device',
        title: '设备管理',
        icon: 'device',
        component: '@/pages/device/index',
      },
      {
        path: '/tab-bar/lighting',
        title: '灯光管理',
        icon: 'lighting',
        component: '@/pages/lighting/index',
      },
      {
        path: '/tab-bar/medium',
        title: '媒体管理',
        icon: 'medium',
        component: '@/pages/medium/index',
      },
      {
        path: '/tab-bar/region',
        title: '区域管理',
        icon: 'region',
        component: '@/pages/region/index',
      },
      // {
      //   path: '/tab-bar/personalCenter',
      //   title: '个人中心',
      //   icon: 'UserOutline',
      //   wrappers: [
      //     // 配置路由的高阶组件封装
      //     '@/wrappers/index', //用于路由级别的权限校验
      //   ],
      //   component: '@/pages/account/index',
      // },
    ],
  },
  {
    path: '/tab-bar/index/setting',
    title: '设置中心',
    component: '@/pages/home/components/setting/index',
    layout: false
  },
  {
    path: '/tab-bar/index/scene',
    title: '情景模式',
    component: '@/pages/home/components/scene/index',
    layout: false
  },
  {
    path: '/tab-bar/medium/:id',
    title: '媒体详情',
    component: '@/pages/medium/components/detail/index',
  },
  { path: '/login', component: '@/pages/login/index', layout: false },
  { path: '/home', component: '@/pages/home/index', layout: false },
  { path: '/*', component: '@/pages/404', layout: false },
  { path: '/**/*', redirect: '/404', layout: false },
];
