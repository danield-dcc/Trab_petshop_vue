<template>
  <div class="container">
    <h2>
      Pets Cadastrados
      <router-link to="/formcaes" class="btn btn-success float-right ml-3">
        <i class="fas fa-plus-circle"></i> Adicionar
      </router-link>
      <form class="form-inline float-right">
        <input class="form-control form-control mr-1" type="text" v-model="filtro" @keyup="pesquisar"
               placeholder="Pesquisa">
        <button class="btn btn-success" @click.prevent="listar">Todos</button>
      </form>
    </h2>

    <!-- lista não ordenada para mensagem -->
    <h4 v-if="pesquisa.length" class="text-danger">  
      <b>Pet não encontrado:</b>
      <ul>
        <li v-for="(pesq, index) in pesquisa" class="text-danger small" :key="index">
          {{ pesq }}
        </li>
      </ul>

    </h4>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Idade</th>
          <th>Raça</th>
          <th>Destaque</th>
          <th>Foto</th>
          <th>Ações</th>
        </tr>
        <!-- cria nova linha para cada novo elemento do array -->
        <tr v-for="cao in caes" :key="cao.id">
          <td>{{ cao.nome }}</td>
          <td>{{ cao.idade }}</td>
          <td>{{ cao.raca }}</td>
          <td class="text-center text-danger font-weight-bold">{{ cao.destaque | destacaPet }}</td> 
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
      pesquisa:[],
    };
  },
  //método do vue que ocorre assim que a página é renderizada
  mounted() {
  
    this.listar()
  },
  methods:{

    busca_vazia(){
      this.pesquisa = []
      if(this.caes.length != 0){
          return true
      }
      if(this.caes.length == 0){
        this.pesquisa.push("Pet não encontrado")
      }
      return false;
      
    },


    listar(){
      axios.get(this.$urlAPI + "/caes")
           .then((response) => (this.caes = response.data));
      this.filtro = ""
      
    },

    
  

    //cria no back um rota (show) para buscar utilizado o id
    //traz os dados para o atributo cao lança a pagina de cadastro já com estes dados
    //passando como querry o objeto altera com os dados de caoo
    editar(id) {
      axios
        .get(this.$urlAPI + "/caes/buscar_id/" + id)
        .then((response) => {
          this.cao = response.data
          //console.log(this.cao)
          this.$router.push({ path: "/formcaes", query: { altera: this.cao }})
        });
    },

    destacar(id) {  //alterar rota 
      axios.put(this.$urlAPI + "/caes/destacar/" + id).then((response) => {
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
          .get(this.$urlAPI + "/caes/pesquisa/" + this.filtro)
          .then((response) => (this.caes = response.data));

          if(!this.busca_vazia()){
              return
          }
          
          // if(this.caes.length == 0){
          //   this.busca_vazia();
          //   console.log("Não há pet")
          // }
      }
    },

  },
  filters:{
    destacaPet(value) {
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
