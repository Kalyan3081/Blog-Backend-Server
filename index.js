import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { mongoDB_connection } from './connection.js';
import AuthRoutes from './routes/AuthRoutes.js';
import BlogRoutes from './routes/BlogRoutes.js';
import CommentRouter from './routes/CommentRoutes.js';
import GenresRouter from "./routes/GenreRoutes.js";
import { getSentiment } from "./blog/sentiment.js";
import path from "path";

const app = express();

dotenv.config();
app.use(cors());
const corsOption = {
    origin: "https://blog-server-y4md.onrender.com/",
    credentials: true,
};
app.use(cors(corsOption));
app.use(express.json());

mongoDB_connection();
const _dirname = path.resolve();

// Serve static files from the dist folder
app.use(express.static(path.join(_dirname, "/client/dist")));

app.use('/auth', AuthRoutes);
app.use('/blog', BlogRoutes);
app.use('/comment', CommentRouter);
app.use("/genres", GenresRouter);

// Handle all other routes by sending index.html
app.get('*', (req, res) => {
    res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

getSentiment();
