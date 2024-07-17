import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Trash } from 'lucide-react'
import { cn } from '@/lib/utils'
type Props = {
  className?: string
}

export default function DeleteBtn({ className }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='p-4 pl-2 justify-start space-x-2 font-normal
          rtl:space-x-reverse text-red-600 w-full'
          onClick={(e) => e.stopPropagation()}
        >
          <Trash className='h-4 w-4' />
          <span>Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className={cn(`sm:max-w-[425px]`, className)}
      >
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the selected
          </DialogDescription>
        </DialogHeader>
        <div className='flex justify-center items-center py-4'></div>
        <DialogFooter className='flex-row-reverse'>
          <Button type='submit' variant='destructive' className='ml-2'>
            Delete
          </Button>
          <DialogClose>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
