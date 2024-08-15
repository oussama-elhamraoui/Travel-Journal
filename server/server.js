import express from 'express'
import posts from './routes/posts.js'

const app = express()

app.use('/api')

app.listen('5000',`Server running on port 5000`)