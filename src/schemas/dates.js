import z from "zod"

const dateSchema = z.object({
  date: z.string().refine(
    (value) => {
      return !isNaN(Date.parse(value))
    },
    { message: "Invalid date format" }
  ),
  scheduler: z.string(),
  requestedService: z.string(),
  clientName: z.string().max(50).optional(),
  clientPhone: z.string().max(15).optional(),
  appointmentTime: z.string(),
  endTime: z.string(),
  completed: z.boolean()
})

export function validateDate(input) {
  return dateSchema.safeParse(input)
}

export function validatePartialDate(input) {
  return dateSchema.partial().safeParse(input)
}
