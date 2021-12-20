<template>
  <div class="q-mt-xl q-ml-md div-select-order">
    <q-select
      style="width: 300px"
      dense
      v-model="orderSelected"
      :options="options"
      label="Ordenar por..."
      color="orange-6"
      clearable
      options-selected-class="text-orange-6"
      @update:model-value="fetchJuegosOrder()"
    >
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section avatar>
            <q-icon :name="scope.opt.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ scope.opt.label }}</q-item-label>
            <q-item-label caption>{{ scope.opt.description }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
import useJuegos from "../composables/useJuegos";
export default {
  setup() {
    const { fetchJuegosOrder, orderSelected } = useJuegos();
    return {
      //Methods
      fetchJuegosOrder,

      //Variables
      options: [
        {
          label: "Nombre (a-z)",
          value: "nombreAsc",
          icon: "fas fa-sort-alpha-up-alt",
          description: "Ordenado de la A hasta la Z"
        },
        {
          label: "Nombre (z-a)",
          value: "nombreDesc",
          icon: "fas fa-sort-alpha-down-alt",
          description: "Ordenado de la Z hasta la A"
        },
        {
          label: "Fecha más reciente",
          value: "fechaDesc",
          icon: "fas fa-calendar-week",
          description: "Fecha de lanzamiento más reciente"
        },
        {
          label: "Fecha más antiguo",
          value: "fechaAsc",
          icon: "fas fa-calendar-alt",
          description: "Fecha de lanzamiento más antiguo"
        },
      ],
      orderSelected,
    };
  },
};
</script>

<style lang="sass">
@media (max-width: 668px)
  .div-select-order
    display: flex
    justify-content: center
    margin-left: 0px
</style>
