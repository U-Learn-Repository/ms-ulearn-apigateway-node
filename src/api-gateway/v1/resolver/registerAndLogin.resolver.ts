import axios from "axios";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import logger from "../../../logger";
import { endpoint } from "../endpoint";
import { ValidateAuth } from "../middleware/validateAuth.middleware";
import { Credentials, CredentialsInput, LoginResponse, Role, User, UserInput } from "../scheme/registerAndLogin";



@Resolver(of => User)
export class UserResolver {
    @UseMiddleware(ValidateAuth)
    @Query(returns => User, { nullable: true })
    async buscarUsuario(@Arg("userId") userId: number): Promise<User | undefined> {
        try {
            const data = await axios.get(endpoint.users.busqueda + userId.toString());
            //logger.debug(data);
            return data.data;
        } catch (error) {
            logger.error(error);
            return error;

        }
    }

    @UseMiddleware(ValidateAuth)
    @Query(returns => [User], { nullable: true })
    async listarUsuarios(): Promise<User | undefined> {
        try {
            const data = await axios.get(endpoint.users.lista);
            //logger.debug(data);
            return data.data;
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

    @UseMiddleware(ValidateAuth)
    @Query(returns => [Role], {nullable: true})
    async obtenerRolPorId(@Arg("userId") userId: number): Promise<Role | undefined>{
        try{
            const data = await axios.get((endpoint.users.rolPorId + userId.toString()));
            return data.data;
        }catch(error){
            logger.error(error);
            return error;
        }
    }

    @UseMiddleware(ValidateAuth)
    @Query(returns => User, {nullable: true})
    async ContarUsuarios(): Promise<User | undefined>{
        try{
            const data = await axios.get((endpoint.users.contarUsuarios));
            return data.data;
        }catch(error){

            logger.error(error);
            return error;
        }
    }

    @Mutation(returns => User)
    async registrarEstudiante(@Arg("user") user: UserInput): Promise<UserInput | undefined> {
        try {
            const data = await axios.post(endpoint.users.registroEstudiante, user);
            //const data2 = await axios.get(endpoint.users.lista);
            logger.debug(data);
            return user;
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

    @Mutation(returns => User)
    async registrarProfesor(@Arg("user") user: UserInput): Promise<UserInput | undefined> {
        try {

            const data = await axios.post(endpoint.users.registroProfesor, user);
            //const data2 = await axios.get(endpoint.users.lista);
            logger.debug(data);
            return user;
        } catch (error) {
            logger.error(error);
            return error;
        }
    }
}

export class CredentialsResolver {
    @Mutation(returns => Credentials)
    async asginarRolEstudiante(@Arg("credentials") credentials: CredentialsInput): Promise<CredentialsInput | undefined> {
        try {
            const data = await axios.post(endpoint.users.registroNuevoRolEstudiante, credentials);
            logger.debug(data);
            return credentials;
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

    @Mutation(returns => Credentials)
    async asginarRolProfesor(@Arg("credentials") credentials: CredentialsInput): Promise<Credentials | undefined> {
        try {
            const data = await axios.post(endpoint.users.registroNuevoRolProfesor, credentials);
            logger.debug(data);
            return credentials;
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

    @Mutation(returns => LoginResponse)
    async login(@Arg("credentials") credentials: CredentialsInput): Promise<LoginResponse | undefined> {
        const qs = require('querystring');
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic c29mdC1lbmctaWk6c2VjcmV0'
                }
            };
            var requestBody = {
                password: credentials.password,
                username: credentials.username,
                grant_type: credentials.grant_type
            };

            const data = await axios.post(endpoint.users.login, qs.stringify(requestBody), config);
            //logger.debug(credentials);
            logger.debug(data.data);
            return data.data;
        } catch (error) {
            logger.error(error);
            //logger.debug(config);
            return error;
        }
    }
}
