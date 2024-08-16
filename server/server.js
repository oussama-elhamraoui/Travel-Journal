import express from 'express'
import posts from './routes/posts.js'

const app = express()

app.use(express.json())
app.use('/api/posts',posts)

app.listen('5000',()=> console.log(`Server running on port 5000`))