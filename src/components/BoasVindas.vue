<template>
  <div class="container">
    <h2>Área Restrita</h2>
    <h3>Pets em Destaque</h3>

    <div class="row">
      <ul v-for="cao in caes" :key="cao.id">
        <div class="col-md-6"></div>

        <div class="card" style="width: 400px">
          <img :src="cao.foto" alt="Foto do Pet" />
          <div class="card-body">
            <h4 class="card-title">Pet: {{ cao.nome }}</h4>
            <b class="card-title">Raça: {{ cao.raca }}</b>
            <span>
              <span>
                <p class="card-text">
                  Idade: {{ cao.idade }} 
                </p>
              </span>
              <span>
                <p class="card-text">Horário: {{ cao.hora }}h</p></span
              >
            </span>
            <p class="card-text">Preço: {{ cao.preco }}</p>
            <!-- <a href="#" class="btn btn-primary ">Agendar Banho e Tosa</a>
            <a href="#" class="btn btn-primary ml-2">Editar Pet</a> -->
            <button type="button" class="btn btn-outline-primary  btn-block mb-2" title="Agendar" @click="agendar(cao.id)">Agendar Banho e Tosa</button>
            <button type="button" class="btn btn-outline-primary btn-block" title="Editar" @click="editar(cao.id)">Editar Pet</button>
            
            <!-- <td>
              <button
                class="btn btn-primary btn-sm mx-1"
                title="Agendar"
                @click="editar(cao.id)"
              >
                <i class="far fa-edit"></i>
              </button>
              <button
                class="btn btn-primary btn-sm mx-1"
                title="Excluir"
                @click="excluir(cao.id, cao.cliente_id)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </td> -->
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cao: {
        id: null,
        nome: null,
        raca_cachorro_id: null,
        idade: null,
        foto: null,
        destaque: null,
        cliente:null
      },
       agendamento: {
        id: null,
        dia: null,
        hora: null,
        preco: null,
        cliente_id: null,
        caes_cadastrados_id: null,
      },
      caes: [],
    };
  },
  //método do vue que ocorre assim que a página é renderizada
  mounted() {
    // axios
    //   .get(this.$urlAPI + "/caes")
    //   .then((response) => (this.caes = response.data));
    this.listar();

    //pegar os dados e atribur para a variavel que vai ser lançada para o agendamento
  },
  methods: {
    listar() {
      axios
        .get(this.$urlAPI + "/caes/destaques")
        .then((response) => (this.caes = response.data));
        console.log(this.cao)
    },

     editar(id) {
      axios
        .get(this.$urlAPI + "/caes/buscar_id/" + id)
        .then((response) => {
          this.cao = response.data
          this.$router.push({ path: "/formcaes", query: { altera: this.cao }})
        });
    },
    agendar(id) {
      axios
        .get(this.$urlAPI + "/caes/buscar_id/" + id)
        .then((response) => {
          this.cao = response.data
          this.agendamento.caes_cadastrados_id = this.cao.id
          // console.log(this.agendamento)
          this.$router.push({ path: "/formbanhotosa", query: { altera: this.agendamento }})
        });
    },
  },
};
</script>


<style scoped>
</style>