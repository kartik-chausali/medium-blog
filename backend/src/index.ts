import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import {decode , sign, verify} from 'hono/jwt'
import {userRouter} from './Routes/user';
import { blogRouter } from './Routes/blog';

//in hono you define types of your env variables stored in wrangler.toml here 
const app = new Hono<{
  Bindings:{
    DATABASE_URL: string
    JWT_SECRET : string
  }
}>()

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);


export default app


