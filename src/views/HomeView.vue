<template>
    <HomeTop/>
    <ItemsView/>
    <div class="ct">
        <router-view/>
    </div>
     <FooterView/>
</template>

<script setup>
import HomeTop from '../components/HomeTop.vue'
import ItemsView from '../components/ItemsView.vue'
import FooterView from '../components/FooterView.vue'
</script>
