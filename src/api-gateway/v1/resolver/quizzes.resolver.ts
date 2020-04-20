import { Arg, FieldResolver, Mutation, Query, Resolver, Root, ID } from "type-graphql";
import { ProjectData, projects, TaskData, tasks } from "../mocks/data";
import {
    Question,
    Answer,
    Qualification
} from "../scheme/quizzes";

@Resolver(of => Question)
export class QuestionResolver {

    @Query(() => String)
    ping() {
        return "Pong";
    }
}