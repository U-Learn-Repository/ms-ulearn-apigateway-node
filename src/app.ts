import { GraphQLServer } from "graphql-yoga";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ProjectResolver, TaskResolver, GrupoResolver, CertificadoResolver, UserResolver} from "./api-gateway/v1";
//import { UserResolver } from './api-gateway/v1/resolver/registerAndLogin.resolver';

async function app() {
    const schema = await buildSchema({
        resolvers: [ProjectResolver, TaskResolver, GrupoResolver, CertificadoResolver, UserResolver],
        emitSchemaFile: true,
    });

    const server = new GraphQLServer({
        schema,
    });
}

export default app;