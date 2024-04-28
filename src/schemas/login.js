import z from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Incorrect password" })
})

export function validateLogin(input) {
  return loginSchema.safeParse(input)
}

export function validatePartialLogin(input) {
  return loginSchema.partial().safeParse(input)
}
