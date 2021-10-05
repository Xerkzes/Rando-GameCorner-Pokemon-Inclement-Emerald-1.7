import PokemonData from "./Pokemons.json";

export interface Pokemon {
  name: string;
  dexNr: number;
}

export interface Choice {
  type: string;
  pokemons: Pokemon[];
}

export interface ChoicePerson {
  person: string;
  choices: Choice[];
}

export interface AlolaPerson {
  person: string;
  pokemons: Pokemon[];
}

export const getAllPokemons = (): Pokemon[] => {
  const pokemons: Pokemon[] = [];

  PokemonData.forEach((data: ChoicePerson | AlolaPerson) => {
    switch (data.person) {
      case "left": {
        const lPerson: ChoicePerson = data as ChoicePerson;

        lPerson.choices.forEach((choice: Choice) => {
          choice.pokemons.forEach((pokemon: Pokemon) => {
            pokemons.push(pokemon);
          });
        });

        break;
      }
      case "middle": {
        const mPerson: AlolaPerson = data as AlolaPerson;

        mPerson.pokemons.forEach((pokemon: Pokemon) => {
          pokemons.push(pokemon);
        });

        break;
      }
    }
  });

  return pokemons;
};

export const getSpritePath = (pokemon: Pokemon): string => {
  let path: string = "sprites/normal/" + pokemon.dexNr;

  if (pokemon.name.toLowerCase().includes("-alola")) path += "-alola";

  path += ".png";

  return path;
};

export const getStatbarBackgroundColor = (stat: number): string => {
  if (stat < 65) {
    return "bg-red-500";
  }
  if (stat < 90) {
    return "bg-yellow-500";
  }
  if (stat < 105) {
    return "bg-yellow-300";
  }
  if (stat < 120) {
    return "bg-green-400";
  }
  if (stat < 151) {
    return "bg-green-300";
  } else {
    return "bg-cyan-200";
  }
};
