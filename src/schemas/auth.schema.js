import {z} from 'zod';
export const registerSchema=z.object({
    name: z.string({
        required_error: 'Nombre Completo requerido',
    }),
    username: z.string({
        required_error: 'Usuario requerido',
    }),
    email:z
    .string({
        required_error: 'Email requierido',
    })
    .email({
        message:"email Invalido",
    }),
    password: z
    .string({
        required_error:"Password requerido",
    })
    .min(6,{
        message:"Password debe contener mas de 6 caracteres",
    }),

});

export const loginSchema=z.object({
    email:z.string({
        required_error: 'Email es requierido',
    }).email({
        message:"email no valido",
    }),
    password: z.string({
        required_error:"Password es requerido",
    }).min(6,{
        message:"Password debe contener mas de 6 caracteres",
    }),
});