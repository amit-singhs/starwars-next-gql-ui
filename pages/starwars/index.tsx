import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { GetAllPersonsDocument , GetPersonDocument} from "@/src/generated/graphql";
import { Person } from "../../src/Types";

const StarWarsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="300px"
    height="300px"
    viewBox="0 0 192.756 192.756"
  >
    <g fillRule="evenodd" clipRule="evenodd">
      <path fill="#ffffff" d="M0 0h192.756v192.756H0V0z" />
      <path d="M5.669 81.215v12.65h37.003c4.301 0 9.796-3.977 9.796-10.556 0-2.646 1.012-4.372-2.098-7.872l-4.733-5.608c-2.712-2.53.324-2.53 2.602-2.53h15.623v26.566h12.39V67.299h16.699V55.922H38.877c-6.579 0-9.796 6.317-9.615 9.606.182 3.289.787 7.427 6.254 12.398 4.987 4.533-2.469 3.289-3.218 3.289H5.669zM120.348 55.922H100.36L89.155 93.866h12.47l2.023-5.313h13.156l1.953 5.313h12.215l-10.624-37.944zm-13.916 23.522l4.301-13.916 4.049 13.916h-8.35zM170.443 81.215c-4.807 0-4.807-1.771-4.807-1.771 4.119 0 7.771-6.001 7.771-12.145s-6-11.377-10.809-11.377h-26.891v37.944h13.664v-12.65s5.818 6.831 8.854 9.614c3.037 2.783 3.289 3.036 7.41 3.036h21.449v-12.65c.002-.001-11.834-.001-16.641-.001zm-12.398-8.855h-8.672v-6.832h8.672c3.976 0 4.664 6.832 0 6.832zM5.669 98.672h13.979l3.542 12.652 3.289-12.652h14.675l3.795 12.652 3.796-12.652h12.144l-11.133 37.953H38.624l-4.878-17.965-5.496 17.965H16.865L5.669 98.672zM89.578 98.891H69.59l-11.204 37.943h12.469l2.024-5.312h13.157l1.953 5.312h12.216L89.578 98.891zm-13.915 23.521l4.301-13.916 4.048 13.916h-8.349zM170.695 110.059c-2.275 0-4.756.266-2.043 2.795l4.734 5.609c3.109 3.5 3.059 4.959 3.059 7.607 0 6.578-6.508 10.555-10.809 10.555l-29.896.201c-4.119 0-4.371-.252-7.408-3.035-3.035-2.783-8.855-9.615-8.855-9.615v12.65h-13.662V98.883h26.891c4.807 0 10.809 5.234 10.809 11.377 0 6.145-3.652 12.145-7.773 12.145 0 0 1.812 1.822 4.848 1.822 3.037 0 14.727.012 14.727.012.748 0 8.203 1.244 3.217-3.289-5.467-4.971-6.072-9.107-6.254-12.396s2.662-9.881 9.238-9.881h25.57v11.387h-16.393v-.001zm-42.545 5.261h-8.674v-6.832h8.674c3.977 0 4.664 6.832 0 6.832z" />
    </g>
  </svg>
);

export default function Home() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const { data: allPersonsData, isLoading: allPersonsLoading } = useQuery<{ getAllPersons: Person[] }>({
    queryKey: ["allPersons"],
    queryFn: async () =>
      request(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}/api/graphql`, GetAllPersonsDocument),
  });

  const { data: personData, isLoading: personLoading, refetch: refetchPerson } = useQuery<{person: Person}>({
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
     const selectedPersonObject = allPersonsData?.getAllPersons.find(person => person.url === event.target.value);
  
     // Set the selected person into selectedPerson state
     setSelectedPerson(selectedPersonObject || null); // set null if no person found
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <StarWarsIcon />
      <div className="mt-8">
        {allPersonsLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="relative inline-block">
            <select
              value={selectedPerson?.url || ""}
              onChange={handleSelectChange}
              className="px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">Select Star Wars character</option>
              {allPersonsData?.getAllPersons.map((person) => (
                <option key={person.url} value={person.url}>
                  {person.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}