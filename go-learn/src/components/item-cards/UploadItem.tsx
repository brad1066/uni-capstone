import { Upload } from '@prisma/client'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Button } from '../ui/button'
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
        {upload?.publicURL && <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" size="icon" variant="outline" asChild>
              <Link href={`${upload.publicURL}?download` ?? ''}><DownloadIcon /></Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Download</TooltipContent>
        </Tooltip>}
        {
          onDelete && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="button" size="icon" variant="destructive" onClick={() => { onDelete?.() }}><TrashIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Remove upload</TooltipContent>
            </Tooltip>
          )
        }
      </div>
    </li>
  </>)
}