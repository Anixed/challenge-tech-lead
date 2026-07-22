FROM node:20-alpine

WORKDIR /app

# Instalar dependencias primero.
COPY package.json package-lock.json ./
RUN npm ci

# Copiar el código fuente y compilar TypeScript a "dist/".
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

EXPOSE 3000

# Arranca el servidor ya compilado
CMD ["node", "dist/server.js"]
