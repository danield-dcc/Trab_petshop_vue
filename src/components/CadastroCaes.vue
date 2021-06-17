<template>
  <div class="container">
    <h2>
      Pets Cadastrados
      <router-link to="/formcaes" class="btn btn-success float-right">
        <i class="fas fa-plus-circle"></i> Adicionar
      </router-link>
    </h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Idade</th>
          <th>Raça</th>
          <th>Foto</th>
          <th>Ações</th>
        </tr>
        <!-- cria nova linha para cada novo elemento do array -->
        <tr v-for="cao in caes" :key="cao.id">
          <td>{{ cao.nome }}</td>
          <td>{{ cao.idade }}</td>
          <td>{{ cao.raca }}</td>
          <td><img :src="cao.foto" alt="Foto do Cachorro" /></td>
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
      caes: [],
    };
  },
  //método o vue que ocorre assim que a página é renderizada
  mounted() {
    axios
      .get(this.$urlAPI + "/caes")
      .then((response) => (this.caes = response.data));
  },
};
</script>

<style scoped>
table img {
  width: 100px;
  height: 60px;
}
</style>
