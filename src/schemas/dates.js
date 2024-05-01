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
  clientName: z.string().min(2).max(50).optional(),
  clientPhone: z.string().min(7).max(15).optional(),
  AppointmentTime: z.string(),
  endTime: z.string()
})

export function validateDate(input) {
  return dateSchema.safeParse(input)
}

export function validatePartialDate(input) {
  return dateSchema.partial().safeParse(input)
}
