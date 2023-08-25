<template>

<div class="container">
<div class="left-side">


       <div class="username">username</div>


        <div class="profile-picture">
              <div class="image">image here</div>
              <div class="update-image">Update Picture</div>
        </div>

        <div class="links-container">
          <div>PERSONAL DETAILS</div>
          <div>MY PRODUCTS</div>
          <div>PAYMENT METHODS</div>
          <div>CHANGE PASSWORD</div>
        
        </div>


</div>



<div class="right-side">



</div>


</div>






</template>

<script>
export default {

}
</script>

<style scoped>

.container{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: fit-content;
}
.left-side{
  height: 100vh;
  width: 400px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.links-container{
  border: 1px solid black;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  width: 100%;
}
.links-container div{
  width: 90%;
  border: 1px solid black;
  height: 7vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px 0 0 30px;
}

.profile-picture{
  border: 1px solid black;
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

</style>