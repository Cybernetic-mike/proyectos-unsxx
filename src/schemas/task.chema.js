import {z} from 'zod'
export const createTaskSchema=z.object({
    registration:z.string({
        required_error: 'Falta Matricula',
    }),
    title:z.string({
        required_error: 'Titulo es requerido',
    }),
    summary:z.string({
        required_error:'El resumen debe ser de solo texto',
    }),
    file:z.string({
        required_error:'Debe añadir el archivo en formato PDF',
    }),
    visits:z.string({
        required_error: 'Error al registrar visitas',
    }),
    date:z.string().datetime().optional(),
});