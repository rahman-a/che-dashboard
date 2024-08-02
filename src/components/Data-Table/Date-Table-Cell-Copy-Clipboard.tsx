'use client'
import { cn } from '@/lib/utils'
import { CheckCheck, Copy } from 'lucide-react'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

type Props = {
  content: string
  className?: string
}

export default function DateTableCellCopyClipboard({
  content,
  className,
}: Props) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    let timeout: NodeJS.Timeout
    if (copied) {
      timeout = setTimeout(() => {
        setCopied(false)
      }, 1500)
    }
    return () => clearTimeout(timeout)
  }, [copied])
  return (
    <div
      className={cn(
        `group flex items-center justify-center relative w-full h-full 
        text-xs p-4 cursor-pointer table-data-padding-none`,
        className
      )}
    >
      <CopyToClipboard text={content} onCopy={() => setCopied(true)}>
        <div
          className='flex items-center justify-center absolute top-0 left-0 w-full h-full 
        bg-black/70 rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible'
        >
          {copied ? (
            <CheckCheck size={18} className='text-gray-50' />
          ) : (
            <Copy size={18} className='text-gray-50' />
          )}
        </div>
      </CopyToClipboard>
      <span>{content}</span>
    </div>
  )
}
