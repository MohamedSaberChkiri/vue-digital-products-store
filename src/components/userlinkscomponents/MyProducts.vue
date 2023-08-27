<template>
  <div class="container">
    
    <div class="add-product">
      <div class="image">
        <label for="item-image">Browse</label>
        <input type="file" placeholder="Browse" id="item-image">
      </div>
      <div class="information">
        <form @submit.prevent="addProduct">
          <input type="text" placeholder="Product Name" v-model="newProduct.name">
          <input type="text" placeholder="Categorie" v-model="newProduct.category">
          <input type="text" placeholder="Price" v-model="newProduct.price">
          <textarea placeholder="Description" cols="30" rows="5" style="resize: none;"></textarea>
           <button type="submit">Add Product</button>
        </form>
      </div>
    </div>


 


    <div class="display-products">

        <SingleAddedProduct/>
    </div>

  </div>
  
</template>

<script setup>
  import SingleAddedProduct from "../userlinkscomponents/SingleAddedProduct.vue";

  
import { ref } from 'vue';
import { products as initialProducts } from '../../data/userProducts'; // Import the products array

const products = ref(initialProducts);
const newProduct = ref({
  name: '',
  category: '',
  price: 0,
  soldUnits: 0,
});

const addProduct = () => {
  // Create a deep copy of the newProduct object to avoid reactivity issues
  const productCopy = JSON.parse(JSON.stringify(newProduct.value));
  
  // Assign a new unique ID
  productCopy.id = Date.now();
  
  // Add the new product to the products array
  products.value.push(productCopy);
  
  // Reset the form inputs
  newProduct.value = {
    name: '',
    category: '',
    price: 0,
    soldUnits: 0,
  };
};



</script>

<style scoped>

.add-product{
  display: flex;
  align-items: center;
  justify-content: center;
  
  gap: 5vh;
  padding: 5vh;
  flex-wrap: wrap;
}
.image{
  width: 300px;
  height: 200px;
  border: 1px dashed black;
  display: flex;
  align-items: center;
  justify-content: center;
}
form{
  display: flex;
  flex-direction: column;
  gap: 1vh;
}
input{
  width: 350px;
  height: 5vh;
  padding-left: 3vh;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
}
input[type="file"]{
  display: none;
}
label{
  cursor: pointer;
  border: 1px solid grey;
  padding: .5vh 2vh;
}
.container{
  display: flex;
  flex-direction: column;
}
.display-products{
 
  padding: 1vh;
}
button{
  width: 300px;
  height: 5vh;
  margin: 0 auto;
  background: rgb(0, 172, 252);
  color: white;
  border: 1px solid white;
  font-size: 17px;
  cursor: pointer;
}

</style>