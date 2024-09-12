import express from 'express'
import posts from './routes/posts.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use('/api/posts',posts)

app.listen('5000',()=> console.log(`Server running on port 5000`))