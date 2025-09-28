import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './Routes/user-routes.js';
import productRouters from './Routes/products-routes.js';
import commentRouters from './Routes/comments-routes.js';
import './Config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', userRoutes);
app.use('/api/products', productRouters);
app.use('/api/comment', commentRouters);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
