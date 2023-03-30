import Logo from "@/components/Logo";
import ProjectDescription from "@/components/ProjectDescription";
import { useAppContext } from "@/utils/appContext";
import { PageWrapper } from "@/utils/pageContext";
import Head from "next/head";
import Image from "next/image";
import React from "react"
import client from '../../../lib/sanity'
import { FaTimes } from 'react-icons/fa'
import Link from "next/link";
import ProjectPictures from "@/components/ProjectPictures";
export default function Project({ project, slugs }) {
  // console.log(project.date)
  let darkMode = true

  return (
    <>
      <Head>
        <title>Photography</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`bg-gradient-to-br from-darkGrey to-[#070013] w-full h-screen overflow-hidden ${darkMode ? 'text-primary' : 'text-darkPrimary'}`}>
        <PageWrapper darkMode={darkMode}>

          <div className={`relative w-[93%] xl:w-[95] max-w-[1700px] rounded-3xl h-[93%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden 
          before:absolute before:w-full before:h-full before:top-0 before:left-0 before:rounded-3xl before:shadow-inner-3xl before:shadow-black/60 before:z-[1]`}>

            <div className={`w-full h-full absolute`}>
              <Image fill style={{ objectFit: 'cover', objectPosition: 'center' }} src='/images/projectBackground.jpg' alt='' priority quality={100} />
            </div>

            <Logo darkMode={darkMode} className='w-1/4 absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-1/2 opacity-10' />

            <div className="relative w-full h-full z-10">
              <ProjectDescription project={project} />

              {/* <ProjectBigPicture/> */}
              <ProjectPictures images={project.otherImages}/>
            </div>
          </div>
          <Link href='/gallery'>
            <FaTimes className="absolute z-10 w-6 h-6 top-10 right-4 hover:scale-110 " />
          </Link>
        </PageWrapper>
      </main>
    </>
  )
}

export async function getStaticPaths() {
  const projects = await client.fetch(`*[_type == "project"]{slug}`);
  const paths = projects.map((project) => {
    return {
      params: { slug: project.slug.current },
    }
  })
  // let paths = [{params:{slug:'project-1'}}]
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params }) {
  const project = await client.fetch(`*[_type == "project" && slug.current == "${params.slug}"][0]`);
  const projectSlugs = await client.fetch(`*[_type == "project"]|order(date){slug}`);
  const slugNames = projectSlugs.map((projectSlug) => projectSlug.slug.current);
  return {
    props: { project, slugs: slugNames },
  }
}