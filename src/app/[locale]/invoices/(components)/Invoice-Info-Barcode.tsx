'use client'
import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CopyIcon, CheckCheck, Download } from 'lucide-react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { WhatsappMonoColor } from '@/icons'
import { Button } from '@/components/ui/button'
import barcode from '@/images/barcode.gif'
import { useTranslations } from 'next-intl'

export interface IInvoiceInfoBarcodeProps {}

export function InvoiceInfoBarcode(props: IInvoiceInfoBarcodeProps) {
  const t = useTranslations()
  const [copied, setCopied] = React.useState(false)

  // generate a function to download the barcode image
  const downloadBarcode = () => {
    const a = document.createElement('a')
    a.href = barcode.src
    a.download = 'barcode.gif'
    a.click()
  }

  React.useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }, [copied])
  return (
    <div className='w-full flex flex-col space-y-5'>
      <Button className='bg-gray-100 w-full text-black hover:bg-gray-200 rounded-lg'>
        <span>{t('create_web_link')}</span>
      </Button>
      <div className='bg-gray-100 w-full text-black p-4 shadow-sm rounded-lg'>
        <div className='flex items-center justify-between space-x-2'>
          <div className='flex flex-col  space-y-5'>
            <h3 className='text-xs md:text-sm text-gray-500 md:w-4/6'>
              {t('invoice_link_guide_msg')}
            </h3>
            <Link
              className='text-[11px] md:text-sm'
              href='https://che-commerce.vercel.app/invoices/85412'
            >
              https://checommerce.com/invoices/85412
            </Link>
          </div>
          <div className='flex flex-col items-center justify-between space-y-4'>
            <div>
              <Image src={barcode} width={75} height={75} alt='barcode' />
              {/* barcode image */}
            </div>
            <div className='flex items-center space-x-2 rtl:space-x-reverse'>
              <CopyToClipboard
                text='https://che-commerce.vercel.app/invoices/85412'
                onCopy={() => setCopied(true)}
              >
                <Button variant='outline' size='icon' className='h-8 w-8'>
                  {copied ? (
                    <CheckCheck className='w-3 lg:w-4 h-3 lg:h-4' />
                  ) : (
                    <CopyIcon className='w-3 lg:w-4 h-3 lg:h-4' />
                  )}
                </Button>
              </CopyToClipboard>
              <Button asChild>
                <Link
                  target='_blank'
                  href={`https://wa.me/+96555558837?text=https://che-commerce.vercel.app/invoices/85412`}
                  className='flex items-center justify-center !border-solid !border !border-input
                w-8 h-8 !bg-white !p-0 hover:!bg-gray-100 rounded-md'
                >
                  <WhatsappMonoColor className='!w-3 lg:!w-4 h-3 lg:h-4 text-black' />
                </Link>
              </Button>
              <Button
                onClick={() => downloadBarcode()}
                variant='outline'
                size='icon'
                className='h-8 w-8'
              >
                <Download className='w-3 lg:w-4 h-3 lg:h-4' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
