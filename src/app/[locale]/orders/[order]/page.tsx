import React from 'react'
import { promises as fs } from 'fs'
import path from 'path'
import { z } from 'zod'
import { Template } from '@/components'
import { getTranslations } from 'next-intl/server'
import { CreateUpdateOrder } from '../(components)'
import { Metadata } from 'next'
import {
  StatusLabelTypes,
  PrioritizationLabelTypes,
  PaymentLabelTypes,
  DiscountTypes,
  AddressTypes,
} from '@/types'
import { orderSchema } from '@/schema'
import { UseTranslationsType } from '@/types'

// const exampleOrderData = {
//   id: '47408',
//   total: 155.99,
//   payment: 'paid' as PaymentLabelTypes,
//   status: 'new' as StatusLabelTypes,
//   priority: 'urgent' as PrioritizationLabelTypes,
//   createdAt: '2021-07-01T00:00:00.000Z',
//   invoice: '47805',
//   state: 'completed',
//   products: [
//     {
//       id: '1',
//       name: 'Golden White Abaya - 50 - embroidery',
//       image: 'http://localhost:3000/images/products/abaya_1.png',
//       details:
//         '<h4>The Product consist of Abaya, Dress and scarf</h4><ul><li>color: Black</li><li>Front opening design</li><li>net bracelets</li><li>sleeveless dress</li><li>Dry Clean</li></ul>',
//       price: 70.99,
//       quantity: 2,
//       total: 141.98,
//       discount: {
//         type: 'percentage' as DiscountTypes,
//         value: 10,
//       },
//     },
//     {
//       id: '2',
//       name: 'Golden Black Abaya - 52 - classic',
//       image: 'http://localhost:3000/images/products/abaya_2.png',
//       details:
//         '<h4>The Product consist of Abaya, Dress and scarf</h4><ul><li>color: Black</li><li>Front opening design</li><li>net bracelets</li><li>sleeveless dress</li><li>Dry Clean</li></ul>',
//       price: 84.99,
//       quantity: 1,
//       total: 84.99,
//       discount: {
//         type: 'amount' as DiscountTypes,
//         value: 10,
//       },
//     },
//   ],
//   customer: {
//     name: 'Kimbra Antonoyev',
//     email: 'kimb@gmail.com',
//     phone: '+965-555-58837',
//     address: {
//       country: 'kuwait',
//       governorate: 'Hawalli',
//       region: 'Salmiya',
//       block: '12',
//       street: '1234 Elm St',
//       neighborhood: 'Salmiya',
//       building: '1234',
//       floor: '2',
//       apartment: 'B',
//       type: 'home' as AddressTypes,
//       note: 'Please leave at the front door',
//     },
//   },
// }

export const metadata: Metadata = {
  title: 'RB - Update Orders',
  description: 'Update an existing order',
}

type Props = {}

async function getOrder(t: UseTranslationsType) {
  const data = await fs.readFile(
    path.join(process.cwd(), '/src/demo/data/order.json')
  )
  const order = JSON.parse(data.toString())
  const address = order.customer.address.find((ad: any) => ad.primary)
  order.customer.address = address
  return orderSchema(t).parse(order)
}

export default async function UpdateOrder({}: Props) {
  const t = await getTranslations()
  const order = await getOrder(t)
  return (
    <Template>
      <main
        className='flex flex-1 flex-col gap-4 lg:gap-6 lg:p-4 
      w-screen lg:w-full overflow-x-auto'
      >
        <div
          className='w-full flex flex-col space-y-5 flex-1 items-start rounded-lg p-4 
        border border-dashed shadow-sm mt-2 lg:m-0'
        >
          <h1 className='text-3xl font-light tracking-wide py-4'>
            {t('update_order')}
          </h1>
          <CreateUpdateOrder mode='update' data={order} />
        </div>
      </main>
    </Template>
  )
}
