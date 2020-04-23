import { Arg, FieldResolver, Mutation, Query, Resolver, Root, ID, Args } from "type-graphql";

import logger from "../../../logger"

import {endpoint} from "../endpoint"
import axios from "axios";

import {
    Question,
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
    async InsertAnswer(@Args() args: InsertAnswerArgs)  : Promise<Answer | undefined> {
        try {
            
            const data = await axios.post(endpoint.quizzes.answer, {
                context: args.answer.context,
                is_correct: args.answer.is_correct
            });

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
            const url = endpoint.quizzes.answer + args.id

            const data = await axios.put(url, {
                context: args.answer.context,
                is_correct: args.answer.is_correct
            });

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
    async InsertQualification(@Args() args: InsertQualificationArgs)  : Promise<Qualification | undefined> {
        try {
            const data = await axios.post(endpoint.quizzes.qualification, {
                value: args.qualification.value,
                user_id: args.qualification.user_id
            });

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
            const url = endpoint.quizzes.qualification + args.id;

            const data = await axios.put(url, {
                value: args.qualification.value,
                user_id: args.qualification.user_id
            });

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
// Questions
query {
    SearchQuestions {
        statement
        score
    }
}

query {
    SearchQuestion(id: "5ea06a38878cfee24901b78e") {
        statement
        score
    }
}

mutation {
  InsertQuestion(
      statement: "Este es un texto de prueba",
      score: 10
  ) {
    statement
  }
}

mutation {
  UpdateQuestion(
      id: "5ea06ae1878cfee24901b9c7",
  		question: {
        statement: "Esta es una actualizacion",
        score: 11,
        user_id: 1
      }    
  
  ) {
    statement
    score
  }
}

mutation {
  DeleteQuestion(id: "5ea06a38878cfee24901b78e") {
    statement
    score
  }
}

// Answer

mutation {
  InsertAnswer(answer: {
    context: "Algun Texto",
    is_correct: true
  }) {
    context
    is_correct
  }
}

mutation {
  UpdateAnswer(id: "5ea0ddf006407000f1ea7524", answer: {
    context: "Algun Texto Actualizado",
    is_correct: false
  }) {
    context
    is_correct
  }
}

// Qualification

mutation {
  InsertQualification(qualification: {
    value: 100,
    user_id: 1
  }) {
    value
    user_id
  }
}

mutation {
  UpdateQualification(id:"5ea0df5e06407000f1ea7525",qualification: {
    value: 5,
    user_id: 1
  }) {
    value
    user_id
  }
}

*/