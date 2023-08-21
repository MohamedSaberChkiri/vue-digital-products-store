<template>
  
  <div class="container1">
    <HeaderView/>
    <div class="sub-container">
        <h1>Tons of curated design resources to speed up your creative workflow.</h1>
        <h3>Join a growing family of designers and makers from around the world.</h3>
    </div>
  </div>
</template>

<script setup>
    import HeaderView from "./HeaderView.vue";

</script>

<style scoped>

.container1{
    width: 100%;
    height: fit-content;
    padding-bottom: 50px;
    background: #006cc4;
    color: white;
    
    
}
.sub-container{
    width: 40%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
   
    margin: 0 auto;
    
}
h1{
    width: 100%;
    font-size: 45px;
    margin-top: 50px;
   text-align: center;
  
}
h3{
    color: rgba(255, 255, 255,.6);
    margin-top: 30px;
}


</style>