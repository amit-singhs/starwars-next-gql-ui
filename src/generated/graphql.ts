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
  name: Scalars['ID']['output'];
  starships: Array<Starship>;
  url: Scalars['String']['output'];
  vehicles: Array<Vehicle>;
};

export type Query = {
  __typename?: 'Query';
  getAllPersons: Array<Person>;
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

export type GetAllPersonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPersonsQuery = { __typename?: 'Query', getAllPersons: Array<{ __typename?: 'Person', name: string, url: string, birthYear: string }> };

export type GetPersonQueryVariables = Exact<{
  personId: Scalars['Float']['input'];
}>;


export type GetPersonQuery = { __typename?: 'Query', person: { __typename?: 'Person', name: string, url: string, birthYear: string, homeworld: { __typename?: 'Homeworld', name: string, climate: string, terrain: string }, films: Array<{ __typename?: 'Film', title: string, episode: string }>, vehicles: Array<{ __typename?: 'Vehicle', name: string, model: string, class: string, cost: string }>, starships: Array<{ __typename?: 'Starship', name: string, model: string, class: string, cost: string }> } };


export const GetAllPersonsDocument = gql`
    query getAllPersons {
  getAllPersons {
    name
    url
    birthYear
  }
}
    `;
export const GetPersonDocument = gql`
    query getPerson($personId: Float!) {
  person(id: $personId) {
    name
    url
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
    getAllPersons(variables?: GetAllPersonsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllPersonsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllPersonsQuery>(GetAllPersonsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllPersons', 'query', variables);
    },
    getPerson(variables: GetPersonQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetPersonQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPersonQuery>(GetPersonDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPerson', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;