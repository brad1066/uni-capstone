'use client'

import { getAssignment } from '@/actions/assignmentActions'
import SubmissionItem from '@/components/item-cards/SubmissionItem'
import { useAuth } from '@/hooks/useAuth'
import { Assignment, Submission, UserRole } from '~/prisma/generated/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner'

type ViewAssignmentSubmissionsPageProps = {
  params: { assignment_id: string }
}

export default function ViewAssignmentSubmissionsPage({ params: { assignment_id } }: ViewAssignmentSubmissionsPageProps) {
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

  useEffect(() => {

  }, [assignment])

  const refreshAssignmentData = async () => {
    if (!assignment_id) { return }
    const assignment = await getAssignment(assignment_id, ['submissions'], [UserRole.admin, UserRole.teacher])
      .then((assignment) => {
        if (!assignment) { return }
        setAssignment(assignment)
      })
    return assignment
  }


  return <>
    {loading && <InfinitySpin color='red' />}
    {!loading && assignment && <>
      <h1 className='mb-4'>Submissions for assignment: {assignment?.title}</h1>
      <div className={assignment?.submissions?.length ? 'grid gap-4 w-full md:grid-cols-2 xl:grid-cols-3' : ''}>
        {assignment?.submissions?.length
          ? assignment?.submissions?.map(submission => (
            <SubmissionItem
              key={submission.id}
              submission={submission}
              className='max-w-fit min-w-sm' />
          ))
          : <p className='block m-auto text-2xl'>No submissions yet.</p>}
      </div>
    </>
    }
  </>
}
