import { GraphQLServer, Options, PubSub } from "graphql-yoga";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { router } from "./api-gateway/v1/routes";
import { ENDPOINT, PORT } from "./config";

async function bootstrap() {
	const schema = await buildSchema({
		resolvers: [__dirname + "/**/*.resolver.{ts,js}"],
		emitSchemaFile: true,
		validate: false,
	});
	const opts: Options = {
		port: PORT || 5000,
		endpoint: ENDPOINT || '/api/graphql',
	};
	const pubsub = new PubSub();
	
	const server = new GraphQLServer({
		schema,
		context: { pubsub }
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