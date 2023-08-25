<template>
  <div class="show-items">

     <SingleItem v-for="item in items" :key="item.id" :id="item.id" :title="item.title" :price="item.price" :qt="item.qt" />

    </div>
  
</template>

<script setup>
import SingleItem from './SingleItem.vue'
import {items} from '../data/items'


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