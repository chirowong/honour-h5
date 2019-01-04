import Vue from 'vue'
import Router from 'vue-router'
import {getUserInfo, getMobileOperatingSystem} from '../assets/js/common'
import mapi from '../api/mapi'
import {TYPE_ANDROID, TYPE_IOS} from '../api/const'
// import Filter from '../assets/js/filter'
// import FilterChain from '../assets/js/filterChain'

import Home from '@/components/Home'
import Query from '@/components/Query'
import PainPoint from '@/components/PainPoint'
import {HighValue, Trend} from '@/components/HighValue'
import Search from '@/components/Search'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/query',
      name: 'Query',
      component: Query
    },
    {
      path: '/painPoint',
      name: 'PainPoint',
      component: PainPoint
    },
    {
      path: '/highValue',
      name: 'HighValue',
      component: HighValue
    },
    {
      path: '/trend',
      name: 'Trend',
      component: Trend
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})

router.beforeEach((to, from, next) => {
  let toFullPath = to.fullPath
  let query = to.query
  let redirectQuery = {redirect: toFullPath}

  if (query) {
    Object.keys(query).forEach(function (key) {
      redirectQuery[key] = query[key]
    })
  }

  let osType = getMobileOperatingSystem()
  switch (osType) {
    case TYPE_ANDROID: {
      let callback = function (response) {
      }

      let params = {url: toFullPath, callback: callback}

      mapi.executeNavigate(params)
      break
    }
    case TYPE_IOS: {
      console.log('is ios')
      break
    }
    default: {
      break
    }
  }

  if (to.meta.requireAuth) {
    getUserInfo(function (userInfo) {
      if (userInfo) {
        next()
      } else {
        next({
          path: '/login',
          query: redirectQuery
        })
      }
    })
  } else {
    next()
  }
})

export default router
