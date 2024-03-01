import { Contact, Student, User } from '~/prisma/generated/client'
import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
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
        <Link 
          href={`/profile/${student.username}`} 
          onClick={(e) => e.stopPropagation()}
          className={buttonVariants({variant: 'outline', size: 'icon'})}>
          <EyeOpenIcon role='view-icon'/>
        </Link>
        {editable && (
          <Link 
            href={`/manage/users/${student.username}`} 
            onClick={(e) => e.stopPropagation()}
            className={buttonVariants({variant: 'secondary', size: 'icon'})}>
            <Pencil2Icon role='edit-icon'/>
          </Link>
        )}
        {onDelete && (
          <Button type="button" size="icon" variant="destructive" onClick={(e) => { e.stopPropagation(); onDelete?.() }}>
            <TrashIcon role='destroy-icon'/>
          </Button>
        )}
      </div>
    </li>
  </>)
}