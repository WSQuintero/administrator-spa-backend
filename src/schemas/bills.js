import z from "zod"

const billsSchema = z.object({
  date: z.string().refine(
    (value) => {
      return !isNaN(Date.parse(value))
    },
    { message: "Invalid date format" }
  ),
  scheduler: z.string(),
  nameBill: z.string(),
  amount: z.number(),
  paid: z.boolean()
})

export function validateBill(input) {
  return billsSchema.safeParse(input)
}

export function validatePartialBill(input) {
  return billsSchema.partial().safeParse(input)
}
