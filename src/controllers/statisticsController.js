import { validateToken } from "../middlewares/validationToken.js"

export class StatisticsController {
  constructor({ StatisticsModel }) {
    this.StatisticsModel = StatisticsModel
  }
  getAll = async (req, res) => {
    const token = req?.headers?.authorization?.split(" ")[1]
    if (!token) {
      return res.status(401).json({ error: "Access denied, token missing" })
    }
    const isValidated = validateToken(token, req, res)

    if (isValidated === true) {
      const { year, month } = req.params
      if (isNaN(Number(year)) || isNaN(Number(month))) {
        return res.status(400).json({ message: "Year is not a number" })
      }
      const statistics = await this.StatisticsModel.getByMonth({ year, month })
      res.json(statistics)
    }
  }
}
