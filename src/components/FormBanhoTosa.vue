<template>
  <div class="container mt-5">
    <h2>
      <span v-if="agendamento.id"> Alteração de agendamentos Banho/Tosa </span>
      <span v-else> Agendamentos de Banho/Tosa </span>

      <a class="btn btn-warning float-right" href="#" @click="goBack">
        <i class="fas fa-undo"></i> Voltar</a
      >
    </h2>
    <form @submit.prevent="salvar">
      <div class="row">
        <div class="col-sm-8">
          <div class="form-group">
            <label for="cliente_id">Cliente:</label>
            <select
              id="cliente_id"
              class="form-control"
              v-model="agendamento.cliente_id"
              required
            >
              <option
                v-for="cliente in clientes"
                :key="cliente.id"
                :value="cliente.id"
              >
                {{ cliente.nome }}
              </option>
            </select>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="form-group">
            <label for="caes_cadastrados_id">Pets Cadastrados:</label>
            <select
              id="caes_cadastrados_id"
              class="form-control"
              v-model="agendamento.caes_cadastrados_id"
              required
            >
              <option v-for="cao in caes" :key="cao.id" :value="cao.id">
                {{ cao.nome }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="telefone">Dia: </label>
            <input
              type="number"
              id="dia"
              class="form-control"
              v-model="agendamento.dia"
              required
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="telefone">Horário</label>
            <input
              type="number"
              id="hora"
              class="form-control"
              v-model="agendamento.hora"
              required
            />
          </div>
        </div>
      </div>

      <div class="form-check">
        <label class="form-check-label" for="preco">
          <input
            type="radio"
            class="form-check-input"
            id="preco"
            value="50"
            v-model="agendamento.preco"
            name="preco"
          />Banho: R$50.00
        </label>
      </div>
      <div class="form-check mt-2">
        <label class="form-check-label">
          <input
            type="radio"
            class="form-check-input"
            v-model="agendamento.preco"
            name="preco"
            value="80"
            checked
          />Banho e Tosa: R$80.00
        </label>
      </div>

      <!-- <div class="row">
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
      </div> -->

      <button type="submit" class="btn btn-success mt-2 px-4 mr-2">
        <i class="far fa-save"></i> Salvar
      </button>
      <button type="reset" class="btn btn-danger mt-2 px-4">
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
      agendamento: {
        id: null,
        dia: null,
        hora: null,
        preco: null,
        cliente_id: null,
        caes_cadastrados_id: null,
      },
      caes: null,
      clientes: null,
      erros: [],
    };
  },

  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    verificaForm() {
      // limpa vetor de erros
      this.erros = [];
      if (
        Number(this.agendamento.dia) > 0 &&
        Number(this.agendamento.dia) < 31 &&
        Number(this.agendamento.hora) >= 8 &&
        Number(this.agendamento.hora) <= 18
      ) {
        return true;
      }

      if (Number(this.agendamento.dia) < 0) {
        this.erros.push("Revise a data do agendamento.");
      }
      if (Number(this.agendamento.dia) > 31) {
        this.erros.push("Revise a data do agendamento.");
      }

      if (Number(this.agendamento.hora) < 8) {
        this.erros.push("Hoário incorreto A Petshop funcioan das 8h às 18h.");
      }
      if (Number(this.agendamento.hora) > 18) {
        this.erros.push("Hoário incorreto A Petshop funcioan das 8h às 18h.");
      }
      return false;
    },

    //inclui
    incluir() {
      axios
        .post(this.$urlAPI + "/banho_tosa", this.agendamento, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) =>
          alert(`Banho/Tosa agendado com código ${response.data.id}`)
        );
      this.agendamento = {}; // limpando o objeto, limpa os campos do form
    },

    salvar() {
      // if (!localStorage.getItem("token")) {
      //   alert("Erro... Faça Login para Realizar a Inclusão / Alteração")
      //   return
      // }

      if (!this.verificaForm()) {
        return;
      }

      if (this.agendamento.id) {
        this.alterar();
      } else {
        this.incluir();
      }
    },

    //verificar rota
    alterar() {
      axios
        .put(this.$urlAPI + "/banho_tosa/" + this.agendamento.id, this.agendamento, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) =>
          alert(`Banho/tosa aterado com sucesso ${response.data}`)
        );
    },
  },
  mounted() {
    axios.get(this.$urlAPI + "/caes").then((respponse) => {
      this.caes = respponse.data;
    });

    axios.get(this.$urlAPI + "/clientes").then((respponse) => {
      this.clientes = respponse.data;
    });

    if (this.$route.query.altera) {
      //      console.log(this.$route.query.altera)
      this.agendamento = this.$route.query.altera;
    }
  },
};
</script>


<style scoped>
</style>