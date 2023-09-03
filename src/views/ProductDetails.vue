<template>
  
  <div class="details-container">


        <div class="sub-container1">
              <div class="back" >
                  <button @click="router.go(-1)"> Back </button>
              </div>


            <div class="item-image">
                    <div class="single-image" :style="{ background: selectedImage }"></div>

                          <div class="other-images">
                                  <div v-for="(image, index) in images" :key="index" class="image" @click="selectImage(image)">
                                    {{ image }}
                                  </div>
                    </div>
  </div>
        </div>
    
        <div class="right-panel">
                  <div class="publisher">
                      <div class="item-title" >{{title}}</div>
                          <div class="profile">
                              
                                <div class="ct2">
                                  <div class="profile-image"></div>
                                  <div class="pub-name"> {{user_name}} {{last_name}}</div>
                                </div>
                                  <div class="price" >{{price}}$</div>
                                
                          </div>
                     
                  </div>

      <hr>

            <div class="benefits">
                <ul>
                  <li>One-Time Payment For Unlimited Access</li>
                  <li>24/7 Unlimited Access</li>
                  <li>100% Royalty-Free</li>
                  <li>Commercial Use License</li>
                  <li>24/7 Customer Support</li>
                </ul>
              </div>

      <hr>

          <div class="money-guarantee">
              <h3>100% Money Back Guarantee</h3>
              <h6>(within 30 days of purchase)</h6>
          </div>

      <hr>

          <div class="buttons-conatainer">
            <button @click="AddItemToCart(id)">Add to Cart</button>
            <button>Buy Now</button>
          </div>
          
   </div>

   <div class="added-status" :class="{'sc': showSuccessMessage}">Added Successfully</div>

</div>

   
  

</template>

<script setup>

import { useRoute, useRouter } from 'vue-router';
import { addItemToCart } from '../data/cart.js';
import { ref, onMounted } from 'vue'
import axios from 'axios';





const route = useRoute();
const router = useRouter()
const showSuccessMessage = ref(false);

const user_name = ref()
const last_name = ref()
const title = ref()
const price = ref()


const productId = route.params.id;


const token = localStorage.getItem('authToken');

async function fetchSingleProduct(){
    const response = await axios.get(`http://localhost:3000/api/${productId}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    user_name.value = response.data.user.firstname
    last_name.value = response.data.user.lastname
    title.value = response.data.item.product_name
    price.value = response.data.item.price
    
}




  function AddItemToCart() {
      const item = {
      
      };
      addItemToCart(item);
      
      showSuccessMessage.value = true;
  setTimeout(() => {
    showSuccessMessage.value = false;
  }, 3000); // Hide the success message after 3000 milliseconds (3 seconds)
    }




    const selectedImage = ref('image 5');
const images = ['green', 'black', 'yellow', 'red'];

const selectImage = (image) => {
  selectedImage.value = image;
};


onMounted(()=>{
  fetchSingleProduct()
})

</script>

<style scoped>

.single-image, .image{
  display: flex;
  align-items: center;
  justify-content: center;
}
.other-images{
  width: 60%;
  height: 15vh;
 
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;

}
.image{
    width: 100px;
    height: 100px;
    border: 1px solid black;

}

.single-image{
  width: 70%;
  height: 300px;
  border: 1px solid black;

}

.added-status{
  position: absolute;
  width: 350px;
  height: 7vh;
  background: lightblue;
  bottom: 0;
  right: 3vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:rgb(19, 151, 19);
  border: 1px solid rgb(8, 102, 0);
  color: white;
  font-size: 18px;
  transition: .4s ease-in-out all;
  opacity: 0;
  }
.sc{
  opacity: 1;
}
hr{
  width: 70%;
  color:rgba(0, 0, 0, .1) ;
  
  
}
.publisher{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 13vh;
}
.profile{
  height: 5vh;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin: 0 auto;
  
}
.profile-image{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #000;
}
.ct2
{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2vh;
}
.price{
  margin-right: 3vh;
  font-size: 25px;
}

.item-title{
 
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5vh;
  width: 100%;
  font-size: 30px;
}

.benefits{
 
  width: 80%;
  height: 15vh;
 
}
.benefits ul{
  display: flex;
  flex-direction:column ;
  align-items: start;
  height: 100%;
  justify-content: space-around;

}
.details-container{
  width: 100%;
  height: 90vh;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 5vh;
  position: relative;
}

.sub-container1{
  width: 1200px;
  height: 80%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 
  box-shadow: 0px 2px 40px rgba(0, 0, 0, 0.2);
}
.back{
  width: 90%;
  height: 5vh;
  margin-bottom: 2vh;
  display: flex;
  align-items: center;
  justify-content: start;
}
.back button{
  width: 100px;
  height: 3vh;
  border-radius: 20px;
  border: 1px solid rgb(88, 88, 88);
  background: white;
  font-size: 18px;
  cursor: pointer;
  transition: .3s ease all;
}
.back button:hover{
  background: rgb(97, 97, 97);
  color: white;
}

.right-panel{
  margin-top: 5vh;
  width: 400px;
  height: 70%;
  
}

.item-image{
  width: 90%;
  height: 80%;
 box-shadow: 0px 2px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2vh;
}
.right-panel{
  display: flex;
  flex-direction: column ;
  align-items: center;
  justify-content: space-around;
  
}

.money-guarantee{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  height: 6vh;
}

.buttons-conatainer{
  width: 100%;
  height: 12vh;
  display: flex;
  flex-direction: column;
 
  align-items: center;
  justify-content: space-around;
}
.buttons-conatainer button{
  width: 90%;
  height: 5vh;
  border: none;
  cursor: pointer;
  transition: .3s ease all;
}
.buttons-conatainer button:nth-child(1):hover{
  background: rgba(255, 115, 0, .8);
}
.buttons-conatainer button:nth-child(2):hover{
  background: rgba(0, 73, 0, .8);
}
.buttons-conatainer button:nth-child(1){
  background: rgb(255, 115, 0);
  color: white;
  font-size: 18px;
}
.buttons-conatainer button:nth-child(2){
  background: rgb(35, 148, 0);
  color: white;
  font-size: 18px;
}
</style>