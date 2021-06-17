<template>
    <div class="container">
    <h2>Clientes Cadastrados
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
          <td>{{cliente.nome}}</td>
          <td>{{cliente.endereco}}</td>
          <td>{{cliente.cpf}}</td>
          <td>{{cliente.telefone}}</td>
          <td>{{cliente.nome_do_cachorro}}</td>
          
          
        </tr>
      </thead>
    </table>
  </div>

</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            clientes:[]
        }
    },
    mounted(){
        axios.get(this.$urlAPI + "/clientes")
        .then(response => this.clientes = response.data)
        console.log(this.clientes)
    }
}
</script>

<style scoped>

</style>