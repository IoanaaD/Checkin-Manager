import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/UserProfile'
import bodyParser from 'body-parser'
dotenv.config();

const app = express()
const port = 3000

mongoose.connect(`${process.env.DB_CONN_STRING}`, {
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(bodyParser.json())
app.use('/', userRouter)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });