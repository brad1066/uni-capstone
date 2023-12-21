/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { createResource } from '@/actions/resourceActions'
import { getSection, updateSection, updateSectionAddResource, updateSectionRemoveResource } from '@/actions/sectionActions'
import AdminResourceItem from '@/components/admin/AdminResourceItem'
import AdminUnitListItem from '@/components/admin/AdminUnitListItem'
import { AddExistingResourceForm } from '@/components/forms/AddExistingResourceForm'
import EditSectionForm from '@/components/forms/EditSectionForm'
import NewResourceForm from '@/components/forms/NewResourceForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAuth } from '@/hooks/useAuth'
import { Resource, Section, Unit, User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type SingleSectionAdminPageProps = {
  params: { section_id: string }
}

export default function SingleSectionAdminPage({ params: { section_id } }: SingleSectionAdminPageProps) {

  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [section, setSection] = useState<Section & {
    unit?: Unit | null
    resources?: Resource[] | null
    author?: User | null
  }>()

  const [editingSection, setEditingSection] = useState<boolean>(false)
  const [addingResource, setAddingResource] = useState<boolean>(false)
  const [creatingResource, setCreatingResource] = useState<boolean>(false)

  const refreshSectionData = async () => {
    if (user && section_id) {
      const section = await getSection(parseInt(section_id), ['unit', 'resources'])
      if (section) setSection(section)
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
      refreshSectionData()
      setLoading(false)
    })()
  }, [user, section_id])

  return (<>
    {!loading && section && <>
      <h1 className="mb-[2rem]">{section.title}</h1>
      <div className="flex gap-[2rem] w-full flex-col md:grid md:grid-cols-2 xl:grid-cols-3">

        <Card>
          <CardHeader className='flex flex-row items-center gap-2 space-y-0'>
            <CardTitle>Information</CardTitle>
            <Dialog open={editingSection} onOpenChange={setEditingSection}>
              <DialogTrigger asChild><Button className="ml-auto">Edit</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Edit Module</DialogTitle></DialogHeader>
                <EditSectionForm section={section} onUpdateSave={updatedSection => {
                  updateSection({ id: section.id, ...updatedSection } as Section).then(async () => {
                    await refreshSectionData()

                  }).finally(() => {
                    setEditingSection(false)
                  })
                }} />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <div>
              <h2 className="text-lg font-bold">Description</h2>
              <pre className="inline-block font-[inherit] whitespace-pre">{section.description || 'No Description'}</pre>
            </div>
            {section?.unit && (
              <div>
                <h2 className="text-lg font-bold">Unit</h2>
                <AdminUnitListItem unit={section.unit} />
              </div>
            )}
          </CardContent>
        </Card>
        <Card className='w-full xl:col-span-2'>
          <CardHeader className='flex flex-row items-center gap-2 space-y-0 justify-between'>
            <CardTitle>Resources</CardTitle>
            <div className='flex gap-2'>
              {/* Add Resource Button and Dialog */}
              <Dialog open={addingResource} onOpenChange={setAddingResource}>
                <DialogTrigger asChild><Button className="ml-auto">Add</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Add existing resource</DialogTitle></DialogHeader>
                  <AddExistingResourceForm ignoreList={section.resources?.map(resource => resource.id)} unitId={section.unitId} onSave={async (resource) => {
                    console.dir(resource)
                    resource.authorUsername = user?.username || ''
                    const newResource = await updateSectionAddResource(section.id, resource.id)
                    if (newResource)
                      await refreshSectionData()
                    setAddingResource(false)
                  }} />
                </DialogContent>
              </Dialog>
              {/* New Resource Button and Dialog */}
              <Dialog open={creatingResource} onOpenChange={setCreatingResource}>
                <DialogTrigger asChild><Button className="ml-auto">New</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Add new resource</DialogTitle></DialogHeader>
                  <NewResourceForm unitId={section.unitId} onSubmit={async (resource) => {
                    console.dir(resource)
                    resource.authorUsername = user?.username || ''
                    const newResource = await createResource(resource, section.id)
                    if (newResource)
                      await refreshSectionData()
                    setCreatingResource(false)
                  }} />
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col xl:grid xl:grid-cols-2 gap-4">
            {section.resources?.length === 0 && <p>No resources</p>}
            {section.resources?.map(resource => (
              <AdminResourceItem key={resource.id} resource={resource} onDelete={async () => {
                const result = await updateSectionRemoveResource(section.id, resource.id)
                await refreshSectionData()
              }} />
            ))}
          </CardContent>
        </Card>
      </div>
    </>}
  </>)
}