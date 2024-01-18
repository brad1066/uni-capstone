
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
import { getModules } from '@/actions/moduleActions'

export function ModulesSelectCombobox({ value, setValue, exclusions, unassignedOnly }: { value: string, setValue: (prevState: string) => void, exclusions?: string[], unassignedOnly?: boolean }) {
  const [open, setOpen] = useState(false)
  const [modules, setModules] = useState<{ id: string, value: string, label: string }[]>()

  useEffect(() => {
    (async () => {
      // Get modules, filter out modules with ids in filterIds, and map to { id, value, label }
      const modules = await getModules()
        .then((modules) => modules.filter(module => !exclusions?.includes(module.id) && (unassignedOnly ? module.courseId === null : true)))
        .then(modules => modules.map(module => ({ id: module.id, value: module.id.toString(), label: module.title })))

      // Set modules with a default value of -1
      setModules([{ id: '', label: 'Select a module', value: '-1' }, ...modules])
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
            ? modules?.find((module) => module.id === value)?.label
            : 'Select module...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[100%] p-0">
        <Command>
          <CommandInput placeholder="Search modules..." />
          <CommandEmpty>No module found.</CommandEmpty>
          <CommandGroup>
            {modules?.map((module) => (
              <CommandItem
                key={module.id}
                value={module.value}
                onSelect={(currentValue: string) => {
                  const currentId = modules.find(module => module.value == currentValue)?.id
                  setValue(module.id === value ? '' : currentId ?? '')
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === module.id ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {module.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
