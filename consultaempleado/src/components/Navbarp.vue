<template>
  <div>
  <b-navbar toggleable="lg" class="navbar navbar-inverse rounded" style="background-color: #85C1E9;" >
    <b-navbar-brand href="#"></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" >
        <b-nav-item-dropdown right v-if="userLogin" >
          <template #button-content>
            <em>{{ userLogin }}</em>
          </template>
          <b-dropdown-item href="javascript:void(0);" v-on:click="cerrarSesion();">Salir</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
export default {
  name: 'Navbarp',
 /* data() {
        return {
            nombreCompleto1: '',
        }
  },
  mounted() {
      //if (localStorage.nombreCompleto) {
      this.nombreCompleto = this.userLogin;
      //}
      //console.log(this.$store.getters);

  },*/
  computed: {
    /*if(localStorage.getItem('nombre_completo')) {
        this.nombreCompleto= localStorage.getItem('nombre_completo');
    }*/
    ...mapGetters(['userLogin']),
  },
  methods: {
       ...mapMutations([ 'setNombreCompleto' ]),
        cerrarSesion(){
            //console.log('cerrar sesion');
            //localStorage.clear(); //borra todo el localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('nombre_completo');
            this.$router.push('/');
            this.setNombreCompleto('');
            //this.setToken('');
        }  
    },
}
</script>
<style scoped>
.nombreSesion {
  font: 12px raro courier;
}
</style>