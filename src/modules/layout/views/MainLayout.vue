<template>
  <div class="q-pt-xl q-px-md">
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" :key="route.name" />
      </keep-alive>
    </router-view>
  </div>

  <q-layout view="lHh lpr lFf" class="q-mt-xl" style="min-height: 0px">
    <q-header reveal elevated :class="dark ? 'bg-dark' : 'bg-white'">
      <q-toolbar>
        <q-avatar size="32px" class="cursor-pointer">
          <q-img src="/icons/favicon-128x128.png" @click="inicio" />
        </q-avatar>

        <q-toolbar-title
          :class="dark ? 'text-white' : 'text-dark'"
          style="font-size: 20px"
          ><span class="text-weight-bold">JAVI-CC</span> JUEGOS API</q-toolbar-title
        >

        <q-btn
          flat
          round
          :color="dark ? 'white' : 'dark'"
          :icon="dark ? 'brightness_2' : 'brightness_5'"
          @click="changeTheme"
        />
        <q-btn flat round icon="share" color="positive" @click="webShare()" />
      </q-toolbar>
    </q-header>

    <q-footer :class="dark ? 'bg-dark' : 'bg-white footer-box-shadow'">
      <q-toolbar>
        <q-btn
          flat
          no-caps
          :color="dark ? 'white' : 'dark'"
          icon="fas fa-home"
          class="footer-pb-buttons"
          label="Inicio"
          @click="toTop()"
        />
        <q-space />
        <q-btn
          v-if="logged"
          flat
          no-caps
          :color="dark ? 'white' : 'dark'"
          icon="fas fa-lock"
          class="footer-pb-buttons"
          @click="modalCerrarSesion = true"
          label="Cerrar s."
        />
        <q-btn
          v-else
          flat
          no-caps
          :color="dark ? 'white' : 'dark'"
          icon="fas fa-user-secret"
          class="footer-pb-buttons"
          label="Acceder"
          :to="{ name: 'acceder' }"
        />
        <q-space />
        <q-btn
          flat
          no-caps
          :color="dark ? 'white' : 'dark'"
          icon="fas fa-search"
          class="footer-pb-buttons"
          label="Buscar"
          @click="modalSearch = true"
        />
        <q-space />
        <q-btn
          type="a"
          flat
          no-caps
          :color="dark ? 'white' : 'dark'"
          icon="fab fa-github"
          class="footer-pb-buttons"
          href="https://github.com/JAVI-CC/Quasar-API-client"
          target="_blank"
          label="GitHub"
        />
      </q-toolbar>
    </q-footer>
    <ButtonAdd v-show="showButtonAdd" />
  </q-layout>

  <modal-info
    @confirm="cerrarSesion"
    @cancel="closeModalSesion"
    :open="modalCerrarSesion"
    labelCancel="Cancelar"
    labelConfirm="Sí"
  >
  <q-card-section>¿ <b>{{nombre}}</b> estás seguro de cerrar sesión ?</q-card-section>
  </modal-info>

  <modal-info
    @confirm="closeModal"
    :open="modalSearchNotResults"
  > 
  <q-card-section>{{messageSearchNotResults}}</q-card-section>
  </modal-info>

  <q-dialog v-model="modalSearch">
    <q-card style="width: 500px">
      <q-form @submit.prevent="buscar">
        <q-card-section>
          <div class="text-body1">Introduzca la cadena de búsqueda</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            label="Texto a enviar"
            name="search"
            type="text"
            v-model="search"
            :rules="[
              (val) => v$.search.required.$response || 'Debes rellenar este campo',
              (val) =>
                v$.search.minLength.$response || 'Debe de tener al menos 3 caracteres',
            ]"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            class="text-caption"
            label="CANCELAR"
            color="primary"
            v-close-popup
          />
          <q-btn
            type="submit"
            flat
            class="text-caption"
            label="Buscar"
            color="primary"
            :disabled="v$.search.$invalid"
            v-close-popup
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, defineAsyncComponent } from "vue";
import useJuegos from "../../juegos/composables/useJuegos";
import useAuth from "../../auth/composables/useAuth";
import useLayout from "../composables/useLayout";
import sanitizeString from "../helpers/sanitizeString";
import { required, minLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core/dist/index.es";
export default {
  name: "MainLayout",
  components: {
    ModalInfo: defineAsyncComponent(() => import("../components/Modal.vue")),
    ButtonAdd: defineAsyncComponent(() => import("../components/ButtonAdd.vue")),
  },

  setup() {
    const { busqueda, changeTheme, inicio, webShare, toTop, dark } = useLayout();
    const { logged, logout, nombre, notifLogout } = useAuth();
    const { fetchJuegos, formSearch, showButtonAdd } = useJuegos();
    const search = ref("");
    const modalSearchNotResults = ref(false);
    const messageSearchNotResults = ref("");
    const modalCerrarSesion = ref(false);

    return {
      v$: useVuelidate(),
      messageSearchNotResults,
      modalCerrarSesion,
      modalSearch: ref(false),
      modalSearchNotResults,

      search,

      //Methods
      busqueda,
      cerrarSesion: async () => {
        modalCerrarSesion.value = false;
        const resp = await logout();
        if (resp) {
          notifLogout();
        }
      },
      changeTheme,
      closeModal() {
        modalSearchNotResults.value = false;
      },
      closeModalSesion() {
        modalCerrarSesion.value = false;
      },
      fetchJuegos,
      formSearch,
      inicio,
      toTop,
      webShare,
      buscar: async () => {
                window.scrollTo(0,10)
        const { error, message } = await formSearch(search.value);
        if (error) {
          messageSearchNotResults.value = message;
          modalSearchNotResults.value = true;
        } else {
          const searchSlug = sanitizeString(search.value);
          busqueda(searchSlug);
        }
        search.value = "";
      },

      //Variables
      dark,
      logged,
      nombre,
      showButtonAdd,
    };
  },
  validations: {
    search: {
      required,
      minLength: minLength(2),
    },
  },
};
</script>

<style scoped lang="sass">
.footer-box-shadow
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 20%), 0 0px 10px rgb(0 0 0 / 24%)

.footer-pb-buttons
  padding-bottom: 8px

:deep(i.fas.on-left)
  font-size: 20px

:deep(i.fab.on-left)
  font-size: 20px

@media (max-width: 464px)
  .q-btn
    :deep(.on-left)
      margin-right: 3px
    :deep(i.fas.on-left)
      font-size: 22.2px
    :deep(i.fab.on-left)
      font-size: 22.2px

@media (max-width: 426px)
  .footer-pb-buttons
    padding-top: 6px
    padding-bottom: 0px

@media (max-width: 414px)
  .q-btn
    :deep(.on-left)
      margin-right: 0px
  .footer-pb-buttons
    :deep(.q-btn__content)
        width: 100%
</style>
