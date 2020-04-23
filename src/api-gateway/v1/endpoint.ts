export const endpoint = {
    chats: {
        grupo: 'http://localhost:3001/api/v1/grupo',
        chat: 'http://localhost:3001/api/v1/chat',
    },
    quizzes: {
        questions: 'http://172.17.0.1:7777/api/v1/questions/',
        question: 'http://172.17.0.1:7777/api/v1/question/',
        questionById: 'http://172.17.0.1:7777/api/v1/question/',
        answer: 'http://172.17.0.1:7777/api/v1/answer/',
        qualification: 'http://172.17.0.1:7777/api/v1/qualification/'
    },
    users: {
        busqueda: 'http://172.17.0.1:6665/buscarUsuario/',
        lista: 'http://172.17.0.1:6665/usuarios',
        login: 'http://172.17.0.1:6665/login',
        registroEstudiante: 'http://172.17.0.1:6665/registro/nuevo-usuario/rol/1',
        registroProfesor: 'http://172.17.0.1:6665/registro/nuevo-usuario/rol/2',
        registroNuevoRolEstudiante: 'http://172.17.0.1:6665/registro/usuario/rol/1',
        registroNuevoRolProfesor: 'http://172.17.0.1:6665/registro/usuario/rol/2'
    },
    courses: {
        createCurso: 'http://172.17.0.1:6667/curso/registro',
        listarCursos: 'http://172.17.0.1:6667/curso/consulta/',
        listarCrusosByCategoria: 'http://172.17.0.1:6667/curso/consultacategoria/',
        updateCurso: 'http://172.17.0.1:6667/curso/update',
        listarCursoId: 'http://172.17.0.1:6667/curso/consultaid',
        deleteCursoId: 'http://172.17.0.1:6667/curso/eliminarcurso'
    },
    certificado: {
        certificadoId: 'http://172.17.0.1:6671/v1/certificado/',
        certificadoIdUsuario: 'http://172.17.0.1:6671/v1/certificado/?query=id_usuario:',
    }
}