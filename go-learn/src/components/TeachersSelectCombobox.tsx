/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { getTeachers } from '@/actions/teacherActions'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command'
import { cn } from '@/lib/utils'

type TeachersSelectComboboxProps = {
  value: number
  setValue: (prevState: number) => void
  exclusions?: number[]
}

export function TeachersSelectCombobox({ value, setValue, exclusions }: TeachersSelectComboboxProps) {
  const [open, setOpen] = useState(false)
  const [teachers, setTeachers] = useState<{ id: number, value: string, label: string }[]>()

  useEffect(() => {
    (async () => {
      // Get teachers, filter out teachers with ids in filterIds, and map to { id, value, label }
      const teachers = await getTeachers(['user'])
        .then((teachers) => teachers.filter(teacher => !exclusions?.includes(teacher.id)))
        .then(teachers => teachers.map(teacher => ({ id: teacher.id, value: teacher.id.toString(), label: `${teacher?.user?.forename} ${teacher?.user?.surname}` })))

      // Set teachers with a default value of -1
      setTeachers([{ id: -1, label: 'Select a teacher', value: '-1' }, ...teachers])
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
            ? teachers?.find((teacher) => teacher.id === value)?.label
            : 'Select teacher...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[100%] p-0">
        <Command>
          <CommandInput placeholder="Search teachers..." />
          <CommandEmpty>No teacher found.</CommandEmpty>
          <CommandGroup>
            {teachers?.map((teacher) => (
              <CommandItem
                key={teacher.id}
                value={teacher.value}
                onSelect={(currentValue: string) => {
                  const currentId = teachers.find(teacher => teacher.value == currentValue)?.id
                  setValue(teacher.id === value ? -1 : currentId ?? -1)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === teacher.id ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {teacher.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
