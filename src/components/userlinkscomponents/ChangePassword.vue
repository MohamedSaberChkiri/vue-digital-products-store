<template>
  <div class="container7">
    <input type="password" id="current" placeholder="CURRENT PASWORD">
    <input type="password" id="new" placeholder="NEW PASSWORD">
    <p>password must be atleast 8 characters long including uppercase, letters, numbers and special caracters @#-_.,</p>
    <input type="password" id="repeat" placeholder="REPEAT NEW PASSWORD">
    <button>Reset</button>
  </div>
</template>

<script>

</script>

<style scoped>

.container7{
  margin: 20vh auto;
  padding: 30px;
  width:400px;
  height: 350px;
  box-shadow: 0px 0px 20px rgba(75, 75, 75,.4);
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}

input{
  width: 300px;
  height: 6vh;
  padding-left: 5vh;
}
button{
  width: 300px;
  height: 5vh;
  border: 1px solid black;
  font-size: 17px;
  background: transparent;
  cursor: pointer;
}
p{
 
  width: 350px;
  font-size: 13px;
  color: grey;
}
</style>