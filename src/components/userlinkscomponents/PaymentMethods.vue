<template>

  <div class="container9">


    <div class="method">
            <router-link class="card m" to='/user/PaymentMethod/card'> credit/debit Card</router-link>
          <router-link class="paypal m" to='/user/PaymentMethod/paypal'>PayPal</router-link>
          <router-link class="bank m" to='/user/PaymentMethod/bank'>Bank Account</router-link>
    </div>


  <div class="method-details">
      <router-view/>
  </div>

  </div>


</template>

<script>

</script>

<style scoped>
.card,.paypal,.bank{
  width: 300px;
  height: 15vh;
  border: 4px solid rgb(223, 223, 223);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  color: black;
  font-size: 20px;
}
.m:focus{
  border: 4px solid green;
}

.method{
  display: flex;
  gap: 2vh;
  flex-wrap: wrap;
  height: fit-content;
  
  
}
.container9{
  
  margin: 5vh auto;
  
  
  
}

.method-details{
  width: 350px;
  height: 300px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

</style>