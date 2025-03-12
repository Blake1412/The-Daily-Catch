// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import VSCodeClassFixer from '../components/VSCodeClassFixer'

export const metadata: Metadata = {
  title: 'The Daily Catch',
  description: 'Find your next great fishing spot',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <VSCodeClassFixer />
        {children}
      </body>
    </html>
  )
}