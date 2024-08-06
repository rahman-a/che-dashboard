import { z } from 'zod'
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from '@/constants'
import { type UseTranslationsType } from '@/types'
import { type Value } from 'react-phone-number-input'
import { addDays } from 'date-fns'

export const customerAddressSchema = (t: UseTranslationsType) =>
  z.object({
    id: z.string().optional(),
    country: z.string().min(1, {
      message: t('required_value'),
    }),
    governorate: z.string().min(1, {
      message: t('required_value'),
    }),
    region: z.string().min(1, {
      message: t('required_value'),
    }),
    block: z.string().optional(),
    street: z.string().optional(),
    neighborhood: z.string().optional(),
    building: z.string().optional(),
    floor: z.string().optional(),
    apartment: z.string().optional(),
    type: z.enum(['home', 'office', 'other']).optional(),
    primary: z.boolean().default(false).optional(),
    note: z.string().optional(),
  })

export const customerSchema = (t: UseTranslationsType, type?: string) =>
  z.object({
    id: z.string().optional(),
    name: z.string().min(1, {
      message: t('required_value'),
    }),
    email: z
      .string({
        message: t('required_value'),
      })
      .email({
        message: t('provide_valid_email'),
      }),
    phone: z.string().min(6, {
      message: t('max_characters', { count: 6, name: t('phone') }),
    }),
    address: customerAddressSchema(t).or(z.array(customerAddressSchema(t))),
  })

export const orderProductSchema = (t: UseTranslationsType) =>
  z.object({
    id: z.string().optional(),
    name: z.string(),
    image: z.string(),
    details: z.string(),
    price: z.number({ coerce: true }).positive({
      message: t('positive_value_required'),
    }),
    quantity: z
      .number({ coerce: true })
      .positive({
        message: t('positive_value_required'),
      })
      .default(1),
    total: z.number({ coerce: true }).positive({
      message: t('positive_value_required'),
    }),
    discount: z.object({
      type: z.enum(['amount', 'percentage']),
      value: z
        .number({ coerce: true })
        .positive({
          message: t('positive_value_required'),
        })
        .optional(),
    }),
    SKUs: z.array(z.string()).optional(),
    note: z.string().optional(),
  })

export const orderSchema = (t: UseTranslationsType) =>
  z.object({
    id: z.string().optional(),
    customer: customerSchema(t),
    products: z.array(orderProductSchema(t)).min(1, {
      message: t('provide_at_least_one', { name: t('product') }),
    }),
    price: z.coerce
      .number({
        message: t('field_required_value', { field: t('price') }),
      })
      .positive({
        message: t('field_positive_value_required', { field: t('price') }),
      }),
    total: z.coerce
      .number({
        message: t('field_required_value', { field: t('total') }),
      })
      .positive({
        message: t('field_positive_value_required', { field: t('total') }),
      }),
    discount: z.object({
      type: z.enum(['amount', 'percentage']),
      value: z.coerce.number().optional(),
      reason: z.string().optional().optional(),
    }),
    paidByCustomer: z.coerce.number().optional(),
    shipping: z.object({
      value: z.coerce.number().optional(),
      reason: z.string().optional(),
    }),
    state: z
      .enum(['completed', 'uncompleted', 'canceled', 'returned'])
      .default('uncompleted'),
    status: z.enum(['new', 'cut', 'sewed', 'delivered']).default('new'),
    priority: z.enum(['urgent', 'important', 'contact']).default('important'),
    payment: z.enum(['paid', 'unpaid']).default('unpaid'),
    orderNote: z.string().optional(),
    deliveryNote: z.string().optional(),
    invoice: z.string().optional(),
    createdAt: z.string().optional(),
  })

export const productSchema = (t: UseTranslationsType) =>
  z.object({
    id: z.string().optional(),
    name: z
      .string()
      .min(10, {
        message: t('min_characters', { count: 10, name: t('name') }),
      })
      .max(250, {
        message: t('max_characters', { count: 250, name: t('name') }),
      }),
    abbr: z.string().min(2, {
      message: t('min_characters', { count: 2, name: t('abbr') }),
    }),
    material: z.object({
      name: z.string().min(1, {
        message: t('required_value'),
      }),
      usedUnits: z.coerce.number().default(0),
    }),
    details: z
      .string()
      .min(25, {
        message: t('min_characters', {
          count: 25,
          name: t('product_details'),
        }),
      })
      .max(500, {
        message: t('max_characters', {
          count: 500,
          name: t('product_details'),
        }),
      }),
    SKUs: z.array(
      z.object({
        id: z.string(),
        sku: z.string().min(1, {
          message: t('required_value'),
        }),
        type: z.string().min(1, {
          message: t('required_value'),
        }),
        size: z.string().min(1, {
          message: t('required_value'),
        }),
      })
    ),
    category: z.string().min(1, {
      message: t('required_value'),
    }),
    stock: z.coerce.number().default(0),
    price: z.coerce.number().positive({
      message: t('positive_value_required'),
    }),
    discount: z.object({
      value: z.coerce.number().default(0),
      type: z.enum(['amount', 'percentage']).default('amount'),
    }),
    images: z.array(z.any()).superRefine((images, ctx) => {
      if (images.length === 0)
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('required_value'),
        })
      return images.every((image) => {
        if (image.size > MAX_FILE_SIZE)
          return ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('file_too_large'),
          })
        if (!ACCEPTED_IMAGE_TYPES.includes(image.type))
          return ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${t('file_type_not_allowed')} [${image.name}]`,
          })
      })
    }),
  })

export const categoryFormSchema = (t: UseTranslationsType) =>
  z.object({
    name: z.string().min(1, { message: t('required_value') }),
    description: z.string().min(1, { message: t('required_value') }),
    image: z
      .any()
      .optional()
      .superRefine((image, ctx) => {
        if (!image) return true
        if (image.size > MAX_FILE_SIZE)
          return ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('file_too_large'),
          })

        if (!ACCEPTED_IMAGE_TYPES.includes(image.type))
          return ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${t('file_type_not_allowed')} [${image.name}]`,
          })
      }),
  })

export const sizeFormSchema = (t: UseTranslationsType) =>
  z.object({
    size: z.coerce
      .number()
      .positive({ message: t('positive_value_required') })
      .min(1, { message: t('required_value') }),
    description: z.string().optional(),
  })

export const typeFormSchema = (t: UseTranslationsType) =>
  z.object({
    name: z.string().min(1, { message: t('required_value') }),
    description: z.string().optional(),
    image: z
      .any()
      .optional()
      .superRefine((image, ctx) => {
        if (!image) return true
        if (image.size > MAX_FILE_SIZE)
          return ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('file_too_large'),
          })

        if (!ACCEPTED_IMAGE_TYPES.includes(image.type))
          return ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${t('file_type_not_allowed')} [${image.name}]`,
          })
      }),
  })

export const offerSchema = (t: UseTranslationsType) =>
  z.object({
    firstChoice: z
      .array(z.object({ id: z.string(), name: z.string() }))
      .min(1, {
        message: t('provide_at_least_one', { name: t('choice') }),
      }),
    secondChoice: z
      .array(z.object({ id: z.string(), name: z.string() }))
      .min(1, {
        message: t('provide_at_least_one', { name: t('choice') }),
      }),
    thirdChoice: z
      .array(z.object({ id: z.string(), name: z.string() }))
      .min(1, {
        message: t('provide_at_least_one', { name: t('choice') }),
      }),
    price: z.coerce
      .number()
      .min(0)
      .positive({
        message: t('positive_value_required'),
      })
      .default(0),
    discount: z.object({
      type: z.enum(['amount', 'percentage']).default('amount'), // Use the imported value of DiscountTypes
      value: z.coerce.number().optional(),
    }),
    status: z.enum(['active', 'inactive']).default('active'),
    expiryDate: z.date().default(() => addDays(new Date(), 7)),
  })

export const couponsSchema = (t: UseTranslationsType) =>
  z.object({
    id: z.string().optional(),
    code: z.string().min(1, { message: t('required_value') }),
    description: z.string().min(1, { message: t('required_value') }),
    discount: z.object({
      type: z.enum(['amount', 'percentage']).default('amount'), // Use the imported value of DiscountTypes
      value: z.coerce.number().positive({
        message: t('positive_value_required'),
      }),
    }),
    timesUsed: z.coerce.number().default(0),
    maxUsed: z.coerce.number().default(1),
    status: z.enum(['active', 'inactive']).default('active'),
    expireAt: z
      .date()
      .default(() => addDays(new Date(), 7))
      .or(z.string()),
    createdAt: z
      .date()
      .default(() => new Date())
      .or(z.string()),
  })

export const materialSchema = (t: UseTranslationsType) =>
  z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: t('required_value') }),
    description: z.string().optional(),
    purchasedUnits: z.coerce
      .number()
      .positive({
        message: t('positive_value_required'),
      })
      .default(0),
    pricePerUnit: z.coerce
      .number()
      .positive({
        message: t('positive_value_required'),
      })
      .default(0),
    totalPrice: z.coerce.number().default(0),
    availableUnits: z.coerce.number().default(0),
    consumedUnits: z.coerce.number().default(0),
    image: z
      .any()
      .optional()
      .superRefine((image, ctx) => {
        if (!image) return true
        if (typeof image === 'string') return true
        if (image.size > MAX_FILE_SIZE)
          return ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('file_too_large'),
          })

        if (!ACCEPTED_IMAGE_TYPES.includes(image.type))
          return ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${t('file_type_not_allowed')} [${image.name}]`,
          })
      }),
    createdAt: z
      .date()
      .default(() => new Date())
      .or(z.string()),
  })

export const staffSchema = (t: UseTranslationsType) =>
  z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: t('required_value') }),
    email: z
      .string()
      .email({
        message: t('provide_valid_email'),
      })
      .min(1, { message: t('required_value') }),
    phone: z.custom<Value>().refine((value) => value.length > 6, {
      message: t('min_characters', { count: 6, name: t('phone') }),
      path: ['phone'],
    }),
    country: z.string().min(1, { message: t('required_value') }),
    address: z.string().optional(),
    password: z.string().min(8, {
      message: t('min_characters', { count: 8, name: t('password') }),
    }),
    role: z.enum(['manager', 'employee']).default('employee'),
    status: z.enum(['active', 'inactive']).default('active'),
    createdAt: z
      .date()
      .default(() => new Date())
      .or(z.string()),
  })
