<template>
  <div class="container mt-5">
    <h2>
      Cadastro de Clientes
      <a class="btn btn-warning float-right" href="/cadclientes">
        <i class="fas fa-undo"></i> Voltar</a
      >
    </h2>
    <form @submit.prevent="salvar">
      <div class="row">
        <div class="col-sm-8">
          <div class="form-group">
            <label for="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              class="form-control"
              v-model="clientes.nome"
              ref="nome"
              required
            />
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <label for="cpf">CPF</label>
            <input
              type="number"
              id="cpf"
              class="form-control"
              v-model="clientes.cpf"
              required
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="caes_cadastrados_id">Pets Cadastrados:</label>
            <select
              id="caes_cadastrados_id"
              class="form-control"
              v-model="clientes.caes_cadastrados_id"
              required
            >
              <option v-for="cao in caes" :key="cao.id" :value="cao.id">
                {{ cao.nome }}
              </option>
            </select>
          </div>
        </div>

        <div class="col-sm-6">
          <div class="form-group">
            <label for="telefone">Telefone</label>
            <input
              type="number"
              id="telefone"
              class="form-control"
              v-model="clientes.telefone"
              required
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-9">
          <div class="form-group">
            <label for="endereco">Endereço:</label>
            <input
              type="text"
              id="endereco"
              class="form-control"
              v-model="clientes.endereco"
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
      clientes: {
        id: null,
        nome: null,
        endereco: null,
        cpf: null,
        telefone: null,
        caes_cadastrados_id: null,
      },
      caes: null,
    };
  },
  methods: {
    salvar() {
      if (localStorage.getItem("token")) {
        axios
          .post(this.$urlAPI + "/clientes", this.clientes, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) =>
            alert(`Cliente cadastrado com código ${response.data.id}`)
          );
        this.clientes = {}; //limpar formulario
        this.$refs.nome.focus(); //pega as referencias do objeto e ativa o método
      } else {
        alert("Erro... Faça Login para realizar inclusão");
      }
    },
  }, //usado para recuperar as informações em cães
  mounted() {
    axios.get(this.$urlAPI + "/caes").then((response) => {
      this.caes = response.data;
    });
  },
};
</script>

<style scoped>
</style>