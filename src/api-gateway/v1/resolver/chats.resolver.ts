import { Arg, FieldResolver, Query, Resolver, Root, Mutation } from "type-graphql";
import { Grupo, Chat, ChatApiResponse } from "../scheme/chats";
import { endpoint } from "../endpoint";
import axios from "axios";
import logger from "../../../logger";

/* @Resolver(of => Chat)
export class ProjectResolver {
    @Query(returns => Chat, { nullable: true })
    projectByName(@Arg("name") name: string): Chat[] | undefined {
        return projects.find(project => project.name === name);
    }

    @FieldResolver()
    tasks(@Root() projectData: ProjectData) {
        return tasks.filter(task => {
            return task.project_id === projectData.id;
        });
    }
} */

@Resolver(of => Grupo)
export class GrupoResolver {
    @Query(returns => [Grupo], { nullable: true })
    async obtenerGrupos(
        @Arg("idAutor") idAutor: number,
        @Arg("idGrupo", { nullable: true }) idGrupo?: number
    ): Promise<Grupo[] | undefined> {
        const options = {
            idGrupo: idGrupo,
            idAutor: idAutor,
        };
        try {
            const { data: apiResponse, status } = await axios.get(endpoint.chats.grupo, { params: options });
            const { data, success } = apiResponse as ChatApiResponse;
            logger.debug(data);
            logger.debug(status);
            return data;
        } catch (error) {
            logger.error(error);
            return [];
        }
    }

    /* @Query(returns => Task, { nullable: true })
    getTask(@Arg("id") id: number): TaskData | undefined {
        return tasks.find(task => task.id === id);
    }

    @Mutation(returns => Task)
    markAsCompleted(@Arg("taskId") taskId: number): TaskData {
        const task = tasks.find(task => {
            return task.id === taskId;
        });
        if (!task) {
            throw new Error(`Couldn't find the task with id ${taskId}`);
        }
        if (task.completed === true) {
            throw new Error(`Task with id ${taskId} is already completed`);
        }
        task.completed = true;
        return task;
    } */

    /* @FieldResolver()
    project(@Root() chatData: Chat) {
        return projects.find(project => {
            return project.id === taskData.project_id;
        });
    } */
}