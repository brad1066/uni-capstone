import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/ui/Header'
import PageWrapper from '@/lib/PageWrapper'

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
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <PageWrapper>
        <body className={inter.className + ' min-h-screen'}>
          <Header />
          <main className='flex flex-col items-center px-24 min-h-[100%]'>
            {children}
          </main>
        </body>
      </PageWrapper>
    </html>
  )
}
