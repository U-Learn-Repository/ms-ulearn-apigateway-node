import { GraphQLServer, Options } from "graphql-yoga";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ProjectResolver, TaskResolver, QuestionResolver} from "./api-gateway/v1";
import { ENDPOINT, PORT } from "./config";

async function bootstrap() {
	const schema = await buildSchema({
		resolvers: [ProjectResolver, TaskResolver, QuestionResolver],
		emitSchemaFile: true,
	});
	const opts: Options = {
		port: PORT || 5000,
		endpoint: ENDPOINT || '/api/graphql',
	};
	const server = new GraphQLServer({
		schema,
	});
	server.start(opts, () => console.log(`Server running on host:${opts.port}${opts.endpoint}`));
}

bootstrap();