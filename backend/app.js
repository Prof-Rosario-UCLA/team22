import http from 'http';
import express from 'express';

const app = express();
const PORT = 8080;

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log(`Starting server on http://localhost:${PORT}`);
});