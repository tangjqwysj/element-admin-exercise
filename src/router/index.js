import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layout'

const req = require.context('./modules', false, /\.js$/)
let arg = req.keys().reduce((ret, v) => {
  ret.push(req(v).default)
  return ret
}, [])
console.log(arg)

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName:'login' */ '@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName:'dashboard' */ '@/views/dashboard/index.vue'),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    name: 'Permission',
    redirect: '/permission/page',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page.vue'),
        name: 'PagePermission',
        meta: { title: 'Page Permission', roles: ['admin'] }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive.vue'),
        name: 'DirectivePermission',
        meta: { title: 'Directive Permission' }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role.vue'),
        name: 'RolePermission',
        meta: { title: 'Role Permission', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/icons',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName:'icons' */ '@/views/icons/index.vue'),
        meta: { title: 'Icons', icon: 'icon' },
        name: 'Icons'
      }
    ]
  }
].concat(arg)

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
export default router
