<template>
    <HomeTop/>
    <ItemsView/>
    <div class="ct">
        <router-view/>
    </div>
    <div class="div"><FooterView/></div>
     
</template>

<script setup>
import HomeTop from '../components/HomeTop.vue'
import ItemsView from '../components/ItemsView.vue'
import FooterView from '../components/FooterView.vue'
</script>

<style scoped>
.div{
    
    width: 100%;
   
}
</style>