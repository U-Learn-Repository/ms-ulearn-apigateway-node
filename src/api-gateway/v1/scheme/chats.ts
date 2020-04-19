import { Field, Float, ObjectType } from "type-graphql";

@ObjectType()
export class Chat {
    @Field(type => Float)
    idAutor!: number;

    @Field(type => Float)
    idMensaje!: number;

    @Field()
    mensaje?: string;
}

@ObjectType()
export class Grupo {
    @Field(type => Float)
    idGrupo!: number;

    @Field(type => Float)
    idAdmin!: number;

    @Field(type => [Float])
    idAutores!: number[];

    @Field()
    titulo!: string;

    @Field(type => [Chat])
    mensajes?: Chat[];
}

export interface ChatApiResponse {
    success: boolean;
    data: any;
}