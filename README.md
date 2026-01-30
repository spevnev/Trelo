# Trelo

Frontend for Trelo, a collaborative kanban-style project management platform built with React and Redux.

## Features

- Create and manage boards, lists, and tasks
- Real-time updates across connected clients
- Drag-and-drop task organization
- JWT-based authentication

## Prerequisites

- Node.js v22+
- [API](https://github.com/spevnev/TreloApi) running

## Running

Install dependencies:
```shell
npm install
```
Configure backend URL in `src/config.js`

### Development

```shell
npm run start
```

### Production

```shell
npm run build
```

### Docker

```shell
npm run build
docker build -t trelo-frontend .
docker run -p 3000:80 trelo-frontend
```
