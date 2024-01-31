import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { EyeOpenIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
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
        <Link
          href={`/profile/${user.username}`}
          onClick={(e) => e.stopPropagation()}
          className={buttonVariants({variant: 'outline', size: 'icon'})}>
          <EyeOpenIcon role='view-icon'/>
        </Link>
        {editable && (
          <Link href={`/manage/users/${user.username}`} onClick={(e) => e.stopPropagation()}
            className={buttonVariants({variant: 'secondary', size: 'icon'})}>
            <Pencil2Icon role='edit-icon'/>
          </Link>
        )}
        {onDelete && (
          <Button type='button' size='icon' variant='destructive' onClick={(e) => { e.stopPropagation(); onDelete?.() }}>
            <TrashIcon role='remove-icon'/>
          </Button>
        )}

      </div>
    </li>
  </>)
}

export default UserItem