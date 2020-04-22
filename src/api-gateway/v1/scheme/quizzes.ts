import { Field, ID, Int, ObjectType, InputType, ArgsType } from "type-graphql";
import { type } from "os";

@ObjectType()
export class Question {

    @Field(type => ID)
    id!: number

    @Field(type => String)
    statement!: string

    @Field(type => Int)
    score!: number

    @Field(type => Int)
    user_id!: number

    @Field(type => [Answer])
    answers!: Answer[]

    @Field(type => [Qualification])
    qualifications!: Qualification[]
}

@ObjectType()
export class Answer {
    @Field(type => ID)
    id!: number

    @Field(type => String)
    context!: string

    @Field()
    is_correct!: boolean
}

@ObjectType()
export class Qualification {
    @Field(type => ID)
    id!: number

    @Field(type => Int)
    value!: number

    @Field(type => Int)
    user_id!: number
}


@InputType()
export class QuestionInput{
    @Field()
    statement!: string

    @Field()
    score!: number

    @Field()
    user_id!: number

}

@ArgsType()
export class InsertQuestionArgs {
    @Field()
    id: string;

    @Field()
    statement: string;

    @Field()
    score: string;
}

@ArgsType()
export class UpdateQuestionArgs {
    @Field()
    id: string;

    @Field()
    statement: string;

    @Field()
    score: string;
}


@ArgsType()
export class DeleteQuestionArgs {
    @Field()
    id: string;
}

@ArgsType()
export class InsertAnswerArgs {
    @Field()
    context: string;

    @Field()
    is_correct: boolean;
}

@ArgsType()
export class UpdateAnswerArgs {
    @Field()
    id: string;

    @Field()
    context: string;

    @Field()
    is_correct: boolean;
}

@ArgsType()
export class InsertQualificationArgs {
    @Field()
    value: number;

    @Field()
    user_id: number;
}


@ArgsType()
export class UpdateQualificationArgs {
    @Field()
    id: string;

    @Field()
    value: number;

    @Field()
    user_id: number;
}


export interface QuestionApiResponse {
    success: boolean;
    data: any;
}

export interface AnswerApiResponse {
    success: boolean;
    data: any;
}

export interface QualificationApiResponse {
    success: boolean;
    data: any;
}