<template>
  <div>
    <h1 class="centralizado">{{titulo}}</h1>
    <p v-show="mensagem" class="mensagem">{{ mensagem }}</p>
    <input v-on:input="filtro = $event.target.value" type="search" class="filtro" placeholder="Pesquisar...">
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro">
        <meu-painel :titulo="foto.titulo">
          <div class="painel-conteudo">
            <imagem-responsiva 
            :url="foto.url" 
            :titulo="foto.titulo"
            v-meu-transform:scale.animate="1.2"></imagem-responsiva>
            
            <router-link :to="{name: 'altera', params: {id: foto._id}}">
              <meu-botao estilo="padrao" tipo="button" rotulo="ALTERAR" />
            </router-link/>

            <meu-botao 
            tipo="button" 
            rotulo="REMOVER" 
            @botaoAtivado="removeFoto(foto, $event)" 
            :confirmacao="true"
            estilo="perigo"
            />
          </div>
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue'
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue'
import FotoService from '../../domain/foto/FotoService'

export default {

  components:{
    'meu-painel': Painel,
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao': Botao
  },  
  data(){
    return {
      titulo: "Alurapic",
      fotos: [],
      filtro: '',
      mensagem: ''
    }
  },
  created(){
    this.service = new FotoService(this.$resource)
    this.service
      .lista()
      .then(fotos => this.fotos = fotos, 
      err => {
          this.mensagem = err.message
        }
     )
  },

  computed: {
    fotosComFiltro(){
      if(this.filtro){
        let exp = new RegExp(this.filtro.trim(), 'i')
        return this.fotos.filter(foto => exp.test(foto.titulo))
      } else {
        return this.fotos;
      }
    }
  }, 

  methods: {
    removeFoto(foto, $event){
      // /+' event: '+$event
      //console.log('f', foto)
      
      this.service.apaga(foto._id)
      .then(() => {
          let index = this.fotos.indexOf(foto)
          this.fotos.splice(index, 1)
          this.mensagem = 'foto removida com sucesso!'
          }, err => {
            console.log('error', err)
            this.mensagem = 'Não foi possível remover a foto!'
          })

      // this.$http.delete(`v1/fotos/${foto._id}`)
      //   .then(() => {
      //     let index = this.fotos.indexOf(foto)
      //     this.fotos.splice(index, 1)
      //     this.mensagem = 'foto removida com sucesso!'
      //     }, err => {
      //       console.log('error', err)
      //       this.mensagem = 'Não foi possível remover a foto!'
      //     })

    }
  }
    
}
</script>
  
  
<style>

  .filtro{
    display: block;
    width: 100%;
  }
  
  .centralizado {
     text-align: center;
  }

  .lista-fotos{
    list-style: none;
  }

  .lista-fotos .lista-fotos-item{
    display: inline-block;
  }

  .imagem-responsiva{
    width: 100%;
  }
   
</style>
