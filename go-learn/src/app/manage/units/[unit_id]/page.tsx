
'use client'

import { createResource, deleteResource } from '@/actions/resourceActions'
import { createSection, deleteSection } from '@/actions/sectionActions'
import { getUnit, updateUnit } from '@/actions/unitActions'
import NoAccessNotice from '@/components/ui/NoAccessNotice'
import ModuleItem from '@/components/item-cards/ModuleItem'
import ResourceItem from '@/components/item-cards/ResourceItem'
import SectionItem from '@/components/item-cards/SectionItem'
import EditUnitForm from '@/components/forms/EditUnitForm'
import NewResourceForm from '@/components/forms/NewResourceForm'
import NewSectionForm from '@/components/forms/NewSectionForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAuth } from '@/hooks/useAuth'
import { Unit, Module, Resource, Section } from './../../prisma/generated/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type SingleUnitManagePageProps = {
  params: { unit_id: string }
}

export default function SingleUnitManagePage({ params: { unit_id } }: SingleUnitManagePageProps) {

  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [unit, setUnit] = useState<Unit & {
    module?: Module | null
    resources?: Resource[] | null
    sections?: Section[] | null
  }>()

  const [creatingResource, setCreatingResource] = useState<boolean>(false)
  const [creatingSection, setCreatingSection] = useState<boolean>(false)

  const refreshUnitData = async () => {
    user && unit_id && getUnit(unit_id, ['module', 'resources', 'sections'])
      .then(unit => unit && setUnit(unit))
  }

  useEffect(() => {
    !user && validateLoggedIn?.()
      .then(({ loggedIn }) => !loggedIn && router.replace('/login'))
  }, [])

  useEffect(() => {
    refreshUnitData()
      .then(() => setLoading(false))
  }, [user, unit_id])

  return (<>
    {!loading && !(user?.role == 'admin' || user?.role == 'teacher') && <NoAccessNotice />}
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
                <EditUnitForm
                  unit={unit}
                  onUpdateSave={updatedUnit => {
                    updateUnit({ id: unit.id, ...updatedUnit })
                      .then(async () => refreshUnitData)
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
                  <ModuleItem editable module={unit.module as Module} />
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
                <NewSectionForm
                  unitId={unit.id}
                  onSubmit={async (section: Section) => {
                    unit && createSection(section)
                      .then(async () => await refreshUnitData())
                      .finally(() => setCreatingResource(false))
                  }} />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {unit.sections?.length ? <ul className="flex flex-col gap-2">
              {unit.sections.map(section => <>
                <SectionItem
                  key={section.id}
                  section={section}
                  editable
                  onDelete={async () => deleteSection(section.id)
                    .then(result => result && refreshUnitData())
                  } />
              </>)}
            </ul>
              : 'No Sections'}
          </CardContent>
        </Card>

        {/* Resources Card */}
        <Card className="w-full xl:col-span-2">
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <CardTitle>Resources</CardTitle>
            {/* Add Unit Dialog */}
            <Dialog open={creatingResource} onOpenChange={setCreatingResource}>
              <DialogTrigger asChild><Button className="ml-auto">New Resource</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>New Resource</DialogTitle></DialogHeader>
                <NewResourceForm unitId={unit.id} onSubmit={async (resource: Resource) => {
                  unit && createResource(resource)
                    .then(async () => await refreshUnitData())
                    .finally(() => setCreatingResource(false))
                }} />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {unit.resources?.length ? <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-2">
              {unit.resources.map(resource => <>
                <ResourceItem editable key={resource.id} resource={resource} onDelete={async () => {
                  deleteResource(resource.id)
                    .then(result => result && refreshUnitData())
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