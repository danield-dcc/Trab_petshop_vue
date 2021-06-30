<template>
  <div class="container">
    <h2>
      Clientes Cadastrados
      <router-link to="/formclientes" class="btn btn-success float-right">
        <i class="fas fa-plus-circle"></i> Adicionar
      </router-link>
    </h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Endereço</th>
          <th>CPF</th>
          <th>Tel</th>
          <th>Pet</th>
          <th>Ações</th>
        </tr>
        <!-- cria nova linha para cada novo elemento do array -->
        <tr v-for="cliente in clientes" :key="cliente.id">
          <td>{{ cliente.nome }}</td>
          <td>{{ cliente.endereco }}</td>
          <td>{{ cliente.cpf }}</td>
          <td>{{ cliente.telefone }}</td>
          <td>{{ cliente.nome_do_cachorro }}</td>
          <td>
            <button
              class="btn btn-warning btn-sm mx-1"
              title="Alterar"
              @click="editar(cliente.id)"
            >
              <i class="far fa-edit"></i>
            </button>
            <button
              class="btn btn-danger btn-sm mx-1"
              title="Excluir"
              @click="excluir(cliente.id, cliente.nome)"
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
      cliente:{
         id:null,
         nome:null,
         endereco:null,
         cpf:null,
         telefone:null,
         caes_cadastrados_id:null 
      },
      clientes: [],
    };
  },
  mounted() {
    this.listar();
  },

  methods: {
    listar() {
      axios
        .get(this.$urlAPI + "/clientes")
        .then((response) => (this.clientes = response.data));
      console.log(this.clientes);
    },

    excluir(id, nome) {
      if (confirm(`Deseja excluir o Cliente '${nome}'?`)) {
        axios.delete(this.$urlAPI + "/clientes/" + id).then((response) => {
          if (response.status == 200) {
            alert(`Cliente '${nome}' excluído com sucesso!`);
            this.listar();
          }
        });
      }
    },
    editar(id) {
      axios
        .get(this.$urlAPI + "/clientes/busca_id/" + id)
        .then((response) => {
          this.cliente = response.data
          console.log(this.cliente)
          this.$router.push({ path: "/formclientes", query: { altera: this.cliente }})
        });
    },
  },
};
</script>

<style scoped>
</style>