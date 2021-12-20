<template>
  <JuegoOrder />
  <div v-show="juegoSearch" class="q-mt-md q-pl-md text-weight-regular text-h6 div-text-resultados">
    Resultados de la busqueda: <span class="text-weight-bold text-orange-6">{{juegoSearch}}</span>
  </div>
  <q-infinite-scroll v-if="isHome" @load="infiniteScroll" class="infinite-scroll" :offset="-1">
    <div class="q-mt-sm full-width row wrap justify-around items-start content-start">
      <Juego v-for="juego in juegos" :key="juego.slug" :juego="juego" />
    </div>
    <template v-slot:loading>
      <div class="row justify-center q-my-none">
        <q-spinner-dots v-show="paginateActive" color="primary" size="65px"></q-spinner-dots>
      </div>
    </template>
  </q-infinite-scroll>
</template>

<script>
import { defineAsyncComponent } from "vue";
import useJuegos from "../composables/useJuegos";
export default {
  components: {
    Juego: defineAsyncComponent(() => import("../components/Juego.vue")),
    JuegoOrder: defineAsyncComponent(() => import("../components/JuegoOrder.vue")),
  },
  setup() {
    const { juegos, fetchJuegos, paginateActive, juegoSearch, isHome } = useJuegos();
    return {
      juegos,
      juegoSearch,
      isHome,
      paginateActive,

      async infiniteScroll(index, done) {
        if (paginateActive.value) {
          await fetchJuegos();
          done();
        } else {
          done();
        }
      },
    };
  },
};
</script>

<style lang="sass">
@media (max-width: 668px)
  .div-text-resultados
    padding-left: 0px
    text-align: center
</style>