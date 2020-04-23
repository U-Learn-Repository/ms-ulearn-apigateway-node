import axios from "axios";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import logger from "../../../logger";
import { endpoint } from "../endpoint";
import { Certificado, CertificadoInput } from '../scheme/certificado';

@Resolver(of => Certificado)
export class CertificadoResolver {
    @Query(returns => Certificado, { nullable: true })
    async obtenerCertificadosByID(@Arg("Id") Id: number): Promise<Certificado | undefined> {
        try {
            const data = await axios.get(endpoint.certificado.certificadoId + Id.toString());
            return data.data;
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

    @Query(returns => [Certificado], { nullable: true })
    async CertificadosByUser(@Arg("IdUsuario") IdUsuario: number): Promise<Certificado | undefined> {
        try {
            const data = await axios.get(endpoint.certificado.certificadoIdUsuario + IdUsuario.toString());
            return data.data
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

    @Query(returns => [Certificado], { nullable: true })
    async obtenerCertificados(): Promise<Certificado | undefined> {
        try {
            const data = await axios.get(endpoint.certificado.certificadoId);
            return data.data
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

    @Mutation(returns => Certificado)
    async registrarCertificado(@Arg("certificado") certificado: CertificadoInput): Promise<CertificadoInput | undefined> {
        try {
            const usuario = await axios.get(endpoint.users.busqueda + certificado.IdUsuario.toString())
            const curso = await axios.get(endpoint.courses.listarCursoId + "?cursoid=" + certificado.IdCurso.toString())
            console.log(curso.data);
            const data = await axios.post(endpoint.certificado.certificadoId + usuario.data.names + "/" + usuario.data.surnames +
                "/" + usuario.data.idDocumment + "/" + curso.data.nombre + "/" + curso.data.duracion, certificado)
            return data.data
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

}