import './globals.css'

export const metadata = {
  title: 'Happy Birthday',
  description: 'A special birthday celebration',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}