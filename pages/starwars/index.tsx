import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import {
  GetAllPersonsDocument,
  GetPersonDocument,
} from "@/src/generated/graphql";
import { Person } from "../../src/Types";
import Character from "../components/Character";
import StarWarsIcon from "../assets/images/starwars-icon.svg";
import CharacterCard from "../components/CharacterCard";



export default function Home() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const { data: allPersonsData, isLoading: allPersonsLoading } = useQuery<{
    getAllPersons: Person[];
  }>({
    queryKey: ["allPersons"],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}/api/graphql`,
        GetAllPersonsDocument
      ),
  });

  const {
    data: personData,
    isLoading: personLoading,
    refetch: refetchPerson,
  } = useQuery<{ person: Person }>({
    queryKey: ["Person", selectedPerson?.url], // Include selectedPerson?.url in queryKey
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}/api/graphql`,
        GetPersonDocument,
        { url: selectedPerson?.url }
      ),
    enabled: !!selectedPerson, // Enable query only if selectedPerson is not undefined
  });

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPersonObject = allPersonsData?.getAllPersons.find(
      (person) => person.url === event.target.value
    );

    // Set the selected person into selectedPerson state
    setSelectedPerson(selectedPersonObject || null); // set null if no person found
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-200">
      <div className="mt-8 flex items-center justify-center w-full">
      <img src={StarWarsIcon.src} alt="Star Wars Icon" />
      </div>
      <div className="mt-4">
        {allPersonsLoading ? (
            <span className="loading loading-ring h-12 w-12 bg-gray-600"></span>
        ) : (
          <div>
          <label className="mr-3">Select Character: </label>
          <div className="relative inline-block shadow-md bg-gray-100 hover:bg-gray-200 rounded-lg">
            <select
              value={selectedPerson?.url || ""}
              onChange={handleSelectChange}
              className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select Star Wars character</option>
              {allPersonsData?.getAllPersons.map((person) => (
                <option key={person.url} value={person.url}>
                  {person.name}
                </option>
              ))}
            </select>
          </div>
          </div>
        )}
      </div>
      {personLoading ? (
        //<div className="mt-4 text-2xl font-bold">Fetching the selected character details....</div>
        <span className="loading loading-dots h-20 w-20 bg-gray-600"></span>
      ) : (
        personData && (
          <div className="mt-4">
            <CharacterCard person={personData?.person} />
          </div>
        )
      )}
      <div className="mt-4 text-sm text-gray-600">Made by Amit Singh Sisodia</div>
    </div>
  );
}
