'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

const NotFoundPage = () => {
  const router = useRouter()

  return (<>
    <Button onClick={router.back}>Go back</Button>
  </>)
}

export default NotFoundPage