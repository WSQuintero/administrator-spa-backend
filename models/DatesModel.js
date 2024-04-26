import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils.js'

const dates = readJSON('./dates.json')

export class DatesModel {
  static async getAll ({ date }) {
    if (date) {
      return dates.filter(
        dat => dat.date===date
      )
    }

    return dates
  }

  static async getById ({ id }) {
    const date = dates.find(date => date.id === id)
    return date
  }

  static async create ({ input }) {
    const newdate = {
      id: randomUUID(),
      ...input
    }

    dates.push(newdate)

    return newdate
  }

  static async delete ({ id }) {
    const dateIndex = dates.findIndex(date => date.id === id)
    if (dateIndex === -1) return false

    dates.splice(dateIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const dateIndex = dates.findIndex(date => date.id === id)
    if (dateIndex === -1) return false

    dates[dateIndex] = {
      ...dates[dateIndex],
      ...input
    }

    return dates[dateIndex]
  }
}
