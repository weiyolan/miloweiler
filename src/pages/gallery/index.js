import ArrowLink from '@/components/ArrowLink';
import Logo from '@/components/Logo';
import ProjectThumb from '@/components/ProjectThumb';
import { useAppContext } from '@/utils/appContext';
import { PageWrapper } from '@/utils/pageContext';
import Head from 'next/head';
import React from 'react'
import client from '../../../lib/sanity'

export default function Gallery({projects}) {
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
      <main className={'bg-gradient-to-br from-darkGrey to-[#070013] w-full h-screen'}>
        <PageWrapper darkMode={darkMode}>
          <Logo darkMode={darkMode} className='w-1/4 absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-1/2 opacity-5' />
          <h1 className={`uppercase font-lora text-center text-3xl py-4 ${darkMode ? 'text-primary' : 'text-darkPrimary'}`}>Gallery</h1>

          <div className='w-full relative flex flex-wrap gap-1 justify-center'>
            {projects.map((project,i)=><ProjectThumb key={i} project={project}/>)}
            {projects.map((project,i)=><ProjectThumb key={i} project={project}/>)}
            {projects.map((project,i)=><ProjectThumb key={i} project={project}/>)}
            {projects.map((project,i)=><ProjectThumb key={i} project={project}/>)}
            {projects.map((project,i)=><ProjectThumb key={i} project={project}/>)}
          </div>




        </PageWrapper>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const projects = await client.fetch(`*[_type == "project"]`);
  return {
    props: {
      projects:projects
    }
  };
}