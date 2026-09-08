import './globals.css'

export const metadata = {
  title: 'HY Watches',
  description: 'Precision Without Compromise',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black">{children}</body>
    </html>
  )
}