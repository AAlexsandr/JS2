Vue.component('error', {
    data(){
        return{
            searchError: ''
        }
    },
    methods: {
        setErr(value){
            this.searchError = value;
        }
    },
    template: `<div v-if="searchError">
                    <p>
                        <button @click="setErr('')">X</button>
                        {{searchError}}
                    </p>
                </div>`
})