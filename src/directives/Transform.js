import Vue from 'vue'

Vue.directive('meu-transform', {
    bind(el, bind, vnode){
        let current = 0;
        let increment = bind.value || 90
        let efeito;

        el.addEventListener('dblclick', function(){
            
            if(!bind.arg || bind.arg == 'rotate'){
                if(bind.modifiers.reverse){
                    current -= increment
                } else {
                    current += increment
                }

                efeito = `rotate(${current}deg)`
            } else if(bind.arg == 'scale'){
                efeito = `scale(${increment})`
            }

            if(bind.modifiers.animate){
                el.style.transition = `transform 0.5s`
            }
            el.style.transform = efeito
        })
    }
})