import { Upload } from '@prisma/client'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Button } from '../ui/button'
import { DownloadIcon, TrashIcon } from '@radix-ui/react-icons'

type ResourceUploadItemProps = {
  upload: Upload
  onDelete?: () => Promise<unknown>
}

export default function ResourceUploadItem({upload, onDelete}: ResourceUploadItemProps) {
  return (<>
    <li className="w-full flex justify-between gap-[1rem] items-center border-2 rounded-lg p-[0.5rem]">
      {upload.title}
      <div className="actions flex gap-1">
        {upload?.publicURL && <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" size="icon" variant="outline" asChild>
              <Link href={upload.publicURL ?? ''}><DownloadIcon /></Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Download</TooltipContent>
        </Tooltip>}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" size="icon" variant="destructive" onClick={() => { onDelete?.() }}><TrashIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remove upload</TooltipContent>
        </Tooltip>
      </div>
    </li>
  </>)
}