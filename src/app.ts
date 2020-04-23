import { GraphQLServer } from "graphql-yoga";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ProjectResolver, TaskResolver, GrupoResolver, QuestionResolver, CertificadoResolver, VideoResolver} from "./api-gateway/v1";

async function app() {
    const schema = await buildSchema({
        resolvers: [ProjectResolver, TaskResolver, GrupoResolver, QuestionResolver, CertificadoResolver, VideoResolver],
        emitSchemaFile: true,
    });

    const server = new GraphQLServer({
        schema,
    });
}

export default app;