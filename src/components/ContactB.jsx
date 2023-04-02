import Link from 'next/link';
import { useAppContext } from '@utils/appContext';
import { usePageContext } from '@/utils/pageContext';

let whatsappLink = 'https://wa.me/32476506209?text=Hi+Milo%2C+%0D%0AI+got+your+WhatsApp+from+your+website+miloweiler.com.+Are+you+free+to+talk+any+time+soon+about+a+project+I+have+in+mind%3F+%0D%0AThanks%2C%0D%0A';
let mailLink = "mailto:contact@miloweiler.com?subject=Photography%20Project&body=Hi%20Milo%2C%0A%0AI%20have%20a%20photography%20project%20for%20you.%0ACould%20we%20talk%20about%20this%20any%20time%20soon%3F%0A%0AThanks%20in%20advance%2C%0A%0A"

export default function ContactB({className}) {
  const { locale } = useAppContext()
  const { darkMode } = usePageContext()

  return (

    <div className={`flex gap-3 mt-4 sm:mt-4 ${className?className:''}`}>
      <Link className='focus:outline-none group' href='tel:+32476506209' title={`${locale === 'en' ? 'Call phone number' : "Appeler le numéro téléphone"}`}>
        <Button>
          <svg className={`w-4 sm:w-4 ${darkMode ? 'fill-primary' : 'fill-darkPrimary'}`} alt={`${locale === 'en' ? 'Call phone number' : "Appeler le numéro téléphone"}`} viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.3006 19.3723C26.4445 20.5689 27.2764 21.9737 25.3526 24.3149C23.5329 26.5 22.1811 26.5 20.5693 26.5C16.6178 26.5 10.7946 21.5054 7.93499 18.5919C5.17936 15.7304 0.5 9.74737 0.5 5.53319C0.5 3.97239 1.17591 2.46361 2.94367 1.31902C4.76342 0.122406 6.47919 0.174433 7.883 1.89132C9.02684 3.29604 12.0944 6.67778 10.1707 9.27912C8.87086 10.996 9.02684 10.944 10.2747 12.3487C11.5745 13.8055 12.9263 15.2102 14.902 16.9791C15.9939 17.8115 15.7859 17.9676 17.7617 16.6149C20.0493 15.0541 24.1568 18.3318 25.3006 19.3723Z" />
          </svg>
        </Button>
      </Link>

      <Link className='focus:outline-none group' title={`${locale === 'en' ? 'Send WhatsApp Message' : "Envoyer un message WhatsApp"}`} target='_blank' rel="noopener noreferrer" href={whatsappLink}>
        <Button ext={true} >
          <svg className={`w-4 sm:w-4 ${darkMode ? 'fill-primary' : 'fill-darkPrimary'}`} viewBox="0 0 18 18" alt={`${locale === 'en' ? 'Send WhatsApp Message' : "Envoyer un message WhatsApp"}`} >
            <path fillRule="evenodd" clipRule="evenodd" d="M8.18668 0.0305136C5.87708 0.207466 3.50571 1.50465 2.03161 3.39739C0.699981 5.10725 0.0918151 7.07031 0.189932 9.34247C0.247789 10.6839 0.390384 11.2825 0.966548 12.6031C1.23836 13.226 1.25957 13.3072 1.20177 13.5016C0.972273 14.2735 -0.013835 17.9638 0.000147219 17.9986C0.00960932 18.0221 1.11571 17.7536 2.45819 17.4018L4.89905 16.7624L5.32092 16.9525C5.92391 17.2242 6.59228 17.4445 7.26674 17.5936C8.0653 17.7703 9.99436 17.7853 10.7752 17.6211C12.4311 17.2727 13.8383 16.5846 15.0404 15.5354C16.5646 14.2052 17.7212 12.1281 17.9496 10.3105C18.0467 9.53722 17.9956 7.53024 17.8635 6.93044C17.6526 5.97356 17.065 4.67787 16.4183 3.74423C15.9851 3.11879 15.1342 2.25176 14.4528 1.74163C13.4661 1.00285 11.9812 0.336136 10.8524 0.12492C10.2259 0.00775063 9.03459 -0.0344806 8.18668 0.0305136ZM9.90131 1.89114C10.9976 2.02467 12.0162 2.40169 12.9672 3.02594C14.7584 4.20176 15.9191 6.05101 16.0858 7.99467C16.1592 8.85091 16.0995 10.0434 15.9546 10.6109C15.5194 12.3166 14.3146 13.9072 12.7343 14.8624C11.775 15.4423 10.8819 15.7359 9.75636 15.8414C8.44607 15.9642 7.16151 15.7224 5.88214 15.112L5.11746 14.7473L3.92662 15.0532C3.27169 15.2214 2.72632 15.3497 2.71475 15.3381C2.70318 15.3266 2.80479 14.9029 2.94063 14.3964C3.31954 12.9835 3.32394 13.1051 2.85999 12.1437C2.17631 10.7269 1.94808 9.58238 2.08633 8.26405C2.43733 4.91718 4.99331 2.31076 8.33433 1.89264C8.94135 1.81669 9.28747 1.81633 9.90131 1.89114ZM5.77999 4.7098C5.2251 4.83655 4.64333 5.66129 4.50869 6.51208C4.41419 7.10949 4.55546 7.85839 4.88458 8.50384C5.24372 9.20823 6.16179 10.3605 6.99361 11.1506C7.89606 12.0079 8.36206 12.3033 9.61817 12.8145C11.063 13.4024 12.0193 13.3883 12.9556 12.7652C13.4707 12.4225 13.6552 12.0592 13.7565 11.1878L13.7997 10.8167L13.1811 10.5082C12.2932 10.0653 11.514 9.7322 11.3601 9.72968C11.2688 9.72819 11.0646 9.90041 10.7073 10.2805L10.1873 10.8334L9.93946 10.7596C9.54126 10.641 8.64339 10.0032 8.04143 9.41124C7.55627 8.93412 7.1591 8.41249 7.1591 8.25237C7.1591 8.22463 7.28139 8.04079 7.43085 7.84371C7.85285 7.28746 7.87184 7.1655 7.64119 6.49267C7.33581 5.60186 6.98155 4.88435 6.80201 4.793C6.57926 4.67973 6.08723 4.63965 5.77999 4.7098Z" />
          </svg>

        </Button>
      </Link>

      <Link className='focus:outline-none group' title={`${locale === 'en' ? 'Send an Email' : "Envoyer un courriel"}`} target='_blank' rel="noopener noreferrer" href={mailLink}>
        <Button ext={true}>
          <svg className={`w-4 sm:w-4 ${darkMode ? 'fill-primary' : 'fill-darkPrimary'}`} alt={`${locale === 'en' ? 'Send an Email' : "Envoyer un courriel"}`} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M33.7821 7C35.5429 7 37 8.41818 37 10.1318V29.8682C37 31.5818 35.5429 33 33.7821 33H6.21786C4.45714 33 3 31.5818 3 29.8682V10.1318C3 8.41818 4.45714 7 6.21786 7H33.7821ZM33.3571 13.6773V10.5455L20 19.2318L6.64286 10.5455V13.6773L20 22.3636L33.3571 13.6773Z" />
          </svg>
        </Button>
      </Link>

    </div>
  )
}

function Button({ children }) {
  return (
    <div className={`rounded-full bg-black/10 p-1.5 border-2 border-transparent focus:outline-none cursor-pointer
        duration-200 shadow-xl hover:border-darkPrimary/90 hover:animate-borderPulse   group-hover:scale-[1.15]  group-active:shadow-sm  group-active:scale-[0.95]`}>
      {children}
    </div>
  )
}
