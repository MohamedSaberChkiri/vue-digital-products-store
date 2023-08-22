<template>
  
  <div class="details-container">
    <div class="sub-container1"><div class="div">Back</div>
    <div class="item-image">here goes the image</div></div>
    
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
  background: rgba(0, 0, 0, .3);
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.sub-container1{
  width: 65%;
  height: 80%;
  border: 1px solid black;
}
.right-panel{
  width: 25%;
  height: 80%;
  border: 1px solid brown;
}

.item-image{
  width: 90%;
  height: 80%;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>