import { Metadata } from 'next'
import AuthProvider from '@/components/providers/SessionProvider'
import './globals.css'

export const metadata: Metadata = {
  title: "Omais Ahmed - Portfolio",
  description: "An enthusiastic Web Developer having strengths in Management, Public dealing & grasp new ideas and keen to achieve further professional development.",
  keywords: "omais ahmed portfolio, omais ahmed github, omais portfolio, omais github, omaisahmed github, omais resume, omais developer, omais laravel developer, omais frontend developer, omais backend developer",
  viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
  icons: {
    icon: 'assets/images/favicon.png'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>
      </head>
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
