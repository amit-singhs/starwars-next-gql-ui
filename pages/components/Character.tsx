// Character.tsx

import React from "react";
import { Person, Homeworld } from "../../src/Types";

type CharacterProps = {
  person: Person;
};

const Character: React.FC<CharacterProps> = ({ person }) => {
  const renderList = (items: string[]) => {
    if (!items || items.length === 0) return null;
    return (
      <ul className="mt-2 list-disc list-inside">
        {items.map((item, index) => (
          <li key={index} className="text-sm">
            {item}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-200 to-purple-200 p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800">{person?.name}</h2>
      <div className="mt-4">
        <p className="text-gray-600">
          <span className="font-semibold">Birth Year:</span> {person?.birthYear}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Homeworld:</span> {renderHomeworld(person?.homeworld)}
        </p>
        <div className="mt-2">
          <span className="font-semibold text-gray-600">Films:</span>
          {renderList(person?.films.map(film => film.title))}
        </div>
        <div className="mt-2">
          <span className="font-semibold text-gray-600">Vehicles:</span>
          {renderList(person?.vehicles.map(vehicle => vehicle?.name))}
        </div>
        <div className="mt-2">
          <span className="font-semibold text-gray-600">Starships:</span>
          {renderList(person?.starships.map(starship => starship?.name))}
        </div>
      </div>
    </div>
  );
};

const renderHomeworld = (homeworld: Homeworld | undefined) => {
  if (!homeworld) return "Unknown";
  return `${homeworld?.name} (${homeworld?.climate}, ${homeworld?.terrain})`;
};

export default Character;
