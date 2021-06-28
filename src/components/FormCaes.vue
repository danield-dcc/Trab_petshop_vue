<template>
  <div class="container mt-5">
    <h2>
      <span v-if="cao.id">Alteração de Pet</span>
      <span v-else> Inclusão de Cães </span>

      <a class="btn btn-warning float-right" href="#" @click="goBack">
        <i class="fas fa-undo"></i> Voltar</a
      >
    </h2>

    <!-- lista não osdenada para mensagem -->
    <h4 v-if="erros.length" class="text-danger">  
      <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
      <ul>
        <li v-for="(erro, index) in erros" class="text-danger small" :key="index">
          {{ erro }}
        </li>
      </ul>

    </h4>
    <form @submit.prevent="salvar">
      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <label for="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              class="form-control"
              v-model="cao.nome"
              ref="nome"
              required
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="raca_cachorro_id">Raça:</label>
            <select
              id="raca_cachorro_id"
              class="form-control"
              v-model="cao.raca_cachorro_id"
              required
            >
              <option v-for="raca in racas" :key="raca.id" :value="raca.id">
                {{ raca.nome }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label for="idade">Idade</label>
            <input
              type="text"
              id="idade"
              class="form-control"
              v-model="cao.idade"
              required
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-9">
          <div class="form-group">
            <label for="foto">URL da Foto:</label>
            <input
              type="text"
              id="foto"
              class="form-control"
              v-model="cao.foto"
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
      cao: {
        id: null,
        nome: null,
        raca_cachorro_id: null,
        idade: null,
        foto: null,
        destaque: null,
      },
      racas: null,
      erros:[]
    };
  },
  methods: {

    verificaForm(){
      //limpando o vetor de erros
      this.erros = [];

      if(this.cao.idade < 0 || this.cao.idade > 20){
        this.erros.push("Idade inválida ou incorreta")
      }

    },
    altera() {
          axios.put(this.$urlAPI+"/caes/atualizar/"+this.cao.id, this.cao, 
             {
               headers: {
                 Authorization: `Bearer ${localStorage.getItem("token")}`
               }
             })
             .then(response => alert(`Dados do Pet Atualizados ${response.data}`))
    },

    inclui() {
          axios.post(this.$urlAPI+"/caes", this.cao, 
             {
               headers: {
                 Authorization: `Bearer ${localStorage.getItem("token")}`
               }
             })
             .then(response => alert(`Pet Cadastro com código ${response.data.id}`))
          this.carro = {}         // limpando o objeto carro, limpa os campos do form
          this.$refs.modelo.focus()     
    },

    salvar() {
      // if (localStorage.getItem("token")) {
      //   axios
      //     .post(this.$urlAPI + "/caes", this.cao, {
      //       headers: {
      //         Authorization: `Bearer ${localStorage.getItem("token")}`,
      //       },
      //     })
      //     .then((response) =>
      //       alert(`Ok! Cão cadastrado com código ${response.data.id}`)
      //     );
      //   this.cao = {}; //limpar formulario
      //   this.$refs.nome.focus(); //pega as referencias do objeto e ativa o método
      // } else {
      //   alert("Erro... Faça Login para realizar inclusão");

      if (!this.verificaForm()) {
        return;
      }
      if (this.cao.id) {
        this.altera();
      } else {
        this.inclui();
      }

    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },

  //usado para recuperar as informações em raca de cães
  mounted() {
    axios.get(this.$urlAPI + "/raca").then((response) => {
      this.racas = response.data;
    });

    //verifica se o altera foi acionado para ativar o node de alteração
    if (this.$route.query.altera) {
      // console.log(this.$route.query.altera);
      this.cao = this.$route.query.altera;
    }
  },
};
</script>

<style scoped>
</style>>
