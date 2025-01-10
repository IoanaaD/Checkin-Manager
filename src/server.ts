import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/UserProfile';
dotenv.config();

const app = express()
const port = 3000

mongoose.connect(`${process.env.DB_CONN_STRING}`, {
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json())
app.use('/', router)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });