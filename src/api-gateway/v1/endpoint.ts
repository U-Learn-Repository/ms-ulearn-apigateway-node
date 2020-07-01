const URL_FIREBASE      = 'https://fcm.googleapis.com/fcm/send';




export const endpoint = {
    chats: {
        grupo:  ':/api/v1/grupo',
        chat: ':/api/v1/chat',
    },
    quizzes: {
        questions:      ':/api/v1/questions/',
        question:   ':/api/v1/question/',
        questionById:  ':/api/v1/question/',
        answer:  ':/api/v1/answer/',
        qualification: ':/api/v1/qualification/'
    },
    users: {
        busqueda: '/buscarUsuario/',
        autenticacion: '/usuario/auth',
        lista: '/usuarios',
        login: '/oauth/token',
        registroEstudiante:  '/registro/nuevo-usuario/rol/1',
        registroProfesor:  '/registro/nuevo-usuario/rol/2',
        registroNuevoRolEstudiante:  '/registro/usuario/rol/1',
        registroNuevoRolProfesor:   '/registro/usuario/rol/2',
        rolPorId:  '/rolPorId/',
        contarUsuarios: '/contarUsuarios',
        busquedaPorUsername:  '/usuarioPorUsername/'
    },
    courses: {
        createCurso:  ':/curso/registro',
        listarCursos: ':/curso/consulta/',
        listarCrusosByCategoria:  ':/curso/consultacategoria/',
        updateCurso: ':/curso/update',
        listarCursoId:  ':/curso/consultaid',
        deleteCursoId:  ':/curso/eliminarcurso',
        inscripcion:  ':/inscripcion',
    },
    certificado: {
        certificadoId:  ':/v1/certificado/',
        certificadoIdUsuario:  ':/v1/certificado/?query=id_usuario:',
    },
    videos: {
        listarVideos:  ':/api/v1/video/'
    },
    notificacion: {
        notificacion: URL_FIREBASE
    }

}
