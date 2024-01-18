'use client'

import { getUnit } from '@/actions/unitActions'
import NotFoundPage from '@/app/not-found'
import ModuleItem from '@/components/item-cards/ModuleItem'
import ResourceItem from '@/components/item-cards/ResourceItem'
import SectionItem from '@/components/item-cards/SectionItem'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { Unit, Module, Resource, Section } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type ViewUnitPageProps = {
  params: {
    unit_id: string
  }
}

export default function ViewUnitPage({ params: { unit_id } }: ViewUnitPageProps) {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [unit, setUnit] = useState<Unit & {
    module: Module | null
    resources: Resource[] | null
    sections: Section[] | null
  }>()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    (async () => {
      if (!user) await validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })
      await getUnit(unit_id, ['module', 'resources', 'sections']).then(unit => setUnit(unit))
    })().finally(() => setLoading(false))
  }, [])

  return (
    <>
      {!loading && !unit && <>
        <NotFoundPage />
      </>}
      {!loading && unit && <>
        <h1 className="mb-4">{unit?.title}</h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 flex-col gap-4">
          {/* Information Card */}
          <Card className="">
            <CardHeader><CardTitle>Information</CardTitle></CardHeader>
            <CardContent>
              <h4 className="mb-2">Description</h4>
              {unit.description ? unit.description : 'No description'}
              <h4 className="mt-4 mb-2">Module</h4>
              {unit?.module ? <ModuleItem module={unit.module} /> : 'Not assigned to a module'}
            </CardContent>
          </Card>

          {/* Unit Sections Card */}
          <Card className='col-span-2'>
            <CardHeader><CardTitle>Sections</CardTitle></CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2">
                {unit?.sections?.map(section => (
                  <SectionItem key={section.id} section={section} onClick={() => { router.push(`/view/sections/${section.id}`) }} />
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Unit Resources Card */}
          <Card className='col-span-3'>
            <CardHeader><CardTitle>Resources</CardTitle></CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {unit?.resources?.map(resource => (
                  <ResourceItem
                    key={resource.id}
                    resource={resource}
                    download={async () => {
                    }}
                    onClick={() => { router.push(`/view/resources/${resource.id}`) }} />
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </>}
    </>
  )
}