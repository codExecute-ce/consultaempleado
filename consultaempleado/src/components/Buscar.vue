<template>
    <b-container>
        <div class="mt-3">
            <b-form @submit.prevent="listaEmpleado();">
                <b-input-group class="col-lg-8 col-md-8 col-xs-12">
                    <b-form-input :class="{'form-group--error': submited && !$v.formBuscar.campoBuscar.required}"
                    placeholder="Núm Emp / RFC / Nombre" 
                    ref="campoBuscar" onkeyup="javascript:this.value=this.value.toUpperCase();"
                     v-model="formBuscar.campoBuscar" ></b-form-input>
                    <template #append>
                        <button type="submit" class="btn btn-success">
                        <b-icon icon="chevron-double-right" style="color: #7952b3;"></b-icon> Buscar</button>
                    </template>
                </b-input-group>
            </b-form>

            <div v-show="gifLoadin" class="container col-12 text-center">
                <img :class="'gifLoadin'" :src="`http://3.130.54.182/fotoEmpleado/gifLoading.gif`">
            </div>
        </div>
        <div :class="'scrollClass'">
            <table class="table table-sm" >
                <thead>
                    <tr>
                        <th class="d-none d-sm-block text-center">NÚM EMP</th>
                        <th class="text-center">RFC</th>
                        <th class="text-center">NOMBRE</th>
                        <th class="text-center">UNIDAD ADMVA.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in listaRespuesta" :key="item.id"> 
                        <td class="d-none d-sm-block" > 
                            <a v-if="item.estatus == 'ACTIVO'" :class="'activo'" v-on:click="modalDetalleEmp(item.rfc)" href="#">{{item.num_emp}}</a>
                            <a v-if="item.estatus == 'INACTIVO' || item.estatus == 'TEMPORAL'" :class="'inactivo'" v-on:click="modalDetalleEmp(item.rfc)" href="#">{{item.num_emp}}</a>
                            <a v-if="item.estatus != 'ACTIVO' && item.estatus != 'INACTIVO' && item.estatus != 'TEMPORAL'" :class="'licencia'" v-on:click="modalDetalleEmp(item.rfc)" href="#">{{item.num_emp}}</a>
                        </td>
                        <td>
                            <a  v-on:click="modalDetalleEmp(item.rfc)" href="#">{{item.rfc}}</a><a v-if="item.estatus != 'ACTIVO' && item.estatus != 'INACTIVO' && item.estatus != 'TEMPORAL'" :class="'licencia'" v-on:click="modalDetalleEmp(item.rfc)" href="#">{{item.rfc}}</a>
                        </td>
                        <td>{{item.nombre_completo}}</td> 
                        <td>{{item.unidad_adm}}</td> 
                    </tr>
                </tbody>
            </table>
        </div>
        <DetalleEmpleado v-show="showModal" :dataEmpleado.sync="dataEmpleado" @close="closeModal"></DetalleEmpleado>
    </b-container>
</template>
<script>
/* export default {
  name: 'Buscar'
} */
import DetalleEmpleado from './DetalleEmpleado.vue';
import { required} from 'vuelidate/lib/validators';
import axios from 'axios';

export default {
    name: 'Buscar',
    components: {
        DetalleEmpleado
    },
    data(){
        return {
            formBuscar : {
                campoBuscar : ''
            },
            listaRespuesta: [],
            showModal: false,
            dataEmpleado: [],
            gifLoadin: false,
            submited: false,
            token: localStorage.getItem('token')
            
        }
    },
    mounted() {
        this.$refs.campoBuscar.focus();
        if(!this.token) {
          this.$router.push('/');
        } 
       
    },
    methods: {
        async listaEmpleado(){ 
            //console.log(this.formBuscar.campoBuscar);
            this.submited = true;
            this.$v.$touch()
            if(this.$v.$invalid){
                return false;
            }
            let config = {
                headers:{
                    'Content-Type': "application/json",
                    'authorization': 'Bearer '+this.token
                },
            };
            await axios.post("http://172.29.21.81:81/listaEmpleado",{ 'campoBuscar': this.formBuscar.campoBuscar }, config)
            .then(
                this.gifLoadin = true
            ).then(response => {
                this.listaRespuesta=response.data.dataEmp;
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.gifLoadin = false;
                this.submited = false;
                this.formBuscar.campoBuscar= '';
                this.$refs.campoBuscar.focus();
            });
        },
        modalDetalleEmp(rfcEmpleado){
            //console.log(rfcEmpleado);
            //axios.get("http://3.130.54.182:81/detalleEmpleado/"+rfcEmpleado)
            axios.get("http://172.29.21.81:81/detalleEmpleado/"+rfcEmpleado)
            .then(respuesta => {
                this.showModal = true; 
                this.dataEmpleado=respuesta.data;
            }).catch(error => {
                console.log(error);
            });
        },
        closeModal() {
            this.showModal = false;
            this.dataEmpleado = ''; 
        }
    },
    validations: {
        formBuscar:{
            campoBuscar: {
                required
            }
        }
    }
}
</script>
<style scoped>
 .activo {
    text-decoration: underline 2.5px solid green;
 }
.inactivo {
    text-decoration: underline 2.5px solid red;
 }
 .licencia {
    text-decoration: underline 2.5px solid yellow;
 }
.scrollClass {
  margin-top: .5em;
  height:30em;
  overflow-y: scroll;
}
.gifLoadin {
    height:1em;
}
.form-group--error {
    border-color: #FF0000;
}
</style>