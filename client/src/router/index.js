import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import Dashboard from '@/components/Dashboard'
import Content from '@/components/Content'
import CreateThread from '@/components/CreateThread'
import DetailThread from '@/components/DetailThread'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signin',
      component: Signin
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: '',
          name: 'Content',
          component: Content
        },
        {
          path: '/detail/:id',
          component: DetailThread,
          props: true
        }
      ]
    },
    {
      path: '/createThread',
      component: CreateThread
    }
  ]
})
