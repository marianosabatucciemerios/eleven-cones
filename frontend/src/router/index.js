import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/HelloWorld'
import Teams from '@/components/Teams'
import HomePage from '@/components/HomePage';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/home',
      name: 'Home',
      component: HomePage,
    },
    {
      path: '/teams',
      name: 'Teams',
      component: Teams
    }
  ]
})
