import { z } from "zod"

export const RegisterSchema = z.object ({
    username: z.string().min(3,{
        message:"Username must be at least 3 characters long."
    }).max(20),
    email: z.string().email({
        message: 'Please enter a valid e-mail address'
    }),
    password: z.string().min(4,{
        message:'Password should contain at least 4 characters.'
    }),
    confirmPassword: z.string().min(4,{
        message:'Password should contain at least 4 characters.'
    }),
})

export const LoginSchema = z.object ({
    email: z.string().email({
        message: 'Please enter a valid e-mail address'
    }),
    password: z.string().min(4,{
        message:'Password should contain at least 4 characters.'
    })
})