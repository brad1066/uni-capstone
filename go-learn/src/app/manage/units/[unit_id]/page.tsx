/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { createResource, deleteResource } from '@/actions/resourceActions'
import { createSection, deleteSection } from '@/actions/sectionActions'
import { getUnit, updateUnit } from '@/actions/unitActions'
import AdminModuleItem from '@/components/admin/AdminModuleItem'
import AdminResourceItem from '@/components/admin/AdminResourceItem'
import AdminSectionItem from '@/components/admin/AdminSectionItem'
import EditUnitForm from '@/components/forms/EditUnitForm'
import NewResourceForm from '@/components/forms/NewResourceForm'
import NewSectionForm from '@/components/forms/NewSectionForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAuth } from '@/hooks/useAuth'
import { Unit, Module, Resource, Section } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type SingleUnitAdminPageProps = {
  params: { unit_id: string }
}

export default function SingleUnitAdminPage({ params: { unit_id } }: SingleUnitAdminPageProps) {

  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [unit, setUnit] = useState<Unit & {
    module?: Module | null
    resources?: Resource[] | null
    sections?: Section[] | null
  }>()

  const [creatingUnit, setCreatingUnit] = useState<boolean>(false)
  const [creatingSection, setCreatingSection] = useState<boolean>(false)

  const refreshUnitData = async () => {
    if (user && unit_id) {
      const unit = await getUnit(parseInt(unit_id), ['module', 'resources', 'sections'])
      if (unit) {
        setUnit(unit)
      }
    }
  }

  useEffect(() => {
    (async () => {
      if (!user) await validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })
    })()
  }, [])

  useEffect(() => {
    (async () => {
      refreshUnitData()
      setLoading(false)
    })()
  }, [user, unit_id])

  return (<>
    {!loading && unit && <>
      <h1 className="mb-[2rem]">{unit.title}</h1>
      <div className="grid gap-[2rem] w-full xl:grid-cols-2">

        {/* Unit Details Card */}
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <CardTitle>Unit Details</CardTitle>
            <Dialog>
              <DialogTrigger asChild><Button className="ml-auto">Edit</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Edit Unit</DialogTitle></DialogHeader>
                <EditUnitForm unit={unit} onUpdateSave={updatedUnit => {
                  updateUnit({ id: unit.id, ...updatedUnit }).then(async () => {
                    await refreshUnitData()
                  })
                }} />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <div>
              <h3 className="text-lg font-bold">Description</h3>
              <pre className="inline-block font-[inherit] whitespace-pre-line">{unit.description || 'No Description'}</pre>
            </div>

            {
              unit?.module && (
                <div>
                  <h3 className="text-lg font-bold">Module</h3>
                  <AdminModuleItem module={unit.module as Module} />
                </div>
              )
            }
          </CardContent>
        </Card>

        {/* Sections Card */}
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <CardTitle>Sections</CardTitle>
            {/* Add Section Dialog */}
            <Dialog open={creatingSection} onOpenChange={setCreatingSection}>
              <DialogTrigger asChild><Button className="ml-auto">New Section</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>New Resource</DialogTitle></DialogHeader>
                <NewSectionForm unitId={unit.id} onSubmit={async (section: Section) => {
                  if (unit) {
                    await createSection(section)
                    await refreshUnitData()
                  }
                  setCreatingSection(false)
                }} />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {unit.sections?.length ? <ul className="flex flex-col gap-2">
              {unit.sections.map(section => <>
                <AdminSectionItem key={section.id} section={section} onDelete={async () => {
                  const result = await deleteSection(section.id)
                  if (result) await refreshUnitData()
                }} />
              </>)}
            </ul>
              : 'No Resources'}
          </CardContent>
        </Card>

        {/* Resources Card */}
        <Card className="w-full xl:col-span-2">
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <CardTitle>Resources</CardTitle>
            {/* Add Unit Dialog */}
            <Dialog open={creatingUnit} onOpenChange={setCreatingUnit}>
              <DialogTrigger asChild><Button className="ml-auto">New Resource</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>New Resource</DialogTitle></DialogHeader>
                <NewResourceForm unitId={unit.id} onSubmit={async (resource: Resource) => {
                  if (unit) {
                    await createResource(resource)
                    await refreshUnitData()
                  }
                  setCreatingUnit(false)
                }} />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {unit.resources?.length ? <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-2">
              {unit.resources.map(resource => <>
                <AdminResourceItem key={resource.id} resource={resource} onDelete={async () => {
                  const result = await deleteResource(resource.id)
                  if (result) await refreshUnitData()
                }} />
              </>)}
            </ul>
              : 'No Resources'}
          </CardContent>
        </Card>
      </div>
    </>}
  </>)
}