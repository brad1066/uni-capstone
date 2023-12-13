import { Resource } from '@prisma/client'
import { Card, CardHeader } from './ui/card'
import { cn } from '@/lib/utils'

type ResourcesCardItemProps = {
    resource: Resource
    className?: string
    onClick?: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export default function ResourcesCardItem({resource, className, onClick}:ResourcesCardItemProps) {
  return <Card onClick={onClick} className={cn(className)}>
    <CardHeader className="flex flex-row justify-between">{resource.title} <span className="text-[#666] dark:text-[#aaa]">#{resource.id}</span></CardHeader>
  </Card>
}