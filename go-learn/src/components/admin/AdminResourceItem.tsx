import Link from 'next/link'
import { Button } from '../ui/button'
import { EyeOpenIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Resource } from '@prisma/client'

type AdminResourceItemProps = {
  resource: Resource
  onDelete?: () => Promise<unknown>
}

const AdminResourceItem = ({ resource, onDelete }: AdminResourceItemProps) => {
  return (<>
    <li className="w-full flex justify-between gap-[1rem] items-center border-2 rounded-lg p-[0.5rem]">
      {resource.title}
      <div className="actions flex gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/resources/${resource.id}`}>
              <Button type="button" size="icon" variant="outline"><EyeOpenIcon /></Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>View resource</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/manage/resources/${resource.id}`} className="">
              <Button type="button" size="icon" variant="secondary"><Pencil2Icon /></Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Edit resource</TooltipContent>
        </Tooltip>
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

export default AdminResourceItem