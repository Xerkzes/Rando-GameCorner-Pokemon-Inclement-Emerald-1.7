import React from "react";
import { AvailablePokemons } from "./AvailablePokemons";
import { RandoPokemon } from "./RandoPokemon";

interface Props {}

export const Homepage: React.FC<Props> = () => {
  return (
    <div className="relative">
      <AvailablePokemons />
      <RandoPokemon />
    </div>
  );
};
