<template>
  <div class="q-mt-xl"></div>
  <div class="div-acceder q-py-lg q-px-lg text-center">
    <div class="text-h4 text-weight-light q-mb-lg">Iniciar sesión</div>
    <q-form data-testid="form" ref="formAcceder" @submit.prevent="formLogin">
      <div class="col-md-12 q-mb-xs">
        <q-input
          clearable
          color="white"
          name="email"
          label="Email"
          data-cy="acceder-input-email"
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
          data-cy="acceder-input-password"
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

      <div class="col-md-12">
        <q-btn
          no-caps
          :disabled="v$.email.$invalid || v$.password.$invalid"
          color="primary"
          rounded
          icon-right="lock_outline"
          label="Acceder"
          data-cy="acceder-button-submit"
          type="submit"
        />
      </div>
    </q-form>
  </div>
  <div class="div-sin-cuenta q-py-md q-px-lg text-center">
      <div class="text-h6 q-mb-md">¿ No tienes cuenta ?</div>
       <q-btn data-cy="acceder-button-crear-cuenta" outline class="text-h6" :class="dark ? 'text-white' : 'text-black'" padding="sm xl" no-caps label="Crear cuenta" @click="toRegister" />
  </div>
  <modal-info @confirm="closeModal" :open="modalError">
     <q-card-section>{{modalMessageError}}</q-card-section>
  </modal-info>
</template>

<script>
import { defineAsyncComponent, ref } from "vue";
import useAuth from "../composables/useAuth";
import useLayout from "src/modules/layout/composables/useLayout";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core/dist/index.es";
export default {
  name: "Acceder",
    components: {
    ModalInfo: defineAsyncComponent(() => import('/src/modules/layout/components/Modal.vue')),
  },
  setup() {
    const { dark } = useLayout();
    const { login, inicio, notifLogin, toRegister, } = useAuth();
    const email = ref("");
    const password = ref("");
    const pwdTextShow = ref(true);
    const modalError = ref(false)
    const modalMessageError = ref("") 
    const formAcceder = ref("")
    return {
      //Methods
      closeModal(){
        modalError.value = false
      },
      formLogin: async() => {
        const logged = await login(email.value, password.value)
        if(logged != true) {
          modalError.value = true
          modalMessageError.value = logged.error
        } else {
           notifLogin()
           inicio()
           email.value = ""
           password.value = ""
          formAcceder.value.reset();
        }
      },
      toRegister,

      //Variables
      dark,
      email,
      formAcceder,
      modalError,
      modalMessageError,
      password,
      pwdTextShow,
      v$: useVuelidate(),
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
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

.div-sin-cuenta
  width: 325px
  margin: 0 auto
</style>
