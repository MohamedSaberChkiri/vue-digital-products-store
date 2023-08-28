<template>
  <div class="footer-container">

    <div class="left">
        <h2>Legal</h2>
        <ul>
            <li>Terms and Conditions</li>
            <li>Privacy Policy</li>
            <li>Terms of use</li>
        </ul>
    </div>

    <div class="middle">
        <p>Subscribe to recieve the newest offers</p>
        <input type="email" placeholder="Email">
        <button>Subscribe Now</button>
    </div>

   
   
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.footer-container{
    width: 100%;
    min-height: 25vh;
    max-height: fit-content;
    margin-top: 5vh;
    background: rgb(0, 144, 201);
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 5vh;
    padding: 2vh 0 ;
  
}
.middle{
    display: flex;
    flex-direction: column;
    width: fit-content;
    height: fit-content;
    
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2vh;
}
input{
    width: 300px;
    height: 5vh;
    border-radius: 30px;
    border: none;
    padding-left: 3vh;
    font-size: 16px;
    outline: none;
}
button{
    
    background:white;
    border:1px solid white ;
    padding: 1vh 2vh;
    color: rgb(0, 144, 201);
    cursor: pointer;
    border-radius: 20px;
    font-size: 18px;
}
p{
    color: white;
}
ul{
    display: flex;
    flex-direction: column;
    
}
.left{
   
    height: 150px;
    color: white;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-around;
}
ul{
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-around;
    height: 50%;
}
li{
   list-style: none;
}

</style>