# Stage 1: Build the application
FROM node:20.12.2 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install -g npm@latest && npm install

COPY . .

# Add debug output before build
RUN echo "Running build..."
RUN npm run build || { echo "Build failed"; exit 1; }

# Stage 2: Serve the application with Nginx
FROM nginx:1.25.0

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

