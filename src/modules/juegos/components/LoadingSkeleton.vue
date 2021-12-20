<template>
  <div v-show="loading" class="q-pa-md">
    <q-card>
      <q-item>
        <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-skeleton height="600px" square />

      <q-card-actions align="right" class="q-gutter-md">
        <q-skeleton type="QBtn" />
        <q-skeleton type="QBtn" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    return {
      //Methods

      //Variables
      loading: computed(() => props.isLoading),
    };
  },
};
</script>
