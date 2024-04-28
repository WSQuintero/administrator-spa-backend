import { Router } from "express"
import { SalesController } from "../controllers/salesController.js"

export const createSalesRouter = ({ SalesModel }) => {
  const salesRouter = Router()

  const salesController = new SalesController({ SalesModel })

  salesRouter.get("/", salesController.getAll)
  salesRouter.post("/", salesController.create)

  salesRouter.get("/:id", salesController.getById)
  salesRouter.delete("/:id", salesController.delete)
  salesRouter.patch("/:id", salesController.update)

  return salesRouter
}
