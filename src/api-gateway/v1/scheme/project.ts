import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Project {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field(type => [Task])
  tasks: Task[];
}

@ObjectType()
export class Task {
    @Field(type => Int)
    id: number;

    @Field()
    title: string;

    @Field(type => Project)
    project: Project;

    @Field()
    completed: boolean;
}