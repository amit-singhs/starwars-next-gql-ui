import { GraphQLClient } from "graphql-request";
import { QueryClient } from "react-query";

import { getSdk } from "../src/generated/graphql";

const gqlClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}/api/graphql`);
export const { getPerson } = getSdk(gqlClient);

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        },
    },
});