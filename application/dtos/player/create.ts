import { z } from 'zod';

export const CreateContrySchema = z.object({
    picture: z.string().url(),
    code: z.string().min(3),
})

export const CreateDataSchema = z.object({
    rank : z.number().min(1),
    points : z.number().min(1),
    weight : z.number().min(5),
    height : z.number().min(2),
    age : z.number().min(1),
    last : z.array(z.union([z.literal(0), z.literal(1)])).length(5)

})

export const CreatePlayerSchema = z.object({
    firstname : z.string().min(1),
    lastname : z.string().min(1),
    shortname : z.string().min(1),
    sex : z.union([z.literal('M'),z.literal('F')]),
    picture: z.string().url(),
    country: CreateContrySchema,
    data : CreateDataSchema
});

export type CreatePlayerDTO = z.infer<typeof CreatePlayerSchema>