import axios from "axios";
import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { isNull } from "util";
import logger from "../../../logger";
import { endpoint } from "../endpoint";
import { Categoria, Course, CourseInput, GetInscripcionArgs, Inscripcion, InscripcionArgs } from "../scheme/courses";
import { ErrorHandler } from "./error-handler";

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
    async listarCursosCategoria(@Arg("categoria") categoria: Categoria): Promise<Course | undefined> {
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

@Resolver(of => Inscripcion)
export class InscripcionResolver {
    @Query(returns => [Inscripcion], { nullable: true })
    async listarInscripciones(@Args() args: GetInscripcionArgs): Promise<Inscripcion[] | undefined> {
        try {
            const { data: apiResponse } = await axios.get(endpoint.courses.inscripcion, { params: args });
            return apiResponse;
        } catch (error) {
            ErrorHandler.handle(error);
            return [];
        }
    }

    @Mutation(returns => Inscripcion, { nullable: true })
    async crearInscripcion(@Args() args: InscripcionArgs): Promise<Inscripcion | undefined> {
        const usuario = await this.obtenerUsuario(args.idEstudiante);
        const curso = await this.obtenerCurso(args.idCurso);
        if (isNull(usuario) || isNull(curso)) {
            return undefined;
        }
        try {
            const { data: apiResponse } = await axios.post(endpoint.courses.inscripcion, args);
            return (args as Inscripcion);
        } catch (error) {
            ErrorHandler.handle(error);
            return undefined;
        }
    }

    @Mutation(returns => Inscripcion, { nullable: true })
    async actualizarInscripcion(@Args() args: InscripcionArgs): Promise<Inscripcion | undefined> {
        try {
            const { data: apiResponse } = await axios.put(endpoint.courses.inscripcion, args);
            return (args as Inscripcion);
        } catch (error) {
            ErrorHandler.handle(error);
            return undefined;
        }
    }

    @Mutation(returns => Inscripcion, { nullable: true })
    async eliminarInscripcion(@Args() args: InscripcionArgs): Promise<Inscripcion | undefined> {
        try {
            const { data: apiResponse } = await axios.delete(endpoint.courses.inscripcion, { data: args });
            return (args as Inscripcion);
        } catch (error) {
            ErrorHandler.handle(error);
            return undefined;
        }
    }

    private async obtenerUsuario(userId: number): Promise<any | null> {
        try {
            const { data: apiResponse } = await axios.get(endpoint.users.busqueda + userId);
            return apiResponse;
        } catch (error) {
            return null;
        }
    }

    private async obtenerCurso(idCurso: number): Promise<any | null> {
        const params = {
            cursoid: idCurso,
        }
        try {
            const { data: apiResponse } = await axios.get(endpoint.courses.listarCursoId, { params: params });
            return apiResponse;
        } catch (error) {
            return null;
        }
    }
}