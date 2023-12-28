
import { Tooltip } from '@radix-ui/react-tooltip'
import Link from 'next/link'
import React, { AnchorHTMLAttributes, ClassAttributes } from 'react'
import { TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { ExtraProps } from 'react-markdown'

const MarkdownLink = ({ href, children }: ClassAttributes<HTMLAnchorElement> & AnchorHTMLAttributes<HTMLAnchorElement> & ExtraProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild><Link href={href ?? ''}> {children} </Link></TooltipTrigger>
      <TooltipContent sideOffset={5} side="top" align="center">
        {href}
      </TooltipContent>
    </Tooltip>
    
  )
}

export default MarkdownLink