import * as React from 'react'
import { ProductCard } from './'

export interface IProductsListProps {}

export function ProductsList({}: IProductsListProps) {
  return (
    <div className='grid grid-col-2 gap-4 max-h-72 overflow-y-auto'>
      <ProductCard isSelectMode mode='view' />
      <ProductCard isSelectMode mode='view' />
      <ProductCard isSelectMode mode='view' />
      <ProductCard isSelectMode mode='view' />
    </div>
  )
}
