'use client'

import { getSection } from '@/actions/sectionActions'
import NotFoundPage from '@/app/not-found'
import ResourceItem from '@/components/item-cards/ResourceItem'
import UnitItem from '@/components/item-cards/UnitItem'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { Section, Resource, Unit } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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
                {section?.unit ? <UnitItem unit={section.unit} onClick={() => { router.push(`/view/units/${section.unitId}`) }} /> : 'Not assigned to a unit'}
              </div>
            </CardContent>
          </Card>

          {/* Section Resources Card */}
          <Card>
            <CardHeader><CardTitle>Resources</CardTitle></CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {section?.resources?.map(resource => (
                  <ResourceItem
                    key={resource.id}
                    resource={resource}
                    onClick={() => { router.push(`/view/resources/${resource.id}`) }} />
                ))}
                {
                  section?.resources?.length === 0 && <p>No resources are available for this section</p>
                }
              </ul>
            </CardContent>
          </Card>
        </div>
      </>}
    </>
  )
}