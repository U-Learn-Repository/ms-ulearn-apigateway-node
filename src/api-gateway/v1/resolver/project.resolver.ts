import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { ProjectData, projects, TaskData, tasks } from "../mocks/data";
import { Project, Task } from "../scheme/project";

@Resolver(of => Project)
export class ProjectResolver {
    @Query(returns => Project, { nullable: true })
    projectByName(@Arg("name") name: string): ProjectData | undefined {
        return projects.find(project => project.name === name);
    }

    @FieldResolver()
    tasks(@Root() projectData: ProjectData) {
        return tasks.filter(task => {
            return task.project_id === projectData.id;
        });
    }
}

@Resolver(of => Task)
export class TaskResolver {
    @Query(returns => [Task])
    fetchTasks(): TaskData[] {
        return tasks;
    }

    @Query(returns => Task, { nullable: true })
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
    }

    @FieldResolver()
    project(@Root() taskData: TaskData) {
        return projects.find(project => {
            return project.id === taskData.project_id;
        });
    }
}