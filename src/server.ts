import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './routes/UserProfile'
import bodyParser from 'body-parser'
import subscriptionPlanRouter from './routes/SubscriptionPlan'
import userSubscriptionRouter from './routes/UserSubscription'
dotenv.config();

const app = express()
app.use(cors())
const port = 3001

mongoose.connect(`${process.env.DB_CONN_STRING}`, {
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(bodyParser.json())
app.use('/', userRouter, subscriptionPlanRouter, userSubscriptionRouter)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });