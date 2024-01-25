import { Submission } from '@prisma/client'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import Link from 'next/link'
import { Button } from '../ui/button'
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
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/view/submissions/${submission.id}`} onClick={(e) => e.stopPropagation()}>
              <Button type="button" size="icon" variant="outline"><EyeOpenIcon /></Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>View Profile</TooltipContent>
        </Tooltip>
        {onDelete && <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" size="icon" variant="destructive" onClick={(e) => { e.stopPropagation(); onDelete?.() }}><TrashIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remove Submission</TooltipContent>
        </Tooltip>
        }
      </div>
    </li>
  </>)
}