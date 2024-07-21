import { z } from 'zod'
import { customerAddressSchema, customerSchema } from '@/schema'

export type Customer = z.infer<typeof customerSchema>
export type CustomerAddress = z.infer<typeof customerAddressSchema>
