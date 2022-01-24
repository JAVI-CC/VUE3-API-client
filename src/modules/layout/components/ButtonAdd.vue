<template>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn padding="xs" fab icon="add" color="positive" glossy :to="{ name: 'juego-crear' }">
      <q-tooltip class="bg-positive text-subtitle2 text-weight-regular" anchor="center left" self="center right">Insertar juego</q-tooltip>
    </q-btn>
  </q-page-sticky>
</template>