import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

import {createBlogInput, updateBlogInput} from '@100xdevs/medium-common'
import { getCookie, setCookie } from "hono/cookie";

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
    // const header = c.req.header("authorization") || "";
    console.log('before')
    console.log(c.req, c.req.header);
    const header =   c.req.header('authorization')|| "";
    console.log('in middleware')
    console.log(header)
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
    try{
        const authorId = c.get("userId");

        const blog = await prisma.blog.create({
            data:{
                tittle: body.title,
                content: body.content,
                authorId: authorId
            }
        })

        return c.json({id: blog.id});

    }catch(err){
        c.status(411)
        return c.json({mssg:"error while creating blog"})
    }
   
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
    try{
       const blog = await prisma.blog.update({
        where:{
            id: body.id
        },
        data:{
            tittle: body.title,
            content: body.content
        }
    })

    return c.json({id: blog.id})  
    }catch(err){
        c.status(411);
        c.json({mssg:"error while updating the blog"})
    }
   
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
            },
            select:{
                id:true,
                tittle:true,
                content:true,
                image:true,
                createdAt:true,
                author:{
                    select:{
                        name:true,
                        createdAt:true
                    }
                }
            }
        })
    
        return c.json({blog})

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

    try{
         const blogs = await prisma.blog.findMany({
            select:{
                tittle:true,
                content:true,
                id:true,
                createdAt:true,
                author:{
                select:{
                    name:true,
                    createdAt:true
                }
                }
            },
            orderBy:{
               createdAt:'desc'
            },
           
        });

        return c.json({blogs})

    }catch(e){
        console.log(e);
        c.status(411);
        return c.json("Error while fetching all blogs")
    }
   
  })

  blogRouter.get('/profileBlogs/:id', async(c)=>{
        const prisma= new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL
        }).$extends(withAccelerate())
        const userId = c.req.param('id')
        try{
            const blogs = await prisma.blog.findMany({
                where:{
                    authorId:userId || ""
                },
                select:{
                    id:true,
                    tittle:true,
                    content:true,
                   createdAt:true,
                },
                orderBy:{
                    createdAt:'desc'
                 }
            })
            return c.json(blogs)
        }catch(e){
            c.status(411);
            return c.json("Error while fetching profile blogs")
        }
  })

  