import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import {signinInput, signupInput} from '@100xdevs/medium-common'
import { getCookie, setCookie } from "hono/cookie";

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

userRouter.use('/signout', async (c,next)=>{
  // const header = c.req.header("authorization") || "";
  const header = getCookie(c, 'token') || ""
  // if Bearer token => ["Bearer", "token"]
  const response = await verify(header, c.env.JWT_SECRET);
  if(response){
    await next()
  }else{
    c.status(403);
    return c.json({mssg:"unauthorized"});
  }
})

userRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json("invalid credentials")
    }

    try{
  
      const user = await prisma.user.create({
        data:{
          email: body.email,
          password: body.password,
          name: body.name,
        },
      })
  
      const token = await sign({id: user.id}, c.env.JWT_SECRET)
      setCookie(c,'token', token)
      return c.json({
      jwt: token
     })
  
    }catch(e){
      c.status(403);
      return c.json({msg:"Account with email already exists "})
    }
    
    
  })
  
  userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json("invalid credentials")
    }
    const user = await prisma.user.findUnique({
      where:{
        email: body.email
      }
    })
  
   if(!user){
    c.status(403);
    return c.json({mssg: "user not found"});
   }
    
   const jwt = await sign({id: user.id}, c.env.JWT_SECRET)
   c.res.headers.set('Set-Cookie', jwt);
   console.log(c.res.headers.get('Set-Cookie'));
   return c.json("signin")
  })

  userRouter.post('/signout', async (c)=>{

    console.log("inside signout route")

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{

      console.log("inside try of signout")
      localStorage.removeItem('token');
      c.status(200)
      return c.json("logout successfull");

    }catch(e){
      console.log("inside catch of signout")
      console.log(e);

      c.status(411);
      return c.json("error while logging out");
    }
  })