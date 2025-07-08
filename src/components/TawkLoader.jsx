import { useEffect } from 'react'
import { useIndexContext } from './IndexContext'

export default function TawkLoader() {
  const { cookieConsent } = useIndexContext()

  useEffect(() => {
    if (!cookieConsent?.functional) return // only load if functional cookies accepted

    // Set global variables first
    window.Tawk_API = window.Tawk_API || {}
    window.Tawk_LoadStart = new Date()

    // Inject script
    const script = document.createElement('script')
    script.async = true
    script.src='https://embed.tawk.to/685ce6b56a55a619118475e7/1iuleadir';
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')
    document.body.appendChild(script)

    return () => {
      // Optional: remove iframe and cleanup if needed
      const iframe = document.querySelector('iframe[src*="tawk.to"]')
      if (iframe) iframe.remove()
    }
  }, [cookieConsent])

  return null
}
