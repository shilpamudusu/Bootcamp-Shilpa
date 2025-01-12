import './globals.css'
import { Inter } from 'next/font/google'
import { getServerSession } from "next-auth/next"
import SessionProvider from "@/components/SessionProvider"
import { initDb } from '@/lib/db'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Annotatable Widgets Example',
  description: 'An example of using annotatable widgets with NextAuth and SQLite',
}

initDb() // Initialize the database

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}

