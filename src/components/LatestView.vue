<template>
  <div class="show-items">

     <SingleItem />
    

    </div>
  
</template>

<script setup>
import SingleItem from './SingleItem.vue'





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