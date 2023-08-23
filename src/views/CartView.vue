<template>
  
 <div class="cart">
    <h2>Your Cart</h2>
    <div v-for="item in cartItems" :key="item.id" class="cart-item">
      <div class="item-details">
        <h3>{{ item.title }}</h3>
        <p>Price: ${{ item.price }}</p>
      </div>
      <button @click="removeFromCart(item.id)">Remove</button>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import { getCartItems, removeItemFromCart } from '../data/cart';

const cartItems = ref(getCartItems());

const removeFromCart = (itemId) => {
  removeItemFromCart(itemId);
  cartItems.value = getCartItems();
}
</script>


<style>

</style>