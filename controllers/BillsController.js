import { validateBill, validatePartialBill } from "../schemas/bills.js"

export class BillsController {
  constructor({ BillsModel }) {
    this.BillsModel = BillsModel
  }

  getAll = async (req, res) => {
    const { paid } = req.query
    const bills = await this.BillsModel.getAll({ paid })
    res.json(bills)
  }

  getById = async (req, res) => {
    try {
      const { id } = req.params
      const bill = await this.BillsModel.getById({ id })

      if (bill) {
        return res.json(bill)
      } else {
        return res.status(404).json({ message: "bill not found" })
      }
    } catch (error) {
      console.error("Error fetching document by ID: ", error)
      return res.status(500).json({ message: "Error fetching document by ID" })
    }
  }

  create = async (req, res) => {
    try {
      const result = validateBill(req.body)

      if (!result.success) {
        return res.status(422).json({ error: JSON.parse(result.error.message) })
      }
      const newBill = await this.BillsModel.create({ input: result.data })

      return res.status(201).json(newBill)
    } catch (error) {
      return res.status(500).json({ message: "Error creating document" })
    }
  }

  delete = async (req, res) => {
    try {
      const { id } = req.params
      const result = await this.BillsModel.delete({ id })

      if (!result) {
        return res
          .status(404)
          .json({ message: "No document found with that ID." })
      }

      return res.status(200).json(result)
    } catch (error) {
      console.error("Error deleting document: ", error)
      return res.status(500).json({ message: "Error deleting document" })
    }
  }

  update = async (req, res) => {
    try {
      const result = validatePartialBill(req.body)
      if (!result.success) {
        return res.status(400).json({ error: result.error.message })
      }

      const { id } = req.params
      const updatedBill = await this.BillsModel.update({
        id,
        input: result.data
      })

      if (!updatedBill) {
        return res
          .status(404)
          .json({ message: "No document found with that ID." })
      }

      return res.json(updatedBill)
    } catch (error) {
      console.error("Error updating document: ", error)
      return res.status(500).json({ message: "Error updating document" })
    }
  }
}
