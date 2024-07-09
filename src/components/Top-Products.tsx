import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Eye } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import { topProducts } from '@/demo/data'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type Props = {
  className?: string
}

export default function TopProductsTable({ className }: Props) {
  return (
    <Card className={cn('flex flex-col w-screen md:w-full', className)}>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className='border-separate'>
          <TableHeader>
            <TableRow className='bg-gray-50'>
              <TableHead className='w-[100px]'>No</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Total Orders</TableHead>
              <TableHead>Total Sales</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topProducts.data.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell title={product.name}>
                  <Image
                    src={product.image!}
                    alt={product.name}
                    width={35}
                    height={35}
                    className='object-contain w-12 h-12'
                  />
                </TableCell>
                <TableCell className='max-w-40'>{product.name}</TableCell>
                <TableCell>{product.orders}</TableCell>
                <TableCell>{product.sales}</TableCell>
                <TableCell>
                  <Button
                    variant='outline'
                    size='icon'
                    className='flex items-center space-x-1 text-gray-600 w-6 h-6'
                    asChild
                  >
                    <Link href={`/products/${product.id}`}>
                      <Eye className='w-4 h-4' />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className='w-full flex-col items-end gap-2 text-sm mt-auto'>
        <Button variant='outline' size='sm' asChild>
          <Link href={topProducts.url}>View All</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
