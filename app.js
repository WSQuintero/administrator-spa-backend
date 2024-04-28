import express from "express"
import { json } from "express"
import { corsMiddleware } from "./middlewares/cors.js"
import { createDatesRouter } from "./routes/dates.js"
import { createBillsRouter } from "./routes/bills.js"
import { createSalesRouter } from "./routes/sales.js"
import { createLoginRouter } from "./routes/login.js"
import { createSignUpRouter } from "./routes/signUp.js"
import { createStatisticsRouter } from "./routes/statistics.js"
import "dotenv/config"

export const createApp = ({
  DatesModel,
  BillsModel,
  SalesModel,
  StatisticsModel,
  LoginModel,
  SignUpModel
}) => {
  const app = express()

  // Middleware
  app.use(json())
  app.use(corsMiddleware())
  app.disable("x-powered-by")

  // Rutas
  app.use("/dates", createDatesRouter({ DatesModel }))
  app.use("/bills", createBillsRouter({ BillsModel }))
  app.use("/sales", createSalesRouter({ SalesModel }))
  app.use("/statistics", createStatisticsRouter({ StatisticsModel }))
  app.use("/login", createLoginRouter({ LoginModel }))
  app.use("/signup", createSignUpRouter({ SignUpModel }))
  app.get("/", (req, res) => {
    const htmlResponse = `
      <html>
        <head>
          <title>NodeJs y Express en Vercel</title>
        </head>
        <body>
          <h3>OK</h3>
        </body>
      </html>
    `
    res.send(htmlResponse)
  })
  // Manejo de errores
  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Something broke!")
  })

  // Puerto
  const PORT = process.env.PORT || 1234

  app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
  })
}
