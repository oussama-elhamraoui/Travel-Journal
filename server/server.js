import express from 'express'
import posts from './routes/posts.js'
import cors from 'cors'
import path from 'path'
import authRoutes from './routes/authRoutes.js'
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(cookieParser());
app.use('/api/posts',posts)
app.use('/api/',authRoutes)

app.listen('5000',()=> console.log(`Server running on port 5000`))