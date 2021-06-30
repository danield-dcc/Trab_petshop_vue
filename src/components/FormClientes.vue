<template>
  <div class="container mt-5">
    <h2>
      <span v-if="cliente.id">Alteração de Cliente</span>
      <span v-else>Cadastro de Clientes </span>
      
      <a class="btn btn-warning float-right" href="#" @click="goBack">
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
              v-model="cliente.nome"
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
              v-model="cliente.cpf"
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
              v-model="cliente.caes_cadastrados_id"
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
              v-model="cliente.telefone"
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
              v-model="cliente.endereco"
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
      cliente: {
        id: null,
        nome: null,
        endereco: null,
        cpf: null,
        telefone: null,
        caes_cadastrados_id: null,
      },
      caes: null,
      erros: [],
    };
  },

  methods: {
    verificaForm() {
      // limpa vetor de erros
      this.erros = [];
      if (Number(this.cliente.cpf) > 0 ) {
        return true;
      }

      if (Number(this.cliente.cpf) < 0) {
        this.erros.push("Revise o cpf do cliente.");
      }
      
      return false;
    },

    altera() {
      axios
        .put(this.$urlAPI + "/clientes/atualizar/" + this.cliente.id, this.cliente, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) =>
          alert(`Cliente Atualizado ${response.data}`)
        );
    },

    inclui() {
      axios
        .post(this.$urlAPI + "/clientes", this.cliente, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) =>
          alert(`Cliente Cadastro com código ${response.data.id}`)
        );
      this.cliente = {}; // limpando o objeto carro, limpa os campos do form
      // this.$refs.cliente.focus();
    },

    salvar() {
      // if (!localStorage.getItem("token")) {
      //   alert("Erro... Faça Login para Realizar a Inclusão / Alteração")
      //   return
      // }

      if (!this.verificaForm()) {
        return;
      }

      if (this.cliente.id) {
        this.altera();
      } else {
        this.inclui();
      }
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
  mounted() {
    axios.get(this.$urlAPI + "/caes").then((response) => {
      this.caes = response.data;
    });

    if (this.$route.query.altera) {
            console.log(this.$route.query.altera)
      this.cliente = this.$route.query.altera;
    }
  },
};
</script>

<style>
</style>

