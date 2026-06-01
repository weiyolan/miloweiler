import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Fixed display order, independent of next.config locale order
const ORDER = ['en', 'nl', 'fr']

export default function LangSwitch({ className = '', ...props }) {
  const router = useRouter()
  const { locales = [], locale: active, pathname, query, asPath } = router
  const codes = ORDER.filter((c) => locales.includes(c))

  return (
    <div className={`flex items-center gap-2 font-mono select-none ${className}`} {...props}>
      {codes.map((code, i) => (
        <React.Fragment key={code}>
          {i > 0 && <span className="text-foreground/30">|</span>}
          {code === active ? (
            <span className="text-foreground" aria-current="true">{code.toUpperCase()}</span>
          ) : (
            <Link
              href={{ pathname, query }}
              as={asPath}
              locale={code}
              className="text-foreground/40 hover:text-foreground transition-colors focus:outline-none"
            >
              {code.toUpperCase()}
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
