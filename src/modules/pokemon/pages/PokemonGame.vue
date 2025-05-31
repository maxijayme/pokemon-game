<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';

const { gameStatus } = usePokemonGame()

</script>

<template>
  <section v-if="false" class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl font-bold mb-4">Please wait</h1>
    <h3 class="animate-pulse">Loading Pokémon...</h3>
  </section>
  <section class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl font-bold mb-4">Who is this Pokémon?</h1>
    <!-- Pokemon picture -->
    <PokemonPicture />
    <!-- Pokemon options -->
    <PokemonOptions />
  </section>

</template>


<style scoped>

</style>
