/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { getSection, updateSection } from '@/actions/sectionActions'
import AdminUnitListItem from '@/components/admin/AdminUnitListItem'
import EditSectionForm from '@/components/forms/EditSectionForm'
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
          <CardHeader>
            <CardTitle>Information</CardTitle>
            <Dialog>
              <DialogTrigger asChild><Button className="ml-auto">Edit</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Edit Module</DialogTitle></DialogHeader>
                <EditSectionForm section={section} onUpdateSave={updatedSection => {
                  updateSection(updatedSection).then(async () => {
                    await refreshSectionData()
                  })
                }} />
              </DialogContent>
            </Dialog></CardHeader>
          <CardContent>
            {section.unit && <AdminUnitListItem unit={section.unit} />}
          </CardContent>
        </Card>
      </div>
    </>}
  </>)
}