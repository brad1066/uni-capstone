import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/ui/Header'
import PageWrapper from '@/lib/PageWrapper'
import { TooltipProvider } from '@/components/ui/tooltip'
import { PrismaClient } from '@prisma/client'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GoLearn',
  description: 'Learning Resources Manager for Teachers and their Students',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const prismaClient = new PrismaClient()
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <TooltipProvider>
        <PageWrapper>
          <body className={inter.className + ' min-h-screen'}>
            <Header />
            <main className='flex flex-col items-center px-24 min-h-[100%]'>
              {children}
            </main>
          </body>
        </PageWrapper>
      </TooltipProvider>
    </html>
  )
}
