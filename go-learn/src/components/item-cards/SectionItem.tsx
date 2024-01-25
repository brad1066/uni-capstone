import Link from 'next/link'
import { Button } from '../ui/button'
import { EyeOpenIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Section } from '@prisma/client'
import { cn } from '@/lib/utils'

type SectionItemProps = {
  className?: string
  section: Section
  editable?: boolean
  onClick?: () => void
  onDelete?: () => Promise<unknown>
}

const SectionItem = ({ className, section, editable, onClick, onDelete }: SectionItemProps) => {
  return (<>
    <li className={cn('w-full flex justify-between gap-[1rem] items-center border-2 rounded-lg p-[0.5rem]'+ (onClick ? ' cursor-pointer' : ''), className)}
      onClick={onClick}
    >
      {section.title}
      <div className="actions flex gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/view/sections/${section.id}`} onClick={(e) => e.stopPropagation()}>
              <Button type="button" size="icon" variant="outline"><EyeOpenIcon /></Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>View section</TooltipContent>
        </Tooltip>
        {editable && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={`/manage/sections/${section.id}`} onClick={(e) => e.stopPropagation()}>
                <Button type="button" size="icon" variant="secondary"><Pencil2Icon /></Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Edit section</TooltipContent>
          </Tooltip>
        )}
        {onDelete && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" size="icon" variant="destructive" onClick={(e) => { e.stopPropagation(); onDelete?.() }}><TrashIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Remove section</TooltipContent>
          </Tooltip>
        )}
      </div>
    </li>
  </>)
}

export default SectionItem