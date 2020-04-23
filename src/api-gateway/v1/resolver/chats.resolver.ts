import axios from "axios";
import { Args, Mutation, Query, Resolver } from "type-graphql";
import { endpoint } from "../endpoint";
import { Chat, ChatApiResponse, DeleteChatArgs, DeleteGrupoArgs, GetChatArgs, GetGrupoArgs, Grupo, PostChatArgs, PostGrupoArgs, PutChatArgs, PutGrupoArgs } from "../scheme/chats";
import { ErrorHandler } from "./error-handler";

@Resolver(of => Grupo)
export class GrupoResolver {
    @Query(returns => [Grupo], { nullable: true })
    async obtenerGrupos(@Args() args: GetGrupoArgs): Promise<Grupo[] | undefined> {
        try {
            const { data: apiResponse } = await axios.get(endpoint.chats.grupo, { params: args });
            const { data, error, success } = apiResponse as ChatApiResponse;
            if (!success) {
                throw new Error(error);
            }
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
            return [];
        }
    }

    @Mutation(returns => Grupo)
    async crearGrupo(@Args() args: PostGrupoArgs): Promise<Grupo | undefined> {
        try {
            const { data: apiResponse } = await axios.post(endpoint.chats.grupo, args);
            const { data, error, success } = apiResponse as ChatApiResponse;
            if (!success) {
                throw new Error(error);
            }
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
            return undefined;
        }
    }

    @Mutation(returns => Grupo)
    async actualizarGrupo(@Args() args: PutGrupoArgs): Promise<Grupo | undefined> {
        try {
            let dataBody = {
                idAdmin: args.idAdmin,
                idAutores: args.idAutores,
                titulo: args.titulo,
            }
            const url = endpoint.chats.grupo + '/' + args.idGrupo;
            const { data: apiResponse } = await axios.put(url, dataBody);
            const { data, error, success } = apiResponse as ChatApiResponse;
            if (!success) {
                throw new Error(error);
            }
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
            return undefined;
        }
    }

    @Mutation(returns => Grupo, { nullable: true })
    async eliminarGrupo(@Args() args: DeleteGrupoArgs): Promise<Grupo | undefined> {
        try {
            let dataBody = {
                idAdmin: args.idAdmin,
            }
            const url = endpoint.chats.grupo + '/' + args.idGrupo;
            const { data: apiResponse } = await axios.delete(url, { data: dataBody });
            const { data, error, success } = apiResponse as ChatApiResponse;
            if (!success) {
                throw new Error(error);
            }
            return undefined;
        } catch (error) {
            ErrorHandler.handle(error);
            return undefined;
        }
    }
}

@Resolver(of => Chat)
export class ChatResolver {
    @Query(returns => [Chat], { nullable: true })
    async obtenerChats(@Args() args: GetChatArgs): Promise<Chat[] | undefined> {
        try {
            const { data: apiResponse } = await axios.get(endpoint.chats.chat, { params: args });
            const { data, error, success } = apiResponse as ChatApiResponse;
            if (!success) {
                throw new Error(error);
            }
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
            return [];
        }
    }

    @Mutation(returns => Chat)
    async crearChat(@Args() args: PostChatArgs): Promise<Chat | undefined> {
        try {
            const { data: apiResponse } = await axios.post(endpoint.chats.chat, args);
            const { data, error, success } = apiResponse as ChatApiResponse;
            if (!success) {
                throw new Error(error);
            }
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
            return undefined;
        }
    }

    @Mutation(returns => Chat)
    async actualizarChat(@Args() args: PutChatArgs): Promise<Chat | undefined> {
        try {
            let dataBody = {
                idAutor: args.idAutor,
                mensaje: args.mensaje,
            };
            const url = endpoint.chats.chat + '/' + args.idGrupo
            const { data: apiResponse } = await axios.put(url, dataBody);
            const { data, error, success } = apiResponse as ChatApiResponse;
            if (!success) {
                throw new Error(error);
            }
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
            return undefined;
        }
    }

    @Mutation(returns => Chat)
    async eliminarChat(@Args() args: DeleteChatArgs): Promise<Chat | undefined> {
        try {
            let params = {
                idAutor: args.idAutor
            }
            const url = endpoint.chats.grupo + '/' + args.idGrupo
            const { data: apiResponse } = await axios.put(url, params);
            const { data, error, success } = apiResponse as ChatApiResponse;
            if (!success) {
                throw new Error(error);
            }
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
            return undefined;
        }
    }
}