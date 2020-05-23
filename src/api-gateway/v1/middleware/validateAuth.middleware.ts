import axios from "axios";
import { MiddlewareInterface, ResolverData, NextFn } from "type-graphql";
import { Context } from "../../../context";
import { endpoint } from "../endpoint";
import { ErrorHandler } from "../resolver/error-handler";

export class ValidateAuth implements MiddlewareInterface<Context> {
    async use({ context, info }: ResolverData<Context>, next: NextFn) {
        console.log('Validate endpoint: ' + info.fieldName);
        console.log('Validate header: ' + context.headers.authorization);
        const token = context.headers.authorization || '';
        try {
            const data = await axios.get(endpoint.users.autenticacion, {headers: {authorization: token}});
        } catch (error) {
            ErrorHandler.handle(error);
            throw new Error("Error en la autenticacion"); 
        }
        return next();
    }
}