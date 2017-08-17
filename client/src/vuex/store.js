import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import moment from 'moment'
import router from '../router'

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    thread: [],
    detailThread: {}
  },
  mutations: {
    getThread (state, payload) {
      state.thread = payload
    },
    detailThread (state, payload) {
      state.detailThread = payload
    }
  },
  actions: {
    signUp ({commit}, payload) {
      http.post('/users/', {
        name: payload.name,
        username: payload.username,
        email: payload.email,
        password: payload.password
      })
      .then(({data}) => {
        router.push('/')
      })
    },
    getOneThread ({commit}, payload) {
      // console.log('============', payload)
      http.get(`/thread/${payload}`)
      .then(res => {
        console.log(res)
        commit('detailThread', res.data)
      })
      .catch(err => console.log(err))
    },
    getAllThread ({commit}) {
      http.get('/thread')
      .then(({data}) => {
        // console.log(moment(data.created_at).format('LLL'))
        commit('getThread', data)
      })
      .catch(err => console.log(err))
    },
    createThread ({commit}, payload) {
      http.post('/thread', {
        title: payload.title,
        content: payload.content,
        user_id: localStorage.getItem('id'),
        username: localStorage.getItem('username')
        // created_at: moment(new Date()).format('LLL')
      })
      .then(({data}) => {
        console.log(data)
        router.push('/')
      })
    }
  }
})
