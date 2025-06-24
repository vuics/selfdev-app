import React from 'react'
import {
  Container,
} from 'semantic-ui-react'

import { useIsMobile } from './Media'

export function Divi ({ children, style }) {
  return (
    <div style={{
      height: '1px',
      // backgroundColor: '#ccc',
      border: '0.5px dashed #ccc',
      ...style,
    }}>
      { children }
    </div>
  )
}

export function Outter ({ children, style, wrapper }) {
  const isMobile = useIsMobile()
  return (
    <div style={{
      padding: isMobile ? '0 0.1rem' : '0 2rem',
    }}>
      <Container fluid style={{
        backgroundColor: '#ffffff',
        borderLeft: '1px solid #ccc',
        borderRight: '1px solid #ccc',
        boxSizing: 'border-box',
        ...style,
      }}>
        { wrapper && (
          <div style={{ padding: 1 }}/>
        )}
        {children}
      </Container>
    </div>
  )
}

export function Inner ({ children, style }) {
  return (
    <Container style={{
      backgroundColor: '#ffffff',
      backgroundImage: 'none',
      borderLeft: '1px dotted #ccc',
      borderRight: '1px dotted #ccc',
      boxSizing: 'border-box',
      ...style,
    }}>
      {children}
    </Container>
  )
}

export function Empty ({ children, style }) {
  return (
    <div style={{ padding: '0.3rem', ...style }}>
      {children}
    </div>
  )
}
