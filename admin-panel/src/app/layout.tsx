// src/app/layout.tsx
import '../styles/globals.css' // Fixed import path
import type { Metadata } from 'next'

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
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}