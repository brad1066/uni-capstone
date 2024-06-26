'use client'

import { getSection } from '@/actions/sectionActions'
import NotFoundPage from '@/app/not-found'
import ResourceItem from '@/components/item-cards/ResourceItem'
import UnitItem from '@/components/item-cards/UnitItem'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { Section, Resource, Unit, UserRole } from '~/prisma/generated/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner'

type ViewSectionPageProps = {
  params: {
    section_id: string
  }
}

export default function ViewSectionPage({ params: { section_id } }: ViewSectionPageProps) {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [section, setSection] = useState<Section & {
    unit: Unit | null
    resources: Resource[] | null
  }>()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    (async () => {
      if (!user) await validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })
      await getSection(section_id, ['unit', 'resources']).then(section => setSection(section))
    })().finally(() => setLoading(false))
  }, [])

  return (
    <>
      {loading && <InfinitySpin color='red' />}
      {!loading && !section && <>
        <NotFoundPage />
      </>}
      {!loading && section && <>
        <h1 className="mb-4">{section?.title}</h1>
        <div className="w-full flex flex-col gap-4">
          {/* Information Card */}
          <Card className="">
            <CardHeader><CardTitle>Information</CardTitle></CardHeader>
            <CardContent className='grid grid-cols-1 xl:grid-cols-2'>
              <div>
                <h4>Description</h4>
                {section.description ? section.description : 'No description'}
              </div>
              <div>
                <h4>Unit</h4>
                {section?.unit ? (
                  <UnitItem
                    unit={section.unit}
                    editable={user?.role == UserRole.admin || user?.role == UserRole.teacher}
                    onClick={() => { router.push(`/view/units/${section.unitId}`) }} />
                )
                  : 'Not assigned to a unit'}
              </div>
            </CardContent>
          </Card>

          {/* Section Resources Card */}
          <Card>
            <CardHeader><CardTitle>Resources</CardTitle></CardHeader>
            <CardContent>
              {!section?.resources?.length
                ? <p>There are no resources in this section</p>
                : <ul className="flex flex-row flex-wrap">
                  {section.resources.map(resource => (
                    <ResourceItem
                      key={resource.id}
                      resource={resource}
                      className='max-w-fit min-w-sm'
                      onClick={() => { router.push(`/view/resources/${resource.id}`) }} />
                  ))}
                </ul>
              }

            </CardContent>
          </Card>
        </div>
      </>}
    </>
  )
}