import { Field, Int, ObjectType, InputType, ID } from "type-graphql";
import { type} from "os"

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
export class CertificadoInput{
  /*  @Field(type => Int)
    Id!:number;

    @Field()
    Texto!:string;*/

    @Field()
    IdUsuario!: number;

    @Field()
    IdCurso!: number;
}

export interface CertificadoResponse {
    success: boolean;
    data: any;
}