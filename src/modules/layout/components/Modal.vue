<template>
  <q-dialog v-model="modalOpen" persistent>
    <q-card class="q-pt-sm q-px-xs">
      <q-toolbar>
        <q-avatar size="38px">
          <q-img :src="'/icons/icon-152x152.png'" />
        </q-avatar>
        <q-toolbar-title
          ><span class="text-weight-bold">JAVI-CC </span>JUEGOS API</q-toolbar-title
        >
      </q-toolbar>

       <!-- Message -->
      <slot />
      
      <q-card-actions align="right">
        <q-btn v-if="textCancel" flat no-caps :label="textCancel" color="primary" @click="$emit('cancel')" v-close-popup />
        <q-btn
          flat
          no-caps
          :label="textConfirm"
          color="primary"
          @click="$emit('confirm')"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { computed } from "vue";
export default {
  emits: ['cancel','confirm'],
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    labelConfirm: {
      type: String,
      required: false,
      default: 'Ok'
    },
    labelCancel: {
      type: String,
      required: false,
      //default: 'Cancelar'
    },
  },
  setup(props) {
    return {
      //Methods

      //Variables
      modalOpen: computed(() => props.open),
      textConfirm: computed(() => props?.labelConfirm),
      textCancel: computed(() => props?.labelCancel),
    };
  },
};
</script>
