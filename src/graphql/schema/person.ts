import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Homeworld {
    @Field(() =>String)
    name: string | undefined;

    @Field(() =>String)
    climate: string | undefined;

    @Field(() =>String)
    terrain: string | undefined;
}

@ObjectType()
export class Film {
    @Field(() =>String)
    title: string | undefined;

    @Field(() =>String)
    episode: string | undefined;
}

@ObjectType()
export class Vehicle {
    @Field(() =>String)
    name: string | undefined;

    @Field(() =>String)
    model: string | undefined;

    @Field(() =>String)
    class: string | undefined;

    @Field(() =>String)
    cost: string | undefined;
}

@ObjectType()
export class Starship {
   @Field(() =>String)
    name: string | undefined;

    @Field(() =>String)
    model: string | undefined;

    @Field(() =>String)
    class: string | undefined;

    @Field(() =>String)
    cost: string | undefined; 
}

@ObjectType()
export class Person {
    @Field(() =>ID)
    name: string | undefined;

    @Field(() =>String)
    birthYear: string | undefined;

    @Field(() =>Homeworld)
    homeworld: Homeworld | undefined;

    @Field(() =>[Film])
    films: Film[] | undefined;

    @Field(() =>[Vehicle])
    vehicles: Vehicle[] | undefined;

    @Field(() =>[Starship])
    starships: Starship[] | undefined;

    @Field(() =>String)
    url: string | undefined;
}