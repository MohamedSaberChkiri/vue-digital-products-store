import axios from "axios";


const token = localStorage.getItem('authToken');
// cart.js
export let cart = [];


export function addItemToCart(item) {
  cart.push(item);
  
}

export function itemIdToRemove(id){cart = cart.filter(item => item.id !== id);}

  

export async function getCartItems() {
 const response = await axios.get('http://localhost:3000/api/getCartIds',{
    headers:{
      Authorization : `Bearer ${token}`
    }
  })

  cart.push(response.data)
  return cart;
}
