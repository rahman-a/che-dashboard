import { useTranslations } from 'next-intl'
import { z } from 'zod'

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

type T = ReturnType<typeof useTranslations>

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

// name - details - price - category - type -size - images -discount

/**
 * name - shortcut
 * details
 * category - stock
 * price - discount - shipping
 * images
 * //////////////////////////
 * sku/'s size - type - sku
 */

export const productSchema = (t: T) =>
  z.object({
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
    details: z
      .string()
      .min(25, {
        message: t('min_characters', { count: 25, name: t('product_details') }),
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
    discount: z.coerce.number().default(0),
    shipping: z.coerce.number().default(0),
    images: z.array(z.instanceof(File)).superRefine((images, ctx) => {
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
