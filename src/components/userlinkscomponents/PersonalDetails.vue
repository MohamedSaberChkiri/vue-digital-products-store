<template>
  <div class="container6">

      <img class="profile-pic" :src="imagepicture">

      <form @submit.prevent v-if="user">
        <input type="text" :value="username.firstname">
        <input type="text" :value="userlastname.lastname">
        <input type="email" :value="emailaddress.email">
        <div id="yob">  
            <label >Birthday</label>
            <input type="date">
          </div>
      
        <div id="gender-container">
            <div class="r1"><span>Male</span><input type="checkbox" v-model="isChecked"></div>
            <div class="r2"><span>Female</span><input type="checkbox" v-model="isChecked2"></div>
          
        </div>
        
        <input type="submit" value="Submit" id="submitbutton">

      </form>

  </div>
</template>

<script>
import { ref, watch, toRef } from 'vue';

export default {

 props: {
  user: Object, // Adjust the type as per your data structure
  image : String
},


  setup(props) {
    const isChecked = ref(false);
    const isChecked2 = ref(false);

    watch(isChecked, (newValue) => {
      if (newValue) {
        isChecked2.value = false;
      }
    });

  
    watch(isChecked2, (newValue) => {
      if (newValue) {
        isChecked.value = false;
      }
    });

   
    const username = toRef(props, 'user');
    const userlastname = toRef(props, 'user');
    const emailaddress = toRef(props, 'user');
    const imagepicture = toRef(props, 'image');


    return {
      isChecked,
      isChecked2,
      username,
      userlastname,
      emailaddress,
      imagepicture
     
    
    };
  },
};
</script>


<style scoped>

#submitbutton{
  width: 100px;
  padding: .5vh;
  background: none;
  color: black;
  border: 1px solid grey;
  cursor: pointer;
}


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

.profile-pic {
  display: flex;
  align-items: center;
  justify-content: center;
}

  .profile-pic{
    width: 100px;
    height: 100px;
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0px 0px 10px black;
    
  }
 
  #yob{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1vh;
  }
  #gender-container{
    width: 300px;
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