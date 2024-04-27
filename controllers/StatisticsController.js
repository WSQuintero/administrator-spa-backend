import { validatePartialSale, validateSale } from "../schemas/sales.js"

export class StatisticsController {
  constructor({ StatisticsModel }) {
    this.StatisticsModel = StatisticsModel
  }

  getAll = async (req, res) => {
    const { year, month } = req.params
    const statistics = await this.StatisticsModel.getByMonth({ year, month })
    res.json(statistics)
  }
}
