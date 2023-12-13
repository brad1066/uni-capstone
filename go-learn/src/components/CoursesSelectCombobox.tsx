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
import { getCourses } from '@/actions/courseActions'

export function CoursesSelectCombobox({value, setValue}: {value: number, setValue: (prevState: number) => void}) {
  const [open, setOpen] = useState(false)
  const [courses, setCourses] = useState<{id: number, value: string, label:string}[]>()

  useEffect(() => {
    (async () => {
      setCourses(await getCourses().then(vals => vals.map(val => ({id: val.id, value: val.title.toLowerCase(), label: val.title}))))
      setCourses(courses => ([{id: -1, label: 'Select a course', value:'-1'}, ...(courses ?? []), ]))
    })()
  })

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
            ? courses?.find((course) => course.id === value)?.label
            : 'Select course...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[100%] p-0">
        <Command>
          <CommandInput placeholder="Search courses..."/>
          <CommandEmpty>No course found.</CommandEmpty>
          <CommandGroup>
            {courses?.map((course) => (
              <CommandItem
                key={course.id}
                value={course.value}
                onSelect={(currentValue: string) => {
                  const currentId = courses.find(course => course.value == currentValue)?.id
                  setValue(course.id === value ? -1 : currentId ?? -1)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === course.id ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {course.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
