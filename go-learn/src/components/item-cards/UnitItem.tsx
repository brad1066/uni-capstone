import { Unit } from '~/prisma/generated/client'
import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
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
        <Link href={`/view/units/${unit.id}`} onClick={(e) => e.stopPropagation()}
          className={buttonVariants({variant: 'outline', size: 'icon'})}>
          <EyeOpenIcon role='view-icon'/>
        </Link>

        {/* Edit Action */}
        {editable && (
          <Link href={`/manage/units/${unit.id}`} onClick={(e) => e.stopPropagation()}
            className={buttonVariants({variant: 'secondary', size: 'icon'})}>
            <Pencil2Icon role='edit-icon' />
          </Link>
        )}

        {/* Remove Action */}
        {onDelete && (
          <Button type="button" size="icon" variant="destructive" onClick={(e) => { e.stopPropagation(); onDelete() }}><TrashIcon role='remove-icon' />
          </Button>
        )}
      </div>
    </li>
  )
}