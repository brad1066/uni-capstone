'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import NewAssignmentForm from '../forms/NewAssignmentForm'
import { Assignment } from '~/prisma/generated/client'

type NewAssignmentDialogProps = {
  open?: boolean
  onOpenChange?: Dispatch<SetStateAction<boolean>>
  onSubmit?: (assignment: Assignment) => Promise<unknown>
}

const NewAssignmentDialog = (props: NewAssignmentDialogProps) => {
  const [open, setOpen] = useState(props.open ?? false)
  const onOpenChange = props.onOpenChange ?? setOpen
  const onSubmit = props.onSubmit ?? (() => Promise.resolve())

  return (

    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild><Button>New</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>New Assignment</DialogTitle></DialogHeader>
        <NewAssignmentForm submitAssignment={async (assignment) => { await onSubmit(assignment); setOpen(false) }} />
      </DialogContent>
    </Dialog>
  )
}

export default NewAssignmentDialog