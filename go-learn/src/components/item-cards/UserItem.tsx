import Link from 'next/link'
import { Button } from '../ui/button'
import { EyeOpenIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { User } from '@prisma/client'
import { cn } from '@/lib/utils'

type UserItemProps = {
  className?: string
  user: User
  editable?: boolean
  onClick?: () => void
  onDelete?: () => Promise<unknown>
}

const UserItem = ({ className, user, editable, onClick, onDelete }: UserItemProps) => {
  return (<>
    <li className={cn('w-full flex justify-between gap-[1rem] items-center border-2 rounded-lg p-[0.5rem]'+ (onClick ? ' cursor-pointer' : ''), className)}
      onClick={onClick}
    >
      {user.title} {user.forename} {user.surname}
      <div className='actions flex gap-1'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type='button' size='icon' variant='outline'>
              <Link href={`/profile/${user.username}`} onClick={(e) => e.stopPropagation()}><EyeOpenIcon /></Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>View Profile</TooltipContent>
        </Tooltip>
        {editable && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type='button' size='icon' variant='secondary'>
                <Link href={`/manage/users/${user.username}`} onClick={(e) => e.stopPropagation()}><Pencil2Icon /></Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit user</TooltipContent>
          </Tooltip>
        )}
        {onDelete && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type='button' size='icon' variant='destructive' onClick={(e) => { e.stopPropagation(); onDelete?.() }}><TrashIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Remove user</TooltipContent>
          </Tooltip>
        )}

      </div>
    </li>
  </>)
}

export default UserItem