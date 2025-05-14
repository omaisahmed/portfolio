import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token
  },
  pages: {
    signIn: '/login',
    error: '/login' // Add error page redirection
  }
})

export const config = {
  matcher: ['/dashboard/:path*']
}