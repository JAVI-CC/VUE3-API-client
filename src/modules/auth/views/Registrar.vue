<template>
  <div class="q-mt-xl"></div>
  <div class="div-acceder q-py-lg q-px-lg text-center" style="">
    <div class="text-h4 text-weight-light q-mb-lg">Registrate</div>
    <q-form data-testid="form" ref="formRegistrar" @submit.prevent="formRegister">
      <div class="col-md-12 q-mb-xs">
        <q-input
          clearable
          color="white"
          name="nombre"
          label="Nombre"
          data-cy="registrar-input-nombre"
          v-model="nombre"
          :rules="[
            (val) => v$.nombre.required.$response || 'Debes rellenar este campo',
            (val) =>
              v$.nombre.minLength.$response || 'Debe de tener al menos 3 caracteres',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="person_pin" />
          </template>
        </q-input>
      </div>
      <div class="col-md-12 q-mb-xs">
        <q-input
          clearable
          color="white"
          name="email"
          label="Email"
          data-cy="registrar-input-email"
          v-model="email"
          :rules="[
            (val) => v$.email.required.$response || 'Debes rellenar este campo',
            (val) => v$.email.email.$response || 'Debe ser un email',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>
      </div>

      <div class="col-md-12 q-mb-md">
        <q-input
          color="white"
          name="contraseña"
          clearable
          label="Contraseña"
          data-cy="registrar-input-password"
          v-model="password"
          :type="pwdTextShow ? 'password' : 'text'"
          :rules="[
            (val) => v$.password.required.$response || 'Debes rellenar este campo',
            (val) =>
              v$.password.minLength.$response || 'Debe de tener al menos 8 caracteres',
            (val) =>
              v$.password.maxLength.$response || 'Debe de tener menos de 100 caracteres',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="password" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="pwdTextShow ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="pwdTextShow = !pwdTextShow"
            />
          </template>
        </q-input>
      </div>

      <div class="col-md-12 q-mb-md">
        <q-input
          color="white"
          name="confirmarContraseña"
          clearable
          label="repetir contraseña"
          data-cy="registrar-input-password-confirmation"
          v-model="confirmPassword"
          :type="pwdTextShow ? 'password' : 'text'"
          :rules="[
            (val) => v$.confirmPassword.required.$response || 'Debes rellenar este campo',
            (val) =>
              v$.confirmPassword.minLength.$response ||
              'Debe de tener al menos 8 caracteres',
            (val) =>
              v$.confirmPassword.maxLength.$response ||
              'Debe de tener menos de 100 caracteres',
            (val) =>
              password == confirmPassword ||
              'La contraseña y repetir contraseña deben coincidir',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="password" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="pwdTextShow ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="pwdTextShow = !pwdTextShow"
            />
          </template>
        </q-input>
      </div>

      <div class="col-md-12">
        <q-btn
          no-caps
          :disabled="
            v$.nombre.$invalid ||
            v$.email.$invalid ||
            v$.password.$invalid ||
            v$.confirmPassword.$invalid
          "
          color="primary"
          rounded
          icon-right="send"
          label="Registrar"
          data-cy="registrar-button-submit"
          type="submit"
        />
      </div>
    </q-form>
  </div>
  <modal-info @confirm="closeModal" :open="modalError">
    <q-card-section>{{ modalMessageError }}</q-card-section>
  </modal-info>
</template>

<script>
import { defineAsyncComponent, ref } from "vue";
import useAuth from "../composables/useAuth";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core/dist/index.es";
export default {
  name: "Registrar",
  components: {
    ModalInfo: defineAsyncComponent(() =>
      import("/src/modules/layout/components/Modal.vue")
    ),
  },
  setup() {
    const { register, inicio, notifAuth } = useAuth();
    const nombre = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const pwdTextShow = ref(true);
    const modalError = ref(false);
    const modalMessageError = ref("");
    const formRegistrar = ref("");
    return {
      //Methods
      closeModal() {
        modalError.value = false;
      },
      formRegister: async () => {
        const logged = await register(
          nombre.value,
          email.value,
          password.value,
          confirmPassword.value
        );
        if (logged != true) {
          modalError.value = true;
          modalMessageError.value = logged;
        } else {
          notifAuth();
          inicio();
          nombre.value = "";
          email.value = "";
          password.value = "";
          confirmPassword.value = "";
          formRegistrar.value.reset();
        }
      },

      //Variables
      confirmPassword,
      email,
      formRegistrar,
      nombre,
      modalError,
      modalMessageError,
      password,
      pwdTextShow,
      v$: useVuelidate(),
    };
  },
  validations: {
    nombre: {
      required,
      minLength: minLength(3),
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(100),
    },
    confirmPassword: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(100),
    },
  },
};
</script>

<style lang="sass" scoped>
.div-acceder
  width: 325px
  margin: 0 auto
  border: 1px solid gray
  border-radius: 5px
</style>
