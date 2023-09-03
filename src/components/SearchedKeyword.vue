<template>
  <div class="centered-container">
    <div class="centered-div">
      <SingleItem  />

    </div>
  </div>
</template>

<script>
import SingleItem from './SingleItem.vue'
import { ref, watch, computed } from 'vue'



export default{
  props: {
    result : Array
  },
  components:{
    SingleItem
  },
  setup(props){

        // Create a reactive reference for the prop
    const reactiveResult = ref(props.result)

    // Watch for changes in the prop and update the reactive reference
    watch(() => props.result, (newResult) => {
      reactiveResult.value = newResult
      
    })

    const products = ref([]);

   const fetchProductsForIds = () => {
     
    };

    watch(() => props.result, () => {
      fetchProductsForIds();
     
    });

    const productsToShow = computed(() => {
      return products.value;
    });




  return{
    
    productsToShow

  }
    
  }

}





</script>

<style scoped>
.centered-container {
  position: fixed;
  top: 120px; /* Set the top margin to create space */
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align items to the top */
  z-index: 1000; /* Set the desired z-index */
  width: 100%;
  height: 100%;
  backdrop-filter: blur(20px);
  overflow-y: auto;
}

.centered-div {
  background: transparent;
  padding: 3vh;
  overflow: auto;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 3vh;
  max-height: calc(100vh - 50px); /* Subtracting the top margin */
  
   /* Adjust as needed */
}
</style>

