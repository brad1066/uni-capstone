import Link from 'next/link'
import { Button } from '../ui/button'
import { EyeOpenIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Section } from '@prisma/client'

type AdminSectionItemProps = {
  section: Section
  onDelete?: () => Promise<unknown>
}

const AdminSectionItem = ({ section, onDelete }: AdminSectionItemProps) => {
  return (<>
    <li className="w-full flex justify-between gap-[1rem] items-center border-2 rounded-lg p-[0.5rem]">
      {section.title}
      <div className="actions flex gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/sections/${section.id}`}>
              <Button type="button" size="icon" variant="outline"><EyeOpenIcon /></Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>View section</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/manage/sections/${section.id}`} className="">
              <Button type="button" size="icon" variant="secondary"><Pencil2Icon /></Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Edit section</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" size="icon" variant="destructive" onClick={() => { onDelete?.() }}><TrashIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remove section</TooltipContent>
        </Tooltip>
      </div>
    </li>
  </>)
}

export default AdminSectionItem