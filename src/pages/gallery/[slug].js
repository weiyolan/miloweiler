import Logo from "@/components/Logo";
import ProjectDescription from "@/components/ProjectDescription";
import { useAppContext } from "@/utils/appContext";
import { PageWrapper } from "@/utils/pageContext";
import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react"
import client from '../../../lib/sanity'
import { IoClose, IoArrowBack, IoArrowBackCircleOutline } from 'react-icons/io5'
import Link from "next/link";
import ProjectPictures from "@/components/ProjectPictures";
import ProjectPicture from "@/components/ProjectPicture";
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'

export default function Project({ project, slug, slugs }) {
  // console.log(project)
  let darkMode = true
  let [visibleItem, setVisibleItem] = useState([null])
  let [clicked, setClicked] = useState(false)
  let [descriptionOpen, setDescriptionOpen] = useState(false)


  useEffect(() => {
    let visibility = new Array(project.otherImages.length + 1).fill(false)
    visibility[0] = true
    setVisibleItem(visibility)
    setDescriptionOpen(false)
    // console.log(visibility)
  }, [project])
  // useEffect(() => {
  //   let interval = setInterval(() => {
  //     if (!clicked) { nextVisibility(visibleItem) }
  //   }, 4000)
  //   return () => clearInterval(interval)
  // }, [visibleItem, clicked])

  function handleVisibility(i) {
    // console.log(visibleItem)
    let newVisibility = new Array(visibleItem.length).fill(false);
    newVisibility[i] = true;
    setVisibleItem(newVisibility)
  }

  // function handleVisibility(newVal, i) {
  // if (newVal === true) {
  //   let newVisibility = new Array(qualities.length).fill(false);
  //   newVisibility[i] = newVal;
  //   setVisibleItem(newVisibility)
  // } 
  // else if (newVal === false) {
  //   randomVisibility(visibleItem)
  // }
  // }

  // function randomVisibility(visibleItems) {
  //   let currentItem = visibleItems.indexOf(true);
  //   let indexes = new Array(visibleItems.length).fill(0).map((val, i) => { return i })
  //   if (currentItem > -1) {
  //     indexes.splice(currentItem, 1);
  //   }
  //   let newIndex = indexes[Math.floor(Math.random() * indexes.length)];
  //   handleVisibility(true, newIndex)
  // }

  function nextVisibility() {
    let currentItem = visibleItem.indexOf(true);
    if (currentItem === -1) {
      // handleVisibility(true, 0) // Cannot hurt to provide safety against no visibility although should not happen apriori.
      handleVisibility(0) // Cannot hurt to provide safety against no visibility although should not happen apriori.
    } else {
      let nextItem = currentItem === visibleItem.length - 1 ? 0 : currentItem + 1;
      // handleVisibility(true, nextItem)
      handleVisibility(nextItem)
    }
  }

  function prevVisibility() {
    // console.log('prev')
    let currentItem = visibleItem.indexOf(true);
    if (currentItem === -1) {
      handleVisibility(0)
      // handleVisibility(true, 0)
    } else {
      let nextItem = currentItem === 0 ? visibleItem.length - 1 : currentItem - 1;
      handleVisibility(nextItem)
      // handleVisibility(true, nextItem)
    }
  }

  function prevSlug() {
    let currentItem = slugs.indexOf(slug);
    let nextItem = currentItem === 0 ? slugs.length - 1 : currentItem - 1;
    return slugs[nextItem]
    // console.log(slugs[nextItem])
  }
  function nextSlug() {
    let currentItem = slugs.indexOf(slug);
    let nextItem = currentItem === slugs.length - 1 ? 0 : currentItem + 1;
    return slugs[nextItem]
    // console.log(slugs[nextItem])
  }

  return (
    <>
      <Head>
        <title>Photography</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main tabIndex={0} className={`bg-gradient-to-br focus:outline-none from-darkGrey to-[#070013] w-full h-[100dvh] relative flex items-center justify-between overflow-hidden ${darkMode ? 'text-primary' : 'text-darkPrimary'}`}
        onKeyDown={(e) => {if (e.key === "ArrowLeft") { prevVisibility() } else if (e.key === "ArrowRight") { nextVisibility() } }}
      >
        <PageWrapper descriptionOpen={descriptionOpen} setDescriptionOpen={setDescriptionOpen} darkMode={darkMode}>

          <Link title='Previous project' href={`/gallery/${prevSlug()}`}>
            <AiFillCaretLeft className='relative fill-darkGrey opacity-100 w-8 h-1/6  drop-shadow-xl cursor-pointer px-1' />
          </Link>

          {/* ========================INSIDE======================== */}
          <div className={`relative w-[93%] xl:w-[95] max-w-[1700px] rounded-3xl h-[93%]  overflow-hidden 
          before:absolute before:w-full before:h-full before:top-0 before:left-0 before:rounded-3xl before:shadow-inner-3xl before:shadow-black/60 before:select-none before:z-[1]`}>
            <div className={`w-full h-full absolute`}>
              <Image fill style={{ objectFit: 'cover', objectPosition: 'center' }} src='/images/projectBackground.jpg' alt='' priority quality={100} />
              <Logo darkMode={darkMode} className='w-1/4 absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-1/2 opacity-5' />
            </div>

            <div className="relative flex flex-col md:flex-row w-full h-full z-[2] ">
              {/* {console.log([project.mainImage.image, ...project.otherImages] )} */}
              <ProjectPicture images={[project.mainImage.image, ...project.otherImages]} visibleItem={visibleItem} handleVisibility={handleVisibility} nextVisibility={nextVisibility} prevVisibility={prevVisibility} />
              <ProjectPictures images={[project.mainImage.image, ...project.otherImages]} handleVisibility={handleVisibility} />
              <ProjectDescription project={project} />
            </div>
          </div>

          {/* <Link className='absolute z-10 w-fit h-fit top-10 right-4' href='/gallery'>
            <IoClose className="w-6 h-6 fill-darkGrey hover:scale-110 " />
          </Link> */}
          <Link title='Back to gallery' className='absolute z-10 w-fit h-fit top-6 left-3' href='/gallery'>
            <IoArrowBack className="w-6 h-6 fill-darkGrey hover:scale-110 " />
          </Link>

          <Link title='Next project' href={`/gallery/${nextSlug()}`}>
            <AiFillCaretRight className='relative fill-darkGrey opacity-100 w-8 h-1/6  drop-shadow-xl cursor-pointer px-1' />
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
  // const project = await client.fetch(`*[_type == "project" && slug.current == "${params.slug}"][0]`);
  const project = await client.fetch(`*[_type == "project" && slug.current == "${params.slug}"][0]{...,mainImage{alt,image{asset->{url,metadata}, ...asset{_ref}}},otherImages[]{_key,_type, asset->{url,metadata}, ...asset{_ref}}}`);
  // *[_type == "project" ][0]{...,mainImage{alt,image{asset->{_ref,_type,url,metadata}}},otherImages[]{_key,_type,asset->{_ref,_type,url,metadata}}}

  const projectSlugs = await client.fetch(`*[_type == "project"]|order(date){slug}`);
  const slugNames = projectSlugs.map((projectSlug) => projectSlug.slug.current);
  return {
    props: { project, slug: params.slug, slugs: slugNames },
  }
}