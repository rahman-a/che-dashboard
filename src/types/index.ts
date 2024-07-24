import { z } from 'zod'
import { customerAddressSchema, customerSchema } from '@/schema'
import { MessageKeys } from 'next-intl'

export type Customer = z.infer<typeof customerSchema>
export type CustomerAddress = z.infer<typeof customerAddressSchema>

export type TranslationKeys = MessageKeys<IntlMessages, keyof IntlMessages>

export type StatusLabelTypes = 'new' | 'cut' | 'sewed' | 'delivered'
export type PrioritizationLabelTypes = 'urgent' | 'important' | 'contact'
export type PaymentLabelTypes = 'paid' | 'unpaid'
