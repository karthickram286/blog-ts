import express, { Request, Response } from 'express';
import path from 'path';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import _ from 'lodash';

import { connectDB, closeDBConnection } from './lib/connection/DBConnection';
import UserRouter from './lib/routes/users.routes';
import AuthRouter from './lib/routes/auth.routes';
import PostRouter from './lib/routes/post.routes';

const app: any = express();
const PORT: any = process.env.PORT || 5000;

/**
 * Rate limiting config
 */
const rateLimiter = rateLimit({
  max: 5000,
  windowMs: 60 * 60 * 1000, // 1 hour  
  message: "Too many requests from this IP, Please try after some time."
});

app.use(cors());
app.use(rateLimiter);
app.use(express.json());

let jwtPrivateKey = process.env.JWT_PRIVATE_KEY;
if (_.isEmpty(jwtPrivateKey)) {
  console.log(`JWT private key is not configured... Exiting application`);
  process.exit(1);
}

/**
 * MongoDB connection
 */
connectDB();

/**
 * Routers registration
 */
app.use('/v1/users', UserRouter);
app.use('/v1/auth', AuthRouter);
app.use('/v1/posts', PostRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

/**
 * Starting server
 */
let server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

process.on('SIGINT', () => {
  console.log("Terminating the application gracefully");
  closeDBConnection();
  process.exit(1);
});

export {
  server
};