<template>
 <div>
   <p v-if="Products && Products.length === 0">No products available.</p>
    <table v-if="Products && Products.length !== 0">
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
        <tr v-for="product in Products" :key="product._id">
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

<script>

import {ref}  from 'vue'
import axios from 'axios'
const token = localStorage.getItem('authToken');

export default{
  props : {
    userProducts : Object
  }
,
  setup(props){

    const Products = ref(props.userProducts)
    
    const removeProduct = async(id)=>{
      const response = await axios.delete(`http://localhost:3000/api/${id}`,{
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      location.reload()
      console.log(response.data.message)

    }


  return{
    Products, removeProduct
  }
  }
}


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