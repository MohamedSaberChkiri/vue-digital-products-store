<template>


<div class="container4">
  <form @submit.prevent='submitForm'>
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

const email = ref('');
const password = ref('');

const submitForm = () => {
  const userData = {
    email: email.value,
    password: password.value,
  };

  axios
    .post('http://localhost:3000/api/login', userData)
    .then(response => {
      console.log(response.data.message, 'logged in');
      // Handle success, e.g., redirect to a new route
    })
    .catch(error => {
      console.error(error.response.data.message);
      // Handle error, e.g., display an error message to the user
    });
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