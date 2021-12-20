<template>
  <div class="text-h6 row justify-center q-mb-md div-previa" style="width: 100%">Vista previa</div>
  <q-card class="my-card card-juego" flat bordered>
    <q-img width="300px" height="400px" :src="imagen ? imagen : 'images/preview1.png'" />
    <q-card-section class="q-px-md">
      <div class="row items-center q-mb-sm">
        <div class="col-10">
          <q-btn
            align="left"
            class="text-h6 btn-juego-nombre"
            padding="none"
            flat
            no-caps
            :label="nombre ? nombre : '{ Nombre }'"
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
          />
        </div>
      </div>
      <q-btn
        class="text-overline q-mb-xs"
        flat
        no-caps
        padding="none"
        :label="desarrolladora ? desarrolladora : '{ Desarrolladora }'"
      />
      <div class="div-text-descripcion">
        <q-item-label class="text-caption text-grey" lines="3">
          {{descripcion ? descripcion : '{ Descripción }'}} 
          </q-item-label>
      </div>
      <div class="q-mt-sm q-mb-xs">
        <template v-if="generos.length">
        <q-btn
          class="q-my-sm q-mr-sm text-caption text-weight-medium"
          rounded
          no-caps
          size="sm"
          color="primary"      
          v-for="genero in generos"
          :key="genero"
          :label="genero"
        />
        </template>
        <template v-else>
        <q-btn
          class="q-my-sm q-mr-sm text-caption text-weight-medium"
          rounded
          no-caps
          size="sm"
          color="primary"
          label="{ Genero }"
        />
        </template>
      </div>
    </q-card-section>
    <div class="absolute-bottom" :class="dark ? 'border-top-dark' : 'border-top-light'">
      <q-icon
        class="float-left q-ml-md q-mt-sm q-mb-sm"
        name="event"
        style="font-size: 21px"
      />
      <div class="float-left text-subtitle2 q-ml-sm q-mt-sm row flex-start">
        {{fecha ? fecha : '{ fecha }'}} 
      </div>
    </div>
  </q-card>
</template>

<script>
import useLayout from "/src/modules/layout/composables/useLayout";
import useJuegos from "../composables/useJuegos";
export default {
  name: "VistaPrevia",
  props: {
    nombre: {
      type: String,
      required: false,
    },
    desarrolladora: {
      type: String,
      required: false,
    },
    descripcion: {
      type: String,
      required: false,
    },
    generos: {
      type: Array,
      required: false,
    },
    imagen: {
      type: String,
      required: false,
    },
    fecha: {
      type: String,
      required: false,
    },
  },

  setup(props) {
    const {} = useJuegos();
    const { dark } = useLayout();

    return {
      //Methods

      //variables
      dark,
      
      //Juego
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
