<template lang="html">
  <div>
    <Navbar :token="token"></Navbar>
    <div class="container">
      <div class="row">
        <div class="col-md-2 col-md-offset-2">
          <form>
            <div class="form-group">
              <input v-model='title' type="title" class="form-control" id="title" placeholder="title">
            </div>
            <textarea v-model='content' name="name" rows="8" cols="80" placeholder="description"></textarea>
            <button @click='createThread()' type="submit" class="btn btn-primary">Submit</button>
            <router-link to="/"><button type="submit" class="btn btn-primary">Back</button></router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import moment from 'moment'
import Navbar from '@/components/Navbar'
export default {
  data () {
    return {
      title: '',
      content: '',
      token: null
    }
  },
  components: {Navbar},
  methods: {
    createThread () {
      this.$store.dispatch('createThread', {
        title: this.title,
        content: this.content
      })
    },
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
  }
}
</script>

<style lang="css">
</style>
