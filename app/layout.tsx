import { AuthProvider } from '../contexts/AuthContext'
import './globals.css'

export const metadata = {
  title: 'UGC Builder - AI Video Platform',
  description: 'Create authentic UGC videos with AI',
}

export default function RootLayout({ children } : any) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}