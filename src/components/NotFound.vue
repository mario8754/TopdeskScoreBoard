

<template>
  <div >
  <img src= @/assets/logo.png height="200" width="100%" />

       <v-container >

    <div class="err">4</div>
    <i class="far fa-question-circle fa-spin"></i>
    <div class="err2">4</div>
    
    <div class="msg">
      <p style="margin-top:20px">Misschien is deze pagina verplaatst? of verwijderd? <br>Het kan ook zijn dat 
   het niet bestaat?</p>
   <div class="space">
<v-btn color="warning" @click="goBack()">Lets go back home</v-btn>
       </div>
       </div>

      </v-container>
        </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
<style scoped>
  .err {
    color: #64B5F6;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 11rem;
    position:absolute;
    left: 30%;
    top: 8%;
    margin-top:10rem
  }

.far {
  position: absolute;
  font-size: 8.5rem;
  left: 42%;
  top: 15%;
  color: #64B5F6;
      margin-top:10rem
}

 .err2 {
    color: #64B5F6;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 11rem;
    position:absolute;
    left: 56%;
    top: 8%;
        margin-top:10rem
  }

.msg {
    text-align: center;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.6rem;
    position:absolute;
    left: 12%;
    top: 45%;
    width: 75%;
    color:"orange";
        margin-top:6rem;
  }

a {
  text-decoration: none;
  color: white;
}

a:hover {
  text-decoration: underline;
}
</style>

