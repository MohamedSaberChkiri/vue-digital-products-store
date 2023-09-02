<template>
  <div class="container">
    
    <div class="add-product">
      <div class="image">
        <label for="item-image">Browse</label>
        <input type="file" placeholder="Browse" id="item-image">
      </div>
      <div class="information">
        <form @submit.prevent="addProduct">
          <input type="text" placeholder="Product Name" v-model="newProduct.product_name">
          <input type="text" placeholder="Categorie" v-model="newProduct.categorie">
          <input type="text" placeholder="Price" v-model="newProduct.price">
          <textarea placeholder="Description" cols="30" rows="5" style="resize: none;" v-model="newProduct.description"></textarea>
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
import {ref} from 'vue'
  
import axios from 'axios'; // Import Axios for making HTTP requests
const token = localStorage.getItem('authToken');

const newProduct = ref({
  product_name: '',
  categorie: '',
  price: 0,
  description : ''
});

// Method to add a new product
const addProduct = async () => {
  try {
     
    // Send a POST request to your server to add the product
     
    const response = await axios.post('http://localhost:3000/api/addproduct', {
     data: newProduct.value, 
      // Send the product data to the server
    
    },{ headers: {
    'Authorization': `Bearer ${token}`,
  }});

    if (response.status === 201) {
      // Product added successfully
      console.log('Product added successfully');
     
      // Optionally, you can reset the form fields here
      newProduct.value = {
        product_name: '',
        categorie: '',
        price: 0,
        description: '',
      };
      location.reload()
    } else {
      // Handle other response statuses (e.g., error cases)
      console.error('Failed to add product');
    }
  } catch (error) {
    // Handle network errors or server errors
    console.error('Error adding product:', error);
  }
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