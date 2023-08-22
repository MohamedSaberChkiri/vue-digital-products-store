<template>
  
  <div class="details-container">
      <div class="sub-container1">
        <div class="back">Back</div>
        <div class="item-image">here goes the image</div>
      </div>
    
    <div class="right-panel">
      <div class="publisher">
        <div class="profile-image"></div>
        <div class="pub-name"> user name</div>
         {{items[0].id}}
      </div>

    </div>

   
  </div>

</template>

<script setup>
import {items} from '../data/items'
</script>

<style scoped>


.details-container{
  width: 100%;
  height: 100vh;
  
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.sub-container1{
  width: 65%;
  height: 80%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 
  box-shadow: 0px 2px 40px rgba(0, 0, 0, 0.2);
}
.back{
  width: 90%;
  height: 5vh;
  margin-bottom: 2vh;
  display: flex;
  align-items: center;
}
.right-panel{
  width: 25%;
  height: 80%;
  border: 1px solid brown;
}

.item-image{
  width: 90%;
  height: 80%;
 box-shadow: 0px 2px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>