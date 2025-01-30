import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Menu,
  Image,
  Icon,
  Dropdown,
} from 'semantic-ui-react'
import conf from '../conf.js'

const Menubar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const name = localStorage.getItem('user.firstName') + ' ' +
    localStorage.getItem('user.lastName')

  return (
    <Menu size='tiny'>
      <Menu.Item header onClick={() => navigate('/')} active={pathname==='/'}>
        <Image avatar alt="logo" src='/images/logo192.png' />
        {'\u00A0'}
        <span style={{color: 'grey'}}>AZ1</span>
      </Menu.Item>
      { conf.chat.enable && (
        <Menu.Item onClick={() => navigate('/chat')} active={pathname==='/chat'}>
          <Icon name='chat' />
          Chat
        </Menu.Item>
      ) }
      { conf.code.enable && (
        <Menu.Item onClick={() => navigate('/code')} active={pathname==='/code'}>
          <Icon name='code' />
          Code
        </Menu.Item>
      ) }
      { conf.build.enable && (
        <Menu.Item onClick={() => navigate('/build')} active={pathname==='/build'}>
          <Icon name='magic' />
          Build
        </Menu.Item>
      ) }

      { conf.open.enable && (
        <Menu.Item onClick={() => navigate('/open')} active={pathname==='/open'}>
          <Icon name='lightbulb outline' />
          Open
        </Menu.Item>
      ) }

      <Menu.Menu position='right'>
        <Dropdown item
          text={name+'\u00A0\u00A0'}
          className='icon'
          icon='user'
        >
          <Dropdown.Menu>
            { conf.profile.enable && (
              <Dropdown.Item onClick={() => navigate('/profile')}>
                <Icon name='address card outline' />
                Profile
              </Dropdown.Item>
            )}
            { conf.keys.enable && (
            <Dropdown.Item onClick={() => navigate('/keys')}>
              <Icon name='key' />
              API Keys
            </Dropdown.Item>
            )}
            { conf.subscription.enable && (
              <Dropdown.Item onClick={() => navigate('/subscription')}>
                <Icon name='handshake' />
                Subscription
              </Dropdown.Item>
            )}
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => navigate('/logout')}>
              <Icon name='sign-out' />
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  )
}
export default Menubar
