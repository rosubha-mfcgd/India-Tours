# --- Stage 1: Build ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# --- Stage 2: Serve ---
FROM nginx:alpine
# Copy built files from stage 1 (adjust /dist to /build if necessary)
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8083
CMD ["nginx", "-g", "daemon off;"]