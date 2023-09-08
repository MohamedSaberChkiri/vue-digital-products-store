<template>
  <div class="show-items">

      <SingleItem v-for="product in productsArray" :key="product._id" :product="product" />

    </div>
  
</template>

<script >
import SingleItem from './SingleItem.vue'


export default{
  components:{
    SingleItem
  }
  ,
  props:{
    productsArray: Object
  },

  setup(){
    
    


}}


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