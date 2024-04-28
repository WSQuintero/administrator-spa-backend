import z from "zod"

const saleSchema = z.object({
  date: z.string().refine(
    (value) => {
      return !isNaN(Date.parse(value))
    },
    { message: "Invalid date format" }
  ),
  scheduler: z.string(),
  nameSale: z.string(),
  amount: z.number(),
  paid: z.boolean()
})

export function validateSale(input) {
  return saleSchema.safeParse(input)
}

export function validatePartialSale(input) {
  return saleSchema.partial().safeParse(input)
}
