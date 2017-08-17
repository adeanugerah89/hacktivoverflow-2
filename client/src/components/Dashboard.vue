<template lang="html">
  <div>
    <Navbar :token="token" @logout="cekLogin()"></Navbar>
    <div class="container">
      <div class="row">
        <div class="col-md-2">
          <Sidebar></Sidebar>
        </div>
        <div class="col-md-9">
          <router-view :token="token"></router-view>
        </div>
        <div class="col-md-1"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      token: null
    }
  },
  components: {Navbar, Sidebar},
  methods: {
    ...mapActions([
      'getAllThread'
    ]),
    cekLogin () {
      if (localStorage.getItem('token')) {
        this.token = localStorage.getItem('token')
      } else {
        this.token = null
      }
    }
  },
  created () {
    this.cekLogin()
    this.getAllThread()
  }
}
</script>

<style lang="css">
</style>
