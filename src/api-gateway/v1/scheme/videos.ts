import { Field, Float, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Video {
    @Field(type => Int)
    id: number;

    @Field(type => Int)
    id_curso: number;

    @Field(type => Int)
    id_capitulo: number;

    @Field(type => Int)
    id_tema: number;

    @Field()
    archivo: string;

    @Field()
    descripcion: string;

    @Field(type => Float)
    calificacion: number;

    @Field()
    created_at: string;

    @Field()
    updated_at: string;

}


@InputType()
export class VideoInput {
    @Field(type => Int)
    id: number;

    @Field(type => Int)
    id_curso: number;

    @Field(type => Int)
    id_capitulo: number;

    @Field(type => Int)
    id_tema: number;

    @Field()
    archivo: string;

    @Field()
    descripcion: string;

    @Field(type => Float)
    calificacion: number;

    @Field()
    created_at: string;

    @Field()
    updated_at: string;

}

