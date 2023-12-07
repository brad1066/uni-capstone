import { cn } from "@/lib/utils"
import { Module } from "@prisma/client"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"

type EditModuleFormProps = {
  module: Module
  onUpdateSave?: (module: Omit<Module, 'id'>) => void
  className?: string
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'You need to provide a title for the module' }),
  description: z.ostring(),
  websiteURL: z.ostring(),
})

export default function EditModuleForm({ module, onUpdateSave, className }: EditModuleFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: module.title,
      description: module.description || '',
      websiteURL: module.websiteURL || '',
    },
  })

  return (<>
    <Form {...form}>
      <form onSubmit={
        form.handleSubmit((values) => { onUpdateSave?.(values as Omit<Module, 'id'>) })} className={cn(className, "max-w-[50rem] flex flex-col gap-[1rem]")}>
        {/* Module 'title' input */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field}/>
              </FormControl>
            </FormItem>
          )}
        />
        {/* Contact's 'description' input */}
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
                <Input placeholder="website url" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        <Button type="submit" className="w-full">Create module</Button>
      </form>
    </Form >
  </>)
}