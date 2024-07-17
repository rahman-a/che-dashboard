import { z } from 'zod'

// no - products - total - payment - customer - country - phone - status - priority - date
export const orderSchema = z.object({
  no: z.string(),
  products: z.any(),
  total: z.string(),
  payment: z.enum(['paid', 'unpaid']),
  customer: z.string(),
  country: z.string(),
  phone: z.string(),
  status: z.enum(['new', 'cut', 'sewed', 'delivered']),
  priority: z.enum(['urgent', 'important', 'contact']),
  date: z.string(),
  invoice: z.any(),
})

export type Order = z.infer<typeof orderSchema>
