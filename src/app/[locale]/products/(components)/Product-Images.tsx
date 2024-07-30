'use client'
import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { productSchema } from '@/schema'
import { z } from 'zod'
import uuid from 'react-uuid'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/input'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { blobUrlToFile } from '@/lib/utils'
import { RequiredAsterisk } from '@/components'
export interface IProductImagesProps {
  data?: string[]
}

export function ProductImages({ data }: IProductImagesProps) {
  const t = useTranslations()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [images, setImages] = React.useState<{ id: string; image: string }[]>(
    []
  )
  const form = useFormContext<z.infer<ReturnType<typeof productSchema>>>()
  const imagesWatch = form.watch('images')

  const handleImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const images: { id: string; image: string }[] = []
    if (!files) return
    const pictures = Array.from(files)
    for (const picture of pictures) {
      const imageUrl = URL.createObjectURL(picture)
      images.push({ id: uuid(), image: imageUrl })
    }
    setImages((prev) => [...prev, ...images])
    form.setValue('images', [...imagesWatch, ...pictures], {
      shouldValidate: true,
    })
  }

  const removeImage = async (index: number, id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
    form.setValue(
      'images',
      imagesWatch.filter((_, i) => i !== index)
    )
  }

  const updateFileInputValue = React.useCallback(() => {
    const dataTransfer = new DataTransfer()
    for (const image of imagesWatch) {
      dataTransfer.items.add(image)
    }
    if (inputRef.current) {
      inputRef.current.files = dataTransfer.files
    }
  }, [imagesWatch])

  React.useEffect(() => {
    updateFileInputValue()
  }, [imagesWatch, updateFileInputValue])

  // in edit product page set the images value in defaultValues
  const setImagesFromData = React.useCallback(async () => {
    if (data?.length) {
      const imagesArr: File[] = []
      const imagesData: { id: string; image: string }[] = []
      for (const image of data) {
        const file = await blobUrlToFile(image)
        imagesData.push({ id: uuid(), image })
        imagesArr.push(file)
      }
      setImages(imagesData)
      form.setValue('images', imagesArr, { shouldValidate: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  React.useEffect(() => {
    setImagesFromData()
  }, [setImagesFromData])
  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex flex-col space-y-2 gap-4'>
        <div className='flex flex-col md:flex-row items-center gap-4'>
          <FormField
            control={form.control}
            name='images'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel htmlFor='images'>
                  {t('product_images')}
                  <RequiredAsterisk />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    ref={inputRef}
                    value={undefined}
                    onChange={(e) => handleImages(e)}
                    id={field.name}
                    type='file'
                    accept='image/*'
                    multiple
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <div className='grid grid-cols-3 gap-4'>
            {images.map((image, index) => (
              <div
                key={index}
                className='relative rounded-sm shadow-sm overflow-hidden'
              >
                <Image
                  width={50}
                  height={50}
                  src={image.image}
                  alt='product'
                  unoptimized
                  className='w-full object-contain h-full'
                />
                <Button
                  variant='outline'
                  size='icon'
                  type='button'
                  className='absolute top-2 right-2 bg-gray-50 h-6 w-6'
                  onClick={() => removeImage(index, image.id)}
                >
                  <Trash size={14} className='text-red-500' />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
