import { Arg, FieldResolver, Mutation, Query, Resolver, Root, ID } from "type-graphql";

import logger from "../../../logger"

import {endpoint} from "../endpoint"
import axios from "axios";

import {
    Question,
    QuestionInput,
    Answer,
    Qualification
} from "../scheme/quizzes";


@Resolver(of => Question)
export class QuestionResolver {

    @Query(() => String)
    ping() {
        return "Pong";
    }

    @Query(returns => [Question], {nullable: true})
    async SearchQuestions() : Promise<[Question] | undefined> {
        try {
            const data = await axios.get(endpoint.quizzes.questions);
            return data.data.body;
        } catch(error) {
            logger.error("Error SearchQuestions")
            return error;
        }
    }

    @Query(returns => Question, {nullable: true})
    async SearchQuestion(@Arg("id") userId: number ) : Promise<Question | undefined> {
        try {
            const data = await axios.get(endpoint.quizzes.questionById + userId.toString());
            return data.data.body;
        } catch(error) {
            logger.error("Errror SearchQuestion");
            return error;
        }
    }

    @Mutation(returns => Question)
    async InsertQuestion(@Arg("question") question: QuestionInput) : Promise<QuestionInput | undefined> {
        try {
            const data = await axios.post(endpoint.quizzes.question, question);
            return data.data.body;
        } catch(error) {
            logger.error("Errror InsertQuestion");
            return error;
        }
    }
}