<template>
  <router-view />
</template>
<script>
import { onMounted, watch } from "vue";
import { useQuasar } from "quasar";
import useLayout from "./modules/layout/composables/useLayout";
import useAuth from "./modules/auth/composables/useAuth";
export default {
  name: "App",

  setup() {
    const $q = useQuasar();
    const { dark, themeInitial } = useLayout();
    const { loggedStatus } = useAuth();
    onMounted(async() => {
      await loggedStatus()
      const darkMode = await themeInitial(!$q.dark.isActive)
      $q.dark.set(darkMode);
    })

    watch(
      () => dark.value,
      (value) => {
        $q.dark.set(value);
      }
    );
  },
};
</script>
