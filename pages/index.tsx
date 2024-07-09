import { getPerson, queryClient } from "@/src/api";
import { dehydrate, useQuery } from "react-query";
import request from "graphql-request";
import { GetPersonDocument } from "@/src/generated/graphql";

/* export async function getServerSideProps() {
  await queryClient.prefetchQuery(["person"], () => getPerson());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
} */

export default function Home() {
  //const {data, isLoading} = useQuery(["person"], () => getPerson());
  
  const {data, isLoading} = useQuery({
    queryKey: ["person"],
    queryFn: async () => request("http://localhost:3000/api/graphql", GetPersonDocument,{personId: 4}),
  })
  
  console.log("data", data);

  if(isLoading) {
    return <div>Loading...</div>
  }

  return (
    console.log("data", data),
    <div className="text-2xl text-green-50">Hello Friends, this is the new home</div>
  );
}