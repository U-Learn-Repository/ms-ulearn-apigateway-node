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

@ObjectType()
export class Role {
    @Field()
    id: number;

    @Field()
    roleName: string;
}

@InputType()
export class CredentialsInput {

    @Field()
    username: string;

    @Field()
    password: string;

    @Field()
    grant_type: string;
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

@ObjectType()
export class LoginResponse{
    @Field()
    access_token: String
    @Field()
    token_type: String
    @Field()
    refresh_token: String
    @Field()
    expires_in: String
    @Field()
    scope: String
}






