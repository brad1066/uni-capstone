import { Submission } from '~/prisma/generated/client'
import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { EyeOpenIcon, TrashIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'

type SubmissionItemProps = {
  className?: string
  submission: Submission
  onClick?: () => void
  onDelete?: () => Promise<unknown>
}

export default function SubmissionItem({ className, submission, onClick, onDelete }: SubmissionItemProps) {
  return (<>
    <li className={cn('w-full flex justify-between gap-[1rem] items-center border-2 rounded-lg p-[0.5rem]' + (onClick ? ' cursor-pointer' : ''), className)}
      onClick={onClick}
    >
      {submission.title}
      <div className="actions flex gap-1">
        <Link
          href={`/view/submissions/${submission.id}`}
          onClick={(e) => e.stopPropagation()}
          className={buttonVariants({variant: 'outline'})}>
          <EyeOpenIcon role='view-icon'/>
        </Link>
        {onDelete && (
          <Button type="button" size="icon" variant="destructive" onClick={(e) => { e.stopPropagation(); onDelete?.() }}>
            <TrashIcon role='remove-icon'/>
          </Button>
        )}
      </div>
    </li>
  </>)
}