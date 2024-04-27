import z from "zod"

const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must have a minimum of 6 characters." })
})

export function validatesignUp(input) {
  return signUpSchema.safeParse(input)
}

export function validatePartialsignUp(input) {
  return signUpSchema.partial().safeParse(input)
}
