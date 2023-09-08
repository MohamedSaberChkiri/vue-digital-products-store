<template>
 
  
  <router-view :productsArray="productsArray"/>

 
</template>



<script setup>
import axios from 'axios'
import {onMounted, ref} from 'vue'


let productsArray = ref([])

const fetchProduct = async()=>{
  const response = await axios.get('http://localhost:3000/api/home')
  productsArray.value = response
 
}

onMounted(()=>{
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
