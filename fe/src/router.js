import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import store from './store'

Vue.use(Router)

Vue.prototype.$axios = axios
const apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api/' : '/api/'
Vue.prototype.$apiRootPath = apiRootPath
axios.defaults.baseURL = apiRootPath
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  const token = response.data.token
  if (token) localStorage.setItem('token', token)
  return response
}, function (error) {
  // console.log(error.response)
  switch (error.response.status) {
    case 400:
      store.commit('pop', { msg: `잘못된 요청입니다(${error.response.status}:${error.message})`, color: 'error' })
      break
    case 401:
      store.commit('delToken')
      store.commit('pop', { msg: `인증 오류입니다(${error.response.data.msg}:${error.message})`, color: 'error' })
      break
    case 403:
      store.commit('pop', { msg: `이용 권한이 없습니다(${error.response.data.msg}:${error.message})`, color: 'warning' })
      break
    default:
      store.commit('pop', { msg: `알수 없는 오류입니다(${error.response.data.msg}:${error.message})`, color: 'error' })
      break
  }
  return Promise.reject(error)
})

const pageCheck = (to, from, next) => {
  axios.post('page', { name: to.path })
    .then((r) => {
      if (!r.data.success) throw new Error(r.data.msg)
      next()
    })
    .catch((e) => {
      if (!e.response) store.commit('pop', { msg: e.message, color: 'warning' })
      next(false)
    })
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('./views/dashboard'),
      beforeEnter: pageCheck
    },
    {
      path: '/board/:name',
      name: 'board',
      component: () => import('./views/board'),
      beforeEnter: pageCheck
    },
    {
      path: '/test/lv3',
      name: 'testLv3',
      component: () => import('./views/test/lv3'),
      beforeEnter: pageCheck
    },
    {
      path: '/test/lv2',
      name: 'testLv2',
      component: () => import('./views/test/lv2'),
      beforeEnter: pageCheck
    },
    {
      path: '/test/lv1',
      name: 'testLv1',
      component: () => import('./views/test/lv1'),
      beforeEnter: pageCheck
    },
    {
      path: '/test/lv0',
      name: 'testLv0',
      component: () => import('./views/test/lv0'),
      beforeEnter: pageCheck
    },
    {
      path: '/manage/users',
      name: 'manageUsers',
      component: () => import('./views/manage/user'),
      beforeEnter: pageCheck
    },
    {
      path: '/manage/pages',
      name: 'managePages',
      component: () => import('./views/manage/pages'),
      beforeEnter: pageCheck
    },
    {
      path: '/manage/sites',
      name: 'manageSites',
      component: () => import('./views/manage/sites'),
      beforeEnter: pageCheck
    },
    {
      path: '/manage/boards',
      name: 'manageBoards',
      component: () => import('./views/manage/boards'),
      beforeEnter: pageCheck
    },
    {
      path: '/refer_site/refer1',
      name: 'refer_site1',
      component: () => import('./views/refer_site/refer1'),
      beforeEnter: pageCheck
    },
    {
      path: '/refer_site/refer2',
      name: 'refer_site2',
      component: () => import('./views/refer_site/refer2'),
      beforeEnter: pageCheck
    },
    {
      path: '/professional_book',
      name: 'professional_book',
      component: () => import('./views/professional_book/professional_book'),
      beforeEnter: pageCheck
    },
    {
      path: '/educational_facilities/edu_facilities1',
      name: 'edu_facilities1',
      component: () => import('./views/educational_facilities/edu_facilities1'),
      beforeEnter: pageCheck
    },
    {
      path: '/educational_facilities/edu_facilities2',
      name: 'edu_facilities2',
      component: () => import('./views/educational_facilities/edu_facilities2'),
      beforeEnter: pageCheck
    },
    {
      path: '/educational_facilities/edu_facilities3',
      name: 'edu_facilities3',
      component: () => import('./views/educational_facilities/edu_facilities3'),
      beforeEnter: pageCheck
    },
    {
      path: '/corporation/corporation1',
      name: 'corporation1',
      component: () => import('./views/corporation/corporation1'),
      beforeEnter: pageCheck
    },
    {
      path: '/corporation/corporation2',
      name: 'corporation2',
      component: () => import('./views/corporation/corporation2'),
      beforeEnter: pageCheck
    },
    {
      path: '/confer_semi/confer_semi1',
      name: 'confer_semi1',
      component: () => import('./views/confer_semi/confer_semi1'),
      beforeEnter: pageCheck
    },
    {
      path: '/confer_semi/confer_semi2',
      name: 'confer_semi2',
      component: () => import('./views/confer_semi/confer_semi2'),
      beforeEnter: pageCheck
    },
    {
      path: '/war_game/web',
      name: 'web',
      component: () => import('./views/war_game/web'),
      beforeEnter: pageCheck
    },
    {
      path: '/war_game/forensics',
      name: 'forensics',
      component: () => import('./views/war_game/forensics'),
      beforeEnter: pageCheck
    },
    {
      path: '/war_game/misc',
      name: 'misc',
      component: () => import('./views/war_game/misc'),
      beforeEnter: pageCheck
    },
    {
      path: '/contest/contest1',
      name: 'contest1',
      component: () => import('./views/contest/contest1'),
      beforeEnter: pageCheck
    },
    {
      path: '/contest/contest2',
      name: 'contest2',
      component: () => import('./views/contest/contest2'),
      beforeEnter: pageCheck
    },
    {
      path: '/contest/contest3',
      name: 'contest3',
      component: () => import('./views/contest/contest3'),
      beforeEnter: pageCheck
    },
    {
      path: '/security_term/security_term1',
      name: 'security_term1',
      component: () => import('./views/security_term/security_term1'),
      beforeEnter: pageCheck
    },
    {
      path: '/security_term/security_term2',
      name: 'security_term2',
      component: () => import('./views/security_term/security_term2'),
      beforeEnter: pageCheck
    },
    {
      path: '/sign',
      name: '로그인',
      component: () => import('./views/sign')
    },
    {
      path: '/register',
      name: '회원가입',
      component: () => import('./views/register')
    },
    {
      path: '*',
      name: 'e404',
      component: () => import('./views/e404')
    }
  ]
})
