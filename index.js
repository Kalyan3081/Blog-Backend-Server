import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { mongoDB_connection } from './connection.js';
import AuthRoutes from './routes/AuthRoutes.js';
import BlogRoutes from './routes/BlogRoutes.js';
import CommentRouter from './routes/CommentRoutes.js';
import GenresRouter from "./routes/GenreRoutes.js";
import { getSentiment } from "./blog/sentiment.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

mongoDB_connection()

app.use('/auth', AuthRoutes)
app.use('/blog', BlogRoutes)
app.use('/comment', CommentRouter)
app.use("/genres", GenresRouter);

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

getSentiment()
