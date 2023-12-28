/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useEffect, useState } from 'react'
import { getUnitResources } from '@/actions/resourceActions'

type ResourcesSelectComboboxProps = {
  ignoreList?: number[]
  unitId?: number
  value: number
  setValue: (prevState: number) => void
}

export function ResourcesSelectCombobox({ ignoreList, unitId, value, setValue }: ResourcesSelectComboboxProps) {
  const [open, setOpen] = useState(false)
  const [resources, setResources] = useState<{ id: number, value: string, label: string }[]>()

  useEffect(() => {
    (async () => {
      setResources(await getUnitResources(unitId ?? -1).then(vals => vals?.map(val => ({ id: val.id, value: val.title.toLowerCase(), label: val.title }))))
      setResources(resources => ([{ id: -1, label: 'Select a resource', value: '-1' }, ...(resources ?? []),]))
      setResources(resources => resources?.filter(resource => !ignoreList?.includes(resource.id)))
    })()
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[100%] justify-between"
        >
          {value
            ? resources?.find((resource) => resource.id === value)?.label
            : 'Select resource...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[100%] p-0">
        <Command>
          <CommandInput placeholder="Search resources..." />
          <CommandEmpty>No resource found.</CommandEmpty>
          <CommandGroup>
            {resources?.map((resource) => (
              <CommandItem
                key={resource.id}
                value={resource.value}
                onSelect={(currentValue: string) => {
                  const currentId = resources.find(resource => resource.value == currentValue)?.id
                  setValue(resource.id === value ? -1 : currentId ?? -1)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === resource.id ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {resource.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
