<template>
  <div class="container3">
    <div class="image"></div>
    <div class="bottom-section">
        <div class="title-price">
            <span>title</span>
            <span> {{first}} </span>
            <span>99$</span>
        </div>
        <div class="uimage-name">
            <div class="user-image"></div>
            <div class="name">name</div>
        </div>
    </div>
  </div>
</template>

<script>


  export default {
  props: {
    first: String,
  }
  }

</script>

<style scoped>
.container3{
    width: 400px;
    height: 400px;
    background: #525252;
    
    border: none;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 40px rgba(0, 108, 196, .2);
}
.image{
    width:100%;
    height: 75%;
    background: rgb(255, 255, 255);
    
}
.bottom-section{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 25% ;
    background: white;
}
.title-price{
    width: 100%;
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.uimage-name{
    width: 50%;
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.user-image{
    width: 40px;
    height: 40px;
    border-radius:50% ;
    background: yellowgreen;
}
</style>