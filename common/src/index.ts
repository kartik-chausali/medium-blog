import z from 'zod'

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string().optional()
})

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string()
})

export const createBlogInput = z.object({
    tittle:z.string(),
    content: z.string()
})


export const updateBlogInput = z.object({
    tittle: z.string(),
    content: z.string(),
    id: z.string()
})


//type inference in zod for frontend to know types of email, password
export type SignUpInput = z.infer<typeof signupInput>
export type SignInInput = z.infer<typeof signinInput>
export type CreatBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>