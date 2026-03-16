# Use an official Node runtime as the parent image
FROM node:22-alpine
# Set the working directory in the container
WORKDIR /usr/src/app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY SERVER_LOGS/*.log ./
# Install app dependencies
RUN npm install
# Copy the rest of the application source code
COPY . .
# Expose the port the app runs on
EXPOSE 80
# Define the command to run the application
CMD [ "npm", "start" ]