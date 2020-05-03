const DEFAULT_URL = 'http://172.17.0.1';

export const endpoint = {
    chats: {
        grupo: DEFAULT_URL + ':3001/api/v1/grupo',
        chat: DEFAULT_URL + ':3001/api/v1/chat',
    },
    quizzes: {
        questions: DEFAULT_URL + ':7777/api/v1/questions/',
        question: DEFAULT_URL + ':7777/api/v1/question/',
        questionById: DEFAULT_URL + ':7777/api/v1/question/',
        answer: DEFAULT_URL + ':7777/api/v1/answer/',
        qualification: DEFAULT_URL + ':7777/api/v1/qualification/'
    },
    users: {
        busqueda: DEFAULT_URL + ':6665/buscarUsuario/',
        lista: DEFAULT_URL + ':6665/usuarios',
        login: DEFAULT_URL + ':6665/login',
        registroEstudiante: DEFAULT_URL + ':6665/registro/nuevo-usuario/rol/1',
        registroProfesor: DEFAULT_URL + ':6665/registro/nuevo-usuario/rol/2',
        registroNuevoRolEstudiante: DEFAULT_URL + ':6665/registro/usuario/rol/1',
        registroNuevoRolProfesor: DEFAULT_URL + ':6665/registro/usuario/rol/2',
        rolPorId: DEFAULT_URL + ':6665/rolPorId/',
        contarUsuarios: DEFAULT_URL + ':6665/contarUsuarios'
    },
    courses: {
        createCurso: DEFAULT_URL + ':6667/curso/registro',
        listarCursos: DEFAULT_URL + ':6667/curso/consulta/',
        listarCrusosByCategoria: DEFAULT_URL + ':6667/curso/consultacategoria/',
        updateCurso: DEFAULT_URL + ':6667/curso/update',
        listarCursoId: DEFAULT_URL + ':6667/curso/consultaid',
        deleteCursoId: DEFAULT_URL + ':6667/curso/eliminarcurso',
        inscripcion: DEFAULT_URL + ':6667/inscripcion',
    },
    certificado: {
        certificadoId: DEFAULT_URL + ':6671/v1/certificado/',
        certificadoIdUsuario: DEFAULT_URL + ':6671/v1/certificado/?query=id_usuario:',
    },
    videos: {
        listarVideos: DEFAULT_URL + ':6673/api/v1/video/'
    }
}
