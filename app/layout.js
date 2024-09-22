import './globals.css'
import { Providers } from './globalRedux/Provider'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Aurora: your collaborative platform',
  description: 'created by Ben Crypto',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="sm:text-[.8rem] md:text-[.9rem] bg-gray-100">
      <Providers >
        <Navbar /><br /><br /><br /><br />
        {children}
      </Providers >
      </body>
    </html>
  )
}
