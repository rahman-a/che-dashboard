import { z } from 'zod'

export const customerAddressSchema = z.object({
  country: z.string().min(2, {
    message: 'Please enter a valid country.',
  }),
  governorate: z.string().min(2, {
    message: 'Please enter a valid governorate.',
  }),
  region: z.string().min(2, {
    message: 'Please enter a valid region.',
  }),
  block: z
    .string()
    .min(2, {
      message: 'Please enter a valid Block.',
    })
    .optional(),
  street: z
    .string()
    .min(2, {
      message: 'Please enter a valid street address.',
    })
    .optional(),
  neighborhood: z
    .string()
    .min(2, {
      message: 'Please enter a valid Neighborhood.',
    })
    .optional(),
  building: z
    .string()
    .min(2, {
      message: 'Please enter a valid Building.',
    })
    .optional(),
  floor: z
    .string()
    .min(2, {
      message: 'Please enter a valid floor.',
    })
    .optional(),
  apartment: z
    .string()
    .min(5, {
      message: 'Please enter a valid apartment.',
    })
    .optional(),
  note: z.string().optional(),
})

export const customerSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
  phone: z.string().min(10, {
    message: 'Please enter a valid phone number.',
  }),
  address: customerAddressSchema,
})
