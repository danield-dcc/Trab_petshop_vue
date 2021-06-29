<template>
  <div class="container">
    <h2>Área Restrita</h2>
    <h3>Controle de Produdos e Agendamentos</h3>

    <div class="row">
      <ul v-for="cao in caes" :key="cao.id">
        <div class="col-md-4"></div>

        <div class="card" style="width: 400px">
          <img :src="cao.foto" alt="Foto do Pet" />
          <div class="card-body">
            <h4 class="card-title">Cliente: {{ cao.cliente }}</h4>
            <b class="card-title">Pet: {{ cao.nome }}</b>
            <span>
              <span>
                <p class="card-text">
                  Dia: {{ cao.dia }} - Horário: {{ cao.hora }}h
                </p>
              </span>
              <span>
                <p class="card-text">Horário: {{ cao.hora }}h</p></span
              >
            </span>
            <p class="card-text">Preço: {{ cao.preco }}</p>
            <!-- <a href="#" class="btn btn-primary">Editar</a>
            <a href="#" class="btn btn-primary">Excluir</a> -->
            <td>
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
                @click="excluir(cao.id, cao.cliente_id)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
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
  },
  methods: {
    listar() {
      axios
        .get(this.$urlAPI + "/caes/destaques")
        .then((response) => (this.caes = response.data));
        console.log(this.caes)
    },

    
  },
};
</script>


<style scoped>
</style>