<template>
  <div class="container3">
    <div class="image" :style="`background: url('${productImage}'); background-size: contain; background-position: center; background-repeat: no-repeat;`">
        <div class="inner-image">
            <div>
            <button @click="addItemToCart()">Add to Cart</button>
            <router-link :to="`/${product._id}`" class="show">Show</router-link>
            </div>
            
        </div>
      
    </div>
    <div class="bottom-section">
        <div class="title-price">
            <span>{{product.product_name}}</span>
            <span>  </span>
            <span>{{product.price}}$</span>
        </div>
        <div class="uimage-name">
            <img class="user-image" :src="userImage">
            <div class="name">{{product.publisher.firstname}} {{product.publisher.lastname}}</div>
        </div>
    </div>

  </div>

</template>

<script>
import axios from "axios";
import {ref} from 'vue'




export default {
props:{
    product: Object
},


    setup(props){

        
        const productImage = ref('http://localhost:3000/uploads/'+props.product.images)
        const userImage = ref('http://localhost:3000/uploads/'+props.product.publisher.profile_picture)



async function addItemToCart() {
  try {
    const freshId = ref(props.product._id)
    const token = localStorage.getItem('authToken'); // Retrieve the auth token from local storage
     // Replace with the actual id you want to send

    const response = await axios.post('http://localhost:3000/api/addItemToCart', {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the JWT token in the request header
      },
    },{freshId});

    console.log(response.data);
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
}



return{
    addItemToCart,
    productImage,
    userImage
}

    }

}


</script>

<style scoped>


.inner-image{
    width: 100%;
    height: 75%;
    transition: .3s ease all;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 99;

}

.inner-image div{
    display: none;
    
    width: 50%;
    align-items: center;
    justify-content: space-between;
    
}

.inner-image div button, .show {
    border: none;
    background: transparent;
    color: rgba(0, 108, 196);

    cursor: pointer;
    font-size: 17px;
    text-decoration: none;

}
.inner-image:hover{
    background: rgba(36, 36, 36, 0.3);
   
}
.inner-image:hover div{
    display: flex;
}

.container3{
    width: 400px;
    height: 400px;
    background: #525252;
    position: relative;
    border: none;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 40px rgba(0, 108, 196, .2);
    color: black;
}
.image{
    width:100%;
    height: 75%;
    background: rgb(255, 255, 255);
   
    
}
.bottom-section{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 25% ;
    background: white;
}
.title-price{
    width: 100%;
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.uimage-name{
    width: 50%;
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.user-image{
    width: 40px;
    height: 40px;
    border-radius:50% ;
    background: yellowgreen;
}
</style>