// cart.js
export const cart = [];

export function addItemToCart(item) {
  cart.push(item);
}

export function removeItemFromCart(itemId) {
    const index = cart.findIndex(item => item.id === itemId);
    if (index !== -1) {
      cart.splice(index, 1);
    }
  }
  

export function getCartItems() {
  return cart;
}
