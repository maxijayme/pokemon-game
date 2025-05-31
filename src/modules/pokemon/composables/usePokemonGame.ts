import { onMounted, ref } from "vue"
import { GameStatus, type PokemonListResponse } from "../interfaces"
import { pokemonApi } from "@/api/pokemonApi"

export const usePokemonGame = () => {

  const getPokemonList = async() => {

    const response = await pokemonApi.get<PokemonListResponse>('?limit=151')

    return response.data
  }

  const gameStatus = ref<GameStatus>(GameStatus.Playing)

  onMounted(
    async () => {
      const pokemonList = await getPokemonList()
      console.log(pokemonList)
    }
  )

  return {
    gameStatus
  }
}
