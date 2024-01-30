'use client'

import { getAssignment } from '@/actions/assignmentActions'
import { deleteSubmission } from '@/actions/submissionActions'
import SubmissionItem from '@/components/item-cards/SubmissionItem'
import { useAuth } from '@/hooks/useAuth'
import { useSupabase } from '@/hooks/useSupabase'
import { Assignment, Submission, UserRole } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type ViewAssignmentSubmissionsPageProps = {
  params: { assignment_id: string }
}

export default function ViewAssignmentSubmissionsPage({ params: { assignment_id } }: ViewAssignmentSubmissionsPageProps) {
  const { supabase } = useSupabase()
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()

  const [assignment, setAssignment] = useState<Assignment & { submissions?: Submission[] | null }>()
  const [loading, setLoading] = useState(true)

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
      .finally(() => setLoading(false))
  }, [user, assignment_id])

  const refreshAssignmentData = async () => {
    if (!assignment_id) { return }
    return getAssignment(assignment_id, ['submissions'], [UserRole.admin, UserRole.teacher])
      .then((assignment) => {
        if (!assignment) { return }
        setAssignment(assignment)
      })
  }

  return <>
    {loading && <p>Loading...</p>}
    {!loading && assignment && <>
      <h1 className='mb-4'>My submissions for assignment: {assignment?.title}</h1>
      <div className={assignment?.submissions?.length ? 'grid gap-4 w-full md:grid-cols-2 xl:grid-cols-3' : ''}>
        {assignment?.submissions?.length
          ? assignment?.submissions?.map(submission => (
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
          ))
          : <p className='block m-auto text-2xl'>No submissions yet.</p>}
      </div>
    </>
    }
  </>
}
