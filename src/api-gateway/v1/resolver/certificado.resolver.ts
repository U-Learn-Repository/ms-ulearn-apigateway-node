import { Arg, FieldResolver, Query, Resolver, Root, Mutation, ID } from "type-graphql";
import { Certificado, CertificadoInput } from '../scheme/certificado';
import { endpoint } from "../endpoint";
import axios, { AxiosResponse } from "axios";
import logger from "../../../logger";
import { UserResolver }  from './registerAndLogin.resolver';

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

    @Query(returns => [Certificado], {nullable: true})
    async CertificadosByUser(@Arg("IdUsuario") IdUsuario: number): Promise<Certificado | undefined> {
        try {
            const data = await axios.get(endpoint.certificado.certificadoIdUsuario + IdUsuario.toString());
            return data.data
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

    @Query(returns => [Certificado], {nullable: true})
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
    async registrarCertificado(@Arg("certificado") certificado: CertificadoInput): Promise<CertificadoInput | undefined>{
    try {
        const usuario = await axios.get(endpoint.users.busqueda + certificado.IdUsuario.toString())
        const data = await axios.post(endpoint.certificado.certificadoId + usuario.data.names + "/" + usuario.data.surnames +
        "/" + usuario.data.idDocumment, certificado)
        return data.data
    } catch (error) {
        logger.error(error);
        return error;
        }
    }
    
}