<template>


<div class="container4">
  <form @submit.prevent="submitForm">
    <h1>Register</h1>
    <h5>Open a FREE Account</h5>
    <div class="register-name">
      <input type="text" placeholder="First Name" v-model="firstname"> 
      <input type="text" placeholder="Last Name" v-model="lastname">
    </div>
    <input type="email" placeholder="Email" id="email" v-model="email">
    <input type="password" placeholder="Password" id="password" v-model="password">
    <input type="password" placeholder="Repeat Password" id="password">
    <input type="submit" value="Open An Account" id="submit">
    <router-link to="/Login" id="register-link">Already have an Account ?</router-link>
  </form>
</div>

</template>

<script setup>

import axios from 'axios';
import {ref} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()

const firstname = ref('');
const lastname = ref('');
const email = ref('');
const password = ref('');

const submitForm = () => {
  const userData = {
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    password: password.value,
  };

  axios
    .post('http://localhost:3000/api/register', userData)
    .then(response => {
      console.log(response.data.message);
      // Handle success
      router.push('/login')
    

    })
    .catch(error => {
      console.error(error.response.data.message);
      // Handle error
    });
};

</script>

<style scoped>


.register-name{
  display: flex;
  width: 80%;
  align-items: center;
  justify-content: space-around;
  height: 5vh;
}

input[type="text"]{
  height: 100%;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 2px 5px rgba(0, 108, 180, 0.1);
  padding-left: 5vh;
  font-size: 1.01rem;
  width: 35%;
}
.container4{
  min-width: 25%;
  max-width: 30%;
  height: 80vh;
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

input[type="email"],input[type="password"],input[type="submit"]{
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