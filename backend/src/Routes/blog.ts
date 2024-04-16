import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

import {createBlogInput, updateBlogInput} from '@100xdevs/medium-common'

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables:{
        userId: string
    }
}>();

//middleware
blogRouter.use('/*', async (c,next)=>{
    const header = c.req.header("authorization") || "";
    // if Bearer token => ["Bearer", "token"]
    const response = await verify(header, c.env.JWT_SECRET);
    if(response){
      c.set("userId", response.id);
      await next()
    }else{
      c.status(403);
      return c.json({mssg:"unauthorized"});
    }
  })


blogRouter.post('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success } = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json("invalid format to create blog")
    } 
    const authorId = c.get("userId");

    const blog = await prisma.blog.create({
        data:{
            tittle: body.tittle,
            content: body.content,
            authorId: authorId
        }
    })
    return c.json({id: blog.id});
  })
  
  blogRouter.put('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body  = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json("invalid format to update blog");
    }
    const blog = await prisma.blog.update({
        where:{
            id: body.id
        },
        data:{
            tittle: body.tittle,
            content: body.content
        }
    })

    return c.json({id: blog.id})
  })
  
  blogRouter.get('/single/:id', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const id = c.req.param("id");
    try{

        const blog = await prisma.blog.findFirst({
            where:{
                id: id
            }
        })
    
        return c.json(blog)

    }catch(e){
        c.status(411);
        return c.json({msg:"invalid"})
    }
   
  })


  //todo : add pagination
  blogRouter.get('/bulk', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blogs = await prisma.blog.findMany();

    return c.json({blogs})
  })