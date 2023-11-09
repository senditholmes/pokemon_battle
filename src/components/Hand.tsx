import { useState, useContext } from "react";
import { Pokemon } from "../types/types";
import { DeckContext } from "./Deck";

export default function Hand() {
  const importedDeck = useContext(DeckContext);
  const [playerHand, setPlayerHand] = useState<Pokemon[] | null>(null);

  function initialDrawHand() {
    if (importedDeck) {
      const firstFive = importedDeck.splice(0, 5);
      setPlayerHand(firstFive);
    }
  }

  function playCard(event: React.MouseEvent<HTMLDivElement>) {
    if (playerHand) {
      const cardToPlayIndexStr = event.currentTarget.getAttribute("data-key");
      const cardToPlayIndex = cardToPlayIndexStr
        ? parseInt(cardToPlayIndexStr, 10)
        : NaN;

      const updatedPlayerHand = playerHand.filter(
        (_, index) => index !== cardToPlayIndex
      );

      const updatedPlayerHandReindexed = updatedPlayerHand.map(
        (element, index) => ({
          ...element,
          index,
        })
      );

      setPlayerHand(updatedPlayerHandReindexed);
    }
  }

  function drawAcard() {
    if (importedDeck) {
      const idx = Math.floor(Math.random() * importedDeck.length);
      const randomCardfromDeck = importedDeck[idx];

      setPlayerHand((prevPlayerHand) =>
        prevPlayerHand
          ? [...prevPlayerHand, randomCardfromDeck]
          : prevPlayerHand
      );
    }
  }

  return (
    <>
      <button onClick={initialDrawHand}>Draw your first hand</button>
      <button onClick={drawAcard}> Draw one card </button>
      <div className="hand">
        {playerHand ? (
          playerHand.map((pokemon, index) => (
            <div
              className="pokemon-card"
              key={index}
              data-key={index}
              onClick={playCard}
            >
              {" "}
              {pokemon.name}{" "}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

// How can I make the cards disappear from the importedDeck as they are used in playerHand????
// How can I add catch errors for an empty deck?
// How can I limit my hand to only 5 cards?
