<template>
 <div>
   <p v-if="userProducts.length === 0">No products available.</p>
    <table v-if="userProducts.length != 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Sold Units</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in userProducts" :key="product._id">
          <td>{{ product._id }}</td>
          <td>{{ product.product_name }}</td>
          <td>{{ product.categorie }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.sold_units }}</td>
          <td>
            <button @click="removeProduct(product._id)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>

import axios from 'axios';
import { ref ,onMounted} from 'vue';


const token = localStorage.getItem('authToken');
const userProducts = ref([]);

const fetchUserProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/getUserProducts', {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the JWT token in the request header
      },
    });
    
    userProducts.value = response.data;
    
  } catch (error) {
    console.error('Error fetching user products:', error);
  }
};

const removeProduct = async (id) => {
  try {
    // Interpolate the 'id' parameter into the URL
    await axios.delete(`http://localhost:3000/api/${id}`, {
      headers : {
        'Authorization' : `Bearer ${token}`
      }
    });
    console.log(`Product with ID ${id} removed successfully.`);
    location.reload()
  } catch (error) {
    console.error(`Error removing product with ID ${id}:`, error);
  }
};
onMounted(() => {
  fetchUserProducts();
});
</script>

<style scoped>


table{
  border-collapse: collapse;
  width: 100%;
  min-width: 400px;
  max-width: 1000px; /* Adjust this as needed */
    margin: 0 auto;
  /* Table border */
  border: 1px solid #ccc;

  /* Header styles */
 
}
 th {
    background-color: #f2f2f2;
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }

  /* Cell styles */
  td {
    border: 1px solid #ccc;
    padding: 8px;
  }

 button{
    cursor: pointer;
    padding: .5vh 2vh;
    background: none;
    border: 1px solid rgb(165, 0, 0);
    color: rgb(165, 0, 0);
 } 

</style>