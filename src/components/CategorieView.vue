<template>
  <div class="container2">
    <router-link to='/trending' autofocus class="ct-link">Trending</router-link>
    <router-link to='/latest' class="ct-link">Latest</router-link>
    <router-link to='/featured' class="ct-link">Featured</router-link>

  </div>
</template>

<script setup>
import {onMounted} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()

onMounted(()=>{
    router.push('/trending')
})



</script>

<style scoped>
.container2{
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 25%;
    height: 10vh;
    margin: 5vh auto;
    
    
}

.ct-link{
    text-decoration: none;
    color: rgba(0, 108, 196, 1);
    font-size: 17px;
    border:1px solid #006cc4;
    height: 4vh;
    display: flex;
    align-items: center;
    padding: 0 30px 0 30px;
    border-radius: 20px;
    transition: .3s ease all;
}

.ct-link:focus{
    background: #006cc4;
    
    color: white;
}
</style>