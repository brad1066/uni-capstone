'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const NotFoundPage = () => {
  const router = useRouter()

  return (<>
    <h1>404 Page not found</h1>
    The page you are looking for does not exist.
    <Button className="my-2" onClick={() => router.push('/')}>Go home</Button> or
    <Button className="my-2" onClick={router.back}>Go back</Button>
  </>)
}

export default NotFoundPage