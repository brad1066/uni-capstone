import { Contact, Student, User } from '@prisma/client'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import Link from 'next/link'
import { Button } from '../ui/button'
import { EyeOpenIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'

type AdminStudentListItemProps = {
  student: Student & { user?: User & { contactDetails?: Contact | null } | null }
  onDelete?: () => Promise<unknown>
}

export default function AdminStudentListItem({ student, onDelete }: AdminStudentListItemProps) {
  return (<>
    <li className="w-full flex justify-between gap-[1rem] items-center border-2 rounded-lg p-[0.5rem]">
      {student.user?.forename} {student.user?.surname}
      <div className="actions flex gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/profile/${student.username}`}>
              <Button type="button" size="icon" variant="outline"><EyeOpenIcon /></Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>View Profile</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/manage/users/${student.username}`} className="">
              <Button type="button" size="icon" variant="secondary"><Pencil2Icon /></Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>View/Edit Student</TooltipContent>
        </Tooltip>
        {onDelete && <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" size="icon" variant="destructive" onClick={() => { onDelete?.() }}><TrashIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remove Student</TooltipContent>
        </Tooltip>
        }
      </div>
    </li>
  </>)
}