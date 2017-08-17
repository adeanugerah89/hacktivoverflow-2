<template lang="html">
  <div id="signUp" class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h2 class="form-signin-heading">Please sign up</h2>
        </div>
      <form class="form-register">
        <div class="modal-body">
            <label for="name">Name</label>
            <input v-model="name" type="name" id="name" class="form-control" placeholder="name" required="" autofocus="">
            <label for="username">username</label>
            <input v-model="username" type="username" id="username" class="form-control" placeholder="username" required="" autofocus="">
            <label for="inputEmail">Email address</label>
            <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
            <label for="inputPassword">Password</label>
            <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button @click='signUp()' type="submit" class="btn btn-primary" data-dismiss="modal">Sign Up</button>
        </div>
      </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signUp () {
      this.$store.dispatch('signUp', {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style lang="css">
</style>
