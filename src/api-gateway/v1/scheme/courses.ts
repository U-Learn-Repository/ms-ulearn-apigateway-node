import { Field, Int,Float, ObjectType, InputType} from "type-graphql";
import {Task} from "./project";

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

    @Field(type => Int)
    idProfesor: number;

}
@ObjectType()
export class CourseUpdate {
    @Field(type => Int)
    idCurso: number;

    @Field()
    nombre: string;

    @Field()
    categoria: string;

    @Field(type => Float)
    duracion: number;

    @Field(type => Int)
    idProfesor: number;

}

@ObjectType()
export class Categoria{

    @Field()
    categoria: string;
}


@InputType()
export class  CategoriaInput{


    @Field()
    categoria: string;
}

@InputType()
export class CourseInput{

    @Field()
    nombre!: string

    @Field()
    categoria!: string

    @Field()
    duracion!: number


    @Field(type => Int)
    idProfesor!: number;


}

@InputType()
export class CourseUpdateInput{
    @Field(type => Int)
    idCurso!: number;

    @Field()
    nombre!: string

    @Field()
    categoria!: string

    @Field()
    duracion!: number


    @Field(type => Int)
    idProfesor!: number;


}

