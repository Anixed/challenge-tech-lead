# Challenge Gestión de Posts - React + Redux + Node/Express + PostgreSQL

Aplicación para gestionar posts.

---

## Modelo de datos

- **Post**
  - `id` (ID)
  - `name` (nombre)
  - `description` (descripción)
  - `createdAt` (fecha creación)
  - `updatedAt` (fecha actualización)

---

## Estructura del monorepo

```
tcit-challenge-tech-lead/
├── backend/            # API REST - Node + Express + Sequelize + TypeScript (dockerizado)
├── frontend/           # SPA - React + Redux + Vite + TypeScript (local)
├── docker-compose.yml
└── README.md
```

---

## Requisitos previos

- **Docker** y **Docker Compose** (para el backend + base de datos)
- **Node.js 20+** y **npm** (para correr el frontend en local)

---

## Cómo correr el proyecto

### 1. Backend + Base de datos (Docker)

En una terminal desde la raíz del repo:

```bash
docker compose up --build
```

El contenedor levanta:

- **PostgreSQL** en `localhost:5432`
- **API REST** en `http://localhost:3000`

### 2. Frontend (local, con Vite)

En otra terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

- **SPA** en `http://localhost:5173`

---

## API - Endpoints

| Método | Ruta             | Body                     | Respuesta                    |
| ------ | ---------------- | ------------------------ | ---------------------------- |
| GET    | `/api/posts`     | -                        | Un array con todos los posts |
| POST   | `/api/posts`     | `{ name, description }`  | El post creado               |
| DELETE | `/api/posts/:id` | -                        | El post eliminado            |
