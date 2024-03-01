'use client'

import { Resource, User } from './../../prisma/generated/client'
import { Card, CardContent, CardHeader } from './ui/card'
import { useEffect, useState } from 'react'
import { getResources } from '@/actions/resourceActions'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { ScrollArea } from './ui/scroll-area'
import ResourceItem from './item-cards/ResourceItem'

type ResourcesAuthoredCardProps = {
  author: User
  noHeader?: boolean
  className?: string
}

export default function ResourcesAuthoredCard({ author, className, noHeader }: ResourcesAuthoredCardProps) {
  const [resources, setResources] = useState<Resource[]>([])
  const router = useRouter()

  useEffect(() => {
    (async () => {
      author && await setResources(await getResources(author.username ?? '') ?? [])
    })()
  }, [author])

  return (
    <Card className={cn(className)}>
      {!noHeader && <CardHeader>Resources</CardHeader>}
      <CardContent>
        <ScrollArea className='height-[100%]'>
          {resources?.map?.((resource, idx) => <>
            {idx < 5 && <>
              <ResourceItem
                key={resource.id}
                resource={resource}
                onClick={() => { router.push(`/view/resources/${resource.id}`) }} />
            </>}
          </>)}
          {resources.length == 0 && 'No resources found'}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}