FROM node:10.16.3-stretch

# Create app directory
WORKDIR /ms-ulearn-gateway

# Install app dependencies
COPY package.json .
RUN npm install

# Bundle app source
COPY . .

CMD [ "npm", "run", "start" ]
