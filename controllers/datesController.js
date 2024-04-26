import {
  validateDate,
  validatePartialDate
}from "../schemas/dates.js"

export class DatesController {
  constructor ({ DatesModel }) {
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
    res.status(404).json({ message: 'date not found' })
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

    if (result === false) {
      return res.status(404).json({ message: 'date not found' })
    }

    return res.json({ message: 'date deleted' })
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
