# Imagen base
FROM node:14-alpine

# Variables de entorno
ENV NODE_ENV=development

# Directorio de trabajo
WORKDIR /app/backend

# Copia de archivos de configuración y dependencias
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install

# Copia de código fuente
COPY src/ ./src/

# Definir la variable de entorno
ENV NEST_PUBLIC_API_URL_FRONT_DEV=http://31.220.60.102:3000

# Puerto de exposición
EXPOSE 8080

# Comando para iniciar el servidor de desarrollo
CMD ["npm", "run", "start:dev"]
