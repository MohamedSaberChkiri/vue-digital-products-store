<template>
  <div class="container3">
    <div class="image">
        <div class="inner-image">
            <div>
            <button>Add to Cart</button>
            <router-link :to="`/${id}`" class="show">Show</router-link>
            </div>
            
        </div>
      
    </div>
    <div class="bottom-section">
        <div class="title-price">
            <span>{{title}}</span>
            <span>  </span>
            <span>{{price}}$</span>
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
    id: Number,
  title: String,
  price: Number
  }
  }

</script>

<style scoped>


.inner-image{
    width: 100%;
    height: 75%;
    transition: .3s ease all;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 99;

}

.inner-image div{
    display: none;
    
    width: 50%;
    align-items: center;
    justify-content: space-between;
    
}

.inner-image div button, .show {
    border: none;
    background: transparent;
    color: rgba(0, 108, 196);

    cursor: pointer;
    font-size: 17px;
    text-decoration: none;

}
.inner-image:hover{
    background: rgba(36, 36, 36, 0.3);
   
}
.inner-image:hover div{
    display: flex;
}

.container3{
    width: 400px;
    height: 400px;
    background: #525252;
    position: relative;
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