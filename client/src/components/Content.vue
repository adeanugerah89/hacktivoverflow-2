<template lang="html">
  <div>
    <div class="panel-heading">
      <router-link to="/createThread"><button v-if="token" type="submit" class="btn btn-primary">Create New Thread</button></router-link>
    </div>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Vote</th>
          <th>Thread</th>
          <th>Author</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in thread">
          <td> up & down</td>
          <td><router-link :to="'/detail/' +data._id">{{data.title}}</router-link></td>
          <td>{{data.username}}</td>
          <td>{{data.created_at}}</td>
        </tr>
      </tbody>
    </table> 
  </div>
</template>

<script>
export default {
  data () {
    return {
      disable: false
    }
  },
  props: ['token'],
  methods: {
    cekLogin () {
      if (this.token) {
        this.disable = false
      } else {
        this.disable = true
      }
    }
  },
  computed: {
    thread () {
      return this.$store.state.thread
    }
  },
  created () {
    this.cekLogin()
  }
}
</script>

<style lang="css">
</style>
