<template>
  <div id="app" :style="{ backgroundImage: 'url(' + require('@/assets/fondoConsulaEmp.png')+')',
  }">
   <div class="container">
      <div class="row">
        <img class="img-fluid" alt="Vue logo" src="@/assets/logo.png">
      </div>
      <div class="row">
          <div class="col-12">
            <Navbarp></Navbarp> 
          </div> 
      </div>
        <div class="row justify-content-center align-items-center minh-100">
          <!--<router-view />-->
          <router-view />
        </div> 
      <div class="conteiner">
        <div class="row">
          <div class="col-12">
            <Footer></Footer>
            </div> 
          </div>
      </div>
      
    </div> 
  </div>
</template>

<script>
import Navbarp from './components/Navbarp.vue';
import Footer from './components/Footer.vue';


export default {
  name: 'App',
  components: {
    Navbarp, 
    Footer
  }
}
</script>

<style scoped>
img {
  margin: 1em;;
  float: left;
}
@media (max-width: 600px) {
  img {
    margin: 1em;;
    float: left;
    width: 15em;
  }
}
body{
  background-size:cover;
} 
.minh-100 {
  height: 60vh;
}
</style>