import { cn, constructMetadata } from '@/lib/utils'
import { inter, sfPro } from '../fonts'
import './globals.css'
// import Nav from '@/components/layout/nav'
// import Footer from '@/components/layout/footer'
// import Providers from './providers'

export const metadata = constructMetadata()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={cn(sfPro.variable, inter.variable)}>
      <body>
        {/* <Providers>
          <Nav /> */}
        {/* <ProductHuntPopup /> */}
        <div className='w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100 py-16'>
          <div className='mx-auto min-h-screen w-full max-w-screen-md'>{children}</div>
        </div>
        {/* <Footer />
        </Providers> */}
      </body>
    </html>
  )
}
