<template>
  <div class="show-items">

     <SingleItem  />

    </div>
  
</template>

<script >
import SingleItem from './SingleItem.vue'
import {ref} from 'vue'

export default{
  components:{
    SingleItem
  }
  ,
  props:{
    productsArray: Array
  },
  setup(props){
    const products = ref(props.productsArray)
    console.log(products.value)
  }
}


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