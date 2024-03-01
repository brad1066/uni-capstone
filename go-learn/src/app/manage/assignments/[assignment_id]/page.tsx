
'use client'

import NoAccessNotice from '@/components/ui/NoAccessNotice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAuth } from '@/hooks/useAuth'
import { Assignment, Module, Resource } from './../../prisma/generated/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ResourceItem from '@/components/item-cards/ResourceItem'
import { getAssignment, updateAssignment } from '@/actions/assignmentActions'
import EditAssignmentForm from '@/components/forms/EditAssignmentForm'
import ModuleItem from '@/components/item-cards/ModuleItem'
import { Separator } from '@/components/ui/separator'
import NewResourceForm from '@/components/forms/NewResourceForm'
import { createResource, deleteResource } from '@/actions/resourceActions'

type SingleAssignmentManagePageProps = {
  params: { assignment_id: string }
}

export default function SingleAssignmentManagePage({ params: { assignment_id } }: SingleAssignmentManagePageProps) {

  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [assignment, setAssignment] = useState<Assignment & {
    module?: Module | null
    resources?: Resource[] | null
  }>()

  const [editAssignmentDetailsDialogOpen, setEditAssignmentDetailsDialogOpen] = useState(false)
  const [addingResource, setAddingResource] = useState<boolean>(false)

  const refreshAssignmentData = async () => {
    if (!(user && assignment_id)) { return }
    getAssignment(assignment_id, ['module', 'resources'])
      .then((assignment) => assignment && setAssignment(assignment))
  }

  useEffect(() => {
    if (user) { return }
    validateLoggedIn?.()
      .then(({ loggedIn }) => !loggedIn && router.replace('/login'))
  }, [])

  useEffect(() => {
    refreshAssignmentData()
      .then(() => setLoading(false))
  }, [user, assignment_id])

  return (<>
    {!loading && !(user?.role == 'admin' || user?.role == 'teacher') && <>
      <NoAccessNotice />
    </>}
    {!loading && assignment && <>
      <h1 className="mb-[2rem]">{assignment.title}</h1>
      <div className="grid gap-[2rem] w-full xl:grid-cols-2">

        {/* Assignment Details Card */}
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <CardTitle>Assignment Details</CardTitle>

            {/* Edit Assignment Dialog */}
            <Dialog open={editAssignmentDetailsDialogOpen} onOpenChange={setEditAssignmentDetailsDialogOpen}>
              <DialogTrigger asChild><Button className="ml-auto">Edit</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Edit Assignment</DialogTitle></DialogHeader>
                <EditAssignmentForm onUpdateSave={async ({ title, description, dueDate }) => {
                  updateAssignment(assignment.id, { title, description, dueDate } as Assignment)
                    .then(refreshAssignmentData)
                    .then(() => setEditAssignmentDetailsDialogOpen(false))
                }} assignment={assignment} />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>

            {/* Assignment Description */}
            <div className="flex flex-col gap-2">
              <p>Description</p>
              <pre className="inline-block font-[inherit] whitespace-pre-wrap">{assignment.description || 'No Description'}</pre>
            </div>

            <Separator className='mb-2 mt-2' />

            {/* Assignment Due Date */}
            <p>Due Date: {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'No Due Date'}</p>

            <Separator className='mb-2 mt-2' />

            {/* Assignment Module */}
            <div className="flex flex-col gap-2">
              <p>Module</p>
              {assignment.module ? <ModuleItem editable module={assignment.module} /> : 'No Module'}

            </div>
          </CardContent>
        </Card>

        {/* Resources Card */}
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center gap-2 space-y-0 justify-between">
            <CardTitle>Resources</CardTitle>
            {user?.role == 'admin' && (
              <Dialog open={addingResource} onOpenChange={setAddingResource}>
                <DialogTrigger><Button>Add Resource</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Add Resource</DialogTitle></DialogHeader>
                  <p>Coming soon...</p>
                  <NewResourceForm onSubmit={async (resource) => {
                    createResource(resource, undefined, assignment.id)
                      .then(refreshAssignmentData)
                  }} />
                </DialogContent>
              </Dialog>
            )}
          </CardHeader>
          <CardContent>
            {
              assignment?.resources?.length ? <ul className='flex gap-2'>
                {assignment.resources?.map?.(resource => (
                  <ResourceItem
                    key={resource.id}
                    resource={resource}
                    editable
                    onDelete={async () => {
                      deleteResource(resource.id)
                        .then(refreshAssignmentData)
                    }} />
                ))}
              </ul>
                : <p>No Resources</p>
            }
          </CardContent>
        </Card>
      </div>
    </>}
  </>
  )
}