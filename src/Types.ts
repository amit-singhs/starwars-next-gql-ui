// Types.ts

export type Homeworld = {
    name: string;
    climate: string;
    terrain: string;
  };
  
  export type Film = {
    title: string;
    episode: string;
  };
  
  export type Vehicle = {
    name: string;
    model: string;
    class: string;
    cost: string;
  };
  
  export type Starship = {
    name: string;
    model: string;
    class: string;
    cost: string;
  };
  
  export type Person = {
    name: string;
    url: string;
    birthYear: string;
    homeworld: Homeworld;
    films: Film[];
    vehicles: Vehicle[];
    starships: Starship[];
  };
  export type CharacterProps = {
    person: Person;
  };