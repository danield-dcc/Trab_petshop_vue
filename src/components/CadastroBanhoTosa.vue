<template>
  <div class="container">
    <h2>
      Banho/Tosa agendamentos

      <router-link to="/formbanhotosa" class="btn btn-success float-right ml-3">
        <i class="fas fa-plus-circle"></i> Adicionar
      </router-link>
    </h2>


    <div class="row">
      <ul v-for="agendamento in agendamentos" :key="agendamento.id">
        <div class="col-md-4"></div>

        <div class="card" style="width: 200px">
          <img :src="agendamento.foto" alt="Foto do Pet" />
          <div class="card-body">
            <h4 class="card-title">Cliente: {{agendamento.cliente }}</h4>
            <b class="card-title">Pet: {{agendamento.nome_do_cachorro }}</b>
            <span>
              <span>
                <p class="card-text">Dia: {{ agendamento.dia }} - Horário: {{ agendamento.hora }}h</p>
              </span>
              <span>
                <p class="card-text">Horário: {{ agendamento.hora }}h</p></span
              >
            </span>
            <p class="card-text">Preço: {{ agendamento.preco }}</p>
            <!-- <a href="#" class="btn btn-primary">Editar</a>
            <a href="#" class="btn btn-primary">Excluir</a> -->
            <td>
            <button
              class="btn btn-primary btn-sm mx-1"
              title="Alterar"
              @click="editar(agendamento.id)"
            >
              <i class="far fa-edit"></i>
            </button>
            <button
              class="btn btn-primary btn-sm mx-1"
              title="Excluir"
              @click="excluir(agendamento.id, agendamento.cliente_id)"
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
      agendamento: {
        id: null,
        dia: null,
        hora: null,
        preco: null,
        cliente_id: null,
        caes_cadastrados_id: null,
      },
      agendamentos: [],
    };
  },
  mounted() {
    this.listar();
  },

  methods: {
    listar() {
      axios.get(this.$urlAPI + "/banho_tosa")
        .then((response) => (this.agendamentos = response.data));
    },

    excluir(id, cliente_id) {
      if (confirm(`Confirma exclusão do agendamento de  '${cliente_id}'?`)) {
        axios.delete(this.$urlAPI + "/banho_tosa/" + id).then((response) => {
          if (response.status == 200) {
            alert(`Agendamento de '${cliente_id}' excluído com sucesso!`);
            this.listar();
          }
        });
      }
    },

    
    editar(id) {
      axios
        .get(this.$urlAPI + "/banho_tosa/buscar_id/" + id)
        .then((response) => {
          this.agendamento = response.data
          // console.log(response.data)
          console.log(this.agendamento)
          this.$router.push({ path: "/formbanhotosa", query: { altera: this.agendamento }})
        });
    },

  },
};

</script>


<style  scoped>
.md-card {
  width: 220px;
  height: 60;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}

#card{
  width: 120px;
}

.card{
  width: 120px;
  height: 60;
}
</style>