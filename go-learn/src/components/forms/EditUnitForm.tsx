import { cn } from "@/lib/utils"
import { Unit } from "@prisma/client"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"

type EditUnitFormProps = {
  unit: Unit
  onUpdateSave?: (unit: Omit<Unit, 'id'>) => void
  className?: string
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'You need to provide a title for the unit' }),
  description: z.ostring(),
})

export default function EditUnitForm({ unit, onUpdateSave, className }: EditUnitFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: unit.title,
      description: unit.description || '',
    },
  })

  return (<>
    <Form {...form}>
      <form onSubmit={
        form.handleSubmit((values) => { onUpdateSave?.(values as Omit<Unit, 'id'>) })} className={cn(className, "max-w-[50rem] flex flex-col gap-[1rem]")}>
        {/* Unit 'title' input */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit Title</FormLabel>
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
        {/* Unit 'websiteURL' input */}
        <Button type="submit" className="w-full">Update unit</Button>
      </form>
    </Form >
  </>)
}