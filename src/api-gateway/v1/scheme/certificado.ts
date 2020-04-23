import { Field, ID, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Certificado {
    @Field(type => ID)
    Id!: number;

    @Field(type => String)
    Texto!: string;

    @Field(type => Int)
    IdUsuario!: number;

    @Field(type => Int)
    IdCurso!: number;
}

@InputType()
export class CertificadoInput {
    @Field()
    IdUsuario!: number;

    @Field()
    IdCurso!: number;
}

export interface CertificadoResponse {
    success: boolean;
    data: any;
}