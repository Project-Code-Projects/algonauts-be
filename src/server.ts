import mongoose from 'mongoose';
import app from './app';
import config from './config';

const port = config.port || 5000; // Default port to 5000 if not provided
const mongoDatabaseString = config.database_url;

async function main() {
  try {
    await mongoose.connect(mongoDatabaseString as string);
    console.log('Database is connected successfully');

    app.listen(port, () => {
      console.log(`Algonauts is listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to database or start server:', error);
    process.exit(1); // Exit process with failure
  }
}

main();
