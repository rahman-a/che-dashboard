import { z } from 'zod'

//******************* PRODUCT SCHEMA *******************//
export const productTableSchema = z.object({
  no: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  category: z.string(),
  SKUs: z.array(z.string()),
  image: z.string(),
  createdAt: z.string(),
})

export type ProductTableDataType = z.infer<typeof productTableSchema>

//******************* CATEGORY SCHEMA *******************//
export const categoryTableSchema = z.object({
  no: z.string(),
  name: z.string(),
  description: z.string(),
  products_no: z.number(),
  image: z.string(),
  createdAt: z.string(),
})

export type CategoryDataTable = z.infer<typeof categoryTableSchema>

//******************* TYPE SCHEMA *******************//
export const typeTableSchema = z.object({
  no: z.string(),
  name: z.string(),
  description: z.string(),
  products_no: z.number(),
  image: z.string(),
  createdAt: z.string(),
})

export type TypeDataTable = z.infer<typeof typeTableSchema>

//******************* SIZE SCHEMA *******************//
export const sizeTableSchema = z.object({
  no: z.string(),
  size: z.number(),
  products_no: z.number(),
  description: z.string(),
  createdAt: z.string(),
})

export type SizeDataTable = z.infer<typeof sizeTableSchema>
