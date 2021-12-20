<template>
  <q-intersection transition="scale" class="div-intersection q-mx-sm q-mt-lg q-mb-md">
    <q-card class="my-card card-juego" flat bordered>
      <q-img width="300px" height="400px" :src="imagen" />
      <q-card-section class="q-px-md">
        <div class="row items-center q-mb-sm">
          <div class="col-10">
            <q-btn
              align="left"
              class="text-h6 btn-juego-nombre"
              padding="none"
              flat
              no-caps
              :label="nombre"
              @click="item(slug)"
            />
          </div>
          <div class="col-2 text-right">
            <q-btn
              flat
              round
              icon="share"
              padding="none"
              size="md"
              color="positive"
              @click="webShareJuego(nombre, slug)"
            />
          </div>
        </div>
        <q-btn
          class="text-overline q-mb-xs"
          flat
          no-caps
          padding="none"
          :label="desarrolladoraNombre"
          :color="desarrolladoraSlug == desarrolladoraSelected ? 'orange-6' : ''"
          @click="fetchDesarrolladora(desarrolladoraSlug)"
        />
        <div class="div-text-descripcion">
          <q-item-label class="text-caption text-grey" lines="3">{{
            descripcion
          }}</q-item-label>
        </div>
        <div class="q-mt-sm q-mb-xs">
          <q-btn
            class="q-my-sm q-mr-sm text-caption text-weight-medium"
            v-for="genero in generos"
            :key="genero.slug"
            rounded
            no-caps
            :color="genero.slug == generoSelected ? 'orange-6' : 'primary'"
            size="sm"
            :label="genero.nombre"
            @click="fetchGenero(genero.slug)"
          />
        </div>
      </q-card-section>
      <div class="absolute-bottom" :class="dark ? 'border-top-dark' : 'border-top-light'">
        <q-icon
          class="float-left q-ml-md q-mt-sm q-mb-sm"
          name="event"
          style="font-size: 21px"
        />
        <div class="float-left text-subtitle2 q-ml-sm q-mt-sm row flex-start">
          {{ fecha }}
        </div>
        <ButtonsUpdateDelete :nombre="nombre" :slug="slug" :estiloInicio="true" />
      </div>
    </q-card>
  </q-intersection>
</template>

<script>
import { defineAsyncComponent } from "vue";
import useJuegos from "../composables/useJuegos";
import useLayout from "/src/modules/layout/composables/useLayout";
export default {
  name: "Juego",
  components: {
    ButtonsUpdateDelete: defineAsyncComponent(() =>
      import("./ButtonsUpdateDelete.vue")
    ),
  },
  props: {
    juego: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const {
      item,
      webShareJuego,
      fetchDesarrolladora,
      fetchGenero,
      generoSelected,
      desarrolladoraSelected,
    } = useJuegos();
    const { dark } = useLayout();

    return {
      //Methods
      fetchDesarrolladora,
      fetchGenero,
      item,
      webShareJuego,

      //variables
      dark,
      desarrolladoraSelected,
      generoSelected,

      //Prop Juego
      nombre: props.juego.nombre,
      descripcion: props.juego.descripcion,
      desarrolladoraNombre: props.juego.desarrolladora.nombre,
      desarrolladoraSlug: props.juego.desarrolladora.slug,
      generos: props.juego.generos,
      fecha: props.juego.fecha,
      slug: props.juego.slug,
      imagen: props.juego.imagen,
    };
  },
};
</script>

<style lang="sass" scoped>
.card-juego
  width: 100%
  max-width: 302px
  height: 770px
  max-height: 770px

.div-intersection
  height: 770px
  width: 302px

.div-text-descripcion
  :deep(.q-item__label)
    line-height: 1.25rem!Important

.btn-juego-nombre
   :deep(.text-center)
        text-align: left
</style>
