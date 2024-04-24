import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/ui/Header'
import PageWrapper from '@/lib/PageWrapper'
import { Toaster } from '@/components/ui/toaster'
import { ReactNode, Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GoLearn',
  description: 'Learning Resources Manager for Teachers and their Students',
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className + ' min-h-screen'}>
        <PageWrapper>
          <Header />
          <main className='flex flex-col items-center px-6 md:px-24 min-h-[100%]'>
            <Suspense>
              {children}
            </Suspense>
          </main>
          <Toaster />
        </PageWrapper>
      </body>
    </html>
  )
}
