<template>
 <div>
    <table >
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
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.soldUnits }}</td>
          <td>
            <button @click="removeProduct(product.id)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>


import { ref } from 'vue';
import { products as initialProducts } from '../../data/userProducts'; // Import the products array

const products = ref(initialProducts);

const removeProduct = (productId) => {
  // Update the products array using the .value property of the ref
  products.value = products.value.filter(product => product.id !== productId);
};
</script>

<style scoped>


table{
  border-collapse: collapse;
  width: 100%;
  max-width: 600px; /* Adjust this as needed */
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