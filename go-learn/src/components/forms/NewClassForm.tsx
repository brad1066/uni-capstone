'use client'

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TClass } from "@/lib/types"
import { Textarea } from "../ui/textarea"
import { cn } from "@/lib/utils"

type NewClassFormProps = {
  className?: string
  submitClass?: (_class: TClass) => Promise<any>
  disabled?: boolean
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'You need to provide a title for the _class' }),
})


const NewClassForm = ({ className, submitClass, disabled }: NewClassFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ''
    },
  })

  return (<>
    <Form {...form}>
      <form onSubmit={
        form.handleSubmit((values) => { submitClass?.(values as TClass) })} className={cn(className, "max-w-[50rem] flex gap-[1rem] flex-col")}>
        {/* Class 'title' input */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} disabled={disabled} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={disabled}>Create class</Button>
      </form>
    </Form >
  </>)
}

export default NewClassForm