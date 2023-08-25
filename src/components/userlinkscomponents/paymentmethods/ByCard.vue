<template>
    
    <div class="card-details-container">
        <input type="text" placeholder="Name On Card">
        <input type="text" placeholder="Card Number">
        <input type="text" placeholder="CVV">
        <input type="text" placeholder="Expiration Date">
    </div>
 

</template>

<script>
export default {

}
</script>

<style scoped>
.card-details-container{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1vh;
    width: 100%;
}
input{
    width: 80%;
    height: 4vh;
    padding-left: 2vh;
    outline: none;
}


</style>