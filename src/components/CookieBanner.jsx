import React, { useEffect, useState } from 'react'
import {
  Message, Button, Checkbox, Container,
  Icon,
} from 'semantic-ui-react'

import { useIndexContext } from './IndexContext'

const COOKIE_CATEGORIES = {
  necessary: {
    label: 'Necessary Cookies',
    description: 'Required for essential website functionality.',
    alwaysEnabled: true,
  },
  functional: {
    label: 'Functional Cookies',
    description: 'Enable features like chat widgets.',
  },
  marketing: {
    label: 'Marketing Cookies',
    description: 'Used for analytics, advertising, and tracking.',
  },
}

const DEFAULT_CONSENT = {
  necessary: true,
  functional: true,
  marketing: true,
}

export default function CookieBanner() {
  const { cookieConsent, setCookieConsent } = useIndexContext()
  const [showDetails, setShowDetails] = useState(false)
  const [tempConsent, setTempConsent] = useState(DEFAULT_CONSENT)

  useEffect(() => {
    // On opening details, initialize tempConsent from stored consent or defaults
    if (showDetails) {
      setTempConsent(cookieConsent || DEFAULT_CONSENT)
    }
  }, [showDetails, cookieConsent])

  if (cookieConsent !== null) {
    return null // Hide banner once consent given
  }

  const handleAcceptAll = () => {
    setCookieConsent({
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
    setCookieConsent({
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
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        background: 'white',
        borderRadius: 8
      }}>
        {!showDetails ? (
          <Message warning style={{ margin: 0 }}>
            <Message.Content>
              <Message.Header>We use cookies</Message.Header>
              This website uses cookies to ensure basic functionality like login, and to enhance your experience.
              <div style={{ marginTop: '1em', display: 'flex', gap: '1em', flexWrap: 'wrap' }}>
                <Button
                  icon labelPosition='left'
                  basic
                  onClick={handleSelect}
                >
                  <Icon name='options' />
                  Select Preferences
                </Button>
                <Button
                  color='black'
                  icon labelPosition='right'
                  onClick={handleAcceptAll}
                >
                  Accept All
                  <Icon name='checkmark' />
                </Button>
              </div>
            </Message.Content>
          </Message>
        ) : (
          <Message warning style={{ margin: 0 }}>
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
              <Button
                icon labelPosition='left'
                basic
                onClick={() => setShowDetails(false)}
              >
                <Icon name='left arrow' />
                Back
              </Button>
              <Button
                color='black'
                icon labelPosition='right'
                onClick={handleSavePreferences}
              >
                Save Preferences
                <Icon name='checkmark' />
              </Button>
            </div>
          </Message>
        )}
      </div>
    </div>
  )
}
