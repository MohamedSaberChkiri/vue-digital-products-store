<template>
    <HomeTop/>
    <ItemsView/>
    <div class="ct">
        <router-view/>
    </div>
</template>

<script setup>
import HomeTop from '../components/HomeTop.vue'
import ItemsView from '../components/ItemsView.vue'
</script>
