import { Server } from 'socket.io';

// const UserSocket: { [userId: string]: string } = {};
const UserSocket: Map<string, string> = new Map();

let ioInstance: Server;

export const initSocket = (io: Server) => {
  ioInstance = io;

  io.on('connection', (socket) => {
    console.log('New client connected')

    socket.on('register-user', (userId: string) => {
      UserSocket.set(userId, socket.id);
      console.log(`User registered: ${userId} with socket ID: ${socket.id}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
      for (const [userId, sockId] of UserSocket.entries()) {
        if (sockId === socket.id) {
          UserSocket.delete(userId);
          console.log(`User disconnected: ${userId}`);
          break;
        }
      }
    });
  });
};

export const getIoInstance = () => ioInstance;

export const getUserSocket = (userId: string) => UserSocket.get(userId);