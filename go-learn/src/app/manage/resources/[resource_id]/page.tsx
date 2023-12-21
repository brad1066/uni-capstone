'use client'

import { getResource, updateResource, updateResourceRemoveSection } from '@/actions/resourceActions'
import AdminUnitListItem from '@/components/admin/AdminUnitListItem'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DialogHeader } from '@/components/ui/dialog'
import { useAuth } from '@/hooks/useAuth'
import { Resource, Section, Unit, User } from '@prisma/client'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AdminSectionItem from '@/components/admin/AdminSectionItem'
import EditResourceForm from '@/components/forms/EditResourceForm'
import EditResourceContentForm from '@/components/forms/EditResourceContentForm'
import AddUploadForm from '@/components/forms/AddUploadForm'

type SingleResourceAdminPageProps = {
  params: {
    resource_id: string
  }
}

export default function SingleResourceAdminPage({ params: { resource_id } }: SingleResourceAdminPageProps) {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [resource, setResource] = useState<Resource & {
    unit?: Unit | null
    sections?: Section[] | null,
    author?: User | null
  }>()

  const [editingResource, setEditingResource] = useState<boolean>(false)
  const [editingContent, setEditingContent] = useState<boolean>(false)

  const refreshResourceData = async () => {
    if (user && resource_id) {
      const resource = await getResource(parseInt(resource_id), ['unit', 'sections'])
      if (resource) setResource(resource)
    }
  }

  useEffect(() => {
    (async () => {
      if (!user) await validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    (async () => {
      refreshResourceData()
      setLoading(false)
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, resource_id])

  return (<>
    {!loading && resource && <>
      <h1 className='mb-[2rem]'>{resource.title}</h1>
      <div className='flex gap-[2rem] w-full flex-col md:grid md:grid-cols-2 xl:grid-cols-3'>

        <Card>
          <CardHeader className='flex flex-row items-center gap-2 space-y-0'>
            <CardTitle>Information</CardTitle>
            {/* Editing basic resource data dialog */}
            <Dialog open={editingResource} onOpenChange={setEditingResource}>
              <DialogTrigger asChild><Button className='ml-auto'>Edit</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Edit Resource</DialogTitle></DialogHeader>
                <EditResourceForm resource={resource} onUpdateSave={updatedResource => {
                  updateResource(resource.id, { ...updatedResource } as Resource).then(async () => {
                    await refreshResourceData()
                  }).finally(() => {
                    setEditingResource(false)
                  })
                }} />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <div>
              <h2 className='text-lg font-bold'>Description</h2>
              <pre className='inline-block font-[inherit] whitespace-pre'>{resource.description || 'No Description'}</pre>
            </div>
            {resource?.unit && (
              <div>
                <h2 className='text-lg font-bold'>Unit</h2>
                <AdminUnitListItem unit={resource.unit} />
              </div>
            )}
            {resource?.sections?.length && resource?.sections?.length > 0 && (
              <div>
                <h2 className='text-lg font-bold flex'>Sections</h2>
                <div className='flex flex-col gap-2'>
                  {resource.sections.map(section => (
                    <AdminSectionItem key={section.id} section={section} onDelete={async () => {
                      await updateResourceRemoveSection(resource.id, section.id)
                      await refreshResourceData()
                    }} />
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className='w-full xl:col-span-2'>
          <CardHeader className='flex flex-row items-center gap-2 space-y-0'>
            <CardTitle>Content</CardTitle>
            <Dialog open={editingContent} onOpenChange={setEditingContent}>
              <DialogTrigger asChild><Button className='ml-auto'>Edit</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Edit content</DialogTitle></DialogHeader>
                <EditResourceContentForm resource={resource} onUpdateSave={async (content) => {
                  const newResource = await updateResource(resource.id, { ...resource, content } as Resource)
                  console.log(newResource)
                  await refreshResourceData()
                }} />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <pre className='inline-block font-[inherit] whitespace-pre'>{resource.content || 'No Content'}</pre>
          </CardContent>
        </Card>
        <Card className='w-full xl:col-span-3'>
          <CardHeader className='flex flex-row items-center gap-2 space-y-0 justify-between'>
            <CardTitle>Uploads</CardTitle>
            <div className='flex gap-2'>
              <Dialog>
                <DialogTrigger asChild><Button className='ml-auto'>Add Upload</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Add Upload</DialogTitle></DialogHeader>
                  <AddUploadForm onUploadSave={async () => {
                    await refreshResourceData()
                  }} />
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className='flex flex-col xl:grid xl:grid-cols-2 gap-4'>
            {resource.uploads?.length === 0 && <p>No Uploads</p>}
            {resource.uploads?.map(upload => (
              <>{upload}</>
            ))}
          </CardContent>
        </Card>
      </div>
    </>}
  </>)
}