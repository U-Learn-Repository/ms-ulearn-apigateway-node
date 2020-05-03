export const endpoint = {
    chats: {
        grupo: 'http://172.17.0.1:6663/api/v1/grupo',
        chat: 'http://172.17.0.1:6663/api/v1/chat',
    },
    quizzes: {
        questions: 'http://54.162.189.86:7777/api/v1/questions/',
        question: 'http://54.162.189.86:7777/api/v1/question/',
        questionById: 'http://54.162.189.86:7777/api/v1/question/',
        answer: 'http://54.162.189.86:7777/api/v1/answer/',
        qualification: 'http://54.162.189.86:7777/api/v1/qualification/'
    },
    users: {
        busqueda: 'http://172.17.0.1:6665/buscarUsuario/',
        lista: 'http://172.17.0.1:6665/usuarios',
        login: 'http://172.17.0.1:6665/login',
        registroEstudiante: 'http://172.17.0.1:6665/registro/nuevo-usuario/rol/1',
        registroProfesor: 'http://172.17.0.1:6665/registro/nuevo-usuario/rol/2',
        registroNuevoRolEstudiante: 'http://172.17.0.1:6665/registro/usuario/rol/1',
        registroNuevoRolProfesor: 'http://172.17.0.1:6665/registro/usuario/rol/2',
        rolPorId: 'http://172.17.0.1:6665/rolPorId/',
        contarUsuarios: 'http://172.17.0.1:6665/contarUsuarios'
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
    },
    videos: {
        listarVideos: 'http://172.17.0.1:6673/api/v1/video/'
    }
}
