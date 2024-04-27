import { Router } from "express"
import { BillsController } from "../controllers/billsController.js"

export const createBillsRouter = ({ BillsModel }) => {
  const billsRouter = Router()

  const billsController = new BillsController({ BillsModel })

  billsRouter.get("/", billsController.getAll)
  billsRouter.post("/", billsController.create)

  billsRouter.get("/:id", billsController.getById)
  billsRouter.delete("/:id", billsController.delete)
  billsRouter.patch("/:id", billsController.update)

  return billsRouter
}
