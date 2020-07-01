FROM node:10-alpine

# Create app directory
WORKDIR /ms-ulearn-gateway

# Install app dependencies
COPY package.json .
RUN npm install

# Bundle app source
COPY . .

ENV SHOW_ULRS=true

ENV USER_URL="ulearn-registerlogin-ms"
ENV USER_PORT=6665

ENV CHAT_URL="ulearn-chat-ms"
ENV CHAT_PORT=6663

ENV QUIZZES_URL="ulearn-quizzes-ms"
ENV QUIZZES_PORT=8080

ENV CURSOS_URL="ulearn-courses-ms"
ENV CURSOS_PORT=8082

ENV CERTIFICADO_URL="ulearn-certificado-ms"
ENV CERTIFICADO_PORT=6671





CMD [ "npm", "run", "start" ]
