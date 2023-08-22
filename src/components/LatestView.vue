<template>
  <div class="show-items">

    <SingleItem :first ='first' />
    <SingleItem :first ='first' />
    <SingleItem :first ='first' />
    <SingleItem :first ='first' />
    <SingleItem :first ='first' />
    <SingleItem :first ='first' />
    

    </div>
  
</template>

<script setup>
import SingleItem from './SingleItem.vue'

const first = "latest"


</script>

<style scoped>

.show-items{
  width: 80%;
  height:fit-content;
  display: flex;
  flex-wrap: wrap;
  margin: 3vh auto;
  align-items: center;
  justify-content: space-around;
  gap: 5vh;
  
}

</style>