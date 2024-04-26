import z from "zod"

const dateSchema = z.object({
  date:z.string(),
  scheduler:z.string(),
  requestedService:z.string(),
  clientName: z.string().min(2).max(50).optional(),
  clientPhone: z.string().min(7).max(15).optional(),
})

export function validateDate (input) {
  return dateSchema.safeParse(input)
}

export function validatePartialDate (input) {
  return dateSchema.partial().safeParse(input)
}

