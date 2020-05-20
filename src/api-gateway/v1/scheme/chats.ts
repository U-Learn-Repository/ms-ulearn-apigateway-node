import { ArrayMinSize, Length, Min } from 'class-validator';
import { ArgsType, Field, Float, Int, ObjectType } from "type-graphql";

//                                                Definicion de objetos


@ObjectType()
export class Chat {
  @Field(type => Float)
  idAutor!: number;

  @Field(type => Float)
  idMensaje!: number;

  @Field()
  mensaje?: string;

  @Field()
  nombreAutor?: string;
}

@ObjectType()
export class Grupo {
  @Field(type => Float)
  idGrupo!: number;

  @Field(type => Float)
  idAdmin!: number;

  @Field(type => [Float])
  idAutores!: number[];

  @Field()
  titulo!: string;

  @Field(type => [Chat])
  mensajes?: Chat[];
}

@ObjectType()
export class ChatMsj {
  @Field()
  autor!: string;

  @Field()
  mensaje!: string;

  @Field()
  fecha!: Date;
}

//                                                Definicion de argumentos

@ArgsType()
export class GetGrupoArgs {
  @Field(type => Float)
  @Min(0)
  idAutor: number;

  @Field(type => Float, { nullable: true })
  @Min(0)
  idGrupo?: number;

  @Field(type => Int, { nullable: true })
  @Min(0)
  limit?: number;

  @Field(type => Int, { nullable: true })
  @Min(0)
  page?: number;
}

@ArgsType()
export class PostGrupoArgs {
  @Field(type => Float)
  @Min(0)
  idAdmin: number;

  @Field(type => [Float])
  @ArrayMinSize(1)
  idAutores: [number];

  @Field()
  @Length(1, 50)
  titulo: string;
}

@ArgsType()
export class PutGrupoArgs extends PostGrupoArgs {
  @Field(type => Float)
  @Min(0)
  idGrupo: number;
}

@ArgsType()
export class DeleteGrupoArgs {
  @Field(type => Float)
  @Min(0)
  idGrupo: number;

  @Field(type => Float)
  @Min(0)
  idAdmin: number;
}

@ArgsType()
export class ChatArgs {
  @Field(type => Float)
  @Min(0)
  idAutor: number;
}

@ArgsType()
export class DeleteChatArgs extends ChatArgs {
  @Field(type => Float)
  @Min(0)
  idAutor: number;

  @Field(type => Float)
  @Min(0)
  idGrupo: number;
}

@ArgsType()
export class GetChatArgs extends ChatArgs {
  @Field(type => Int, { nullable: true })
  @Min(0)
  limit?: number;

  @Field(type => Int, { nullable: true })
  @Min(0)
  page?: number;
}

@ArgsType()
export class PostChatArgs extends DeleteChatArgs {
  @Field()
  @Length(1, 50)
  mensaje: string;
}

@ArgsType()
export class PutChatArgs extends PostChatArgs { }

//                                                Definicion de interfaces

export interface ChatApiResponse {
  success: boolean;
  data?: any;
  error?: any;
}