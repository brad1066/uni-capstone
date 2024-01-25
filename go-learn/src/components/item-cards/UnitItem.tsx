import { Unit } from '@prisma/client'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import Link from 'next/link'
import { Button } from '../ui/button'
import { EyeOpenIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'

type UnitItemProps = {
  className?: string
  unit: Unit
  editable?: boolean
  onClick?: () => void
  onDelete?: () => Promise<unknown>
}

export default function UnitItem({ className, unit, editable, onClick, onDelete }: UnitItemProps) {
  return (
    <li className={cn('w-full flex justify-between gap-[1rem] items-center border-2 rounded-lg p-[0.5rem]'+ (onClick ? ' cursor-pointer' : ''), className)}
      onClick={onClick}
    >
      {unit.title}
      <div className="actions flex gap-1">

        {/* View Action */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/view/units/${unit.id}`} onClick={(e) => e.stopPropagation()}>
              <Button type="button" size="icon" variant="outline"><EyeOpenIcon /></Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>View</TooltipContent>
        </Tooltip>

        {/* Edit Action */}
        {editable && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={`/manage/units/${unit.id}`} onClick={(e) => e.stopPropagation()}>
                <Button type="button" size="icon" variant="secondary"><Pencil2Icon /></Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Edit</TooltipContent>
          </Tooltip>
        )}

        {/* Remove Action */}
        {onDelete && <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" size="icon" variant="destructive" onClick={(e) => { e.stopPropagation(); onDelete() }}><TrashIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remove Unit</TooltipContent>
        </Tooltip>
        }
      </div>
    </li>
  )
}