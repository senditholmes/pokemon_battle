import { useState, createContext } from "react";
import { Pokemon } from "../types/types";
import Hand from "./Hand";

export function Deck() {
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setLoading] = useState(Boolean);
  const [playerDeck, setPlayerDeck] = useState<Pokemon[] | null>(null);

  async function fetchData() {
    const endpoint = "https://pokeapi.co/api/v2/pokemon"; // adjust endpoint for more access to better data
    try {
      setLoading(true);
      const response = await fetch(endpoint);
      const rawPokemonData = await response.json();
      setPokemonData(rawPokemonData.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      console.log("Fetch Function complete");
    }
  }

  function makePlayerDeck() {
    if (pokemonData != null && !isLoading) {
      const unshuffledpokemonData: Pokemon[] = pokemonData;

      const [...shuffledPokemonData]: Pokemon[] = unshuffledpokemonData
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      setPlayerDeck(shuffledPokemonData);
    }
  }

  return (
    <DeckContext.Provider value={playerDeck}>
      <>
        <button onClick={fetchData}>Ready?</button>
        <button onClick={makePlayerDeck}>Start!</button>{" "}
        {!playerDeck ? (
          <div>
            <p>Loading</p>
          </div>
        ) : (
          <div>
            <p>Ready to Start</p>
            <Hand />
          </div>
        )}
      </>
    </DeckContext.Provider>
  );
}

export const DeckContext = createContext<Pokemon[] | null>(null);
