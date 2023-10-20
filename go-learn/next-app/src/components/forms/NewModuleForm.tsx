'use client'

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TModule } from "@/lib/types"
import { Textarea } from "../ui/textarea"
import { cn } from "@/lib/utils"

type NewModuleFormProps = {
  className?: string
  submitModule?: (module: TModule) => Promise<any>
  disabled?: boolean
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'You need to provide a title for the module' }),
  description: z.ostring(),
  websiteURL: z.ostring(),
})


const NewModuleForm = ({ className, submitModule, disabled }: NewModuleFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      websiteURL: '',
    },
  })

  return (<>
    <Form {...form}>
      <form onSubmit={
        form.handleSubmit((values) => { submitModule?.(values as TModule) })} className={cn(className, "max-w-[50rem] flex flex-col gap-[1rem]")}>
        {/* Module 'title' input */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} disabled={disabled} />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Modules's 'description' input */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="description"
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        {/* Module 'websiteURL' input */}
        <FormField
          control={form.control}
          name="websiteURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>External link</FormLabel>
              <FormControl>
                <Input placeholder="website url" {...field} disabled={disabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        <Button type="submit" className="w-full" disabled={disabled}>Create module</Button>
      </form>
    </Form>
  </>)
}

export default NewModuleForm