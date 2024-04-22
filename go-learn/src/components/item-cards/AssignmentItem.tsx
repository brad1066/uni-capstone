import { Button, buttonVariants } from '../ui/button'
import { EyeOpenIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { Assignment } from '~/prisma/generated/client'
import { cn, compareDates } from '@/lib/utils'
import Link from 'next/link'

type AssignmentItemProps = {
  className?: string
  assignment: Assignment
  editable?: boolean,
  onClick?: () => void
  onDelete?: () => Promise<unknown>
}

const AssignmentItem = ({ className, assignment, editable, onClick, onDelete }: AssignmentItemProps) => {
  return (<>
    <li className={cn('w-full flex justify-between gap-[1rem] items-center border-2 rounded-lg p-[0.5rem]' + (onClick ? ' cursor-pointer' : ''), className)}
      onClick={onClick}
    ><div className='flex flex-col gap-2'>
        <span>{assignment.title}</span>
        {assignment?.dueDate && compareDates(assignment.dueDate, new Date()) == -1 && (<span className='text-red-400'>Overdue</span>)}
        {assignment?.dueDate && compareDates(assignment.dueDate, new Date()) == 0 && (<span className='text-amber-400'>Due today</span>)}
        {assignment?.dueDate && compareDates(assignment.dueDate, new Date()) == 1 && (<span className='text-green-400'>Due {assignment.dueDate.toLocaleDateString()}</span>)}
      </div>
      <div className="actions flex gap-1">
        <Link href={`/view/assignments/${assignment.id}`} onClick={(e) => e.stopPropagation()}
          className={buttonVariants({variant: 'outline', size: 'icon'})}>
          <EyeOpenIcon role='view-icon'/>
        </Link>
        {editable && (
          <Link href={`/manage/assignments/${assignment.id}`} onClick={(e) => e.stopPropagation()}
            className={buttonVariants({variant: 'secondary', size: 'icon'})}>
            <Pencil2Icon role='edit-icon' />
          </Link>
        )}
        {onDelete && (
          <Button type="button" size="icon" variant="destructive" onClick={(e) => { e.stopPropagation(); onDelete?.() }}>
            <TrashIcon role='remove-icon' />
          </Button>
        )}
      </div>
    </li>
  </>)
}

export default AssignmentItem