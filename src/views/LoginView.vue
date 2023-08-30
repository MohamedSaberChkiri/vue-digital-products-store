<template>


<div class="container4">
  <form @submit.prevent='login'>
    <h1>Login</h1>
    <h5>Enter Your Details</h5>
    
    <input type="email" placeholder="Email" id="email" v-model="email">
    <input type="password" placeholder="Password" id="password" v-model="password">
    <input type="submit" value="Login" id="submit">
    <router-link to="/register" id="register-link">don't have an Account ?</router-link>
  </form>
</div>

</template>

<script setup>

import axios from 'axios';
import { ref } from 'vue';
import {useRouter} from 'vue-router'
import { useStore } from 'vuex';

const store = useStore();


const router = useRouter()

const email = ref('');
const password = ref('');


const login = async (event) => {
  event.preventDefault();

  try {
    const response = await axios.post('http://localhost:3000/api/login', {
      email: email.value,
      password: password.value,
    }, { withCredentials: true });

    store.commit('setAuthToken', response.data.token); // Set authToken in the store

    console.log(response.data.message); // "Login successful"
    router.push('/user'); // Navigate to the profile page
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>

.container4{
  min-width: 25%;
  max-width: 30%;
  height: 60vh;
  background: white;
  margin: 10vh auto;
  box-shadow: 0px 2px 60px rgba(0, 108, 180, 0.2);
  border-radius: 5px;


  
}
  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 5vh;
    
    
  }

input{
  width: 70%;
  height: 5vh;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 2px 5px rgba(0, 108, 180, 0.1);
}
#email , #password{
  padding-left: 5vh;
  font-size: 1.1rem;
}
h5, h1{
  color: rgba(0, 108, 180);
}
h1{
  font-size: 3rem;
}
#submit{
  background: rgba(0, 108, 180);
  color: white;
  font-size: 17px;
  cursor: pointer;
}
#register-link{
  color: rgba(0, 108, 180);
}


</style>