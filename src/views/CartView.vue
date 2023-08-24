<template>
  
<div class="cart-container">

 <div class="cart">
        <h1>Your Cart</h1>

        <div v-for="item in cartItems" :key="item.id" class="cart-item">

              <div class="item-details">
                  <div class="sub-dt">
                          <div class="item-image">image here</div>
                                <div class="dt">
                                  <h3>{{ item.title }}</h3>
                                  <p>Price: ${{ item.price }}</p>
                                  <div class="quantity">
                                  <button class="qt" >-</button>
                                  <span>0</span>
                                  <button  class="qt">+</button></div>
                          </div>
                    </div>
                   
                    <button @click="removeFromCart(item.id)" id="remove-button">Remove</button>
              </div>
        
        </div>
      </div>

      <div class="summary">
          <h1>Summary</h1>
          <div class="summary-container">
            <div class="st"><span>Subtotal</span><span>{{subtotal}}$</span></div>
            <div class="es"><span>Estimated Shipping and Handling</span><span>{{fees}}$</span></div>
            <div class="et"><span>Estimated Tax</span><span>-</span></div>
            <hr>
            <div class="total"><span>Total </span><span>{{total}}$</span></div>
            <hr>
            <button>Checkout</button>
            <button>PayPal</button>
          </div>
          
      </div>

 </div> 

</template>

<script setup>
import { ref } from 'vue';
import { getCartItems, itemIdToRemove} from '../data/cart';

const cartItems = ref(getCartItems());
let subtotal = ref(0)
let fees = ref(8)
let total = ref(0)

const removeFromCart = (id) => {
  itemIdToRemove(id)
  cartItems.value = getCartItems()
}



</script>


<style scoped>

.cart-container{
  display: flex;
  width: 100%;
  height: fit-content;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: center;
  
}
.summary{
  width: 500px;
  height: 400px;
  
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

}
.summary-container{
  
  width: 400px;
  height: 350px;
  display: flex;
  flex-direction: column;
}
.summary-container div{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5vh 0 1.5vh 0;
}
.summary-container button{
  width: 400px;
  height: 6vh;
  border-radius: 30px;
  border: none;
  margin: 1vh auto;
}
hr{
  color: rgba(0, 0, 0, 0.1);
}

.quantity{
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 10vh;

}
.quantity span{
  width: 20px;
  height: 20px;
  
  display: flex;
  align-items: center;
  justify-content: center;
}
.qt{
  width: 20px;
  border: none;
  background: none;
  font-size: 30px;
height: 20px;
display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.dt{
  width: 150px;
  height: 11vh;
  display: flex;
  align-items: start;
  justify-content: space-around;
  flex-direction: column;
  
}
.sub-dt{
  gap: 3vh;
  display: flex;
  height: fit-content;
  width: 300px;
  flex-wrap: wrap;
}
.item-image{
  width: 100px;
  height: 100px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;

  
}
.cart{
  
  width: 1000px;
  margin-top: 5vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: fit-content;
  gap: 5vh;
  flex-direction: column;
}
.cart-item{
width: fit-content;

height: fit-content;
display: flex;

align-items: center;
justify-content: space-around;
}
.item-details{
  width: 100%;
  height: 100%;
  padding: 0 2vh 0 2vh;
  display: flex;
  align-items: center;
  
  justify-content: space-around;
  box-shadow: 0px 2px 40px rgba(0, 108, 196, .2);
}
#remove-button{
  width: 100px;
  height: 3vh;
  border-radius :   20px;
  border:1px solid rgba(0, 108, 196) ;
  background: transparent;
  color: rgba(0, 108, 196);
  font-size: 16px;
  cursor: pointer;
  transition: .3s ease all;
}
#remove-button:hover{
  color: white;
  background: rgba(0, 108, 196);
}
h3{
  color: rgba(0, 108, 196);

}

</style>