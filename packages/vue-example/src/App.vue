<script setup lang="ts">
import { useStore } from '@atom-state/vue'
import { post as postStore, fetchPostEffect, isPostLoading as isPostLoadingStore } from './todos-store'
const post = useStore(postStore)
const isPostLoading = useStore(isPostLoadingStore)
let id = 1
</script>

<template>
  <h1>App</h1>
  <div v-if="isPostLoading">Loading...</div>
  <pre v-else>{{ post }}</pre>
  <button @click="fetchPostEffect(id++)">Load post</button>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
