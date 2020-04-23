import { Field, Float, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Course {
    @Field(type => Int)
    idCurso: number;

    @Field()
    nombre: string;

    @Field()
    categoria: string;

    @Field(type => Float)
    duracion: number;

    @Field()
    nombreProfesor: string;

}

@ObjectType()
export class Categoria {

    @Field()
    categoria: string;
}


@InputType()
export class CategoriaInput {


    @Field()
    categoria: string;
}

@InputType()
export class CourseInput {
    @Field(type => Int)
    idCurso: number;
    @Field()
    nombre!: string

    @Field()
    categoria!: string

    @Field()
    duracion!: number


    @Field()
    nombreProfesor!: string


}






