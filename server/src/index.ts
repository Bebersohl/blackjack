import express, { Request, Response } from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for development

// API Routes
app.get('/api/hello', (req: Request, res: Response) => {
  res.json({
    message: 'Hello from Express with TypeScript!',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/users', (req: Request, res: Response) => {
  res.json([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]);
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

// Serve Angular static files in production
if (process.env.NODE_ENV === 'production') {
  const clientDistPath = join(__dirname, '../../client/dist/client/browser');
  app.use(express.static(clientDistPath));

  app.get(/(.*)/, (req: Request, res: Response) => {
    res.sendFile(join(clientDistPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});
