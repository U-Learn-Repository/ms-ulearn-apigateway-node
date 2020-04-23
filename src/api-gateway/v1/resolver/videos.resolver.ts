import axios from "axios";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import logger from "../../../logger";
import { endpoint } from "../endpoint";
import { Video } from "../scheme/videos";


@Resolver(of => Video)
export class VideoResolver {
    @Query(returns => [Video], { nullable: true })
    async listarVideos(): Promise<Video | undefined> {
        try {
            const data = await axios.get(endpoint.videos.listarVideos);
            //logger.debug(data);				
            return data.data;
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

    @Query(returns => Video, { nullable: true })
    async buscarVideoID(@Arg("id") id: number): Promise<Video | undefined> {
        try {
            const data = await axios.get(endpoint.videos.listarVideos + id.toString());
            //logger.debug(data);
            return data.data;
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

    @Mutation(returns => String, { nullable: true })
    async eliminarVideoID(@Arg("id") id: number): Promise<String | undefined> {
        try {
            const data = await axios.delete(endpoint.videos.listarVideos + id.toString());
            //logger.debug(data);
            return data.data;
        } catch (error) {
            logger.error(error);
            return error;
        }
    }
}
