FROM node:10-alpine

# Create app directory
WORKDIR /ms-ulearn-gateway

# Install app dependencies
COPY package.json .
RUN npm install

# Bundle app source
COPY . .

CMD [ "npm", "run", "start" ]
