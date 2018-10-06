<template>
    <div>
        <h1 class="centralizado">Cadastro</h1>
        <h2 class="centralizado"></h2>

        <h2 class="centralizado" v-if="foto._id">Alterando</h2>
        <h2 class="centralizado" v-else>Incluindo</h2>

        <form @submit.prevent="grava">

        <div class="controle">
            <label for="titulo">TÍTULO</label>
            <input data-vv-has="título" name="titulo" v-validate data-vv-rules="required|min:3|max:15" id="titulo" autocomplete="off" 
            v-model="foto.titulo">
            <span class="erro" v-show="errors.has('titulo')">{{errors.first('titulo')}}</span>
        </div>

        <div class="controle">
            <label for="url">URL</label>
            <input name="url" id="url" autocomplete="off" 
            v-model="foto.url" v-validate data-vv-rules="required"> 
            <span class="erro" v-show="errors.has('url')">{{errors.first('url')}}</span>
            <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo" />
        </div>

        <div class="controle">
            <label for="descricao">DESCRIÇÃO</label>
            <textarea id="descricao" autocomplete="off" 
            v-model="foto.descricao">
            </textarea>
        </div>

        <div class="centralizado">
            <meu-botao rotulo="GRAVAR" tipo="submit"/>
            <router-link :to="{ name: 'home' }"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
        </div>

        </form>
    </div>
</template>

<script>

import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue'
import Foto from '../../domain/foto/Foto'
import FotoService from '../../domain/foto/FotoService'

export default {

  components: {
    'imagem-responsiva': ImagemResponsiva, 
    'meu-botao': Botao
  },

  data(){
      return {
          foto: new Foto,
          id: this.$route.params.id
      }
  },

  created(){
      this.service = new FotoService(this.$resource)

      if(this.id){
          this.service.busca(this.id)
          .then(foto => this.foto = foto)
      }

  },

  methods: {
      grava(){
          console.log(this.foto)

          this.$validate
            .validateAll()
            .then(success =>{
                if(success){
                    this.service.cadastra(this.foto)
                    .then(() => 
                        { 
                            this.foto = new Foto,
                            this.$router.push({ name:'home' })
                        }, 
                        err => {console.log('error', err)})
                        }
            })
      }
  }
}

</script>
<style scoped>

  .centralizado {
    text-align: center;
  }
  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

 .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }

  .erro{
      color: red
  }

</style>


