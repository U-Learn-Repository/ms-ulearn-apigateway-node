import { Arg, FieldResolver, Mutation, Query, Resolver, Root, ID, Args } from "type-graphql";

import logger from "../../../logger"

import {endpoint} from "../endpoint"
import axios from "axios";

import {
    Question,
    QuestionInput,
    UpdateQuestionArgs,
    DeleteQuestionArgs,
    InsertQuestionArgs,
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
            console.log("inside")
            const data = await axios.get(endpoint.quizzes.questions);
            console.log("data: ",data);

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
    async InsertQuestion(@Args() question: InsertQuestionArgs) : Promise<Question | undefined> {
        try {
            const data = await axios.post(endpoint.quizzes.question, question);
            
            if(data.data.status == 200){
                return data.data.body;
            }
            throw Error("Error UpdateQuestion");
        } catch(error) {
            logger.error("Errror InsertQuestion");
            return error;
        }
    }

    @Mutation(returns => Question)
    async UpdateQuestion(@Args() args: UpdateQuestionArgs)  : Promise<Question | undefined> {
        try {
            const url = endpoint.quizzes.question + '/' + args.id
            let params = args;
            delete params.id;

            const data = await axios.put(url, params);

            if(data.data.status == 200){
                return data.data.body;
            }
            
            throw Error("Error UpdateQuestion");
        } catch (error) {
            logger.error(error);
            return undefined;
        }
    } 

    @Mutation(returns => Question)
    async DeleteQuestion(@Args() args: DeleteQuestionArgs)  : Promise<Question | undefined> {
        try {
            const url = endpoint.quizzes.question + '/' + args.id
            const data = await axios.put(url);

            if(data.data.status == 200){
                return data.data.body;
            }
            
            throw Error("Error DeleteQuestion");
        } catch (error) {
            logger.error(error);
            return undefined;
        }
    } 
}



@Resolver(of => Question)
export class AnswerResolver {

}