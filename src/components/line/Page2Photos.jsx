import React, { useEffect, useState } from 'react'
import ArrowLink from '../ArrowLink'
import Image from 'next/image'
import Parallax from '../Parallax'
import gsap from 'gsap/dist/gsap'
import FadeDiv from '../FadeDiv'
import SanityImage from '../SanityImage'
import Link from 'next/link'
// import { Observer } from 'gsap/dist/Observer'

export default function Page2Photos({ className, animateName, projects }) {
  // console.log(projects)
  let [images, setImages] = useState(() => { let photos = []; projects.forEach(project => project.otherImages.forEach(img => { photos = [...photos, { image: img, slug: project.slug.current }] })); return photos })

  useEffect(() => {
    function shuffle(array) {
      let currentIndex = array.length, randomIndex;
      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
      return array;
    }

    let newLscape = shuffle([...images])

    newLscape && setImages(newLscape.slice(0,12))
  }, [])

  useEffect(() => {
    gsap.utils.toArray(".page2photos").forEach(photo => {
      let hover = gsap.to(photo, { scale: 1.05, duration: 0.2, paused: true, ease: "power1.inOut", overwrite: true });
      let click = gsap.to(photo, { scale: 1.02, duration: 0.1, paused: true, ease: "power1.inOut", overwrite: true });
      photo.addEventListener("mouseenter", () => hover.play());
      photo.addEventListener("mouseleave", () => hover.reverse());
      photo.addEventListener("mousedown", () => click.play());
      photo.addEventListener("mouseup", () => click.reverse());
    });
  }, [])

  return (
    <FadeDiv amount={10} className={'w-[90%] md:w-[75vw] overflow-hidden page2photosContainer fixed h-[20lvh] md:h-[20vh] left-1/2 -translate-x-1/2 top-[66lvh] md:top-1/2 -translate-y-1/2'} type='leftRight' >
      <div className={`flex w-[140vw] h-full page2photosContainerInner opacity-0 invisible `}>
        <PageImage alt='' slug={images[0].slug} image={images[0].image} className={``} style={{}} />
        {/* src='/images/page1photo11.jpg' */}
        <PageImage alt='' slug={images[1].slug} image={images[1].image} className={``} style={{}} />
        {/* src='/images/page1photo2.jpg'  */}
        <PageImage alt='' slug={images[2].slug} image={images[2].image} className={``} style={{}} />
        {/* src='/images/page1photo10.jpg' */}
        <PageImage alt='' slug={images[3].slug} image={images[3].image} className={``} style={{}} />
        {/* src='/images/page1photo4.jpg'  */}
        <PageImage alt='' slug={images[4].slug} image={images[4].image} className={``} style={{}} />
        {/* src='/images/page1photo6.jpg'  */}
        <PageImage alt='' slug={images[5].slug} image={images[5].image} className={``} style={{}} />
        {/* src='/images/page1photo5.jpg'  */}
        <PageImage alt='' slug={images[6].slug} image={images[6].image} className={``} style={{}} />
        {/* src='/images/page1photo.jpg'   */}
        <PageImage alt='' slug={images[7].slug} image={images[7].image} className={``} style={{}} />
        {/* src='/images/page1photo7.jpg'  */}
        <PageImage alt='' slug={images[8].slug} image={images[8].image} className={``} style={{}} />
        {/* src='/images/page1photo9.jpg'  */}
        <PageImage alt='' slug={images[9].slug} image={images[9].image} className={``} style={{}} />
        {/* src='/images/page1photo12.jpg' */}
        <PageImage alt='' slug={images[10].slug} image={images[10].image} className={``} style={{}} />
        {/* src='/images/page1photo3.jpg'  */}
        <PageImage alt='' slug={images[11].slug} image={images[11].image} className={``} style={{}} />
        {/* src='/images/page1photo8.jpg'  */}
      </div>
    </FadeDiv>
  )
}

function PageImage({ className, slug, ...props }) {
  return (
    <div className={`relative flex-1`}>
      <Link href={`/commissioned/${slug}`}>
        <SanityImage fill containerClass='rounded-none' className={`select-none page2photos opacity-0 invisible hover:cursor-pointer ${className} object-cover object-center`} sizes='(max-width: 640px) 15vw, 15vw' {...props} />
      </Link>
    </div>
  )
}
