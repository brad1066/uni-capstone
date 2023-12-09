import { cn } from "@/lib/utils"
import { Course } from "@prisma/client"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"

type EditCourseFormProps = {
  course: Course
  onUpdateSave?: (course: Omit<Course, 'id'>) => void
  className?: string
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'You need to provide a title for the course' }),
  description: z.ostring(),
  websiteURL: z.ostring(),
})

export default function EditCourseForm({ course, onUpdateSave, className }: EditCourseFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title,
      description: course.description || '',
      websiteURL: course.websiteURL || '',
    },
  })

  return (<>
    <Form {...form}>
      <form onSubmit={
        form.handleSubmit((values) => { onUpdateSave?.(values as Omit<Course, 'id'>) })} className={cn(className, "max-w-[50rem] flex flex-col gap-[1rem]")}>
        {/* Course 'title' input */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Title</FormLabel>
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
        {/* Course 'websiteURL' input */}
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
        <Button type="submit" className="w-full">Update course</Button>
      </form>
    </Form >
  </>)
}