import { ArgsType, Field, ID, InputType, Int, ObjectType } from "type-graphql";
import { type } from "os";


/**
 * Question Scheme
 */

@ObjectType()
export class Question {

    @Field(type => String)
    id!: string

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

@InputType()
export class QuestionInput {
    @Field()
    statement!: string

    @Field()
    score!: number

    @Field()
    user_id!: number
}

/**
 * Answer Scheme
 */

@ObjectType()
export class Answer {
    @Field(type => String)
    id!: string

    @Field(type => String)
    context!: string

    @Field()
    is_correct!: boolean
}

@InputType()
export class AnswerInput {
    @Field(type => String)
    context!: string

    @Field()
    is_correct!: boolean
}

/**
 * Qualification Scheme
 */


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
export class QualificationInput {
    @Field(type => Int)
    value!: number

    @Field(type => Int)
    user_id!: number
}


/**
 * Insert Args 
 */

@ArgsType()
export class InsertQuestionArgs {
    @Field(type => String)
    statement: string;

    @Field(type => Int)
    score: number;

    @Field(type => Int)
    user_id: number

    @Field(type => [String])
    answers: string[]

    @Field(type => [String])
    qualification!: string[]
}

@ArgsType()
export class UpdateQuestionArgs {
    @Field()
    id: string;

    @Field()
    question: QuestionInput;
}


@ArgsType()
export class DeleteQuestionArgs {
    @Field()
    id: string;
}

/**
 * Answer Args
 */
@ArgsType()
export class InsertAnswerArgs {
    @Field()
    answer: AnswerInput;
}

@ArgsType()
export class UpdateAnswerArgs {
    @Field()
    id: string;

    @Field()
    answer: AnswerInput;
}

/**
 * Qualifications Args
 */

@ArgsType()
export class InsertQualificationArgs {
    @Field()
    qualification: QualificationInput;
}


@ArgsType()
export class UpdateQualificationArgs {
    @Field()
    id: string;

    @Field()
    qualification: QualificationInput;
}