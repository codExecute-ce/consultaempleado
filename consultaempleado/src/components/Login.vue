<template>
    <div class="login-popup-wrap new_login_popup pl-3 pr-3"> 
        <div class="login-popup-heading text-center pb-4">
            <h4><i class="fa fa-lock" aria-hidden="true"></i> CONSULTA EMPLEADO SSP_CDMX</h4>                        
        </div>
                                <!--<form accept-charset="utf-8" method="post" action="">-->
        <form @submit.prevent="loginUsuario();">
            <div class="form-group">
                <input type="text" class="form-control" id="user_id" placeholder="Ingresa usuario" name="user_id" v-model="formLogin.campoUsuario" aria-autocomplete="off">
                <div class="error" v-if="submited && !$v.formLogin.campoUsuario.required">Ingresa Usuario.</div>
            </div>
            <div class="form-group">
                <input type="password" class="form-control" id="password" placeholder="Ingresa password" name="password" v-model="formLogin.campoPassword">
                <div :class="error" v-if="submited && !$v.formLogin.campoPassword.required">Ingresa Password.</div>
                <div :class="error" v-if="submited && !$v.formLogin.campoPassword.minLength">Ingresar minimo 6 caracteres.</div>
            </div>
            <div class="pt-.5">
                <button type="submit" class="btn btn-default login-popup-btn" name="submit" value="1">Ingresar</button>
            </div>
            <div v-show="gifLoadin" class="text-center">
                <img :class="'gifLoadin'" :src="`http://3.130.54.182/fotoEmpleado/gifLoading.gif`">
            </div>
            <div v-if="!alertCredencial" class="alert alert-danger mt-2 text-center" role="alert">
                Credenciales no validas...!
            </div>
        </form>
        <div class="form-group text-center pt-1">
            <a class="pwd-forget" href="javascript:void(0)" id="open_forgotPassword">Olvidaste Password</a>
        </div>
        <div class="text-center">No te encuentras registrado?<a href="#"> click aqui...!</a></div>
    </div>
</template>


<script>
import { required, minLength} from 'vuelidate/lib/validators';
import { mapMutations } from 'vuex'
import axios from 'axios';


    export default {
        name: 'Login',
        data(){
            return {
                submited: false,
                formLogin : {
                    campoUsuario : '',
                    campoPassword: '',
                },
                alertCredencial : true,
                gifLoadin: false,
            }
        },
        methods: {
            ...mapMutations([
                'setNombreCompleto',
                'setToken'
            ]),
            /*loginUsuario(){ 
                this.submited = true;
                this.$v.$touch()
                if(this.$v.$invalid){
                    return false;
                }
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        campoUsuario: this.formLogin.campoUsuario,
                        campoPassword: this.formLogin.campoPassword
                    })
                };
                fetch('http://172.29.21.81:81/loginAcceso', requestOptions)
                    .then(async response => {
                    const data = await response.json();

                    // check for error response
                   /* if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }

                    this.postId = data.id;
                         if (data.status) {
                            this.alertCredencial = data.status;
                            localStorage.setItem('token', data.token);
                            localStorage.setItem('nombre_completo', data.dataEmpleado[0].nombre_completo);
                            this.$router.push('/listaEmpleado');
                            this.setNombreCompleto(data.dataEmpleado[0].nombre_completo);
                            //this.setToken(response.data.token);
                        } else{
                            this.gifLoadin = false;
                            this.formLogin.campoUsuario = '';
                            this.formLogin.campoPassword = '';
                            this.alertCredencial = data.status;
                        }
                    })
                    .catch(error => {
                        this.errorMessage = error;
                        console.error('There was an error!', error);
                    });
            }*/
            loginUsuario(){ 
                //console.log(this.formLogin.campoUsuario+this.formLogin.campoUsuario);
                this.submited = true;
                this.$v.$touch()
                if(this.$v.$invalid){
                    return false;
                }
                var axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        //'Access-Control-Allow-Origin': '*',
                        //'Access-Control-Max-Age': '60 * 60 * 24',
                        //'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                        //'Access-Control-Allow-Headers': 'Content-Type',
                        //'Access-Control-Allow-Methods': 'POST',
                        //'Accept': 'application/json',
                    }
                };
                axios.post('http://172.29.21.81:81/loginAcceso', {
                    campoUsuario: this.formLogin.campoUsuario,
                    campoPassword: this.formLogin.campoPassword
                }, axiosConfig).then(
                    this.gifLoadin = true
                ).then(response => {
                    if (response.data.status) {
                        this.alertCredencial = response.data.status;
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('nombre_completo', response.data.dataEmpleado[0].nombre_completo);
                        this.$router.push('/listaEmpleado');
                        this.setNombreCompleto(response.data.dataEmpleado[0].nombre_completo);
                      //this.setToken(response.data.token);
                    } else{
                        this.gifLoadin = false;
                        this.formLogin.campoUsuario = '';
                        this.formLogin.campoPassword = '';
                        this.alertCredencial = response.data.status;
                    }
                }).catch(function (error) { 
                        console.log(error);
                });
            }//method login
        },//cierre methods
        validations: {
            formLogin:{
                campoUsuario: {
                    required
                },
                campoPassword: {
                    required,
                    minLength: minLength(6)
                }
            }
         }
    }
</script>
<style scoped>
.login-popup-heading>h4 {
    color: #258b47;
    font-size: 18px;
    line-height: 30px;
}
.new_reg_popup, .new_login_popup {
    border-radius: 2px;
    min-height: 332px;
    width: 400px;
    margin: 0px auto;
}
.login-popup-btn {
    background: #258b47;
    border: none;
    border-radius: 25px;
    color: #fff;
    display: block;
    font-size: 18px;
    height: 38px;
    line-height: 28px;
    margin: 20px auto 5px;
    width: 150px;
    -webkit-transition: all 700ms ease;
    -moz-transition: all 700ms ease;
    -ms-transition: all 700ms ease;
    -o-transition: all 700ms ease;
}
a{
     color: #258b47;
     font-size: 18px;
}
.error {
    color: #FF0000;
    font-size: 10px;
}
.gifLoadin {
    height:1em;
}
</style>