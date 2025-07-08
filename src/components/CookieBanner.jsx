import React, { useEffect, useState } from 'react'
import { Message, Button, Checkbox, Container } from 'semantic-ui-react'

import { usePersistentState } from './IndexContext'

/*
export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = usePersistentState('cookieConsent', null)

  const handleAccept = () => setCookieConsent('accepted')
  const handleReject = () => setCookieConsent('rejected')

  if (cookieConsent === 'accepted' || cookieConsent === 'rejected') {
    return null
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      zIndex: 9999,
      pointerEvents: 'none', // Prevents blocking of page interaction except inside banner
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{
        pointerEvents: 'auto',
        maxWidth: 800,
        width: '100%',
        margin: '1em',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        background: 'white',
        borderRadius: 8
      }}>
        <Message style={{ margin: 0, padding: '1em 1.5em' }}>
          <Message.Content>
            <Message.Header>We use cookies</Message.Header>
            This website uses cookies to ensure basic functionality like login. You can accept or reject their use.
            <div style={{ marginTop: '1em', display: 'flex', gap: '1em' }}>
              <Button onClick={handleAccept} primary size="small">
                Accept
              </Button>
              <Button onClick={handleReject} secondary size="small">
                Reject
              </Button>
            </div>
          </Message.Content>
        </Message>
      </div>
    </div>
  )
}
*/



/*
function ThirdPartyScriptsLoader() {
  const [consent] = usePersistentState('cookieConsent', null)

  useEffect(() => {
    if (consent?.functional) {
      // Load Tawk.to chat widget
      const tawkScript = document.createElement('script')
      tawkScript.src = 'https://embed.tawk.to/YOUR_TAWK_ID/default'
      tawkScript.async = true
      document.body.appendChild(tawkScript)
    }

    if (consent?.marketing) {
      // Load Google Analytics or other marketing scripts here
      // Example GA snippet:
      window.dataLayer = window.dataLayer || []
      function gtag(){window.dataLayer.push(arguments)}
      gtag('js', new Date())
      gtag('config', 'GA_TRACKING_ID')
    }
  }, [consent])

  return null
}
*/

const COOKIE_CATEGORIES = {
  necessary: {
    label: 'Necessary Cookies',
    description: 'Required for essential website functionality.',
    alwaysEnabled: true,
  },
  functional: {
    label: 'Functional Cookies',
    description: 'Enable features like chat, payment widgets (e.g. Tawk.to, Stripe).',
  },
  marketing: {
    label: 'Marketing Cookies',
    description: 'Used for analytics, advertising, and tracking.',
  },
}


const DEFAULT_CONSENT = {
  necessary: true,
  functional: false,
  marketing: false,
}

export default function CookieConsentBanner() {
  const [consent, setConsent] = usePersistentState('cookieConsent', null)
  const [showDetails, setShowDetails] = useState(false)
  const [tempConsent, setTempConsent] = useState(DEFAULT_CONSENT)

  useEffect(() => {
    // On opening details, initialize tempConsent from stored consent or defaults
    if (showDetails) {
      setTempConsent(consent || DEFAULT_CONSENT)
    }
  }, [showDetails, consent])

  if (consent !== null) return null // Hide banner once consent given

  const handleAcceptAll = () => {
    setConsent({
      necessary: true,
      functional: true,
      marketing: true,
    })
  }

  const handleSelect = () => {
    setShowDetails(true)
  }

  const handleToggle = (key) => {
    if (COOKIE_CATEGORIES[key].alwaysEnabled) return
    setTempConsent(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSavePreferences = () => {
    // Always keep necessary true
    setConsent({
      ...tempConsent,
      necessary: true,
    })
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      zIndex: 9999,
      pointerEvents: 'none', // Prevents blocking of page interaction except inside banner
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{
        pointerEvents: 'auto',
        maxWidth: 800,
        width: '100%',
        margin: '1em',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        background: 'white',
        borderRadius: 8
      }}>
        {!showDetails ? (
          <Message style={{ margin: 0 }}>
            <Message.Content>
              <Message.Header>We use cookies</Message.Header>
              This website uses cookies to ensure basic functionality like login, and to enhance your experience.
              <div style={{ marginTop: '1em', display: 'flex', gap: '1em', flexWrap: 'wrap' }}>
                <Button primary onClick={handleAcceptAll}>Accept All</Button>
                <Button secondary onClick={handleSelect}>Select Preferences</Button>
              </div>
            </Message.Content>
          </Message>
        ) : (
          <Message style={{ margin: 0 }}>
            <Message.Header>Cookie Preferences</Message.Header>
            <div>
              {Object.entries(COOKIE_CATEGORIES).map(([key, { label, description, alwaysEnabled }]) => (<>
                <Checkbox
                  key={key}
                  toggle
                  checked={tempConsent[key]}
                  onChange={() => handleToggle(key)}
                  disabled={alwaysEnabled}
                  label={`${label}: ${description}`}
                  style={{ display: 'block', marginTop: '0.5em' }}
                />
              </>))}
            </div>
            <div style={{ marginTop: '1em', display: 'flex', gap: '1em', flexWrap: 'wrap' }}>
              <Button primary onClick={handleSavePreferences}>Save Preferences</Button>
              <Button onClick={() => setShowDetails(false)}>Back</Button>
            </div>
          </Message>
        )}
      </div>
    </div>
  )
}
