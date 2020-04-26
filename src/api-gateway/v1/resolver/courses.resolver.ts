import axios from "axios";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import logger from "../../../logger";
import { endpoint } from "../endpoint";
import { CategoriaInput, Course, CourseInput } from "../scheme/courses";


@Resolver(of => Course)
export class CourseResolver {
    @Query(returns => [Course], { nullable: true })
    async listarCursos(): Promise<Course | undefined> {
        try {
            const data = await axios.get(endpoint.courses.listarCursos);
            //logger.debug(data);
            return data.data;
        } catch (error) {
            logger.error(error);
            return error;
        }
    }
    @Query(returns => [Course], { nullable: false })
    async listarCursosCategoria(@Arg("categoria") categoria: CategoriaInput): Promise<Course | undefined> {
        try {
            const data = await axios.post(endpoint.courses.listarCrusosByCategoria, categoria);
            //logger.debug(data);
            return data.data;
        } catch (error) {
            console.log(categoria);
            logger.error(error);
            return error;
        }
    }
    @Query(returns => Course, { nullable: true })
    async buscarCursoID(@Arg("courseId") courseId: number): Promise<Course | undefined> {
        try {
            const data = await axios.get(endpoint.courses.listarCursoId + "?cursoid=" + courseId.toString());
            //logger.debug(data);
            return data.data;
        } catch (error) {
            logger.error(error);
            return error;

        }
    }

    @Mutation(returns => Course)
    async crearCurso(@Arg("curso") curso: CourseInput): Promise<CourseInput | undefined> {
        try {

            const data = await axios.post(endpoint.courses.createCurso, curso);
            //const data2 = await axios.get(endpoint.users.lista);
            logger.debug(data);
            return curso;
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

    @Mutation(returns => Course)
    async updateCurso(@Arg("curso") Course: CourseInput): Promise<CourseInput | undefined> {
        try {
            const data = await axios.post(endpoint.courses.updateCurso, Course);
            //logger.debug(data);
            return Course;
        } catch (error) {
            logger.error(error);
            return error;
        }
    }
    @Mutation(returns => String, { nullable: true })
    async deleteCurso(@Arg("idCurso") idCurso: number): Promise<String | undefined> {
        try {
            const data = await axios.delete(endpoint.courses.deleteCursoId + "?cursoid=" + idCurso.toString());
            //logger.debug(data);
            return data.data;
        } catch (error) {
            logger.error(error);
            return error;
        }
    }
}
