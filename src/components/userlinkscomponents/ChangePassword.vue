<template>
  <div class="container7">
    <input type="password" id="current" placeholder="CURRENT PASWORD" v-model="oldpassword">
    <h6 v-if="checkOldPass">current password is incorrect</h6>
    <input type="password" id="new" placeholder="NEW PASSWORD" v-model="newpassword">
    <p>password must be atleast 8 characters long including uppercase, letters, numbers and special caracters @#-_.,</p>
    <input type="password" id="repeat" placeholder="REPEAT NEW PASSWORD" v-model="repnewpassword">
    <h6 v-if="checkNewPass">New Password Does not Match</h6>
    <h6 v-if="passwordChanged" id="success">Password Changed Successfully</h6>
    <button @click="resetPassword">Reset</button>
  </div>
</template>

<script setup>
import axios from "axios"
import {ref}  from 'vue'

const oldpassword = ref('')
const newpassword = ref('')
const repnewpassword = ref('')

const passwordChanged = ref(false)

const checkOldPass = ref(false)
const checkNewPass = ref(false)

const token = localStorage.getItem('authToken');

const resetPassword = async () => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/changePassword',
      {
        oldpassword: oldpassword.value, 
        newpassword: newpassword.value,
        repnewpassword: repnewpassword.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    checkOldPass.value = response.data.falseOldpass;
    checkNewPass.value = response.data.passDontMatch;
    passwordChanged.value = response.data.success

   oldpassword.value = ''
   newpassword.value = ''
   repnewpassword.value = ''

  } catch (error) {
    // Handle errors here
    console.error(error);
  }
};

</script>

<style scoped>
#success{color: green;}
.container7{
  margin: 20vh auto;
  padding: 30px;
  width:400px;
  height: 350px;
  box-shadow: 0px 0px 20px rgba(75, 75, 75,.4);
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}

input{
  width: 300px;
  height: 6vh;
  padding-left: 5vh;
}
button{
  width: 300px;
  height: 5vh;
  border: 1px solid black;
  font-size: 17px;
  background: transparent;
  cursor: pointer;
}
p{
 
  width: 350px;
  font-size: 13px;
  color: grey;
}
h6{
  color: red;
}
</style>