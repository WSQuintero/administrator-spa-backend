import { Router } from "express"
import { DatesController } from "../controllers/datesController.js"

export const createDatesRouter = ({ DatesModel }) => {
  const datesRouter = Router()

  const datesController = new DatesController({ DatesModel })

  datesRouter.get("/", datesController.getAll)
  datesRouter.post("/", datesController.create)

  datesRouter.get("/:id", datesController.getById)
  datesRouter.delete("/:id", datesController.delete)
  datesRouter.patch("/:id", datesController.update)

  return datesRouter
}
