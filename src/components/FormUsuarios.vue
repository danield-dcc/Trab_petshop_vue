<template>
  <div class="container mt-5">
    <h2>
      Cadastro de Usuario
      <a class="btn btn-warning float-right" href="/cadusuarios">
        <i class="fas fa-undo"></i> Voltar</a
      >
    </h2>
    <form @submit.prevent="salvar">
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              class="form-control"
              v-model="usuarios.nome"
              ref="nome"
              required
            />
          </div>
        </div>
      </div>

      <div class="row">
        
        <div class="col-sm-6">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="text"
              id="email"
              class="form-control"
              v-model="usuarios.email"
              required
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="senha">Senha:</label>
            <input
              type="text"
              id="senha"
              class="form-control"
              v-model="usuarios.senha"
              required
            />
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-success px-4 mr-2">
        <i class="far fa-save"></i> Salvar
      </button>
      <button type="reset" class="btn btn-danger px-4">
        <i class="far fa-window-restore"></i> Limpar
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      usuarios: {
        id: null,
        nome: null,
        email: null,
        senha: null,
      },

    };
  },
  methods: {
    salvar() {
      if (localStorage.getItem("token")) {
        axios
          .post(this.$urlAPI + "/usuarios", this.usuarios, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) =>
            alert(`Usuario cadastrado com código ${response.data.id}`)
          );
        this.usuarios = {}; //limpar formulario
        this.$refs.nome.focus(); //pega as referencias do objeto e ativa o método
      } else {
        alert("Erro... Faça Login para realizar inclusão");
      }
    },
  }, //usado para recuperar as informações em cães
  // mounted() {
  //   axios.get(this.$urlAPI + "/caes").then((response) => {
  //     this.caes = response.data;
  //   });
  // },
};
</script>

<style scoped>
</style>