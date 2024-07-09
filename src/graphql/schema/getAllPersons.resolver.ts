import { Resolver, Query } from 'type-graphql';
import { Person } from './person'; // Assuming you have defined the Person type here

@Resolver()
export class AllPersonResolver {
    @Query(() => [Person])
    async getAllPersons(): Promise<Person[] | null> {
        try {
            const response = await fetch('https://swapi.info/api/people');
            if (!response.ok) {
                throw new Error(`Failed to fetch persons. Status: ${response.status}`);
            }

            const data = await response.json();
            // Assuming data is an array of persons as described in your example

            // Map each person from API response to Person type
            const persons = data.map((personData: any) => ({
                name: personData.name,
                url: personData.url,
                birthYear: personData.birth_year,
            }));

            return persons;
        } catch (error) {
            console.error('Error fetching all persons:', error);
            return null;
        }
    }
}
