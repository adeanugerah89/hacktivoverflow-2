<template lang="html">
  <div id="signIn" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h2 class="form-signin-heading">Please sign in</h2>
          </div>
        <!-- <form @submit.prevent="signIn()" class="form-register"> -->
        <form class="form-register">
          <div class="modal-body">
              <label for="username">username</label>
              <input v-model="username" type="username" id="username" class="form-control" placeholder="username" required="" autofocus="">
              <label for="inputPassword">Password</label>
              <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button @click="signIn()" type="submit" class="btn btn-primary" data-dismiss="modal">Sign In</button>
          </div>
        </form>
        </div>
      </div>
      </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signIn () {
      axios.post(`http://localhost:3000/users/login`, {username: this.username, password: this.password})
      .then(res => {
        // console.log('==============================' + res.data.user_id)
        var token = res.data.token
        localStorage.setItem('token', token)
        localStorage.setItem('id', res.data.user_id)
        localStorage.setItem('username', res.data.username)
        this.$router.push('/')
      })
      .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="css">
</style>
