<template>
  <div class="container">
    <h2>
      Usuarios Cadastrados
      <router-link to="/formusuarios" class="btn btn-success float-right">
        <i class="fas fa-plus-circle"></i> Adicionar
      </router-link>
    </h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>

          <th>Ações</th>
        </tr>
        <!-- cria nova linha para cada novo elemento do array -->
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td>{{ usuario.nome }}</td>
          <td>{{ usuario.email }}</td>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      usuarios: [],
    };
  },
  mounted() {
    axios
      .get(this.$urlAPI + "/usuarios")
      .then((response) => (this.usuarios = response.data));
  },
};
</script>

<style scoped>
</style>

