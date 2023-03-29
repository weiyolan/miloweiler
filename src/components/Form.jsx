import React, { useState } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import { useAppContext } from '@utils/appContext';
import { usePageContext } from '@/utils/pageContext';


const Form = ({ noBlur, setLightbox }) => {
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
      .then(() => { setLightbox(true); setSuccess(true); setName(''); setLastName(''); setEmail(''); setHoney(''); setMessage('') })
      .catch((error) => alert(error));
    // console.log(upload)
    // console.log(upload.then)

  };


  return (

    <form onSubmit={handleSubmit} name='ContactForm' method="POST" data-netlify="true" netlify-honeypot="bot-field" className='flex relative flex-col items-start' >
      {/* // data-netlify-recaptcha="true" */}

      <input type='hidden' name='form-name' value='ContactForm' />
      <p className='hidden'>
        <label>{`${locale === 'en' ? "Don't fill this out if you're human:" : 'Ne pas remplir si vous êtes humain.'}`}</label>
        <input name="bot-field" value={honey} onChange={(e) => setHoney(e.target.value)} />
      </p>

      <div className={`grid gap-1 xs:gap-6 grid-cols-3 w-full min-w-[30vw] auto-rows-min font-normal placeholder:text-xs min-[400px]:placeholder:text-sm ${darkMode ? 'text-primary placeholder:text-primary' : 'text-black placeholder:text-black'}`}>
        <div className='grid col-start-1 col-span-3 min-[500px]:col-span-2 w-full'>
          <div className='inline-block relative col-start-1 col-span-1 pr-3'>
            <label className='cursor-pointer font-semibold whitespace-nowrap text-xs inline-flex  mb-2 ml-1' htmlFor='name'>{`${locale === 'en' ? 'Name' : "Prénom"}`}</label>
            <input required name='name' className={`block bg-black/10 
              rounded-full  autofill:bg-black/10 valid:scale-[0.99] 
              outline-none -outline-offset-2 focus:outline-none focus:animate-outlinePulse
              border-none border-transparent invalid:text-red-700
              placeholder:text-black/50
              focus:-outline-offset-2 focus:outline-black/20 p-2 w-full text-sm `} id='name'
              type='text'
              placeholder={`${locale === 'en' ? "First name" : "Ou surnom"}`}
              value={name}
              onChange={(e) => { setName(e.target.value) }} />
          </div>

          <div className='inline-block relative col-start-2 col-span-1 pl-3'>
            <label className=' cursor-pointer whitespace-nowrap font-semibold inline-flex text-xs mb-2 ml-1' htmlFor='lastname'>{`${locale === 'en' ? 'Last Name' : "Nom"}`}</label>
            <input required name='lastname'
              className={`block bg-black/10 
              rounded-full  autofill:bg-black/10 valid:scale-[0.99] 
              outline-none -outline-offset-2 focus:outline-none focus:animate-outlinePulse
              border-none border-transparent invalid:text-red-700
              placeholder:text-black/50
              focus:-outline-offset-2 focus:outline-black/20 p-2 w-full text-sm `}
              id='lastname'
              type="text"
              placeholder={`${locale === 'en' ? "Or family name" : "Nom de famille"}`}
              value={lastName}
              onChange={(e) => { setLastName(e.target.value) }} />
          </div>
        </div>

        <div className='inline-block relative col-start-1 col-span-3 min-[400px]:col-span-2 min-[400px]:pr-4 min-[500px]:pr-0'>
          <label className=' cursor-pointer whitespace-nowrap font-semibold text-xs inline-flex max-w-fit mb-2 ml-1' htmlFor='email'>{`${locale === 'en' ? 'Email' : "Email"}`}</label>
          <input required name='email' className={`block bg-black/10 
              rounded-full  autofill:bg-black/10 valid:scale-[0.99] 
              outline-none -outline-offset-2 focus:outline-none focus:animate-outlinePulse
              border-none border-transparent invalid:text-red-700
              placeholder:text-black/50
              focus:-outline-offset-2 focus:outline-black/20 p-2 w-full text-sm `} id='email'
            type='email'
            placeholder="example@ywdesign.co"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }} />
        </div>

        <div className='inline-flex flex-col w-full col-start-1 col-span-3 '>
          <label className=' cursor-pointer whitespace-nowrap font-semibold text-xs inline-flex max-w-fit mb-2 ml-1' htmlFor='message'>{`${locale === 'en' ? 'Message' : "Message"}`}</label>
          <textarea required className={`block bg-black/10 
                autofill:bg-black/10 valid:scale-[0.99] 
              outline-none -outline-offset-2 focus:outline-none focus:animate-outlinePulse
              border-none border-transparent invalid:text-red-700
              placeholder:text-black/50
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
        <div className='flex flex-col relative w-full col-start-1 col-span-2 min-[400px]:col-span-1 xs:pr-0 row-start-4 min-[400px]:col-start-3 min-[400px]:row-start-2 min-h-[50px] justify-start items-start min-[400px]:justify-end'>
          <label className=' cursor-pointer whitespace-nowrap font-semibold text-xs inline-flex max-w-fit mb-2 ml-1' htmlFor='subject'>{`${locale === 'en' ? 'Subject' : "Sujet"}`}</label>
          <input name='subject' className={`block bg-black/10 
              rounded-full  autofill:bg-black/10 valid:scale-[0.99] 
              outline-none -outline-offset-2 focus:outline-none focus:animate-outlinePulse
              border-none border-transparent invalid:text-red-700
              placeholder:text-black/50
              focus:-outline-offset-2 focus:outline-black/20 p-2 w-full text-sm `} id='email'
            type='text'
            placeholder="Question"
            value={subject}
            onChange={(e) => { setSubject(e.target.value) }} />
        </div>
        {/* <div className='col-start-2 row-start-4 min-[400px]:col-start-1 min-[400px]:row-start-4 min-[500px]:col-start-3 min-[500px]:row-start-1 ' data-netlify-recaptcha="true"></div> */}

        {/* BUTTON */}
        <div className='w-full flex items-end justify-end  col-start-3 row-start-4 min-[500px]:col-start-3 min-[500px]:row-start-1 relative '>
          <button key='submit' type='submit'
            className={`inline-flex shadow-sm left-0 bottom-0
          border-2 border-solid rounded-full min-w-[100px] px-2 justify-center xs:px-4 py-2  
          font-sans font-semibold text-xs textcenter whitespace-nowrap
          cursor-pointer w-fit min-[400px]:w-50% min-[430px]:w-fit h-fit duration-300
          ${success ? 'opacity-0 translate-y-[40px]' : 'opacity-100'}
          outline-none  focus-visible:outline-blac/30 border-transparent bg-black/10  
          active:bg-black/30 hover:border-black/30`}
          >
            {`${locale === 'en' ? 'SEND' : "ENVOYER"}`}
          </button>
        </div>
      </div>
      {/* </div> */}



    </form >

  )
}

export default Form