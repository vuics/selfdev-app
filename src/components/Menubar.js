import React from 'react'
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
        <Image alt="logo" src='/images/logo192.png' height='32px' />
        {'\u00A0'}
        <span style={{color: 'grey'}}>Selfdev</span>
      </Menu.Item>
      { conf.hive.enable && (
        <Menu.Item onClick={() => navigate('/hive')} active={pathname==='/hive'}>
          <Icon name='cubes' />
          Hive
        </Menu.Item>
      ) }
      { conf.chat.enable && (
        <Menu.Item onClick={() => navigate('/chat')} active={pathname==='/chat'}>
          <Icon name='chat' />
          Chat
        </Menu.Item>
      ) }
      { conf.talk.enable && (
        <Menu.Item onClick={() => navigate('/talk')} active={pathname==='/talk'}>
          <Icon name='talk' />
          Talk
        </Menu.Item>
      ) }
      { conf.map.enable && (
        <Menu.Item onClick={() => navigate('/map')} active={pathname==='/map'}>
          <Icon name='sitemap' />
          Map
        </Menu.Item>
      ) }
      { conf.meet.enable && (
        <Menu.Item onClick={() => navigate('/meet')} active={pathname==='/meet'}>
          <Icon name='video' />
          Meet
        </Menu.Item>
      ) }
      { conf.flow.enable && (
        <Menu.Item onClick={() => navigate('/flow')} active={pathname==='/flow'}>
          <Icon name='code branch' />
          Flow
        </Menu.Item>
      ) }
      { conf.node.enable && (
        <Menu.Item onClick={() => navigate('/node')} active={pathname==='/node'}>
          <Icon name='map signs' />
          Node
        </Menu.Item>
      ) }
      { conf.code.enable && (
        <Menu.Item onClick={() => navigate('/code')} active={pathname==='/code'}>
          <Icon name='code' />
          Code
        </Menu.Item>
      ) }
      { conf.note.enable && (
        <Menu.Item onClick={() => navigate('/note')} active={pathname==='/note'}>
          <Icon name='edit outline' />
          Note
        </Menu.Item>
      ) }
      { conf.sell.enable && (
        <Menu.Item onClick={() => navigate('/sell')} active={pathname==='/sell'}>
          <Icon name='handshake outline' />
          Sell
        </Menu.Item>
      ) }
      { conf.train.enable && (
        <Menu.Item onClick={() => navigate('/train')} active={pathname==='/train'}>
          <Icon name='graduation cap' />
          Train
        </Menu.Item>
      ) }
      { conf.docs.enable && (
        <Menu.Item onClick={() => navigate('/docs')} active={pathname==='/docs'}>
          <Icon name='book' />
          Docs
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
