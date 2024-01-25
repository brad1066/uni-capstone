import Link from 'next/link'
import { Button } from '../ui/button'
import { EyeOpenIcon, GlobeIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Module } from '@prisma/client'
import { cn } from '@/lib/utils'

type ModuleItemProps = {
  className?: string
  module: Module
  editable?: boolean
  onClick?: () => void
  onDelete?: () => Promise<unknown>
}

const ModuleItem = ({ className, module, editable, onClick, onDelete }: ModuleItemProps) => {
  return (<>
    <li className={cn('w-full flex justify-between gap-[1rem] items-center border-2 rounded-lg p-[0.5rem]'+ (onClick ? ' cursor-pointer' : ''), className)}
      onClick={onClick}
    >
      {module.title}
      <div className="actions flex gap-1">
        {module?.websiteURL && <Tooltip>
          <TooltipTrigger asChild>
            <Link href={module.websiteURL ?? ''} onClick={(e) => e.stopPropagation()}>
              <Button type="button" size="icon" variant="ghost"><GlobeIcon /></Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>External Link</TooltipContent>
        </Tooltip>}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/view/modules/${module.id}`} onClick={(e) => e.stopPropagation()}>
              <Button type="button" size="icon" variant="outline"><EyeOpenIcon /></Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>View module</TooltipContent>
        </Tooltip>
        {
          editable && <Tooltip>
            <TooltipTrigger asChild>
              <Link href={`/manage/modules/${module.id}`} onClick={(e) => e.stopPropagation()}>
                <Button type="button" size="icon" variant="secondary"><Pencil2Icon /></Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Edit module</TooltipContent>
          </Tooltip>
        }
        
        {onDelete &&
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" size="icon" variant="destructive" onClick={(e) => { e.stopPropagation(); onDelete?.() }}><TrashIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Remove module</TooltipContent>
          </Tooltip>
        }
      </div>
    </li>
  </>)
}

export default ModuleItem