import { Arg, FieldResolver, Query, Resolver, Root, Mutation } from "type-graphql";
import {Credentials, CredentialsInput, User, UserInput} from "../scheme/registerAndLogin";
import { endpoint } from "../endpoint";
import axios from "axios";

import logger from "../../../logger";
import {ChatApiResponse, Grupo} from "../scheme/chats";

@Resolver (of => User)
export class UserResolver{
    @Query(returns => User, {nullable: true})
    async buscarUsuario( @Arg("userId") userId: number ): Promise<User | undefined> {
        try {
            const data = await axios.get(endpoint.users.busqueda + userId.toString());
            //logger.debug(data);
            return data.data;
        } catch (error) {
            logger.error(error);
            return error;

        }
    }

    @Query(returns => [User] ,{nullable: true})
    async listarUsuarios(): Promise<User | undefined>{
            try {
                const data = await axios.get(endpoint.users.lista);
                //logger.debug(data);
                return data.data;
            } catch (error){
                logger.error(error);
                return error;
            }
     }

    @Mutation(returns => User)
    async registrarEstudiante(@Arg("user") user: UserInput): Promise<UserInput | undefined>{
            try {

                const data = await axios.post(endpoint.users.registroEstudiante, user);
                //const data2 = await axios.get(endpoint.users.lista);
                logger.debug(data);
                return user;
            } catch (error){
                logger.error(error);
                return error;
            }
    }

    @Mutation(returns => User)
    async registrarProfesor(@Arg("user") user: UserInput): Promise<UserInput | undefined>{
        try {

            const data = await axios.post(endpoint.users.registroEstudiante, user);
            //const data2 = await axios.get(endpoint.users.lista);
            logger.debug(data);
            return user;
        } catch (error){
            logger.error(error);
            return error;
        }
    }
}

export class CredentialsResolver{
    @Mutation(returns => Credentials )
    async asginarRolEstudiante(@Arg("credentials") credentials: CredentialsInput): Promise<CredentialsInput | undefined>{
        try{
            const data = await axios.post(endpoint.users.registroNuevoRolEstudiante, credentials);
            logger.debug(data);
            return credentials;
        } catch  (error){
            logger.error(error);
            return error;
        }
    }

    @Mutation(returns => Credentials )
    async asginarRolProfesor(@Arg("credentials") credentials: CredentialsInput): Promise<Credentials | undefined>{
        try{
            const data = await axios.post(endpoint.users.registroNuevoRolProfesor, credentials);
            logger.debug(data);
            return credentials;
        } catch  (error){
            logger.error(error);
            return error;
        }
    }

    @Mutation(returns => Credentials)
    async login(@Arg("credentials") credentials: CredentialsInput): Promise<Credentials | undefined>{
        try{
            const data = await axios.post(endpoint.users.login, credentials);
            logger.debug(data);
            return credentials;
        } catch  (error){
            logger.error(error);
            return error;
        }
    }
}