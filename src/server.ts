/* eslint-disable no-console */
import mongoose from 'mongoose';
import config from './config/index';
import app from './app';
import { Server } from 'http';
import { ExpressPeerServer } from 'peer';
import { Server as SocketIOServer } from 'socket.io';
import { setIoInstance } from './io';

process.on('uncaughtException', error => {
  console.error('Uncaught Exception detected', error);
  process.exit(1);
});

let server: Server;
let io: SocketIOServer;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.info(`🛢 Database is connected successfully`);

    server = app.listen(config.port, () => {
      console.info(`Application listening on port ${config.port}`);
    });

    const peerServer = ExpressPeerServer(server, {
      proxied: true,
      // debug: true,
      path: '/myapp',
    });

    console.log(peerServer.path());
    app.use('/myapp', peerServer);

    io = new SocketIOServer(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', socket => {
      console.log('New client connected');

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    setIoInstance(io);
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit process if unable to connect to database
  }
}

// Ensure main is called immediately
main().catch(err => {
  console.error('Error in main function', err);
  process.exit(1);
});

process.on('unhandledRejection', error => {
  console.error('Unhandled Rejection detected', error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('SIGTERM', () => {
  console.info('SIGTERM is received');
  if (server) {
    server.close(() => {
      console.info('Server closed due to SIGTERM');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});
