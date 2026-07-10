# Stage 1: Build the React application
FROM node:20-alpine AS build
# You MUST declare the ARG here
ARG REACT_APP_SERVER_URI 
# Now it's available for the build command
ENV REACT_APP_SERVER_URI=$REACT_APP_SERVER_URI
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
# Build the app (outputs to 'dist' for Vite or 'build' for CRA)
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
# Remove default Nginx static files
#RUN rm -rf ./*
# Copy the static build from the previous stage
# Note: Use /app/build if using Create React App
#COPY --from=build /app/build .

# Copy custom nginx.conf into container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy React build output
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (standard Nginx port)
EXPOSE 80
# Command to run Nginx and keep it in the foreground for Docker to manage
CMD ["nginx", "-g", "daemon off;"]