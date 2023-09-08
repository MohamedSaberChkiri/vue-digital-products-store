<template>
    <HomeTop/>
    <ItemsView/>
    <div class="ct">
        <router-view :productsArray="productsArray"/>
    </div>
    <div class="div"><FooterView/></div>
     
</template>

<script>
import HomeTop from '../components/HomeTop.vue'
import ItemsView from '../components/ItemsView.vue'
import FooterView from '../components/FooterView.vue'

export default{
    components :{
        HomeTop,
        ItemsView,
        FooterView
    },
    props:{
        productsArray : Array
    }
}
</script>

<style scoped>
.div{
    
    width: 100%;
   
}
</style>