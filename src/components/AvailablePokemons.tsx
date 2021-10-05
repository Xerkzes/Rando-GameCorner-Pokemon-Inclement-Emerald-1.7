import classNames from "classnames";
import React, { useState } from "react";
import typeColors from "~/styles/typeColors";
import { AlolaPerson, Choice, ChoicePerson, Pokemon } from "~/utils/pokemon";
import PokemonData from "../utils/Pokemons.json";

interface Props {}

const modalWindowCss: string =
  "bg-gray-700 px-2 py-1 fixed top-2 z-50 transition-all duration-300 rounded";

const createAvailablePokemonDiv = (): JSX.Element => {
  const layout: JSX.Element = (
    <div className="flex gap-2">
      {PokemonData.map((data: ChoicePerson | AlolaPerson) => {
        switch (data.person) {
          case "left": {
            const lPerson: ChoicePerson = data as ChoicePerson;

            return (
              <div key={lPerson.person} className="bg-gray-600 px-2 pb-2 rounded-md">
                <p className="text-center text-cyan-200 text-xl uppercase">{lPerson.person}</p>
                <div>
                  {lPerson.choices.map((choice: Choice) => {
                    return (
                      <div key={choice.type} className="mt-2">
                        <p
                          className="font-bold text-center"
                          style={{ backgroundColor: typeColors[choice.type.toLowerCase()] }}
                        >
                          {choice.type}
                        </p>
                        <div>
                          {choice.pokemons.map((pokemon: Pokemon) => {
                            return (
                              <p key={pokemon.name} className="text-white">
                                {pokemon.name}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }

          case "middle": {
            const mPerson: AlolaPerson = data as AlolaPerson;

            return (
              <div key={mPerson.person} className="bg-gray-600 px-2 pb-2 rounded-md">
                <p className="text-center text-cyan-200 text-xl uppercase">{mPerson.person}</p>
                <div>
                  {mPerson.pokemons.map((pokemon: Pokemon) => {
                    return (
                      <p key={pokemon.name} className="text-white">
                        {pokemon.name}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          }
        }
      })}
    </div>
  );

  return layout;
};

export const AvailablePokemons: React.FC<Props> = () => {
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);

  return (
    <div className="">
      {/* open Setting */}
      <div className={classNames(modalWindowCss, isSettingOpen ? "-right-1/4" : "right-2")}>
        <span
          className="material-icons text-white flex hover:bg-gray-500 hover:cursor-pointer p-1 rounded-lg"
          onClick={() => setIsSettingOpen(true)}
        >
          menu
        </span>
      </div>

      {/* Settings */}
      <div
        className={classNames(
          modalWindowCss,
          isSettingOpen ? "right-2 overflow-y-auto" : "-right-full"
        )}
        style={isSettingOpen ? { maxHeight: "95%" } : {}}
      >
        {/* close */}
        <div className="flex justify-end mb-1">
          <span
            className="material-icons text-white hover:bg-gray-500 hover:cursor-pointer p-1 rounded-lg"
            onClick={() => setIsSettingOpen(false)}
          >
            close
          </span>
        </div>
        {/* available pokemons */}
        {createAvailablePokemonDiv()}
      </div>
    </div>
  );
};
