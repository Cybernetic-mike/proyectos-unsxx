import {z} from 'zod'
export const createAuthorSchema=z.object({
    registration:z.string({
        required_error: 'Falta Matricula',
    }),
    firstname:z.string({
        required_error: 'Nombre es obligatorio',
    }),
    lastname:z.string({
        required_error:'Apellido es obligatorio',
    }),
    area:z.string({
        required_error:'No se encontro el Area',
    }),
    career:z.string({
        required_error:'No se especifico la carrera',
    }),
    email:z.string({
        required_error:'Email es requerido',
    }),
    date:z.string().datetime().optional(),
});