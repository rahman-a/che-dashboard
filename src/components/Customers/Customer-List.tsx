import * as React from 'react'
import { CustomerCard } from './'
import { orderCostumerExample } from '@/demo/data/orders'

export interface ICustomerListProps {
  mode?: 'view' | 'edit' | 'select'
}

export function CustomerList({ mode }: ICustomerListProps) {
  return (
    <div className='grid grid-col-2 gap-4 max-h-72 overflow-y-auto'>
      <CustomerCard mode={mode} data={orderCostumerExample} />
      <CustomerCard mode={mode} data={orderCostumerExample} />
      <CustomerCard mode={mode} data={orderCostumerExample} />
      <CustomerCard mode={mode} data={orderCostumerExample} />
    </div>
  )
}
