# Sistema de Biblioteca Full Stack — Frameworks Web II (Unilavras)

Aplicação Full Stack desenvolvida com Spring Boot (Java 25+), Spring Data JPA, H2, Spring Security + JWT e Swagger (springdoc-openapi) no backend, e React, React Router, Axios e Material-UI no frontend, com autenticação de usuários e CRUD de categorias e livros.

## Integrantes do Grupo
- Pedro Veiga Oliveira

## Como Executar Localmente

### Variáveis de Ambiente
Caso queira configurar ou alterar os valores padrão antes de rodar, utilize as variáveis abaixo:
- Backend: `JWT_SECRET` (possui valor padrão configurado em `backend/src/main/resources/application.properties`).
- Frontend: `VITE_API_URL` (padrão: `http://localhost:8080`).

### Backend (Spring Boot)
Em um terminal, acesse a pasta do backend e execute:

cd backend

.\mvnw.cmd spring-boot:run

### Frontend (React)
Em outro terminal, acesse a pasta do frontend e execute:

cd frontend

npm install

npm run dev

## Vídeo de Demonstração
- Link: 