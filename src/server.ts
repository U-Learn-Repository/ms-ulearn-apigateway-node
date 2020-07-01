import { GraphQLServer, Options, PubSub } from "graphql-yoga";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { router } from "./api-gateway/v1/routes";
import { ENDPOINT, PORT } from "./config";
import { ValidateAuth } from "./api-gateway/v1";
import { ContextParameters } from "graphql-yoga/dist/types";

export const user_url        = process.env.USER_URL;
export const user_port        = process.env.USER_PORT;

export const chat_url = process.env.CHAT_URL;
export const chat_port = process.env.CHAT_PORT;

export const quizzes_url = process.env.QUIZZES_URL;
export const quizzes_port = process.env.QUIZZES_PORT;

export const cursos_url = process.env.CURSOS_URL;
export const cursos_port = process.env.CURSOS_PORT;

export const certificado_url= process.env.CERTIFICADO_URL;
export const certificado_port= process.env.CERTIFICADO_PORT;


async function bootstrap() {
	const schema = await buildSchema({
		resolvers: [__dirname + "/**/*.resolver.{ts,js}"],
		emitSchemaFile: true,
		validate: false
	});
	const opts: Options = {
		port: PORT || 5000,
		endpoint: ENDPOINT || '/api/graphql',
	};
	const pubsub = new PubSub();

	const server = new GraphQLServer({
		schema,
		context: (req: ContextParameters) => {
			const headers = req.request.headers
			return { pubsub, headers }
		},
	});

	const express = server.express;
	const apiEndpoint = '/api'
	express.use(apiEndpoint, router);


	server.start(opts, () => {
		console.log(`GraphQL running on host:${opts.port}${opts.endpoint}`)
		console.log(`API running on host:${opts.port}${apiEndpoint}`)
	});
}

bootstrap();