import axios from "axios";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import logger from "../../../logger";
import { endpoint } from "../endpoint";
import { Certificado, CertificadoInput } from '../scheme/certificado';
import { ValidateAuth } from "../middleware/validateAuth.middleware";
import {certificado_url, certificado_port} from '../../../server';

const URL = 'http://'+ certificado_url + ':' + certificado_port;

@Resolver(of => Certificado)
export class CertificadoResolver {
    @UseMiddleware(ValidateAuth)
    @Query(returns => Certificado, { nullable: true })
    async obtenerCertificadosByID(@Arg("Id") Id: number): Promise<Certificado | undefined> {
        try {
            const data = await axios.get(URL + endpoint.certificado.certificadoId + Id.toString());
            return data.data;
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

    @UseMiddleware(ValidateAuth)
    @Query(returns => [Certificado], { nullable: true })
    async CertificadosByUser(@Arg("IdUsuario") IdUsuario: number): Promise<Certificado | undefined> {
        try {
            const data = await axios.get(URL + endpoint.certificado.certificadoIdUsuario + IdUsuario.toString());
            return data.data
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

    @UseMiddleware(ValidateAuth)
    @Query(returns => [Certificado], { nullable: true })
    async obtenerCertificados(): Promise<Certificado | undefined> {
        try {
            const data = await axios.get(URL + endpoint.certificado.certificadoId);
            return data.data
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

    
    @Mutation(returns => Certificado)
    async registrarCertificado(@Arg("certificado") certificado: CertificadoInput): Promise<CertificadoInput | undefined> {
        try {
            const usuario = await axios.get(URL + endpoint.users.busqueda + certificado.IdUsuario.toString())
            const curso = await axios.get(URL + endpoint.courses.listarCursoId + "?cursoid=" + certificado.IdCurso.toString())
            console.log(curso.data);
            const data = await axios.post(URL + endpoint.certificado.certificadoId + usuario.data.names + "/" + usuario.data.surnames +
                "/" + usuario.data.idDocumment + "/" + curso.data.nombre + "/" + curso.data.duracion, certificado)
            return data.data
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

}