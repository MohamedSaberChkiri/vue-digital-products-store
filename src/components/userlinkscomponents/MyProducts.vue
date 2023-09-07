<template>
  <div class="container">
    
    <div class="add-product">
      <div class="image">
        <label for="item-image">Browse</label>
        <input type="file" placeholder="Browse" id="item-image" @change="onImageChange">

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

        <SingleAddedProduct :userProducts="userProducts" />
    </div>

  </div>
  
</template>

<script>
import SingleAddedProduct from "../userlinkscomponents/SingleAddedProduct.vue";
import { ref } from 'vue';
import axios from 'axios';

export default {
  props:{
    userProducts : Object
  },

  components: {
    SingleAddedProduct,
  },

  data() {
    return {
      token: localStorage.getItem('authToken'),
      newProduct: ref({
        product_name: '',
        categorie: '',
        price: 0,
        description: '',
        images: '',
      }),
    };
  },

  methods: {
     onImageChange(event) {
    const file = event.target.files[0]; // Get the selected file
    this.newProduct.images = file; // Assign the selected file to newProduct.images
  },

  async addProduct() {
    try {
      const formData = new FormData(); // Create a FormData object
      formData.append('product_name', this.newProduct.product_name);
      formData.append('categorie', this.newProduct.categorie);
      formData.append('price', this.newProduct.price);
      formData.append('description', this.newProduct.description);
      formData.append('images', this.newProduct.images); // Add the image file to the FormData

      const response = await axios.post(
        'http://localhost:3000/api/addproduct',
        formData, // Send the FormData containing both text data and the image
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
          },
        }
      );
    console.log(response.data.message)
      // ... handle response as before ...
    } catch (error) {
      // ... handle error as before ...
    }
  },
    },
}

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