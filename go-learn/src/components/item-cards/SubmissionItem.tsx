import { Submission } from '~/prisma/generated/client'
import { Button } from '../ui/button'
import { TrashIcon } from '@radix-ui/react-icons'
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
        {onDelete && (
          <Button type="button" size="icon" variant="destructive" onClick={(e) => { e.stopPropagation(); onDelete?.() }}>
            <TrashIcon role='remove-icon'/>
          </Button>
        )}
      </div>
    </li>
  </>)
}