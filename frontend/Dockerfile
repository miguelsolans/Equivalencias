# Base Image
FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# Working Directory
WORKDIR /mantis/frontend

# Copy Package and Package-Lock JSON 
COPY package*.json ./

# Install npm dependencies
RUN npm install 

# Copy project files and folders to the current directory 
COPY . .

# build app for production with minification 
RUN npm run build 

# EXPOSE 7333 
CMD ["http-server", "-p 7333", "dist"]