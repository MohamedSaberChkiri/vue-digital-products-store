<template>

<div class="container">
<div class="left-side">


       <div class="username">username</div>


        <div class="profile-picture">
              <div class="image">image here</div>
              
              <button class="update-image"   style="color : white; font-size: 15px ;">Change Profile</button>
        </div>

        <div class="links-container">

            <router-link to="/user/PersonalDetails" class="button">PERSONAL DETAILS</router-link >
            <router-link  to="/user/MyProducts" class="button">MY PRODUCTS</router-link >
            <router-link to="/user/PaymentMethod" class="button" >PAYMENT METHODS</router-link >
            <router-link  to="/user/ChangePassword" class="button" >CHANGE PASSWORD</router-link >
          
        </div>


</div>



<div class="right-side">

  <router-view/>

</div>


</div>






</template>

<script>
export default {

}
</script>

<style scoped>

.update-image{
  width: 150px;
  border: 1px dashed #FDFDFF;
  display: flex;
  align-items: center;
  background: transparent;
  color: #FDFDFF;
  justify-content: center;
  height: 4vh;
  cursor: pointer;
}
.container{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: fit-content;
}
.left-side{
  height: 100vh;
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
  border: 1px solid black;
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