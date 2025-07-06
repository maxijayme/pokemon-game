<script setup lang="ts">
import { computed } from 'vue';
import { GameStatus } from "../interfaces"

  interface Props {
    pokemonId: number,
    showPokemon?: GameStatus
  }

  const props = withDefaults(defineProps<Props>(),{
    showPokemon: GameStatus.Playing
  })

  const pokemonImage = computed(()=>`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`)
  </script>

<template>
  <section>
    <img
      data-vtest="pokemon-picture-image"
      class="w-64 h-64 object-contain fade-in"
      :class="{
        'brightness-0': props.showPokemon === GameStatus.Playing,
        'grayscale': props.showPokemon === GameStatus.Lost
      }"
      :src="pokemonImage"
      alt="Pokemon Picture"/>
  </section>
</template>


<style scoped>
  img {
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;

  }
  .grayscale {
    filter: grayscale(1);
  }

</style>
