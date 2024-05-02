import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import {signinInput, signupInput} from '@100xdevs/medium-common'
import { getCookie, setCookie } from "hono/cookie";

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();


userRouter.use('/signout' && '/me' , async (c,next)=>{
  // const header = c.req.header("authorization") || "";
  console.log("in user middleware")
  const header = c.req.header('authorization')|| "";
  console.log(header)
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
    
   const token = await sign({id: user.id}, c.env.JWT_SECRET)
   c.res.headers.set('Cookie', token);
   console.log(c.res.headers.get('Cookie'));
   return c.json({
    jwt: token
   })
  })

  userRouter.post('/signout', async (c)=>{


    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
      c.header('authorization', '')
      c.status(200)
      return c.json("logout successfull");

    }catch(e){
      c.status(411);
      return c.json("error while logging out");
    }
  })

  userRouter.get('/me',  (c)=>{
    

     try{
       const header = c.req.header('authorization')|| "";
      const {payload} =  decode(header);
      
    
      return c.json({payload})

     }catch(e){
    
      c.status(411)
      return c.json(e);
     }

    
  })

  userRouter.get('/:id', async(c)=>{

     const primsa = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
     }
     ).$extends(withAccelerate())

     const id = c.req.param("id");

     try{ 
      const profile = await primsa.user.findUnique({
        where:{
          id: id
        },
        select:{
          email:true,
          password:true,
          id:true,
          name:true
        }
      })

      return c.json(profile);

     }catch(e){
      c.status(411)
      return c.json("error while fetching profile")
     }
  })



  