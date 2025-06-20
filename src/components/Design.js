import React from 'react'
import {
  Container,
} from 'semantic-ui-react'

export function Divi ({ children, style }) {
  return (
    <div style={{
      height: '1px',
      backgroundColor: '#999',
      ...style,
    }}>
      { children }
    </div>
  )
}

export function Outter ({ children, style, wrapper }) {
  return (
    <div style={{
      padding: '0 2rem 0 2rem',
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
      borderLeft: '1px solid #999',
      borderRight: '1px solid #999',
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
