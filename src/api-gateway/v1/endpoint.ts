export const endpoint = {
    chats: {
        grupo: 'http://localhost:3001/api/v1/grupo',
        chat: 'http://localhost:3001/api/v1/chat',
    },
    quizzes: {
        questions: 'http://172.17.0.1/:7777/api/v1/questions/',
        questionById: 'http://172.17.0.1/:7777/api/v1/question/'
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