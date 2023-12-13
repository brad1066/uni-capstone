import Link from 'next/link'

export default function NoAccessNotice() {
  return <>
    Sorry, but you cannot access this resource. <Link href='/'>Go Home</Link>
  </>
}