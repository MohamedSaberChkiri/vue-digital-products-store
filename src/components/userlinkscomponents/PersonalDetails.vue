<template>
  <div class="container6">

      <div class="profile-pic">image here <span>C</span></div>

      <form @submit.prevent>
        <input type="text" value="first name">
        <input type="text" value="last name">
        <input type="email" value="email@example.com">
        <div id="yob">  
            <label >Birthday</label>
            <input type="date">
          </div>
      
        <div id="gender-container">
            <div class="r1"><span>Male</span><input type="checkbox" v-model="isChecked"></div>
            <div class="r2"><span>Female</span><input type="checkbox" v-model="isChecked2"></div>
          
        </div>
        


      </form>

  </div>
</template>

<script setup>
import {ref, watch} from 'vue'

const isChecked= ref(false)
const isChecked2= ref(false)

  watch(isChecked, (newValue) => {
      if (newValue) {
        isChecked2.value = false;
      }
    });

    // Watch for changes in isCheckedB and update isCheckedA accordingly
    watch(isChecked2, (newValue) => {
      if (newValue) {
        isChecked.value = false;
      }
    });
</script>

<style scoped>


.container6{
  margin: 5vh  auto;
  box-shadow: 0px 0px 20px rgba(78, 78, 78,0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5vh;
}
form{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5vh;
  
  width: 400px;
  height: 600px;
  
  }

  input[type="text"], input[type="email"]{
    width: 350px;
    height: 5vh;
    border: none;
    border-bottom: 1px solid black;
    font-size: 17px;
    outline: none;

  }

.profile-pic , .profile-pic span {
  display: flex;
  align-items: center;
  justify-content: center;
}

  .profile-pic{
    width: 100px;
    height: 100px;
    border: 1px solid black;
    position: relative;
  }
  .profile-pic span{
    width: 20px;
    height: 20px;
    border: 1px solid black;
    position: absolute;
    top: 90px;
    right: -10px;
  }
  #yob{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1vh;
  }
  #gender-container{
    width: 80%;
    height: fit-content;
    
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  #gender-container div{
   
    height: 5vh;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
</style>