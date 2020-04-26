import axios from "axios";
import { Args, Mutation, Query, Resolver, Subscription, Root, PubSub, Publisher } from "type-graphql";
import { endpoint } from "../endpoint";
import { Chat, ChatApiResponse, DeleteChatArgs, DeleteGrupoArgs, GetChatArgs, GetGrupoArgs, Grupo, PostChatArgs, PostGrupoArgs, PutChatArgs, PutGrupoArgs, ChatMsj } from "../scheme/chats";
import { ErrorHandler } from "./error-handler";

const TOPIC_CHAT = 'CHATS';

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

    @Mutation(returns => Grupo, { nullable: true })
    async crearGrupo(@Args() args: PostGrupoArgs): Promise<Grupo | undefined> {
        /* try {
            args.idAutores.forEach(async idAutor => {
                const respUser = await axios.get(endpoint.users.busqueda + idAutor);
            })
        } catch (error) {
            return undefined;
        } */
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

    @Mutation(returns => Grupo, { nullable: true })
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
    private autoIncrement = 0;

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

    @Mutation(returns => Chat, { nullable: true })
    async crearChat(@Args() args: PostChatArgs, 
    @PubSub(TOPIC_CHAT) publish: Publisher<Chat>,): Promise<Chat | undefined> {
        try {
            const { data: apiResponse } = await axios.post(endpoint.chats.chat, args);
            const { data, error, success } = apiResponse as ChatApiResponse;
            if (!success) {
                throw new Error(error);
            }
            (data as Chat).nombreAutor = 'Pepito' + this.autoIncrement % 2
            this.autoIncrement++;
            await publish(data);
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
            return undefined;
        }
    }

    @Mutation(returns => Chat, { nullable: true })
    async actualizarChat(@Args() args: PutChatArgs): Promise<Chat | undefined> {
        try {
            const { data: apiResponse } = await axios.put(endpoint.chats.chat, args);
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

    @Mutation(returns => Chat, { nullable: true })
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