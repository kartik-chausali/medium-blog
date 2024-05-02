import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import {decode , sign, verify} from 'hono/jwt'
import {userRouter} from './Routes/user';
import { blogRouter } from './Routes/blog';
import { cors } from 'hono/cors'
//in hono you define types of your env variables stored in wrangler.toml here 
const app = new Hono<{
  Bindings:{
    DATABASE_URL: string
    JWT_SECRET : string
  }
}>()
app.use('/api/*', cors());
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

// app.get('/api/v1/user/profile', async(c)=>{
//   const body = await c.req.json()
//   console.log(body);
//   return c.json(body)
// })

export default app


