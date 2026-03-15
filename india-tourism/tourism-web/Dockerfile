# Stage 1: Build the React application
FROM node:20-alpine AS build
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
RUN rm -rf ./*
# Copy the static build from the previous stage
# Note: Use /app/build if using Create React App
COPY --from=build /app/build .
# Expose port 80 (standard Nginx port)
EXPOSE 80
# Command to run Nginx and keep it in the foreground for Docker to manage
CMD ["nginx", "-g", "daemon off;"]
