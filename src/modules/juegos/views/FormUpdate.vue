<template>
  <LoadingSkeleton :isLoading="isLoading" />
  <div v-if="!isLoading" class="q-py-xl q-px-lg div-form row">
    <div class="col-md-6 col-xs-12 div-q-form">
      <div class="text-h6">Actualizar juego</div>
      <q-form ref="form" class="q-gutter-md q-mt-lg" @submit.prevent="formUpdate">
        <q-input
          filled
          clearable
          label="Nombre"
          name="nombre"
          type="text"
          v-model="nombre"
          :rules="[
            (val) => v$.nombre.required.$response || 'Debes rellenar este campo',

            (val) =>
              v$.nombre.minLength.$response || 'Debe de tener al menos 2 caracteres',
            (val) =>
              v$.nombre.maxLength.$response || 'Debe de tener menos de 255 caracteres',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="videogame_asset" />
          </template>
        </q-input>

        <q-select
          filled
          :model-value="desarrolladora"
          label="Desarrolladora"
          name="desarrolladora"
          class="q-mb-lg"
          @clear="desarrolladora = ''"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          :options="desarrolladoraFilterOptions"
          @filter="filterDesarrolladorasFn"
          @input-value="setDesarrolladora"
          hint="Seleccione o escribe una desarrolladora"
          :rules="[
            (val) => v$.desarrolladora.required.$response || 'Debes rellenar este campo',
            (val) =>
              v$.desarrolladora.minLength.$response ||
              'Debe de tener al menos 2 caracteres',
            (val) =>
              v$.desarrolladora.maxLength.$response ||
              'Debe de tener menos de 255 caracteres',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="supervised_user_circle" />
          </template>
        </q-select>

        <q-input
          filled
          clearable
          rows="3"
          label="Descripción"
          name="descripcion"
          type="textarea"
          v-model="descripcion"
          :rules="[
            (val) => v$.descripcion.required.$response || 'Debes rellenar este campo',
            (val) =>
              v$.descripcion.minLength.$response ||
              'Debe de tener al menos 10 caracteres',
            (val) =>
              v$.descripcion.maxLength.$response ||
              'Debe de tener menos de 800 caracteres',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="text_fields" />
          </template>
        </q-input>

        <q-select
          class="q-mb-lg select-generos"
          filled
          v-model="genero"
          use-input
          use-chips
          placeholder="Generos"
          counter
          max-values="5"
          hint="Selecciona hasta 5 generos"
          multiple
          input-debounce="0"
          :options="generoFilterOptions"
          @filter="filterGenerosFn"
          @update:model-value="setGenero"
          :rules="[(val) => v$.genero.required.$response || 'Debes rellenar este campo']"
        >
          <template v-slot:prepend>
            <q-icon name="gamepad" />
          </template>
        </q-select>

        <div class="row">
          <div class="input-imagen col-md-6 col-xs-12 q-pr-lg">
            <q-file
              v-model="imagen"
              filled
              counter
              clearable
              @input="uploadImagenBase64"
              @clear="imagenBase64 = imageInitial"
              label="Imagen"
              name="imagen"
              accept="image/jpg,image/jpeg,image/png"
              class="q-mb-lg"
              hint="Medida recomendada: 300x400"
            >
              <template v-slot:prepend>
                <q-icon name="image" />
              </template>
            </q-file>
          </div>

          <div class="col-md-6 col-xs-12">
            <q-input
              class="q-mb-lg input-fecha"
              filled
              v-model="fecha"
              mask="####-##-##"
              readonly
              name="fecha"
              label="Fecha"
              hint="Pulsa en el icono para desplegar el calendario"
              :rules="[
                (val) => v$.fecha.required.$response || 'Debes rellenar este campo',
                (val) =>
                  v$.fecha.minLength.$response || 'Debe de tener al menos 10 caracteres',
                (val) =>
                  v$.fecha.maxLength.$response || 'Debe de tener menos de 10 caracteres',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-date v-model="fecha" mask="YYYY-MM-DD">
                      <div class="row items-center justify-end">
                        <q-btn label="Establecer" color="primary" flat v-close-popup />
                        <q-btn v-close-popup label="Cerrar" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
        <q-btn
          no-caps
          :disabled="
            v$.nombre.$invalid ||
            v$.desarrolladora.$invalid ||
            v$.descripcion.$invalid ||
            v$.fecha.$invalid
          "
          color="warning"
          rounded
          icon="update"
          label="Actualizar"
          type="submit"
        />
      </q-form>
    </div>

    <div class="col-md-6 col-xs-12 row justify-center">
      <VistaPrevia
        :nombre="nombre"
        :desarrolladora="desarrolladora"
        :descripcion="descripcion"
        :generos="genero"
        :imagen="imagenBase64"
        :fecha="fecha"
      />
    </div>
  </div>
  <modal-info @confirm="closeModal" :open="modalUpdateJuego">
    <q-card-section>{{ res.error }}</q-card-section>
  </modal-info>
</template>

<script>
import { defineAsyncComponent, ref, onMounted } from "vue";
import useJuegos from "../composables/useJuegos";
import sanitizeString from "/src/modules/layout/helpers/sanitizeString";
import { required, minLength, maxLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core/dist/index.es";
export default {
  name: "Form",
  components: {
    VistaPrevia: defineAsyncComponent(() => import("../components/VistaPrevia.vue")),
    ModalInfo: defineAsyncComponent(() =>
      import("/src/modules/layout/components/Modal.vue")
    ),
    LoadingSkeleton: defineAsyncComponent(() =>
      import("../components/LoadingSkeleton.vue")
    ),
  },
  setup() {
    const {
      getDesarrolladoras,
      getGeneros,
      itemRedirectUpdate,
      itemUpdate,
      updateJuego,
      notifSuccess,
      editNombre,
      editImagenBase64,
      editChangeDesarrolladora,
      editDesarrolladora,
      editDescripcion,
      editGeneros,
      editImagen,
      editFecha,
      editSlug,
      redirectJuegosItem,
      imageInitial,
      isLoading,
    } = useJuegos();
    const nombre = ref("");
    const desarrolladora = ref("");
    const imagen = ref(null);
    const imagenBase64 = ref(null);
    const desarrolladoraOptions = ref([]);
    const desarrolladoraFilterOptions = ref([]);
    const generoOptions = ref([]);
    const generoFilterOptions = ref([]);
    const generosSelected = ref([]);
    const form = ref("");
    const res = ref("");
    const error = ref(false);
    const modalUpdateJuego = ref(false);

    onMounted(async () => {
      res.value = await itemUpdate();
      if (res.value.error) {
        if (res.value.error == true) res.value.error = res.value.message;
        modalUpdateJuego.value = true;
        error.value = true;
      }
      desarrolladoraOptions.value = await getDesarrolladoras();
      desarrolladoraFilterOptions.value = desarrolladoraOptions.value;
      generoOptions.value = await getGeneros();
      generoFilterOptions.value = generoOptions.value;
    });

    return {
      //Methods
      closeModal() {
        modalUpdateJuego.value = false;
        if (res.value.error == "Juego no encontrado") redirectJuegosItem();
      },
      filterDesarrolladorasFn(val, update, abort) {
        update(() => {
          const needle = val.toLocaleLowerCase();
          desarrolladoraFilterOptions.value = desarrolladoraOptions.value.filter(
            (v) => v.toLocaleLowerCase().indexOf(needle) > -1
          );
        });
      },
      setDesarrolladora(val) {
        console.log(val)
        editChangeDesarrolladora(val);
        //desarrolladora.value = val;
      },
      filterGenerosFn(val, update) {
        update(() => {
          const options = generoOptions.value;
          const stringOptions = options.map(function (gen) {
            return gen.nombre;
          });

          if (val === "") {
            generoFilterOptions.value = stringOptions;
          } else {
            const needle = val.toLowerCase();
            generoFilterOptions.value = stringOptions.filter(
              (v) => v.toLowerCase().indexOf(needle) > -1
            );
          }
        });
      },
      setGenero(val) {
        generosSelected.value = [];
        for (let i = 0; i < val.length; i++) {
          generosSelected.value[i] = sanitizeString(val[i]);
        }
      },
      formUpdate: async () => {
        const payload = {
          nombre: editNombre.value,
          desarrolladora: editDesarrolladora.value,
          descripcion: editDescripcion.value,
          generos: generosSelected.value.length <= 0 ? "" : generosSelected.value,
          fecha: editFecha.value,
          imagen: editImagen.value.startsWith("data:image") ? editImagen.value : null,
          slug: editSlug.value,
        };
        res.value = await updateJuego(payload);
        if (res.value.error) {
          if (res.value.error == true) res.value.error = res.value.message;
          modalUpdateJuego.value = true;
          error.value = true;
        } else {
          console.log(res.value);
          itemRedirectUpdate(res.value.slug);
          notifSuccess(`El juego ${editNombre.value} se ha actulizado correctamente`);
        }
      },
      uploadImagenBase64(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        let rawImg;
        reader.onloadend = () => {
          rawImg = reader.result;
          imagenBase64.value = rawImg;
          editImagenBase64(rawImg);
        };
        reader.readAsDataURL(file);
      },

      //variables
      form,
      desarrolladoraOptions,
      desarrolladoraFilterOptions,
      generoOptions,
      generoFilterOptions,
      imagenBase64: editImagen,
      imageInitial,
      isLoading,
      modalUpdateJuego,
      res,
      v$: useVuelidate(),

      //Juego
      nombre: editNombre,
      desarrolladora: editDesarrolladora,
      descripcion: editDescripcion,
      genero: editGeneros,
      imagen,
      fecha: editFecha,
    };
  },
  validations: {
    nombre: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(255),
    },
    desarrolladora: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(255),
    },
    descripcion: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(800),
    },
    genero: {
      required,
    },
    fecha: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(10),
    },
  },
};
</script>

<style lang="sass" scoped>
.select-generos
  :deep(.q-chip)
    background: #1976D2!Important
.select-generos
  :deep(.ellipsis)
    color: white
  :deep(.q-field__control)
    padding-left: 12px
  :deep(.q-field__prepend)
    padding-right: 18px
.input-fecha
  :deep(.q-field__control:before)
    border-bottom-style: unset
@media (max-width: 1023px)
  .input-imagen
    padding-right: 0px
  .div-form
    display: flex
    justify-content: center
    padding-left: 12px
    padding-right: 12px
  .div-q-form
    margin-bottom: 25px
</style>
