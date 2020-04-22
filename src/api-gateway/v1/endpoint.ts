export const endpoint = {
    chats: {
        grupo: 'http://localhost:3001/api/v1/grupo',
        chat: 'http://localhost:3001/api/v1/chat',
    },
    certificado: {
        certificadoId: 'http://172.17.0.1:6671/v1/certificado/',
        certificadoIdUsuario: 'http://172.17.0.1:6671/v1/certificado/?query=id_usuario:',
    },
    users: {
        busqueda: 'http://172.17.0.1:6665/buscarUsuario/',
        lista: 'http://172.17.0.1:6665/usuarios',
        login: 'http://172.17.0.1:6665/login',
        registroEstudiante: 'http://172.17.0.1:6665/registro/nuevo-usuario/rol/1',
        registroProfesor: 'http://172.17.0.1:6665/registro/nuevo-usuario/rol/2',
        registroNuevoRolEstudiante: 'http://172.17.0.1:6665/registro/usuario/rol/1',
        registroNuevoRolProfesor: 'http://172.17.0.1:6665/registro/usuario/rol/2'
    }
}    