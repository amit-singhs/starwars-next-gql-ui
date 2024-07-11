import React from "react";
import Image from "next/image";
import PlaceholderSvg from "../assets/images/placeholder.svg"
import { CharacterProps } from "../../src/Types";

const CharacterCard: React.FC<CharacterProps> = ({ person }) => {
  return (
    <div className="w-full max-w-4xl rounded-xl overflow-hidden bg-gradient-to-br from-[#0F2027] to-[#203A43] text-white">
      <div className="relative h-64 sm:h-80">
        <Image
          src={PlaceholderSvg} // Update with the correct path to your SVG
          alt={person?.name}
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2027]/80 to-transparent" />
      </div>
      <div className="p-6 sm:p-8 grid gap-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-[#203A43] border-2 border-[#34e89e] rounded-full">
            <Image
              src={PlaceholderSvg} // Update with the correct path to your SVG
              alt={""}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{person?.name}</h2>
            <p className="text-sm text-[#34e89e]">{person?.homeworld.name}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold">Films</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {person?.films.map((film, index) => (
                <li key={index}>{film?.title}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Vehicles</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {person?.vehicles.map((vehicle, index) => (
                <li key={index}>{vehicle?.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Starships</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {person?.starships?.map((starship, index) => (
                <li key={index}>{starship?.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Homeworld</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Name: {person?.homeworld?.name}</li>
              <li>Climate: {person?.homeworld?.climate}</li>
              <li>Terrain: {person?.homeworld?.terrain}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Birth Year</h3>
            <p className="mt-2 text-sm">{person?.birthYear}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
