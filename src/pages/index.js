// import AccentTitle from '@/components/AccentTitle';
import ArrowLink from '@/components/ArrowLink';
import Logo from '@/components/Logo';
import { useAppContext } from '@/utils/appContext';
import { PageWrapper } from '@/utils/pageContext';
import Head from 'next/head'

export default function Home() {
  let { width, locale } = useAppContext()
  let pageMobile = width < 648;
  let darkMode = true

  return (
    <>
      <Head>
        <title>Photography</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={' bg-gradient-to-br from-darkGrey to-[#070013] '}>
        <PageWrapper darkMode={darkMode}>
          <div className='relative w-full h-screen'>
            {/* <div className='absolute w-full h-full'> */}
            <Logo darkMode={darkMode} className='w-1/4 absolute left-1/2 top-1/2 -translate-x-[55%] -translate-y-1/2 ' />
            {/* </div> */}

            <div className='flex gap-24 justify-center top-2/3 absolute w-full'>
              <ArrowLink className='ml-6' text='To the gallery' to='/gallery' />
              <ArrowLink className='ml-6' text='To the contact page ' to='/contact' />
            </div>
          </div>
        </PageWrapper>
      </main>
    </>
  )
}
