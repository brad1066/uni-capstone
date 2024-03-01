'use client'

import { getResource, updateResource, updateResourceRemoveSection } from '@/actions/resourceActions'
import UnitItem from '@/components/item-cards/UnitItem'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DialogHeader } from '@/components/ui/dialog'
import { useAuth } from '@/hooks/useAuth'
import { Resource, Section, Unit, Upload, User } from '~/prisma/generated/client'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import SectionItem from '@/components/item-cards/SectionItem'
import EditResourceForm from '@/components/forms/EditResourceForm'
import EditResourceContentForm from '@/components/forms/EditResourceContentForm'
import AddUploadForm from '@/components/forms/AddUploadForm'
import ReactMarkdown from 'react-markdown'
import MarkdownLink from '@/components/markdownWrappers/MarkdownLink'
import { useSupabase } from '@/hooks/useSupabase'
import UploadItem from '@/components/item-cards/UploadItem'
import { createUpload, deleteUpload } from '@/actions/uploadActions'
import NoAccessNotice from '@/components/ui/NoAccessNotice'

type SingleResourceManagePageProps = {
  params: {
    resource_id: string
  }
}

export default function SingleResourceManagePage({ params: { resource_id } }: SingleResourceManagePageProps) {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const { supabase } = useSupabase()

  const [loading, setLoading] = useState(true)
  const [resource, setResource] = useState<Resource & {
    unit?: Unit | null
    sections?: Section[] | null,
    author?: User | null,
    uploads?: Upload[] | null
  }>()

  const [editingResource, setEditingResource] = useState<boolean>(false)
  const [editingContent, setEditingContent] = useState<boolean>(false)
  const [creatingUpload, setCreatingUpload] = useState<boolean>(false)

  const refreshResourceData = async () => {
    user && resource_id && getResource(resource_id, ['unit', 'sections', 'uploads', 'author'])
      .then(resource => resource && setResource(resource))
  }
  useEffect(() => {
    !user && validateLoggedIn?.()
      .then(({ loggedIn }) => !loggedIn && router.replace('/login'))
  }, [])

  useEffect(() => {
    user && resource_id && refreshResourceData()
      .then(() => setLoading(false))
  }, [user, resource_id])

  return (<>
    {!loading && !(user?.role == 'admin' || user?.role == 'teacher') && <>
      <NoAccessNotice />
    </>}
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
                <EditResourceForm
                  resource={resource}
                  onUpdateSave={updatedResource => {
                    updateResource(resource.id, { ...updatedResource } as Resource)
                      .then(async () => await refreshResourceData())
                      .finally(() => setEditingResource(false))
                  }} />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <div>
              <h2 className='text-lg font-bold'>Description</h2>
              <pre className='inline-block font-[inherit] whitespace-normal'>{resource.description || 'No Description'}</pre>
            </div>
            {resource?.unit && (
              <div>
                <h2 className='text-lg font-bold'>Unit</h2>
                <UnitItem editable unit={resource.unit} />
              </div>
            )}
            {!!resource?.sections?.length && (
              <div>
                <h2 className='text-lg font-bold flex'>Sections</h2>
                <div className='flex flex-col gap-2'>
                  {resource.sections.map(section => (
                    <SectionItem
                      key={section.id}
                      section={section}
                      editable
                      onDelete={async () => {
                        updateResourceRemoveSection(resource.id, section.id)
                          .then(refreshResourceData)
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
                <EditResourceContentForm
                  resource={resource}
                  onUpdateSave={async (content) => {
                    content && updateResource(resource.id, { ...resource, content } as Resource)
                      .then(refreshResourceData)
                  }} />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <ReactMarkdown
              components={{
                a: MarkdownLink
              }}>
              {resource.content || '# No Content'}
            </ReactMarkdown>
          </CardContent>
        </Card>
        <Card className='w-full xl:col-span-3'>
          <CardHeader className='flex flex-row items-center gap-2 space-y-0 justify-between'>
            <CardTitle>Uploads</CardTitle>
            {/* Commented out until time to implement, but fully stocked to deal with the form being developed */}
            <div className='flex gap-2'>
              <Dialog open={creatingUpload} onOpenChange={setCreatingUpload}>
                <DialogTrigger asChild>
                  <Button className='ml-auto' >Add Upload</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Add Upload</DialogTitle></DialogHeader>
                  <AddUploadForm onUploadSave={async (file: File) => {
                    if (!file) { return }

                    const { error, data } = await supabase.storage
                      .from('golearn-resources')
                      .upload(`${resource.id}/${file.name}`, file)

                    if (error) {
                      console.error(error)
                      return
                    }
                    const { path } = data
                    const publicURL = supabase.storage.from('golearn-resources').getPublicUrl(data.path).data.publicUrl
                    createUpload({ title: file.name, publicURL, path, resourceId: resource.id } as Upload)
                      .then(async () => await refreshResourceData())
                      .then(() => setCreatingUpload(false))
                  }} />
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className='flex flex-row gap-4'>
            {resource.uploads?.length === 0 && <p>No Uploads</p>}
            {resource.uploads?.map(upload => (
              <UploadItem
                key={upload.id}
                className='w-fit'
                upload={upload}
                onDelete={async () => {
                  supabase.storage.from('golearn-resources').remove([upload.path])
                    .then(({ data }) => {
                      data && deleteUpload(upload.id)
                        .then(upload => upload && refreshResourceData())
                    })
                }} />
            ))}
          </CardContent>
        </Card>
      </div>
    </>}
  </>)
}