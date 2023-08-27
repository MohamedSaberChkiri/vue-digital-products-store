<template>
  <div class="centered-container">
    <div class="centered-div">
      <SingleItem/>
      <SingleItem/>
      <SingleItem/>
      <SingleItem/>
      <SingleItem/>
    </div>
  </div>
</template>

<script setup>
import SingleItem from './SingleItem.vue'





</script>

<style scoped>
.centered-container {
  position: fixed;
  top: 120px; /* Set the top margin to create space */
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align items to the top */
  z-index: 1000; /* Set the desired z-index */
  width: 100%;
  height: 100%;
  background: rgba(58, 58, 58,.5);
}

.centered-div {
  background: rgba(58, 58, 58,.7);
  padding: 3vh;
  overflow: auto;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 3vh;
  max-height: calc(100vh - 50px); /* Subtracting the top margin */
  min-height: 400px;
  width: 80%; /* Adjust as needed */
}
</style>

