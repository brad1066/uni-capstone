'use client'

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TCourse } from "@/lib/types"
import { Textarea } from "../ui/textarea"
import { cn } from "@/lib/utils"

type NewCourseFormProps = {
  className?: string
  submitCourse?: (course: TCourse) => Promise<any>
  disabled?: boolean
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'You need to provide a title for the course' }),
  description: z.ostring(),
  websiteURL: z.ostring(),
})


const NewCourseForm = ({ className, submitCourse, disabled }: NewCourseFormProps) => {
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
        form.handleSubmit((values) => { submitCourse?.(values as TCourse) })} className={cn(className, "max-w-[50rem]")}>
        <Card className="mx-auto">
          <CardHeader className="text-2xl">General Data</CardHeader>
          <CardContent className="flex flex-col gap-[1rem]">
            {/* Course 'title' input */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} disabled={disabled} />
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
            {/* Course 'websiteURL' input */}
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

          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={disabled}>Create course</Button>
          </CardFooter>
        </Card>
      </form>
    </Form >
  </>)
}

export default NewCourseForm