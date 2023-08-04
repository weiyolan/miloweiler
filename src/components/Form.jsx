import React, { useEffect, useRef, useState } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import { useAppContext } from '@utils/appContext';
import { usePageContext } from '@/utils/pageContext';
import { toast } from 'react-hot-toast';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Form = () => {
  let [success, setSuccess] = useState(false)
  let [buttonHovering, setButtonHovering] = useState(false)
  const { locale } = useAppContext();
  const { darkMode } = usePageContext();
  let [name, setName] = useState('');
  let [lastName, setLastName] = useState('');
  let [email, setEmail] = useState('');
  let [subject, setSubject] = useState('');
  let [message, setMessage] = useState('');
  let [honey, setHoney] = useState('');
  const { width } = useAppContext()

  let ctx = useRef();

  useEffect(() => {
    ctx.current = gsap.context(() => {
      gsap.from('.form-el', {
        translateX: -50,
        translateY: 80,
        opacity: 0,
        ease: 'back',
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.form-container',
          start: `top bottom`,
          // start: `top ${width < 648 ? '85%' : '60%'}`,
          end: 'top 50%',
          // toggleActions:'restart none none reverse',
          scrub: 1,
          markers: false
        }
      })
    })
    return () => ctx.current.revert()

  }, [width])

  function encode(data) {
    // console.log(Object.keys(data)
    //   .map(
    //     (key) =>
    //       encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
    //   )
    //   .join("&"))
    return Object.keys(data)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const upload = fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": e.target.getAttribute("name"),
        'name': name,
        'lastName': lastName,
        'email': email,
        'message': message,
        'subject': subject,
        'bot-field': honey
      }),
    })
      .then(() => { setSuccess(true); setName(''); setLastName(''); setEmail(''); setSubject(''); setHoney(''); setMessage('') })
      .catch((error) => alert(error));


    toast.promise(upload, {
      loading: 'Loading..',
      success: 'Email submitted',
      error: (err) => { return `There was an error registering your email:\n${err.toString()}` }
    },
      {
        style: {
          minWidth: '250px',
          borderRadius: '10px',
          background: '#333',
          color: '#FFFAEA',
        }
      })

    // setLightbox(true); 
    // console.log(upload)
    // console.log(upload.then)
  };


  return (

    <form onSubmit={handleSubmit} name='ContactForm' method="POST" data-netlify="true" netlify-honeypot="bot-field" className='form-container flex relative flex-col items-start w-full ' >
      {/* // data-netlify-recaptcha="true" */}

      <input type='hidden' name='form-name' value='ContactForm' />
      <p className='hidden'>
        
        <label>{`${locale === 'en' ? "Don't fill this out if you're human:" : 'Ne pas remplir si vous êtes humain.'}`}<input name="bot-field" value={honey} onChange={(e) => setHoney(e.target.value)} /></label>
      </p>

      <div className={`grid gap-1 xs:gap-6 grid-cols-3 w-full relative min-w-[30vw] lg:min-w-fit auto-rows-min font-normal placeholder:text-xs min-[400px]:placeholder:text-sm ${darkMode ? 'text-primary placeholder:text-primary' : 'text-black placeholder:text-black'}`}>
        <div className='grid col-start-1 col-span-3 min-[500px]:col-span-2 '>
          <div className='form-el inline-block relative col-start-1 col-span-1 pr-3'>
            <label className='cursor-pointer font-semibold whitespace-nowrap text-xs inline-flex  mb-2 ml-1' htmlFor='name'>{`${locale === 'en' ? 'Name' : "Prénom"}`}</label>
            <input required name='name' className={`block bg-black/10 
              rounded-full  autofill:bg-black/10 valid:scale-[0.99] 
              outline-none -outline-offset-2 focus:outline-none focus:animate-outlinePulse
              border-none border-transparent
              placeholder:text-black/50 hover:border-black/40
              focus:-outline-offset-2 focus:outline-black/20 p-2 w-full text-sm `} id='name'
              type='text'
              placeholder={`${locale === 'en' ? "First name" : "Ou surnom"}`}
              value={name}
              onChange={(e) => { setName(e.target.value) }} />
          </div>

          <div className='form-el inline-block relative col-start-2 col-span-1 pl-3'>
            <label className=' cursor-pointer whitespace-nowrap font-semibold inline-flex text-xs mb-2 ml-1' htmlFor='lastname'>{`${locale === 'en' ? 'Last Name' : "Nom"}`}</label>
            <input required name='lastname'
              className={`block bg-black/10 
              rounded-full  autofill:bg-black/10 valid:scale-[0.99] 
              outline-none -outline-offset-2 focus:outline-none focus:animate-outlinePulse
              border-none border-transparent 
              placeholder:text-black/50 hover:border-black/40
              focus:-outline-offset-2 focus:outline-black/20 p-2 w-full text-sm `}
              id='lastname'
              type="text"
              placeholder={`${locale === 'en' ? "Or family name" : "Nom de famille"}`}
              value={lastName}
              onChange={(e) => { setLastName(e.target.value) }} />
          </div>
        </div>

        <div className='form-el  inline-block relative col-start-1 col-span-3 min-[400px]:col-span-2 min-[400px]:pr-4 min-[500px]:pr-0'>
          <label className=' cursor-pointer whitespace-nowrap font-semibold text-xs inline-flex max-w-fit mb-2 ml-1' htmlFor='email'>{`${locale === 'en' ? 'Email' : "Email"}`}</label>
          <input required name='email' className={`block bg-black/10 
              rounded-full  autofill:bg-black/10 valid:scale-[0.99] 
              outline-none -outline-offset-2 focus:outline-none focus:animate-outlinePulse
              border-none border-transparent invalid:text-red-700
              placeholder:text-black/50 hover:border-black/40
              focus:-outline-offset-2 focus:outline-black/20 p-2 w-full text-sm `} id='email'
            type='email'
            placeholder="example@ywdesign.co"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }} />
        </div>

        <div data-lenis-prevent className='form-el inline-flex flex-col w-full col-start-1 col-span-3 '>
          <label className=' cursor-pointer whitespace-nowrap font-semibold text-xs inline-flex max-w-fit mb-2 ml-1' htmlFor='message'>{`${locale === 'en' ? 'Message' : "Message"}`}</label>
          <textarea required data-lenis-prevent className={`block bg-black/10 
                autofill:bg-black/10 valid:scale-[0.99] 
              outline-none -outline-offset-2 focus:outline-none focus:animate-outlinePulse
              border-none border-transparent overscroll-contain 
              placeholder:text-black/50 hover:border-black/40
              focus:-outline-offset-2 focus:outline-black/20 p-2 w-full text-sm  h-[20vh] rounded-3xl`} id='message'
            type='text'
            name='message'
            placeholder={
              `${locale === 'en' ? 'To begin, just start typing. For example: \nHi Milo, \nI need a photographer for a project. \nCould we meet up to talk about it? \nKind regards' :
                "Pour commencer, il suffit de taper. Par exemple: \nBonjour Milo, \nje voudrais un nouveau logo et un nouveau site web pour ma boutique. \nPourrions-nous nous rencontrer pour en parler ? \nA bientôt !"}`}
            value={message}
            onChange={(e) => { setMessage(e.target.value) }}>
          </textarea>
        </div>

        {/* SUBJECT */}
        <div className='form-el flex flex-col relative w-full col-start-1 col-span-2 min-[400px]:col-span-1 xs:pr-0 row-start-4 min-[400px]:col-start-3 min-[400px]:row-start-2 min-h-[50px] justify-start items-start min-[400px]:justify-end'>
          <label className=' cursor-pointer whitespace-nowrap font-semibold text-xs inline-flex max-w-fit mb-2 ml-1' htmlFor='subject'>{`${locale === 'en' ? 'Subject' : "Sujet"}`}</label>
          <input name='subject' className={`block bg-black/10 
              rounded-full  autofill:bg-black/10 valid:scale-[0.99] 
              outline-none -outline-offset-2 focus:outline-none focus:animate-outlinePulse
              border-none border-transparent 
              placeholder:text-black/50  hover:border-black/40
              focus:-outline-offset-2 focus:outline-black/20 p-2 w-full text-sm `} id='subject'
            type='text'
            placeholder="Question"
            value={subject}
            onChange={(e) => { setSubject(e.target.value) }} />
        </div>
        {/* <div className='col-start-2 row-start-4 min-[400px]:col-start-1 min-[400px]:row-start-4 min-[500px]:col-start-3 min-[500px]:row-start-1 ' data-netlify-recaptcha="true"></div> */}

        {/* BUTTON */}
        <div className='form-el w-full flex items-end justify-end  col-start-3 row-start-4 min-[500px]:col-start-3 min-[500px]:row-start-1 relative '>
          <button key='submit' type={success ? 'reset' : 'submit'} onClick={() => { if (success) { setSuccess(false) } }}
            className={`inline-flex shadow-sm left-0 bottom-0
          border-2 border-solid rounded-full min-w-[80px] lg:min-w-[100px] px-2 justify-center xs:px-4 py-2  
          font-sans font-semibold text-xs textcenter whitespace-nowrap
          cursor-pointer w-fit min-[400px]:w-50% min-[430px]:w-fit h-fit duration-300
          outline-none focus-visible:outline-black/30 border-transparent bg-black/10  
          active:bg-black/30 hover:border-black/90 uppercase`}
          >
            {success ? <BsCheckLg className={`text-base`} /> : `${locale === 'en' ? 'Send' : "Envoyer"}`}
          </button>
        </div>
      </div>
      {/* </div> */}



    </form >

  )
}

export default Form