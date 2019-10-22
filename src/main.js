import Vue from 'vue'

import 'normalize.css/normalize.css'

import Element from 'element-ui'
import './styles/element-variables.scss'

import './styles/index.scss'

import App from './App.vue'
import router from './router'
import store from './store'

import Cookies from 'js-cookie'

import './permission'
import './icons'

Vue.config.productionTip = false

Vue.use(Element, {
  size: Cookies.get('size') || 'medium'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
