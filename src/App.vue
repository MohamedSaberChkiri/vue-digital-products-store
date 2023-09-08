<template>
 
  
  <router-view :productsArray="state.productsArray" v-if="state.productsArray !== null"/>

 
</template>



<script setup>
import axios from 'axios'
import { onMounted, reactive } from 'vue'

const state = reactive({
  productsArray: null
})

const fetchProduct = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/home')
    state.productsArray = response.data
  } catch (error) {
    console.error('Error:', error)
  }
}

onMounted(() => {
  fetchProduct()
})
</script>



<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');


*{
  margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
}

</style>
