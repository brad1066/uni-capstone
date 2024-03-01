'use client'

import { getResources, getUnitResources } from '@/actions/resourceActions'
import { Resource } from '~/prisma/generated/client'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { ResourcesSelectCombobox } from './ResourcesSelectCombobox'

type AddExistingResourceFormProps = {
  unitId: string,
  ignoreList?: string[],
  onSave: (resource: Resource) => void
}

const formSchema = z.object({
  resource: z.coerce.string().min(0, 'You need to select a resource')
})

export function AddExistingResourceForm({ onSave, unitId, ignoreList }: AddExistingResourceFormProps) {
  const [resource, setResource] = useState<Resource>()
  const [resources, setResources] = useState<Resource[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resource: ''
    }
  })

  useEffect(() => {
    (async () => {
      const resources = unitId ? await getUnitResources(unitId) : await getResources()
      if (!resources) return
      setResources(resources)
    })()
  }, [unitId])

  return (
    <Form {...form}>
      <form target='' onSubmit={(e) => { e.preventDefault(); resource && onSave?.(resource) }}>
        <FormField
          control={form.control}
          name='resource'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resource</FormLabel>
              <FormControl>
                <ResourcesSelectCombobox unitId={unitId} ignoreList={ignoreList} value={field.value} setValue={(prevState) => {
                  field.onChange(prevState)
                  if (prevState == '') return
                  const filteredResources = resources.filter(_resource => _resource.id == prevState)
                  if (filteredResources.length == 0) return
                  setResource(filteredResources[0])
                }} />
              </FormControl>
            </FormItem>
          )} />
        <Button type='submit' className='w-full' >Set Resource</Button>
      </form>
    </Form>

  )
}