import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routes from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import axios from 'axios';

const app: Application = express();

app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`Received request for ${req.url}`);
  next();
});

app.use('/api/v1', routes);

// app.get('/api/turn-credentials', async (req, res) => {
//   try {
//     const response = await axios.post('https://yoursubdomain.metered.live/api/v1/turn/credentials', {
//       apiKey: process.env.METERED_API_KEY,
//     });
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching TURN credentials:', error);
//     res.status(500).json({ error: 'Failed to fetch TURN credentials' });
//   }
// });

// Handle root route
app.get('/', (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Welcome to the API',
  });
});

//handleNotFoundRoute
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
});

app.use(globalErrorHandler);

export default app;
