<template>

<div class="container">
<div class="left-side">


       <div class="username" v-if="user">{{user.firstname}}</div>


        <div class="profile-picture">
            <div v-if="upp">
              <div class="image" :style="{ backgroundImage: 'url(../assets/profile_images/' + upp + ')' }">


              </div>
              </div>

             
              <form @submit.prevent="uploadProfileImage">
                <label for="profile-picture" id="change-p-label">Change Profile</label>
                <input type="file" placeholder="Change profile" ref="fileInputRef" id="profile-picture" name="uploadProfileImage">
                <input type="submit" value="Change">
              </form>
        </div>

        <div class="links-container">

            <router-link  to="/user/PersonalDetails" class="button" ref="defaultLink" autofocus>PERSONAL DETAILS</router-link >
            <router-link  to="/user/MyProducts" class="button">MY PRODUCTS</router-link >
            <router-link to="/user/PaymentMethod" class="button" >PAYMENT METHODS</router-link >
            <router-link  to="/user/ChangePassword" class="button" >CHANGE PASSWORD</router-link >
            <button @click="logout" class="button">Logout</button>
            <router-link to='/' class="button">go to store</router-link>
          
        </div>


</div>



<div class="right-side">

  <router-view/>

</div>


</div>






</template>

<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex'; // Import useStore from vuex

const user = ref(null);
const router = useRouter();
const store = useStore(); // Access the Vuex store instance
const upp = ref(null)

const defaultLink = ref(null);

onMounted(() => {
  if (defaultLink.value) {
    router.push(defaultLink.value.$props.to);
  }
});

const fetchUserProfile = async () => {
  try {
    const token = store.getters.authToken ;
    

    if (!token) {
      console.error('Token is missing');
      return;
    }

    const response = await axios.get('http://localhost:3000/api/user', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    

    user.value = response.data;
    upp.value = response.data.profile_picture
    console.log(upp.value)
    
  } catch (error) {
    console.error(error);
    // Handle unauthorized or other errors
  }
};
const token = localStorage.getItem('authToken');

const fileInputRef = ref(null);

const uploadProfileImage = async () => {
  const formData = new FormData();
  formData.append('uploadProfileImage', fileInputRef.value.files[0]);

  try {
    const response = await axios.post('http://localhost:3000/api/uploadProfileImage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log(response.data)
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};


const logout = async () => {
  try {
    await axios.post('http://localhost:3000/api/logout', {}, { withCredentials: true });
        // Clear the token from Vuex
    store.commit('setAuthToken', null);

    // Clear the token from localStorage
    localStorage.removeItem('authToken');
    router.push('/');
    window.location.reload()
    console.log('logged out')
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await fetchUserProfile(); // Wait for data before rendering
});
</script>


<style scoped>

form{
  display:flex;
  flex-direction: column;
}
input[type="submit"]{
  padding: 1vh;
  width: fit-content;
  border: 1px solid white;
  background: none;
  cursor: pointer;
  color: white;
}
#change-p-label{
  background: white;
  color: black;
  padding: 1vh;
}
#profile-picture{
    display: none;

}
.container{
  display: flex;
  
  width: 100%;
  height: fit-content;
}
.left-side{
 min-height: 100vh;
  width: 400px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background: #393D3F;
  color: #FDFDFF;
}
.links-container{
 
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  width: 100%;
  position: relative;
}
.links-container .button{
  width: 90%;
  cursor: pointer;
  border: none;
  background: transparent;
  color: white;
  font-size: 18px;
  height: 7vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px 0 0 30px;
  text-decoration: none;
  transition: .3s ease all;
  
}
.links-container .button:focus{
  background: #FDFDFF;
  color: #393D3F;
}

.profile-picture{
  
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.image{
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}
.username{
  font-size: 40px;
}
.right-side{
  width: fit-content;
  height: fit-content;
  margin: 0 auto;
}

</style>