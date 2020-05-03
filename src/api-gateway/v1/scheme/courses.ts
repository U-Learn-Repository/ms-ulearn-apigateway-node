import { Min } from 'class-validator';
import { ArgsType, Field, Float, InputType, Int, ObjectType } from "type-graphql";

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

@InputType()
export class Categoria {
    @Field()
    categoria: string;
}

@InputType()
export class CourseInput {
    @Field()
    nombre!: string

    @Field()
    categoria!: string

    @Field()
    duracion!: number

    @Field(type => Int)
    idProfesor!: number;
}

@ObjectType()
export class Inscripcion {
    @Field(type => Int)
    idCurso: number;

    @Field(type => Float)
    idEstudiante: number;

    @Field()
    calificacion: string;
}

@ArgsType()
export class GetInscripcionArgs {
    @Field(type => Int, { nullable: true })
    idCurso?: number;
    
    @Field(type => Float, { nullable: true })
    idEstudiante?: number;
}

@ArgsType()
export class InscripcionArgs {
    @Field(type => Int)
    @Min(0)
    idCurso!: number;

    @Field(type => Float)
    @Min(0)
    idEstudiante!: number;

    @Field()
    calificacion?: string;
}