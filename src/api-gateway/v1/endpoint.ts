
const URL_CHATS        = 'http://34.235.108.80';
const URL_QUIZZES      = 'http://52.3.187.50';
const URL_USERS        = 'http://23.22.210.238';
const URL_COURSES      = 'http://52.44.189.41';
const URL_CERTIFICADOS = 'http://23.22.210.238';
const URL_VIDEOS       = 'http://35.170.129.55';
const URL_FIREBASE     = 'https://fcm.googleapis.com/fcm/send';
const URL_LOCAL_DOCKER = 'http://172.17.0.1';


export const endpoint = {
    chats: {
        grupo: URL_CHATS + ':6663/api/v1/grupo',
        chat: URL_CHATS + ':6663/api/v1/chat',
    },
    quizzes: {
        questions: URL_QUIZZES + ':7777/api/v1/questions/',
        question: URL_QUIZZES + ':7777/api/v1/question/',
        questionById: URL_QUIZZES + ':7777/api/v1/question/',
        answer: URL_QUIZZES + ':7777/api/v1/answer/',
        qualification: URL_QUIZZES + ':7777/api/v1/qualification/'
    },
    users: {
        busqueda: URL_USERS + ':6665/buscarUsuario/',
        autenticacion: URL_USERS + ':6665/usuario/auth',
        lista: URL_USERS + ':6665/usuarios',
        login: URL_USERS + ':6665/oauth/token',
        registroEstudiante: URL_USERS + ':6665/registro/nuevo-usuario/rol/1',
        registroProfesor: URL_USERS + ':6665/registro/nuevo-usuario/rol/2',
        registroNuevoRolEstudiante: URL_USERS + ':6665/registro/usuario/rol/1',
        registroNuevoRolProfesor: URL_USERS + ':6665/registro/usuario/rol/2',
        rolPorId: URL_USERS + ':6665/rolPorId/',
        contarUsuarios: URL_USERS + ':6665/contarUsuarios',
        busquedaPorUsername: URL_USERS + ':6665/usuarioPorUsername/'
    },
    courses: {
        createCurso: URL_COURSES + ':6667/curso/registro',
        listarCursos: URL_COURSES + ':6667/curso/consulta/',
        listarCrusosByCategoria: URL_COURSES + ':6667/curso/consultacategoria/',
        updateCurso: URL_COURSES + ':6667/curso/update',
        listarCursoId: URL_COURSES + ':6667/curso/consultaid',
        deleteCursoId: URL_COURSES + ':6667/curso/eliminarcurso',
        inscripcion: URL_COURSES + ':6667/inscripcion',
    },
    certificado: {
        certificadoId: URL_CERTIFICADOS + ':6671/v1/certificado/',
        certificadoIdUsuario: URL_CERTIFICADOS + ':6671/v1/certificado/?query=id_usuario:',
    },
    videos: {
        listarVideos: URL_VIDEOS + ':6673/api/v1/video/'
    },
    notificacion: {
        notificacion: URL_FIREBASE
    }

}
