'use client'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import * as React from 'react'

export interface IUploadSizesTableImageProps {
  imageUrl: string
}

export function UploadSizesTableImage({
  imageUrl,
}: IUploadSizesTableImageProps) {
  const [imgUrl, setImgUrl] = React.useState<string>(imageUrl)

  const uploadImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    // const formData = new FormData()
    // formData.append('file', file)

    // const response = await fetch('/api/upload', {
    //   method: 'POST',
    //   body: formData,
    // })

    // const data = await response.json()
    const url = URL.createObjectURL(file)
    setImgUrl(url)
  }
  return (
    <div className='flex flex-col space-y-4'>
      <form action='' className='max-w-56'>
        <Input
          type='file'
          name='file'
          id='file'
          onChange={uploadImageHandler}
        />
      </form>
      <figure className='w-96'>
        <Image src={imgUrl} alt='Sizes Table' width={450} height={450} />
      </figure>
    </div>
  )
}
