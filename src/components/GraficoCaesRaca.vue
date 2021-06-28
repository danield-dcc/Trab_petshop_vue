<template>
   <div class="container">
   <h2>Gráfico do Número de cães por raça</h2>
     <GChart
       type="PieChart"
       :data="caesRaca"
    />
 </div>
</template>

<script>
import { GChart } from "vue-google-charts";
import axios from "axios";

export default {
  components: {
    GChart,
  },

  data() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      caesRaca: [["Raça", "Nº de Pets"]],
    };
  },
  mounted(){
      axios.get(this.$urlAPI + "/raca/dados")
            .then(response =>{
                const racas_pet = response.data;

                racas_pet.forEach(racas=>{
                    this.caesRaca.push([racas.raca,racas.num])
                })
            })
  }
};
</script>

<style scoped>
</style>
