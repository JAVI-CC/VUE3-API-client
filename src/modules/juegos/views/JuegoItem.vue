<template>
  <LoadingSkeleton :isLoading="isLoading" />
  <div v-if="!isLoading" class="q-py-xl q-px-md">
    <q-img class="juego-img-mobile" :src="juego.imagen" />

    <q-card class="my-card">
      <q-card-section horizontal>
        <q-img class="col-5 juego-img-desktop" :src="juego.imagen" />

        <q-card-section class="q-px-lg">
          <div class="text-h4 q-mb-md">
            {{ juego.nombre }}
          </div>
          <q-btn
            class="text-subtitle1"
            padding="sm none"
            flat
            no-caps
            :label="juego.desarrolladora?.nombre"
            @click="fetchDesarrolladora(juego.desarrolladora?.slug)"
          />
          <div class="text-body2">{{ juego.descripcion }}</div>
          <div class="q-mt-sm q-mb-xs">
            <q-btn
              class="q-my-sm q-mr-sm"
              v-for="{slug, nombre} in juego.generos"
              :key="slug"
              rounded
              no-caps
              color="primary"
              size="sm"
              :label="nombre"
              @click="fetchGenero(slug)"
            />
          </div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-icon class="q-ml-sm q-my-sm" name="event" size="sm" />
        <div class="text-subtitle2 q-ml-sm">
          {{ juego.fecha }}
        </div>
        <q-space />
        <ButtonsUpdateDelete
          :nombre="juego.nombre"
          :slug="juego.slug"
          :estiloInicio="false"
        />
        <q-btn
          unelevated
          flat
          padding="xs"
          color="positive"
          icon="share"
          class="q-ml-sm q-mr-sm"
          size="md"
          @click="webShareJuego(juego.nombre, juego.slug)"
        />
      </q-card-actions>
    </q-card>
  </div>
  <modal-info @confirm="closeModal" :open="modalSearchNotResults">
    <q-card-section>{{res.error}}</q-card-section>
  </modal-info>
</template>

<script>
import { defineAsyncComponent, onActivated, ref} from "vue";
import useJuegos from "../composables/useJuegos";
import titlePageName from "src/modules/layout/helpers/titlePage";
export default {
  name: "JuegoItem",
  components: {
    ButtonsUpdateDelete: defineAsyncComponent(() =>
      import("../components/ButtonsUpdateDelete.vue")
    ),
    ModalInfo: defineAsyncComponent(() => import('/src/modules/layout/components/Modal.vue')),
    LoadingSkeleton: defineAsyncComponent(() => import('../components/LoadingSkeleton.vue')),
  },
  setup() {
    const { fetchDesarrolladora, fetchGenero, isLoading, item, juego, webShareJuego, redirectJuegosItem } = useJuegos();
    const res = ref("")
    const error = ref(false)
    const modalSearchNotResults = ref(false) 

    onActivated(async () => {
      res.value = await item();
      titlePageName(res.value.nombre);
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
        redirectJuegosItem()
      },
      fetchDesarrolladora,
      fetchGenero,
      webShareJuego,

      //variables
      isLoading,
      juego,
      modalSearchNotResults,
      res,
    };
  },
};
</script>

<style lang="sass" scoped>
.juego-img-desktop
  width: 300px
  height: 400px

.juego-img-mobile
  display: none
  width: 296px
  height: 395px
  margin: 0 auto
  margin-bottom: 15px

@media (max-width: 768px)
  .juego-img-desktop
    display: none
  .juego-img-mobile
    display: block
</style>
