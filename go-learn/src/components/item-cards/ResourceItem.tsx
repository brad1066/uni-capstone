import Link from 'next/link'
import { Button } from '../ui/button'
import { DownloadIcon, EyeOpenIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Resource } from '@prisma/client'
import { cn } from '@/lib/utils'

type ResourceItemProps = {
  className?: string
  resource: Resource
  editable?: boolean,
  download?: () => Promise<unknown>,
  onClick?: () => void
  onDelete?: () => Promise<unknown>
}

const ResourceItem = ({ className, resource, editable, download, onClick, onDelete }: ResourceItemProps) => {
  return (<>
    <li className={cn('w-full flex justify-between gap-[1rem] items-center border-2 rounded-lg p-[0.5rem]' + (onClick ? ' cursor-pointer' : ''), className)}
      onClick={onClick}
    >
      {resource.title}
      <div className="actions flex gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/view/resources/${resource.id}`}>
              <Button type="button" size="icon" variant="outline"><EyeOpenIcon /></Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>View resource</TooltipContent>
        </Tooltip>
        {download && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" size="icon" variant="outline" onClick={(e) => {
                e.stopPropagation()
                download()
              }}><DownloadIcon /></Button>
            </TooltipTrigger>
            <TooltipContent>Download resource</TooltipContent>
          </Tooltip>
        )}
        {editable && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={`/manage/resources/${resource.id}`} className="">
                <Button type="button" size="icon" variant="secondary"><Pencil2Icon /></Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Edit resource</TooltipContent>
          </Tooltip>
        )}
        {onDelete && <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" size="icon" variant="destructive" onClick={() => { onDelete?.() }}><TrashIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remove resource</TooltipContent>
        </Tooltip>
        }
      </div>
    </li>
  </>)
}

export default ResourceItem