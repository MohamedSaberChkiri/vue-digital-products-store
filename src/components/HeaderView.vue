<template>
  <div class="container">
    <div class="logo">Digify</div>
    <div class="search-bar"><input type="text" placeholder="Search..." @click="callParentFunction" v-model="dataValue" @input="handleData"/></div>
    <div class="user-links">
      <router-link to="/login" class="link" v-if="!showUser">Login</router-link>
      <router-link to="/register" class="link" v-if="!showUser">Sign Up</router-link>
      <router-link to="/user" class="link" v-if="showUser">My Profile</router-link>
      <router-link to="/cart" class="link" id="cart">Cart </router-link>
      
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex'; // Import useStore from vuex


export default {
  props: {
    triggerFunction: Function,
  },
  setup(props, context) {
    const dataValue = ref('');
    const store = useStore()
    const token = store.getters.authToken;
    let showUser = ref(false)
    if (token){
      showUser.value = true
    } else{
      showUser.value = false
    }

    function handleData(){
      context.emit('inputData', dataValue.value)
    }

    const callParentFunction = () => {
      if (props.triggerFunction) {
        props.triggerFunction();
      }
    };

    return {
      dataValue,
      callParentFunction,
      handleData,
      showUser
    };
  },
};
</script>

<style scoped>
.container{
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 15vh;
  background: transparent;
}
.logo{
  font-size: 3rem;
  font-weight: bolder;
}
input[type='text']{
  width: 30vw;
  height: 5vh;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 2px 60px rgba(255, 255, 255, 0.3);
  padding-left: 3vw;
  outline: none;
  background: rgba(255, 255, 255, 0.9);
  font-size: 17px;
}
.user-links{
  width: 190px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50%;
  
  
}
.link{
  text-decoration: none;
  color: white;
  font-size: 17px;
  border-bottom: 2px solid transparent;
  height: 40%;
  transition: .3s ease all;
 
}
.link:hover{
  border-bottom: 2px solid white;
}

</style>