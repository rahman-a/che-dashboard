import { OrderProduct } from '@/types'
import { z } from 'zod'

export const offerTableSchema = z.object({
  no: z.string(),
  choices: z.any(),
  price: z.number(),
  status: z.enum(['active', 'inactive']),
  discount: z.object({
    type: z.enum(['amount', 'percentage']),
    value: z.number(),
  }),
  total: z.number(),
  expireAt: z.string(),
  createdAt: z.string(),
})

export type OfferTableDataType = z.infer<typeof offerTableSchema>

export type OfferChoice = {
  firstChoice: OrderProduct[]
  secondChoice: OrderProduct[]
  thirdChoice: OrderProduct[]
}
