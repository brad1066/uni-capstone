import { Dispatch, SetStateAction } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import NewAssignmentForm from "../forms/NewAssignmentForm"
import { Assignment } from "~/prisma/generated/client"

type NewAssignmentDialogProps = {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
  onSubmit: (assignment: Assignment) => Promise<unknown>
}

const NewAssignmentDialog = ({open, onOpenChange, onSubmit}: NewAssignmentDialogProps) => {
  return (

    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild><Button>New</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>New Assignment</DialogTitle></DialogHeader>
        <NewAssignmentForm submitAssignment={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}

export default NewAssignmentDialog