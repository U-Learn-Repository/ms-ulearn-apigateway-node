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
    InsertAnswerArgs,
    UpdateAnswerArgs,
    Qualification,
    InsertQualificationArgs,
    UpdateQualificationArgs
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
            logger.error("Error QuestionResolver.SearchQuestions")
            return error;
        }
    }

    @Query(returns => Question, {nullable: true})
    async SearchQuestion(@Arg("id") userId: string ) : Promise<Question | undefined> {
        try {
            const data = await axios.get(endpoint.quizzes.questionById + userId);
            return data.data.body;
        } catch(error) {
            logger.error("Errror QuestionResolver.SearchQuestion");
            return error;
        }
    }

    @Mutation(returns => Question)
    async InsertQuestion(@Args() {statement, score}: InsertQuestionArgs) : Promise<Question | undefined> {
        try {
            const data = await axios.post(endpoint.quizzes.question, {
                statement: statement,
                score: score
            });

            if(data.data.status == 200){
                return data.data.body;
            }
            throw Error("Error QuestionResolver.InsertQuestion");
        } catch(error) {
            logger.error("Errror QuestionResolver.InsertQuestion");
            return error;
        }
    }

    @Mutation(returns => Question)
    async UpdateQuestion(@Args() args: UpdateQuestionArgs)  : Promise<Question | undefined> {
        try {
            const url = endpoint.quizzes.question + args.id;

            const data = await axios.put(url, {
                statement: args.question.statement,
                score: args.question.score,
                user_id: args.question.user_id
            });

            if(data.data.status == 200){
                return data.data.body;
            }

            throw Error("Error QuestionResolver.UpdateQuestion");
        } catch (error) {
            logger.error(error);
            return error;
        }
    } 

    @Mutation(returns => Question)
    async DeleteQuestion(@Args() args: DeleteQuestionArgs)  : Promise<Question | undefined> {
        try {
            const url = endpoint.quizzes.question + args.id
            const data = await axios.delete(url);

            if(data.data){
                return data.data.body;
            }
            
            throw Error("Error QuestionResolver.DeleteQuestion");
        } catch (error) {
            logger.error(error);
            return error;
        }
    } 
}



@Resolver(of => Question)
export class AnswerResolver {

    @Mutation(returns => Answer)
    async InsertAnswer(@Args() answer: InsertAnswerArgs)  : Promise<Answer | undefined> {
        try {
            const data = await axios.post(endpoint.quizzes.answer, answer);

            if(data.data.status == 200){
                return data.data.body;
            }
            
            throw Error("Error AnswerResolver.InsertAnswer");
        } catch (error) {
            logger.error(error);
            return undefined;
        }
    } 

    @Mutation(returns => Answer)
    async UpdateAnswer(@Args() args: UpdateAnswerArgs)  : Promise<Answer | undefined> {
        try {
            const url = endpoint.quizzes.answer + '/' + args.id
            let params = args;
            delete params.id;

            const data = await axios.put(url, params);

            if(data.data.status == 200){
                return data.data.body;
            }
            
            throw Error("Error AnswerResolver.UpdateAnswer");
        } catch (error) {
            logger.error(error);
            return undefined;
        }
    } 
}

@Resolver(of => Question)
export class QualificationResolver {


    @Mutation(returns => Qualification)
    async InsertQualification(@Args() qualification: InsertQualificationArgs)  : Promise<Qualification | undefined> {
        try {
            const data = await axios.post(endpoint.quizzes.qualification, qualification);

            if(data.data.status == 200){
                return data.data.body;
            }
            
            throw Error("Error QualificationResolver.InsertQualification");
        } catch (error) {
            logger.error(error);
            return undefined;
        }
    }


    @Mutation(returns => Qualification)
    async UpdateQualification(@Args() args: UpdateQualificationArgs)  : Promise<Qualification | undefined> {
        try {
            const url = endpoint.quizzes.qualification + '/' + args.id
            let params = args;
            delete params.id;

            const data = await axios.put(url, params);

            if(data.data.status == 200){
                return data.data.body;
            }
            
            throw Error("Error QualificationResolver.UpdateQualification");
        } catch (error) {
            logger.error(error);
            return undefined;
        }
    } 

}

/*
mutation {
  InsertQuestion(
      statement: "Some statement",
      score: 10
  ) {
    statement
  }
}

mutation {
  UpdateQuestion(
      id: "5ea05dfb878cfee24901ac61",
  		question: {
        statement: "Statement updated",
        score: 11,
        user_id: 1
      }    
  
  ) {
    statement
    score
  }
}
*/