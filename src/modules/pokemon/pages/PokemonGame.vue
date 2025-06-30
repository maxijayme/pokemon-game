<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const { gameStatus, isLoading, randomPokemon, pokemonOptions:options, checkSelection, getNextRound } = usePokemonGame()

</script>

<template>
  <section v-if="isLoading || randomPokemon.id === null" class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl font-bold mb-4">Please wait</h1>
    <h3 class="animate-pulse">Loading Pokémon...</h3>
  </section>
  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl font-bold mb-4">Who is this Pokémon?</h1>
    <button
      v-if="gameStatus !== GameStatus.Playing"
      @click="getNextRound()"
      class="bg-blue-500 text-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center"
    >Volver a jugar</button>
    <!-- Pokemon picture -->
    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus"
    />
    <!-- Pokemon options -->
    <PokemonOptions
      :options
      :disable-buttons="gameStatus !== GameStatus.Playing"
      :correct-option="randomPokemon.id"
      @selected-pokemon-id="checkSelection"
      />
  </section>

</template>


<style scoped>

</style>
