import axios from "axios";
import { MiddlewareInterface, ResolverData, NextFn } from "type-graphql";
import { Context } from "../../../context";
import { endpoint } from "../endpoint";
import { ErrorHandler } from "../resolver/error-handler";
import { isUndefined } from "util";

export class ValidateAuth implements MiddlewareInterface<Context> {
    async use({ root, args, context, info }: ResolverData<Context>, next: NextFn) {
        const token = (context as Context).headers.authorization || '';
        if (!isUndefined(root)) {
            return next();
        }
        console.log('Validar endpoint: ' + info.fieldName);
        try {
            console.log('Validar token: ' + token);
            await axios.get(endpoint.users.autenticacion, { headers: { authorization: token } });
            console.log('Token valido');
        } catch (error) {
            ErrorHandler.handle(error);
            throw new Error("Error en la autenticacion");
        }
        return next();
    }
}