import express, { json } from "express" // require -> commonJS
import { corsMiddleware } from "./middlewares/cors.js"
import { createDatesRouter } from "./routes/dates.js"
import { createBillsRouter } from "./routes/bills.js"
import { createSalesRouter } from "./routes/sales.js"
import "dotenv/config"
import { createStatisticsRouter } from "./routes/statistics.js"

// después
export const createApp = ({
  DatesModel,
  BillsModel,
  SalesModel,
  StatisticsModel
}) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable("x-powered-by")

  app.use("/dates", createDatesRouter({ DatesModel }))
  app.use("/bills", createBillsRouter({ BillsModel }))
  app.use("/sales", createSalesRouter({ SalesModel }))
  app.use("/statistics", createStatisticsRouter({ StatisticsModel }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
