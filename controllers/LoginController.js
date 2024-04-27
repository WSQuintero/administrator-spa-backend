import { validateToken } from "../middlewares/validationToken.js"
import { validateLogin } from "../schemas/login.js"
import dotenv from "dotenv"
dotenv.config()

export class LoginController {
  constructor({ LoginModel }) {
    this.LoginModel = LoginModel
  }

  login = async (req, res) => {
    try {
      const result = validateLogin(req.body)

      if (!result.success) {
        const errorObj = JSON.parse(result.error)
        const errorMessage = errorObj[0].message
        return res.status(422).json({ error: errorMessage })
      }

      const user = await this.LoginModel.login({ input: result.data })

      if (!user) {
        return res.status(401).json({ error: "User not found" })
      }

      if (user.isAuthenticated === false) {
        return res.status(401).json({ error: "Incorrect password" })
      }
      return res
        .cookie("token", user.token, { httpOnly: true })
        .header("authorization", user.token)
        .status(200)
        .json(user)
    } catch (error) {
      console.error("Error in login: ", error)
      return res.status(500).json({ error: "Error in login" })
    }
  }

  validateToken = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]

    const isValidated = validateToken(token, req, res)
    if (isValidated === true) {
      return res.status(201).json({ message: "token is valid" })
    }
  }
}
