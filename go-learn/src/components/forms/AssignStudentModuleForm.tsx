"use client"

import { getModules } from "@/actions/moduleActions"
import { Module, Student } from "@prisma/client"
import { useEffect, useState } from "react"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { ModulesSelectCombobox } from "../ModulesSelectCombobox"

type AssignStudentModuleFormProps = {
  student: Student,
  exclude?: number[],
  onSave: (module: Module) => void
}

const formSchema = z.object({
  module: z.coerce.number().min(0, "You need to select a module")
})

export function AssignStudentModuleForm({ student, exclude: modExclusions, onSave }: AssignStudentModuleFormProps) {
  const [module, setModule] = useState<Module>()
  const [modules, setModules] = useState<Module[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      module: -1
    }
  })

  useEffect(() => {
    (async () => {
      let modules = await getModules()
      setModules(modules)
      form.resetField("module")
    })()
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={(e) => { e.preventDefault(); module && onSave?.(module); }}>
        <FormField
          control={form.control}
          name="module"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module</FormLabel>
              <FormControl>
                <ModulesSelectCombobox value={field.value} setValue={(prevState) => {
                  field.onChange(prevState)
                  if (prevState <= 0) return
                  const filteredModules = modules.filter(_module => _module.id == prevState)
                  if (filteredModules.length == 0) return
                  setModule(filteredModules[0])
                }} exclusions={modExclusions} />
              </FormControl>
            </FormItem>
          )} />
        <Button type="submit" className="w-full" >Set Module</Button>
      </form>
    </Form>

  )
}