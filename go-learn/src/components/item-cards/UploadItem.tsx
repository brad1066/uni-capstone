import { Upload } from './../../prisma/generated/client'
import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { DownloadIcon, TrashIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'

type UploadItemProps = {
  upload: Upload
  className?: string
  onDelete?: () => Promise<unknown>
}

export default function UploadItem({ upload, className, onDelete }: UploadItemProps) {
  return (<>
    <li className={cn('w-full flex justify-between gap-[1rem] items-center border-2 rounded-lg p-[0.5rem]', className)}>
      {upload.title}
      <div className="actions flex gap-1">
        {upload?.publicURL && (
          <Link
            href={`${upload.publicURL}?download`}
            className={buttonVariants({variant: 'outline', size: 'icon'})}>
            <DownloadIcon role='download-icon'/>
          </Link>
        )}
        {
          onDelete && (
            <Button type="button" size="icon" variant="destructive" onClick={() => { onDelete?.() }}>
              <TrashIcon role='remove-icon'/>
            </Button>
          )
        }
      </div>
    </li>
  </>)
}