# Sistema de Biblioteca Full Stack — Frameworks Web II (Unilavras)

Aplicação Full Stack desenvolvida com Spring Boot (Java 25+), Spring Data JPA, H2, Spring Security + JWT e Swagger (springdoc-openapi) no backend, e React, React Router, Axios e Material-UI no frontend, com autenticação de usuários e CRUD de categorias e livros[cite: 4, 5, 9, 10].

## Integrantes do Grupo
- Pedro Veiga Oliveira

## Como Executar Localmente

### Variáveis de Ambiente (Opcionais)
Caso queira configurar ou alterar os valores padrão antes de rodar, utilize as variáveis abaixo:
- Backend: `JWT_SECRET` (possui valor padrão configurado em `backend/src/main/resources/application.properties`).
- Frontend: `VITE_API_URL` (padrão: `http://localhost:8080`)[cite: 11].

### Backend (Spring Boot)
Em um terminal, acesse a pasta do backend e execute os comandos:
cd backend
.\mvnw.cmd spring-boot:run

### Frontend (React)
Em outro terminal, acesse a pasta do frontend e execute os comandos:
cd frontend
npm install
npm run dev

## Vídeo de Demonstração
- Link: 