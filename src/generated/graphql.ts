import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Film = {
  __typename?: 'Film';
  episode: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Homeworld = {
  __typename?: 'Homeworld';
  climate: Scalars['String']['output'];
  name: Scalars['String']['output'];
  terrain: Scalars['String']['output'];
};

export type Person = {
  __typename?: 'Person';
  birthYear: Scalars['String']['output'];
  films: Array<Film>;
  homeworld: Homeworld;
  name: Scalars['String']['output'];
  starships: Array<Starship>;
  vehicles: Array<Vehicle>;
};

export type Query = {
  __typename?: 'Query';
  person: Person;
};


export type QueryPersonArgs = {
  id: Scalars['Float']['input'];
};

export type Starship = {
  __typename?: 'Starship';
  class: Scalars['String']['output'];
  cost: Scalars['String']['output'];
  model: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Vehicle = {
  __typename?: 'Vehicle';
  class: Scalars['String']['output'];
  cost: Scalars['String']['output'];
  model: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type GetPersonQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPersonQuery = { __typename?: 'Query', person: { __typename?: 'Person', name: string, birthYear: string, homeworld: { __typename?: 'Homeworld', name: string, climate: string, terrain: string }, films: Array<{ __typename?: 'Film', title: string, episode: string }>, vehicles: Array<{ __typename?: 'Vehicle', name: string, model: string, class: string, cost: string }>, starships: Array<{ __typename?: 'Starship', name: string, model: string, class: string, cost: string }> } };


export const GetPersonDocument = gql`
  query getPerson {
  person(id: 2) {
    name
    birthYear
    homeworld {
      name
      climate
      terrain
    }
    films {
      title
      episode
    }
    vehicles {
      name
      model
      class
      cost
    }
    starships {
      name
      model
      class
      cost
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getPerson(variables?: GetPersonQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetPersonQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPersonQuery>(GetPersonDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPerson', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;