<template>
    <footer class="page-footer font-small special-color-dark footer">
      <div class="container" id="margenFooter"></div>
      <div class="footer-copyright text-center ">©2021 Copyright:

        <a href="#"> Servicios de Salud Pública de la CDMX</a>
      </div>
    </footer>
</template>
<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
#margenFooter {
    background: #85C1E9;
    padding: 1px;
}
.footer{
  position:fixed;
  left:0px;
  bottom:0px;
  height:30px;
  width:100%;
}
</style>
