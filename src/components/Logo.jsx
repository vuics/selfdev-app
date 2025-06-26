import React from 'react'

import LogoSvg from '../logo.svg'

const sizes = {
  nano: '15px',
  milli: '23px',
  mini: '35px',
  tiny: '50px',
  small: '80px',
  standard: '100px',
  medium: '100px',
  large: '150px',
  big: '200px',
  huge: '300px',
  massive: '450px'
}

export default function Logo ({ children, style, size = 'medium', gray = false } = {}) {
  return (
    <img
      src={LogoSvg}
      alt="Logo logo"
      style={{
        filter: gray ? 'grayscale(100%)' : null,
        width: sizes[size],
        height: sizes[size],
        objectFit: 'contain',
        ...style,
      }}
    >
      {children}
    </img>
  )
}
