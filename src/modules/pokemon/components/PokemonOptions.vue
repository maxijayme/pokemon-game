<script setup lang="ts">
import type { Pokemon } from '../interfaces'

interface Props {
  options: Pokemon[]
  disableButtons: boolean,
  correctOption: number
}

defineProps<Props>()

defineEmits<{ selectedPokemonId: [id: number] }>()
</script>

<template>
  <section class="mt-5">
    <button
      v-for="{ name, id } in options"
      :key="id"
      :disabled="disableButtons"
      :class="['flex flex-col mt-5 disabled:bg-gray-100', {
        correct: correctOption === id && disableButtons,
        incorrect: correctOption !== id && disableButtons
      }]"
      @click="$emit('selectedPokemonId', id)"
    >
      {{ name }}
    </button>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
button {
  @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center;
}
button:enabled {
  @apply transition-all hover:bg-gray-100 duration-200;
}
button:disabled {
  @apply  cursor-default ;
}

.correct{
  @apply bg-blue-500 text-white;
}

.incorrect{
  @apply opacity-60
}
</style>
