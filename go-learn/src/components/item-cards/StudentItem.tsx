import { Contact, Student, User } from '@prisma/client'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import Link from 'next/link'
import { Button } from '../ui/button'
import { EyeOpenIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'

type StudentItemProps = {
  className?: string
  student: Student & { user?: User & { contactDetails?: Contact | null } | null }
  editable?: boolean
  onClick?: () => void
  onDelete?: () => Promise<unknown>
}

export default function StudentItem({ className, student, editable, onClick, onDelete }: StudentItemProps) {
  return (<>
    <li className={cn('w-full flex justify-between gap-[1rem] items-center border-2 rounded-lg p-[0.5rem]'+ (onClick ? ' cursor-pointer' : ''), className)}
      onClick={onClick}
    >
      {student.user?.forename} {student.user?.surname}
      <div className="actions flex gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/profile/${student.username}`} onClick={(e) => e.stopPropagation()}>
              <Button type="button" size="icon" variant="outline"><EyeOpenIcon /></Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>View Profile</TooltipContent>
        </Tooltip>
        {editable && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={`/manage/users/${student.username}`} onClick={(e) => e.stopPropagation()}>
                <Button type="button" size="icon" variant="secondary"><Pencil2Icon /></Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>View/Edit Student</TooltipContent></Tooltip>
        )}
        {onDelete && <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" size="icon" variant="destructive" onClick={(e) => { e.stopPropagation(); onDelete?.() }}><TrashIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remove Student</TooltipContent>
        </Tooltip>
        }
      </div>
    </li>
  </>)
}