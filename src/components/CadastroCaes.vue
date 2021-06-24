<template>
  <div class="container">
    <h2>
      Pets Cadastrados
      <router-link to="/formcaes" class="btn btn-success float-right">
        <i class="fas fa-plus-circle"></i> Adicionar
      </router-link>
      <form class="form-inline float-right">
        <input class="form-control form-control mr-1" type="text" v-model="filtro" @keyup="pesquisar"
               placeholder="Pesquisa">
        <button class="btn btn-success" @click.prevent="listar">Todos</button>
      </form>
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
          <td>
            <button
              class="btn btn-sm btn-info mx-1"
              title="Destacar"
              @click="destacar(cao.id)"
            >
              <i class="far fa-star"></i>
            </button>
            <button
              class="btn btn-warning btn-sm mx-1"
              title="Alterar"
              @click="editar(cao.id)"
            >
              <i class="far fa-edit"></i>
            </button>
            <button
              class="btn btn-danger btn-sm mx-1"
              title="Excluir"
              @click="excluir(cao.id, cao.nome)"
            >
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
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
      cao:{
        id:null,
        nome:null,
        raca_cachorro_id:null,
        idade:null,
        foto:null,
        destaque:null
      },
      filtro:"",
      caes: [],
    };
  },
  //método o vue que ocorre assim que a página é renderizada
  mounted() {
    // axios
    //   .get(this.$urlAPI + "/caes")
    //   .then((response) => (this.caes = response.data));
    this.listar()
  },
  methods:{
    listar(){
      axios.get(this.$urlAPI + "/caes")
           .then((response) => (this.caes = response.data));
      this.filtro = ""
    },
  
    // editar(id) {
    //   axios
    //     .get(this.$urlAPI + "/caes/" + id)
    //     .then((response) => {
    //       this.carro = response.data
    //       this.$router.push({ path: "/formcarros", query: { altera: this.carro }})
    //     });

    destacar(id) {  //alterar rota 
      axios.put(this.$urlAPI + "/caes/" + id).then((response) => {
        if (response.status == 200) {
          this.listar();
        }
      });
    },
    
    //INCLUIR ROTA DELETE------------------------------
    excluir(id, nome) {
      if (confirm(`Deseja excluir o Pet '${nome}'?`)) {
        axios.delete(this.$urlAPI + "/caes/" + id).then((response) => {
          if (response.status == 200) {
            alert(`Pet '${nome}' excluído com sucesso!`);
            this.listar();
          }
        });
      }
    },
      //INCLUIR BUSCA POR CÃES
      pesquisar() {
      if (this.filtro.length == 0) {
        this.listar();     // mostra todos
      } else {
        axios
          .get(this.$urlAPI + "/caes/buscar/" + this.filtro)
          .then((response) => (this.carros = response.data));
      }
    },

  },
  filters:{
    destacaCarro(value) {
      return value ? "x" : "";
    },
  }
};
</script>

<style scoped>
table img {
  width: 100px;
  height: 60px;
}
</style>
