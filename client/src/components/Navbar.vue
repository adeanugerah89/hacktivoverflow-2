<template lang="html">
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Brand</a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li><a href="#">Link <span class="sr-only">(current)</span></a></li>
            <li><a href="#">Link</a></li>
          </ul>
          <form class="navbar-form navbar-right">  
            <router-link v-if="token == null" to="/signup"><button type="submit" class="btn btn-warning" data-toggle="modal" data-target="#signUp">Sign Up</button></router-link>
            <router-link v-if="token == null" to="/signin"><button type="submit" class="btn btn-success" data-toggle="modal" data-target="#signIn">Sign In</button></router-link>
            <button v-else @click="SignOut()" type="submit" class="btn btn-success" data-toggle="modal" data-target="#signIn">Sign Out</button>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['token'],
  methods: {
    SignOut () {
      localStorage.clear()
      this.$emit('logout')
    }
  }
}
</script>

<style lang="css">
</style>
