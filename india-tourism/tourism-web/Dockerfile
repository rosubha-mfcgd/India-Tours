# Stage 1: Build the React application
#FROM node:20-alpine as builder
#WORKDIR /app
#COPY package*.json ./
#RUN npm install --legacy-peer-deps
#COPY . .
#RUN npm run build

# Stage 2: Serve the application with Nginx
#FROM nginx:stable-alpine
#WORKDIR /usr/share/nginx/html
# Remove default NGINX static files
#RUN rm -rf ./*
# Copy the built React app from the builder stage to the Nginx public directory
#COPY --from=builder /app/build .
# Expose port 80 for the Nginx server
#EXPOSE 80
# Command to start Nginx
#CMD ["nginx", "-g", "daemon off;"]

FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 80
CMD [ "npm", "run", "dev" ]