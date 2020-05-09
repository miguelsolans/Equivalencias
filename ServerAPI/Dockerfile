# NodeJS Version
FROM node:10

# App Directory
WORKDIR /mantis/backend

# Install App dependencies
COPY package*.json ./

RUN npm install

# Ubdle App source
COPY . . 

# Expose App Port
EXPOSE 3030

# Run App
CMD [ "npm", "test" ]


