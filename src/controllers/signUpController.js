import bcrypt from "bcrypt"
import { validatesignUp } from "../schemas/signUp.js"
import { hashPassword } from "../utils.js"

export class SignUpController {
  constructor({ SignUpModel }) {
    this.SignUpModel = SignUpModel
  }

  createUser = async (req, res) => {
    const saltRounds = 10
    try {
      const result = validatesignUp(req.body)

      if (!result.success) {
        const errorObj = JSON.parse(result.error)
        const errorMessage = errorObj[0].message
        return res.status(422).json({ error: errorMessage })
      }

      const hashedPassword = await hashPassword(
        result.data.password,
        saltRounds
      )

      const newUser = {
        ...result.data,
        password: hashedPassword
      }

      const user = await this.SignUpModel.createUser({ input: newUser })
      if (user === "Email is already registered") {
        return res.status(400).json(user)
      }
      if (user) {
        return res.status(201).json(user)
      }
    } catch (error) {
      return res.status(500).json({ message: "Error in createUser" })
    }
  }
}
