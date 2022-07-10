<script setup lang="ts">
import { useStore } from '@atom-state/vue'
import { $numbers, $doubledNumbers, $onlyOddNumbers, addNumberEvent, cleartNumbersEvent } from './store'
const numbers = useStore($numbers)
const doubledNumbers = useStore($doubledNumbers)
const onlyOddNumbers = useStore($onlyOddNumbers)
let number = 1
</script>

<template>
  <h1>App</h1>
  <pre>{{ numbers }}</pre>
  <pre>{{ doubledNumbers }}</pre>
  <pre>{{ onlyOddNumbers }}</pre>
  <button @click="addNumberEvent(number++)">Add number</button>
  <button @click="cleartNumbersEvent()">Clear</button>
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
