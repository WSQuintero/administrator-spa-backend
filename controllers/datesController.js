import { validateDate, validatePartialDate } from "../schemas/dates.js"

export class DatesController {
  constructor({ DatesModel }) {
    this.DatesModel = DatesModel
  }

  getAll = async (req, res) => {
    const { date } = req.query
    const dates = await this.DatesModel.getAll({ date })
    res.json(dates)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const date = await this.DatesModel.getById({ id })
    if (date) return res.json(date)
    res.status(404).json({ message: "date not found" })
  }

  create = async (req, res) => {
    const result = validateDate(req.body)

    if (!result.success) {
      // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newdate = await this.DatesModel.create({ input: result.data })

    res.status(201).json(newdate)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.DatesModel.delete({ id })

    if (result.message === "Error deleting document") {
      return res.status(500).json({ message: "Error deleting document" })
    }
    if (result.message === "No document found with that ID.") {
      return res
        .status(404)
        .json({ message: "No document found with that ID." })
    }
    return res.status(200).json(result)
  }

  update = async (req, res) => {
    const result = validatePartialDate(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updateddate = await this.DatesModel.update({ id, input: result.data })

    return res.json(updateddate)
  }
}
