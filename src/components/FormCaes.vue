<template>
<div class="container mt-5">
    <h2>Inclusão de Cães
      <a class="btn btn-warning float-right" href="#" @click="goBack">
        <i class="fas fa-undo"></i> Voltar</a>
    </h2>
    <form @submit.prevent="salvar">
      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" class="form-control" 
                v-model="caes.nome"
                ref="nome"
                required>
          </div>
        </div>
       
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="raca_cachorro_id">Raça:</label>
            <select id="raca_cachorro_id" class="form-control" 
                v-model="caes.raca_cachorro_id" required>
                <option v-for="raca in racas" :key="raca.id" :value="raca.id"> 
                    {{raca.nome}}
                </option>
            </select>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label for="idade">Idade</label>
            <input type="text" id="idade" class="form-control"
                v-model="caes.idade" required>
          </div>
        </div>
      </div>
      <div class="row">
        
        <div class="col-sm-9">
          <div class="form-group">
            <label for="foto">URL da Foto:</label>
            <input type="text" id="foto" class="form-control" 
                v-model="caes.foto" required>
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-success px-4 mr-2"><i class="far fa-save"></i> Salvar</button>
      <button type="reset" class="btn btn-danger px-4"><i class="far fa-window-restore"></i> Limpar</button>
    </form>
  </div>

</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            caes:{
                id:null,
                nome:null,
                raca_cachorro_id:null,
                idade:null,
                foto:null
            },
            racas:null
        }
    },
    methods:{
        salvar(){
          if(localStorage.getItem("token")){
            axios.post(this.$urlAPI + "/caes/cadastro", this.caes,{
              headers:{
                 Authorization: `Bearer ${localStorage.getItem("token")}`
              }
               
            })
                .then(response => alert(`Ok! Cão cadastrado com código ${response.data.id}`))
                this.caes={}            //limpar formulario
                this.$refs.nome.focus() //pega as referencias do objeto e ativa o método
          }else{
            alert("Erro... Faça Login para realizar inclusão")
          }
            
        },goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
    },

    //usado para recuperar as informações em raca de cães
    mounted(){
        axios.get(this.$urlAPI + "/raca")
            .then(response => {this.racas = response.data})
    },

    
    
}

</script>

<style scoped>

</style>>
