import axios from "axios";
import { Args, Mutation, Publisher, PubSub, Query, Resolver, Root, Subscription, UseMiddleware } from "type-graphql";
import { ValidateAuth } from "../middleware/validateAuth.middleware";
import { endpoint } from "../endpoint";
import { Chat, ChatApiResponse, ChatMsj, DeleteChatArgs, DeleteGrupoArgs, GetChatArgs, GetGrupoArgs, Grupo, PostChatArgs, PostGrupoArgs, PutChatArgs, PutGrupoArgs } from "../scheme/chats";
import { ErrorHandler } from "./error-handler";

import {chat_url, chat_port} from '../../../server';

const URL = 'http://'+ chat_url + ':' + chat_port;

const TOPIC_CHAT = 'CHATS';

@Resolver(of => Grupo)
export class GrupoResolver {
    @UseMiddleware(ValidateAuth)
    @Query(returns => [Grupo], { nullable: true })
    async obtenerGrupos(@Args() args: GetGrupoArgs): Promise<Grupo[] | undefined> {
        try {
            const { data: apiResponse } = await axios.get(URL + endpoint.chats.grupo, { params: args });
            const { data, error, success } = apiResponse as ChatApiResponse;
            if (!success) {
                return undefined;
            }
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
            return [];
        }
    }

    @UseMiddleware(ValidateAuth)
    @Mutation(returns => Grupo, { nullable: true })
    async crearGrupo(@Args() args: PostGrupoArgs): Promise<Grupo | undefined> {
        try {
            for (const idAutor of args.idAutores) {
                await axios.get(URL + endpoint.users.busqueda + idAutor);
            }
        } catch (error) {
            ErrorHandler.handle(error);
            return undefined;
        }
        try {
            const { data: apiResponse } = await axios.post(URL + endpoint.chats.grupo, args);
            const { data, error, success } = apiResponse as ChatApiResponse;
            if (!success) {
                return undefined;
            }
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
            return undefined;
        }
    }

    @UseMiddleware(ValidateAuth)
    @Mutation(returns => Grupo, { nullable: true })
    async actualizarGrupo(@Args() args: PutGrupoArgs): Promise<Grupo | undefined> {
        try {
            let dataBody = {
                idAdmin: args.idAdmin,
                idAutores: args.idAutores,
                titulo: args.titulo,
            }
            const url = URL + endpoint.chats.grupo + '/' + args.idGrupo;
            const { data: apiResponse } = await axios.put(url, dataBody);
            const { data, error, success } = apiResponse as ChatApiResponse;
            if (!success) {
                return undefined;
            }
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
            return undefined;
        }
    }

    @UseMiddleware(ValidateAuth)
    @Mutation(returns => Grupo, { nullable: true })
    async eliminarGrupo(@Args() args: DeleteGrupoArgs): Promise<Grupo | undefined> {
        try {
            let dataBody = {
                idAdmin: args.idAdmin,
            }
            const url = URL + endpoint.chats.grupo + '/' + args.idGrupo;
            const { data: apiResponse } = await axios.delete(url, { data: dataBody });
            const { data, error, success } = apiResponse as ChatApiResponse;
            if (!success) {
                return undefined;
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
    private autoIncrement = 0;
    
    @UseMiddleware(ValidateAuth)
    @Query(returns => [Chat], { nullable: true })
    async obtenerChats(@Args() args: GetChatArgs): Promise<Chat[] | undefined> {
        try {
            const { data: apiResponse } = await axios.get(URL + endpoint.chats.chat, { params: args });
            const { data, error, success } = apiResponse as ChatApiResponse;
            if (!success) {
                return undefined;
            }
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
            return [];
        }
    }

    @UseMiddleware(ValidateAuth)
    @Mutation(returns => Chat, { nullable: true })
    async crearChat(@Args() args: PostChatArgs,
        @PubSub(TOPIC_CHAT) publish: Publisher<Chat>, ): Promise<Chat | undefined> {
        try {
            const { data: apiResponse } = await axios.post(URL + endpoint.chats.chat, args);
            const { data, error, success } = apiResponse as ChatApiResponse;
            if (!success) {
                return undefined;
            }
            const { data: usuario } = await axios.get(URL + endpoint.users.busqueda + (data as Chat).idAutor);
            const { names, surnames } = usuario;
            (data as Chat).nombreAutor = names + ' ' + surnames
            await publish(data);
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
            return undefined;
        }
    }

    @UseMiddleware(ValidateAuth)
    @Mutation(returns => Chat, { nullable: true })
    async actualizarChat(@Args() args: PutChatArgs): Promise<Chat | undefined> {
        try {
            const { data: apiResponse } = await axios.put(URL + endpoint.chats.chat, args);
            const { data, error, success } = apiResponse as ChatApiResponse;
            if (!success) {
                return undefined;
            }
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
            return undefined;
        }
    }

    @UseMiddleware(ValidateAuth)
    @Mutation(returns => Chat, { nullable: true })
    async eliminarChat(@Args() args: DeleteChatArgs): Promise<Chat | undefined> {
        try {
            let params = {
                idAutor: args.idAutor
            }
            const url = URL + endpoint.chats.grupo + '/' + args.idGrupo
            const { data: apiResponse } = await axios.put(url, params);
            const { data, error, success } = apiResponse as ChatApiResponse;
            if (!success) {
                return undefined;
            }
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
            return undefined;
        }
    }

    @Subscription({ topics: TOPIC_CHAT })
    mensajesChat(@Root() { nombreAutor, mensaje }: Chat): ChatMsj {
        const resp: ChatMsj = {
            autor: String(nombreAutor),
            mensaje: String(mensaje),
            fecha: new Date()
        }
        return resp;
    }
}