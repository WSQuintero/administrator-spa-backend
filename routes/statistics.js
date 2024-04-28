import { Router } from "express"
import { StatisticsController } from "../controllers/statisticsController.js"

export const createStatisticsRouter = ({ StatisticsModel }) => {
  const statisticsRouter = Router()
  const statisticsController = new StatisticsController({ StatisticsModel })

  statisticsRouter.get("/:year/:month", statisticsController.getAll)

  return statisticsRouter
}
