// cart.js
export let cart = [];

export function addItemToCart(item) {
  cart.push(item);
}

export function itemIdToRemove(id){cart = cart.filter(item => item.id !== id);}// Replace with the actual ID of the item to remove
 // Create a new array without the item to remove

  

export function getCartItems() {
  return cart;
}
