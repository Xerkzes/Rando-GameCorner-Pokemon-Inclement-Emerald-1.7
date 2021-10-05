import React, { useState } from "react";
import typeColors from "~/styles/typeColors";
import { getAllPokemons, getSpritePath, getStatbarBackgroundColor, Pokemon } from "~/utils/pokemon";
import classNames from "classnames";

interface Props {}

interface APISprite {
  front_default: string | null;
}

interface APIStat {
  name: string;
  url: string;
}

interface APIStats {
  base_stat: number;
  effort: number;
  stat: APIStat;
}

interface APIType {
  name: string;
  url: string;
}

interface APITypes {
  slot: number;
  type: APIType;
}

interface APIPokemon {
  sprites: APISprite;
  stats: APIStats[];
  types: APITypes[];
  weight: number;
  height: number;
  order: number;
}

const getStatName = (statName: string): JSX.Element => {
  let stat: string = statName.substr(0, 1).toUpperCase() + statName.substr(1);

  switch (statName.toLowerCase()) {
    case "special-attack": {
      stat = "Sp. Atk";
      break;
    }
    case "special-defense": {
      stat = "Sp. Def";
      break;
    }
  }

  return (
    <p className="" style={{ minWidth: "4rem" }}>
      {stat}:
    </p>
  );
};

const createStatBar = (stat: number): JSX.Element => {
  const backgroundColor: string = getStatbarBackgroundColor(stat);

  return (
    // container
    <div className="ml-2 w-36 flex items-center">
      {/* bar */}
      <div
        className={classNames("h-5/6 rounded-lg", backgroundColor)}
        style={{ width: `${stat}px` }}
      ></div>
    </div>
  );
};

export const RandoPokemon: React.FC<Props> = () => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemonData, setPokemonData] = useState<APIPokemon>();
  const [loading, setLoading] = useState<boolean>(true);

  const generateRandoPokemon = () => {
    // get all pokemons
    const pokemons: Pokemon[] = getAllPokemons();
    // get random pokemon
    const randoPokemon: Pokemon = pokemons[Math.floor(Math.random() * pokemons.length)];

    // reset loading if the new pokemon is different
    if (randoPokemon.name != pokemon?.name) setLoading(true);

    // set Pokemon
    setPokemon(randoPokemon);
    // fetch data and set afterwards
    const fetching = async () => {
      const data = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" + randoPokemon.name.toLowerCase()
      )
        .then((response) => response.json())
        .then((data) => data);

      setPokemonData(data);
    };
    fetching();
  };

  const finishedLoading = () => {
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-center text-xl mb-5">Rando Pokemon Inclement-Emelrad 1.7</h1>

      <div className="text-center mb-10">
        <button
          className="bg-green-200 py-1 px-3 rounded-xl shadow-md hover:bg-green-400"
          onClick={() => generateRandoPokemon()}
        >
          Generate
        </button>
      </div>

      {pokemonData != undefined && (
        <div className="max-w-min mx-auto bg-blue-100 p-5 rounded-2xl shadow-xl">
          {/* pokemon name */}
          {pokemon != undefined && (
            <div>
              <p className="text-center font-bold text-2xl mb-4">{pokemon.name}</p>
            </div>
          )}

          {/* card */}
          <div className="flex gap-5">
            {/* image-card */}
            <div className="p-2 bg-gray-900 rounded" style={{ minWidth: "9rem" }}>
              {/* image-container */}
              <div className="bg-white rounded-full mx-auto w-24 h-24">
                {/* loader */}
                <div className={classNames("", loading ? "lds-dual-ring" : "hidden")}></div>
                {/* image */}
                <img
                  className={classNames("", loading ? "hidden" : "")}
                  width={100}
                  height={100}
                  onLoad={() => finishedLoading()}
                  src={pokemon != undefined ? getSpritePath(pokemon) : ""}
                />
              </div>
              {/* types */}
              <div className="flex justify-center gap-2 mt-3">
                {pokemonData.types.map((type: APITypes) => {
                  return (
                    <p
                      key={type.type.name}
                      className="text-white px-2 rounded uppercase font-bold text-xs"
                      style={{ backgroundColor: typeColors[type.type.name.toLowerCase()] }}
                    >
                      {type.type.name}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* stats */}
            <div>
              {pokemonData.stats.map((stat: APIStats) => {
                return (
                  <div key={stat.stat.name} className="flex gap-1 border-b border-black">
                    {getStatName(stat.stat.name)}
                    <p className="text-right w-8">{stat.base_stat}</p>
                    {createStatBar(stat.base_stat)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
