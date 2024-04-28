import { validateToken } from "../middlewares/validationToken.js"
import { validateDate, validatePartialDate } from "../schemas/dates.js"

export class DatesController {
  constructor({ DatesModel }) {
    this.DatesModel = DatesModel
  }

  getAll = async (req, res) => {
    const token = req?.headers?.authorization?.split(" ")[1]
    if (!token) {
      return res.status(401).json({ error: "Access denied, token missing" })
    }
    const isValidated = validateToken(token, req, res)

    if (isValidated === true) {
      const { date } = req.query
      const dates = await this.DatesModel.getAll({ date })
      res.json(dates)
    }
  }

  getById = async (req, res) => {
    try {
      const token = req?.headers?.authorization?.split(" ")[1]
      if (!token) {
        return res.status(401).json({ error: "Access denied, token missing" })
      }
      const isValidated = validateToken(token, req, res)

      if (isValidated === true) {
        const { id } = req.params
        const date = await this.DatesModel.getById({ id })

        if (date) {
          return res.json(date)
        } else {
          return res.status(404).json({ message: "Date not found" })
        }
      }
    } catch (error) {
      console.error("Error fetching document by ID: ", error)
      return res.status(500).json({ message: "Error fetching document by ID" })
    }
  }

  create = async (req, res) => {
    try {
      const token = req?.headers?.authorization?.split(" ")[1]
      if (!token) {
        return res.status(401).json({ error: "Access denied, token missing" })
      }
      const isValidated = validateToken(token, req, res)

      if (isValidated === true) {
        const result = validateDate(req.body)

        if (!result.success) {
          return res
            .status(422)
            .json({ error: JSON.parse(result.error.message) })
        }
        const newDate = await this.DatesModel.create({ input: result.data })

        return res.status(201).json(newDate)
      }
    } catch (error) {
      return res.status(500).json({ message: "Error creating document" })
    }
  }

  delete = async (req, res) => {
    try {
      const token = req?.headers?.authorization?.split(" ")[1]
      if (!token) {
        return res.status(401).json({ error: "Access denied, token missing" })
      }
      const isValidated = validateToken(token, req, res)

      if (isValidated === true) {
        const { id } = req.params
        const result = await this.DatesModel.delete({ id })

        if (!result) {
          return res
            .status(404)
            .json({ message: "No document found with that ID." })
        }

        return res.status(200).json(result)
      }
    } catch (error) {
      console.error("Error deleting document: ", error)
      return res.status(500).json({ message: "Error deleting document" })
    }
  }

  update = async (req, res) => {
    try {
      const token = req?.headers?.authorization?.split(" ")[1]
      if (!token) {
        return res.status(401).json({ error: "Access denied, token missing" })
      }
      const isValidated = validateToken(token, req, res)

      if (isValidated === true) {
        const result = validatePartialDate(req.body)
        if (!result.success) {
          return res
            .status(400)
            .json({ error: JSON.parse(result.error.message) })
        }

        const { id } = req.params

        const updatedDate = await this.DatesModel.update({
          id,
          input: result.data
        })
        if (!updatedDate) {
          return res
            .status(404)
            .json({ message: "No document found with that ID." })
        }

        return res.json(updatedDate)
      }
    } catch (error) {
      return res.status(500).json({ message: "Error updating document" })
    }
  }
}
