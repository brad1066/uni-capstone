'use client'

import { getResource } from '@/actions/resourceActions'
import NotFoundPage from '@/app/not-found'
import UploadItem from '@/components/item-cards/UploadItem'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { Resource, Section, Unit, Upload, User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'

type ViewResourcePageProps = {
  params: {
    resource_id: string
  }
}

export default function ViewResourcePage({ params: { resource_id } }: ViewResourcePageProps) {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [resource, setResource] = useState<Resource & {
    author: User | null
    unit: Unit | null
    uploads: Upload[] | null
    sections: Section[] | null
  }>()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    (async () => {
      if (!user) await validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })
      await getResource(resource_id, ['uploads', 'sections']).then(resource => setResource(resource))
    })().finally(() => setLoading(false))
  }, [])

  return (
    <>
      {!loading && !resource && <>
        <NotFoundPage />
      </>}
      {!loading && resource && <>
        <h1 className="mb-4">{resource?.title}</h1>
        <div className="w-full flex flex-col gap-4">
          {/* Information Card */}
          <Card className="">
            <CardHeader><CardTitle>Description</CardTitle></CardHeader>
            <CardContent>
              {resource.description ? resource.description : 'No description'}
            </CardContent>
          </Card>

          {/* Content Card */}
          <Card className="">
            <CardHeader><CardTitle>Content</CardTitle></CardHeader>
            <CardContent>
              <Markdown>
                {resource.content ? resource.content : 'No content'}
              </Markdown>
            </CardContent>
          </Card>

          {/* Resource Resources Card */}
          <Card>
            <CardHeader><CardTitle>Uploads</CardTitle></CardHeader>
            <CardContent>
              <ul className="flex flex-wrap flex-grow-0 flex-shrink">
                {resource?.uploads?.map(upload => (
                  <UploadItem
                    key={upload.id}
                    upload={upload}
                    className="w-fit"/>
                ))}
                {
                  resource?.uploads?.length === 0 && <p>No uploads are available for this resource</p>
                }
              </ul>
            </CardContent>
          </Card>
        </div>
      </>}
    </>
  )
}