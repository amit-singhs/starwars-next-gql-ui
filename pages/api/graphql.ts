import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import {buildSchema, Resolver, Query, Arg, ObjectType, Field} from "type-graphql"
import { PersonResolver } from "@/src/graphql/schema/person.resolver";
import { AllPersonResolver } from "@/src/graphql/schema/getAllPersons.resolver";

const schema = await buildSchema({
    resolvers: [PersonResolver, AllPersonResolver]
});

const server = new ApolloServer({
    schema,
  });
  
  export const config = {
    api: {
      bodyParser: false,
    },
  };
  
  const startServer = server.start();
  
  export default async function handler(req: any, res: any) {
    await startServer;
    await server.createHandler({ path: "/api/graphql" })(req, res);
  }