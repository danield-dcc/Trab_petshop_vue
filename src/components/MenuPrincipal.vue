<template>
    <nav class="navbar navbar-expand-sm bg-primary navbar-dark mb-3">
    <img src="petshop.jpg" alt="Pet" class="mx-3">
    <router-link class="navbar-brand" to="/">Petshop </router-link>

    <!-- Links -->
    <ul class="navbar-nav">

      <!-- Dropdown -->
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
          Cadastros
        </a>
        <div class="dropdown-menu">
          <router-link class="dropdown-item" to="/cadcaes">Pets</router-link>
          <router-link class="dropdown-item" to="/cadclientes">Clientes</router-link>
          <router-link class="dropdown-item" to="/cadusuarios">Usuários</router-link>
        </div>
      </li>

      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
          Pesquisas
        </a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#">Veículos</a>
          <a class="dropdown-item" href="#">Propostas</a>
        </div>
      </li>

      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
          Gráficos
        </a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#">Veículos por Marcas</a>
          <a class="dropdown-item" href="#">Veículos por Cores</a>
          <a class="dropdown-item" href="#">Cadastro de Veículos</a>
          <a class="dropdown-item" href="#">Veículos x Propostas</a>
          <a class="dropdown-item" href="#">Propostas Mensais</a>
        </div>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="#">Utilitários</a>
      </li>
    </ul>

    <ul class="navbar-nav ml-auto">
      <!-- Dropdown -->
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
          <i class="fas fa-user mr-1"></i>
          <span v-if="user">{{user}}</span>
          <span v-else>(Não Logado)</span>
        </a>
        <div class="dropdown-menu">
          <router-link class="dropdown-item" to="/formlogin">Login</router-link>
          <a class="dropdown-item" href="#" @click="sair">Logout</a>
        </div>
      </li>
    </ul>
  </nav>

</template>

<script>
export default{
    props:{
        //o vue entende que ele poder ser trabalhado como uma variavel
        user:String
    },
    methods:{
        sair(){
            localStorage.removeItem("token")
            this.$parent.mudaUser(null)
        }
    }
}
</script>

<style scoped>
    img{
        width: 60px;
        height: 40px;
    }
</style>