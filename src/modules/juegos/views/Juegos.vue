<template>
    <JuegoList v-if="!error" />
    <modal-info v-else @confirm="closeModal" :open="modalSearchNotResults">
      <q-card-section>{{res.error}}</q-card-section>
    </modal-info>
</template>

<script>
import { ref, defineAsyncComponent, onMounted } from "vue";
import useJuegos from "../composables/useJuegos";
import titlePageName from "src/modules/layout/helpers/Meta/titlePage"
export default {
  components: {
    JuegoList: defineAsyncComponent(() => import('../components/JuegoList.vue')),
    ModalInfo: defineAsyncComponent(() => import('/src/modules/layout/components/Modal.vue')),
  },
  setup() {
    titlePageName('Página principal');
    const { redirectJuegos, juegosInitial } = useJuegos();
    const res = ref("")
    const error = ref(false)
    const modalSearchNotResults = ref(false) 
    onMounted(async () => {
      res.value = await juegosInitial();
      if(res.value.error) {
        if(res.value.error == true) res.value.error = res.value.message
        modalSearchNotResults.value = true
        error.value = true
      } 
    });

    return {
      //Methods
      closeModal(){
        modalSearchNotResults.value = false
        //error.value = false
        redirectJuegos()
      },

      //Variables
      error,
      modalSearchNotResults,
      res
    };
  },
};
</script>
