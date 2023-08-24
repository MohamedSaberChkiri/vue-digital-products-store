<template>
  
 <div class="cart">
    <h1>Your Cart</h1>
    <div v-for="item in cartItems" :key="item.id" class="cart-item">
      <div class="item-details">
        <h3>{{ item.title }}</h3>
        <p>Price: ${{ item.price }}</p>
         <button @click="removeFromCart(item.id)">Remove</button>
      </div>
     
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import { getCartItems, itemIdToRemove} from '../data/cart';

const cartItems = ref(getCartItems());

const removeFromCart = (id) => {
  itemIdToRemove(id)
  cartItems.value = getCartItems()
}
</script>


<style scoped>


.cart{
  
  width: 70%;
  margin: 5vh auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: fit-content;
  gap: 5vh;
  flex-direction: column;
}
.cart-item{
width: 750px;
height: 15vh;
display: flex;

align-items: center;
justify-content: space-around;
}
.item-details{
  width: 100%;
  height: 100%;
  padding: 0 5vh 0 5vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0px 2px 40px rgba(0, 108, 196, .2);
}
.item-details button{
  width: 150px;
  height: 3vh;
  border-radius :   20px;
  border:1px solid rgba(0, 108, 196) ;
  background: transparent;
  color: rgba(0, 108, 196);
  font-size: 16px;
  cursor: pointer;
  transition: .3s ease all;
}
.item-details button:hover{
  color: white;
  background: rgba(0, 108, 196);
}
h3{
  color: rgba(0, 108, 196);
}

</style>