
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { Assignment, Module, Resource, Submission } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ResourceItem from '@/components/item-cards/ResourceItem'
import { getAssignment } from '@/actions/assignmentActions'
import ModuleItem from '@/components/item-cards/ModuleItem'
import { Separator } from '@/components/ui/separator'
import SubmissionItem from '@/components/item-cards/SubmissionItem'
import { deleteSubmission } from '@/actions/submissionActions'
import { useSupabase } from '@/hooks/useSupabase'

type ViewAssignmentPageProps = {
  params: { assignment_id: string }
}

export default function ViewAssignmentPage({ params: { assignment_id } }: ViewAssignmentPageProps) {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const { supabase } = useSupabase()

  const [loading, setLoading] = useState(true)
  const [assignment, setAssignment] = useState<Assignment & {
    module?: Module | null
    resources?: Resource[] | null
    submissions?: Submission[] | null
  }>()

  const refreshAssignmentData = async () => {
    if (user && assignment_id) {
      getAssignment(assignment_id, ['module', 'resources', 'user.submissions'])
        .then((assignment) => {
          if (assignment) {
            setAssignment(assignment)
          }
        })
    }
  }

  useEffect(() => {
    if (!user) {
      validateLoggedIn?.()
        .then(({ loggedIn }) => {
          if (!loggedIn) { router.replace('/login') }
        })
    }
  }, [])

  useEffect(() => {
    refreshAssignmentData()
      .then(() => setLoading(false))
  }, [user, assignment_id])

  return (<>
    {!loading && assignment && <>
      <h1 className="mb-[2rem]">{assignment.title}</h1>
      <div className="grid gap-[2rem] w-full xl:grid-cols-2">

        {/* Assignment Details Card */}
        <Card className="w-full">
          <CardHeader><CardTitle>Assignment Details</CardTitle></CardHeader>
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
              {assignment.module ? (
                <ModuleItem
                  className='max-w-fit min-w-sm'
                  module={assignment.module}
                  editable={(user?.role == 'admin' || user?.role == 'teacher')} />
              )
                : 'No Module'}

            </div>
          </CardContent>
        </Card>

        {/* Resources Card */}
        <Card className="w-full">
          <CardHeader><CardTitle>Resources</CardTitle></CardHeader>
          <CardContent>
            {
              assignment?.resources?.length ? <ul className='flex gap-2 flex-row flex-wrap'>
                {assignment.resources?.map?.(resource => (
                  <ResourceItem
                    key={resource.id}
                    resource={resource}
                    className='max-w-fit min-w-sm'
                    editable={(user?.role == 'admin' || user?.role == 'teacher')}
                    onClick={() => router.push(`/view/resources/${resource.id}`)} />
                ))}
              </ul>
                : <p>No Resources</p>
            }
          </CardContent>
        </Card>

        {/* My Submissions Card */}
        <Card className="w-full">
          <CardHeader><CardTitle>My Submissions</CardTitle></CardHeader>
          <CardContent>
            {
              assignment?.submissions?.length
                ? (<ul className='flex gap-2 flex-row flex-wrap'>
                  {assignment.submissions?.map?.(submission => (
                    <SubmissionItem
                      key={submission.id}
                      submission={submission}
                      className='max-w-fit min-w-sm'
                      onDelete={async () => {
                        deleteSubmission(submission.id)
                          .then((resp) => {
                            if (!resp?.deletedUpload) { return }
                            supabase.storage
                              .from('golearn-resources')
                              .remove([resp.deletedUpload.path])
                          })
                          .then(refreshAssignmentData)
                      }} />
                  ))}
                </ul>)
                : <p>No Submissions</p>
            }
          </CardContent>
        </Card>
      </div>
    </>}
  </>
  )
}