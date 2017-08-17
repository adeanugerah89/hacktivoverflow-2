<template lang="html">
  <div class="panel panel-primary">
    <div class="panel-heading">
      <h3 class="panel-title">{{detailThread.title}}</h3>
    </div>
    <div class="panel-body">
      {{detailThread.content}}
    </div>
    <div class="panel-footer">
      Author: {{detailThread.username}}<br>
      Created: {{detailThread.created_at}}<br>
      <p align="left">
        <router-link to="/"><button type="submit" class="btn btn-primary">Back</button></router-link>
      </p>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  props: ['id'],
  methods: {
    ...mapActions([
      'getOneThread'
    ])
  },
  computed: {
    detailThread () {
      return this.$store.state.detailThread
    }
  },
  created () {
    this.getOneThread(this.id)
  }
}
</script>

<style lang="css">
</style>
