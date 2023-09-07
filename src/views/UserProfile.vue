<template>

<div class="container">
<div class="left-side">


       <div class="username" v-if="user">{{user.firstname}}</div>


        <div class="profile-picture">
          
             <img :src='userProfilePicture' alt="Profile Picture" />

             
              <div class="profile-changer">
                <label for="image-field" id="profile-label">Choose Picture</label>
                <input type="file" @change="handleFileUpload" id="image-field"/>
                <button @click="uploadProfilePicture" id="upload-image-button" :disabled="!selectedFile">Upload</button>
              </div>
        </div>

        <div class="links-container">

            <router-link  to="/user/PersonalDetails" class="button" ref="defaultLink" >PERSONAL DETAILS</router-link >
            <router-link  to="/user/MyProducts" class="button">MY PRODUCTS</router-link >
            <router-link to="/user/PaymentMethod" class="button" >PAYMENT METHODS</router-link >
            <router-link  to="/user/ChangePassword" class="button" >CHANGE PASSWORD</router-link >
            <button @click="logout" class="button ss">Logout</button>
            <router-link to='/' class="button ss">go to store</router-link>
          
        </div>


</div>



<div class="right-side">

  <router-view v-if="user" :user="user" :image="userProfilePicture" :userProducts="userProducts"/>

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
const userProducts = ref(null)

const defaultLink = ref(null);



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

    const response2 = await axios.get('http://localhost:3000/api/getUserProducts',{
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
    userProducts.value = response2.data
    

    user.value = response.data;
  
    
    
  } catch (error) {
    console.error(error);
    // Handle unauthorized or other errors
  }
};
const token = localStorage.getItem('authToken');


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

const selectedFile = ref(null);
const userProfilePicture = ref('');

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0];
};

const uploadProfilePicture = () => {
  const token = store.getters.authToken ;
  const formData = new FormData();
  formData.append('profilePicture', selectedFile.value);

  // Make an API request to upload the profile picture
axios.post('http://localhost:3000/api/upload', formData, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
    .then((response) => {
      // Assuming the server returns the profile picture URL
      userProfilePicture.value = response.data.profilePictureUrl;
      location.reload()
    })
    .catch((error) => {
      console.error(error);
      // Handle errors as needed
    });
};

onMounted(async () => {
  await fetchUserProfile(); // Wait for data before rendering


    axios.get('http://localhost:3000/api/user/profile-picture',{
      headers:{
        Authorization: `Bearer ${token}`,
      }
    }) // Adjust the endpoint accordingly
    .then((response) => {
      userProfilePicture.value = 'http://localhost:3000/uploads/' + response.data.profile_picture;
      
    })
    .catch((error) => {
      console.error(error);
      // Handle errors as needed
    });
});
</script>


<style scoped>
#upload-image-button{
  padding: .5vh 2vh;
  border: 1px solid white;
  border-radius: 5px;
  cursor: pointer;
}
.profile-changer{
  
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  width: 200px;
  height: 80px;
}
#image-field{
  display: none;
}

#profile-label{
  border: 1px dashed white;
  padding: .5vh 2vh;
  cursor: pointer;
}


img{
  width: 100px;
  height: 100px;
  border: 3px solid white;
  border-radius: 50%;
  
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
.button.ss{
  border: 1px solid white;
  border-radius: 0;
  width: 30%;
  margin: 0 auto;
  height: 5vh;
  background: white;
  color: black;
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