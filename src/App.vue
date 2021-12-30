<template>
  <router-view />
</template>
<script>
import { onMounted, watch } from "vue";
import { useQuasar } from "quasar";
import useLayout from "./modules/layout/composables/useLayout";
import useAuth from "./modules/auth/composables/useAuth";
import useJuegos from "./modules/juegos/composables/useJuegos";
require("./modules/juegos/services/pusher");

export default {
  name: "App",

  setup() {
    const $q = useQuasar();
    const { dark, themeInitial } = useLayout();
    const { loggedStatus } = useAuth();
    const { addJuegoPusher, updateJuegoPusher } = useJuegos();
    onMounted(async () => {
      await loggedStatus();
      const darkMode = await themeInitial(!$q.dark.isActive);
      $q.dark.set(darkMode);

      if (process.env.PUSHER_APP_KEY) {
        window.Echo.channel(process.env.PUSHER_APP_CHANNEL).listen(
          "NewJuegoEvent",
          (juego) => {
            addJuegoPusher(juego.juego);
          }
        );

        window.Echo.channel(process.env.PUSHER_APP_CHANNEL).listen(
          "UpdateJuegoEvent",
          (juego) => {
            updateJuegoPusher(juego.juego, juego.oldSlug);
          }
        );
      }
    });

    watch(
      () => dark.value,
      (value) => {
        $q.dark.set(value);
      }
    );
  },
};
</script>
