import express from 'express';
import connectDB from '../database/database.connection.js';
import Teamrouter from './team/team_router.js';
import Taskrouter from './task/task_router.js';
import AuthRouter from './auth/auth_router.js'; // Import AuthRouter
import errorHandler from '../middleware/error.middleware.js';
import Subboardrouter from './subboard/subboard_router.js';
import Commentrouter from './comment/comment_router.js'; // Import Commentrouter
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Kết nối DB
connectDB().then(() => {
  app.use('/api', Teamrouter); 
  app.use('/api', Taskrouter);
  app.use('/api',Subboardrouter);
  app.use('/api', AuthRouter); 
  app.use('/api',Commentrouter);
  app.use(errorHandler);
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}).catch((err) => {
  console.error("Failed to connect DB", err);
});
