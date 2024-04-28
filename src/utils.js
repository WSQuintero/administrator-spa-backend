import { createRequire } from "node:module"
import bcrypt from "bcrypt"

const require = createRequire(import.meta.url)

export const readJSON = (path) => require(path)
export const hashPassword = async (password, saltRounds) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
  } catch (error) {
    throw new Error("Error al encriptar la contraseña")
  }
}
