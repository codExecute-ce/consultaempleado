<template>
	<div>
		<div :class="'modal-mask'" role="document" >
			<div class="modal-dialog modal-xl">
				<div class="modal-content" >
					<div class="modal-header">
						<h4 class="modal-title"></h4>
						<button type="button" class="close" @click="close" ><span aria-hidden="true">&times;</span></button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-sm-12 col-md-3 col-lg-3 text-center" >
								<div class="mb-2">
									<img v-if="dataEmpleado[2]" :class="'fotoEmp'" :src="`http://3.130.54.182/fotoEmpleado/${dataEmpleado[2]}.png`">
									<br>
									<div v-for="item in dataEmpleado[0]" :key="item.id">
										<FONT FACE="raro, courier" SIZE=5 COLOR="blue">{{item.nombre_completo}}</FONT><br>
										<FONT FACE="raro, courier" SIZE=3 ><B>Dirección:</B></FONT><br>	
										<FONT FACE="raro, courier" SIZE=2 ><B>C.</B> {{item.calle}} {{item.numero_interior}}, <B>Col.</B> {{item.colonia}}, <B>Del.</B> {{item.delegacion}}, <B>CP.</B> {{item.codigo_postal}}</FONT>
									</div>
								</div>
							</div>
							<div class="col-sm-12 col-md-9 col-lg-9">
								<b-card class="mt-1" no-body>
									<b-tabs card >
										<b-tab no-body title="Laboral">
											<div class="p-1" v-for="item in dataEmpleado[0]" :key="item.id" :class="'scrollClass'">
												<FONT FACE="raro, courier" SIZE=3 ><B>Estatus:</B> {{item.estatus}}</FONT><br>
												<FONT FACE="raro, courier" SIZE=3 ><B>RFC:</B> {{item.rfc}}</FONT><br>
												<FONT FACE="raro, courier" SIZE=3 ><B>CURP:</B> {{item.curp}}</FONT><br>
												<FONT FACE="raro, courier" SIZE=3 ><B>Núm Empleado:</B> {{item.num_emp}}</FONT><br>
												<FONT FACE="raro, courier" SIZE=3 ><B>Fecha Ingreso Gob:</B> {{item.fec_ing_gob}}</FONT><br>
												<FONT FACE="raro, courier" SIZE=3 ><B>Unidad Adm:</B> {{item.unidad_adm}}</FONT><br>
												<FONT FACE="raro, courier" SIZE=3 ><B>Centro de Tra:</B> {{item.unidad_adm}}</FONT><br>
												<FONT FACE="raro, courier" SIZE=3 ><B>Puesto:</B> {{item.descripcion_puesto}}</FONT><br>
												<FONT FACE="raro, courier" SIZE=3 ><B>Tipo Nómina:</B> {{item.tipo_nomina}}</FONT><br>
												<FONT FACE="raro, courier" SIZE=3 ><B>Sindicato:</B> <label v-if="item.sindicato == 'Si'"> {{item.sindicato}} </label><label v-else>No</label></FONT><br>
												<FONT FACE="raro, courier" SIZE=3 ><B>Sueldo Bruto Mensual: $</B>{{item.sueldo_bruto}}</FONT><br>
												<FONT FACE="raro, courier" SIZE=3 ><B>Sueldo Neto Mensual: $</B>{{item.sueldo_neto}}</FONT><br>
												<FONT FACE="raro, courier" SIZE=3 ><B>Fecha Baja:</B> {{item.fec_baja}}</FONT><br>
											</div>
										</b-tab>
										<b-tab no-body title="Historial">
											<div class="p-1" :class="'scrollClass'">
														<table class="table table-responsive table-striped table-bordered table-hover">
															<tr>
																<th scope="col">Fec Inicio</th>
																<th scope="col">Último Movto</th>
																<th scope="col">Des Puesto</th>
																<th scope="col">Unidad Adm</th>
															</tr>
															<!--<tr v-for="itemH in dataEmpleado[1]" :key="itemH.id">-->
															<tr v-for="itemH in dataEmpleado[0]" :key="itemH.id">
																<td>{{itemH.fec_ini}}</td>
																<td>{{itemH.ultimo_movto}}</td>
																<td>{{itemH.descripcion_puesto}}</td>
																<td>{{itemH.unidad_adm}}</td>
															</tr>		
														</table>
											</div>
										</b-tab>
										<b-tab no-body title="Personal">
											<div class="p-1" v-for="item in dataEmpleado[0]" :key="item.id" :class="'scrollClass'">
												<FONT FACE="raro, courier" SIZE=2 ><B>Sexo:</B> {{item.sexo}}</FONT><br>
												<FONT FACE="raro, courier" SIZE=2 ><B>Escolaridad:</B> {{item.escolaridad}}</FONT><br>
												<FONT FACE="raro, courier" SIZE=2 ><B>Carrera:</B> {{item.carrera}}</FONT><br>
												<FONT FACE="raro, courier" SIZE=2 ><B>Institucion Educativa:</B> {{item.institucion_educ}}</FONT><br>
											</div>
										</b-tab>
									</b-tabs>
								</b-card>
							</div>
						</div>
						<div class="modal-footer" style="margin-top: 1em;">
							<button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close" >Cerrar</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
  export default {
	name: 'DetalleEmpleado',
	props: ['dataEmpleado'],
    methods: {
      close() {
        this.$emit('close');
      }
    },
  };
</script>
<style>
.modal-mask {
	position: fixed;
    z-index: 9999;
	top: 0;
	left: 0;
	width: 100%;
	height: 111%;
	background-color: rgba(0, 0, 0, .5);
	display: block;
	transition: opacity .3s ease;
}
.scrollClass {
  margin-top: .5em;
  height: 20em;
  overflow-y: scroll;
}
@media (max-width: 600px) {
  .scrollClass {
	margin-top: .5em;
	height: 13.5em;
	overflow-y: scroll;
	}
}

.fotoEmp {
	width: 5.5em;
	height: 6em;
	margin: 1em;
	border-radius: 10%;
}
.fontGeneral {
	font: 10px raro courier;
}
</style>