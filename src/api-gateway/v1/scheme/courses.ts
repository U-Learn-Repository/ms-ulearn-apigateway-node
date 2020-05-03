import { Field, Float, InputType, Int, ObjectType, ArgsType } from "type-graphql";

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
    @Field(type => Int)
    idCurso!: number;
    
    @Field(type => Float)
    idEstudiante!: number;
}

@ArgsType()
export class InscripcionArgs extends Inscripcion {}