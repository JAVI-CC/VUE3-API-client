<template>
  <div v-show="logged" class="float-right flex-end" :class="estilo ? 'q-mt-sm q-mr-md' : ''">
    <q-btn unelevated padding="xs" color="yellow-9" :size="estilo ? 'xs' : 'sm'" icon="edit" class="q-mr-sm" @click="editar(slug)">
      <q-tooltip
        class="bg-yellow-9 q-py-xs"
        anchor="center left"
        self="center right"
        :offset="[10, 10]"
      >
        Editar juego
      </q-tooltip>
    </q-btn>
    <q-btn unelevated padding="xs" color="red-9" :size="estilo ? 'xs' : 'sm'" icon="delete" @click="openModalEliminarJuego(slug)">
      <q-tooltip
        class="bg-red-9 q-py-xs"
        anchor="top middle"
        self="bottom middle"
        :offset="[10, 10]"
      >
        Eliminar juego
      </q-tooltip>
    </q-btn>
  </div>

  <modal-info
    @confirm="eliminarJuego"
    @cancel="closeModalEliminarJuego"
    :open="modalEliminarJuego"
    labelCancel="Cancelar"
    labelConfirm="Sí"
  >
  <q-card-section>¿ Estás seguro de eliminar el juego: <b>{{nombre}}</b> ?</q-card-section>
  </modal-info>
</template>

<script>
import { ref, defineAsyncComponent } from "vue";
import useAuth from "/src/modules/auth/composables/useAuth";
import useJuegos from "../composables/useJuegos";
export default {
  name: "ButtonsUpdateDelete",
  components: {
    ModalInfo: defineAsyncComponent(() =>
      import("/src/modules/layout/components/Modal.vue")
    ),
  },
  props: {
    nombre: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    estiloInicio: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const { logged } = useAuth();
    const {deleteJuego, notifError, notifSuccess, editar} = useJuegos();
    const modalEliminarJuego = ref(false);
    const slugJuego = ref("");

    return {
      //Methods
      closeModalEliminarJuego() {
        modalEliminarJuego.value = false;
      },
      editar,
      eliminarJuego: async () => {
        modalEliminarJuego.value = false;
        const resp = await deleteJuego(slugJuego.value)
        if(!resp.error) {
          notifSuccess(resp.message)
        } else {
          notifError(resp.message)
        }
      },
      openModalEliminarJuego(slug) {
        slugJuego.value = slug;
        modalEliminarJuego.value = true;
      },

      //Variables
      logged,
      modalEliminarJuego,

      //Prop nombre, slug
      estilo: props.estiloInicio,
    };
  },
};
</script>
