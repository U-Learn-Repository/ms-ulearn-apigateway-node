import { Field, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
export class User {
    @Field(type => Int)
    id: number;

    @Field()
    names: string;

    @Field(type => Int)
    idDocumment: number;

    @Field()
    password: string;

    @Field()
    surnames: string;

    @Field()
    username: string;
}

@ObjectType()
export class Credentials {

    @Field()
    username: string;
}

@InputType()
export class CredentialsInput {

    @Field()
    username: string;

    @Field()
    password: string;
}

@InputType()
export class UserInput {
    @Field()
    names!: string

    @Field()
    surnames!: string

    @Field()
    id_documment!: number

    @Field()
    username!: string

    @Field()
    password!: string
}
