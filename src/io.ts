// io.ts
let ioInstance: any;

export const setIoInstance = (io: any) => {
  ioInstance = io;
};

export const getIoInstance = () => {
  if (!ioInstance) {
    throw new Error("Socket.io instance not initialized");
  }
  return ioInstance;
};