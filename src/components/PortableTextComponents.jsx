import Link from 'next/link'

const portableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="font-serif text-3xl sm:text-4xl mb-4 mt-8">{children}</h1>,
    h2: ({ children }) => <h2 className="font-serif text-2xl sm:text-3xl mb-3 mt-6">{children}</h2>,
    h3: ({ children }) => <h3 className="font-serif text-xl sm:text-2xl mb-2 mt-5">{children}</h3>,
    h4: ({ children }) => <h4 className="font-serif text-lg sm:text-xl mb-2 mt-4">{children}</h4>,
    normal: ({ children }) => <p className="font-sans font-extralight mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => <blockquote className="border-l-2 border-foreground/30 pl-4 italic font-sans font-extralight mb-4">{children}</blockquote>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <Link href={value?.href || '#'} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70 transition-opacity">
        {children}
      </Link>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 font-sans font-extralight space-y-1">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },
}

export default portableTextComponents
