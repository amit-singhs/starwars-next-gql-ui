import { Resolver, Query, Arg } from "type-graphql";
import { Person } from "./person";

@Resolver()
export class PersonResolver {
    @Query(() => Person)
    async person(@Arg("url") url: string): Promise<Person | null> {
        // Example: Fetch person data from a database or external API
        try {
            const response = await fetch(`${url}`);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
    
            // Fetch homeworld details separately
            const homeworldResponse = await fetch(result.homeworld);
            const homeworld = await homeworldResponse.json();
    
            // Fetch films details separately
            const films = await Promise.all(
              result.films.map(async (filmUrl: string) => {
                const filmResponse = await fetch(filmUrl);
                return filmResponse.json();
              })
            );
    
            // Fetch vehicles details separately
            const vehicles = await Promise.all(
              result.vehicles.map(async (vehicleUrl: string) => {
                const vehicleResponse = await fetch(vehicleUrl);
                return vehicleResponse.json();
              })
            );
    
            // Fetch starships details separately
            const starships = await Promise.all(
              result.starships.map(async (starshipUrl: string) => {
                const starshipResponse = await fetch(starshipUrl);
                return starshipResponse.json();
              })
            );
    
            return {
              name: result.name,
              url: result.url,
              birthYear: result.birth_year,
              homeworld: {
                name: homeworld.name,
                climate: homeworld.climate,
                terrain: homeworld.terrain,
              },
              films: films.map((film) => ({
                title: film.title,
                episode: film.episode_id,
              })),
              vehicles: vehicles.map((vehicle) => ({
                name: vehicle.name,
                model: vehicle.model,
                class: vehicle.vehicle_class,
                cost: vehicle.cost_in_credits,
              })),
              starships: starships.map((starship) => ({
                name: starship.name,
                model: starship.model,
                class: starship.starship_class,
                cost: starship.cost_in_credits,
              })),
            };
        } catch (error) {
            console.error(`Error fetching person with ID ${url}:`, error);
            return null;
        }
    }
}
