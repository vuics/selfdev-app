import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Menu,
  Icon,
  Dropdown,
  Image,
} from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

import conf from '../conf.js'
import Logo from './Logo'
import { useIndexContext } from './IndexContext'

export default function Menubar ({ children }) {
  const { user } = useIndexContext()
  const { t } = useTranslation('Menubar')
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const name = `${user.firstName} ${user.lastName}`
  const [avatar, setAvatar] = useState(null);

  // console.log('avatar:', avatar)

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const res = await axios.get(`${conf.api.url}/profile/avatar`, {
          withCredentials: true,
        });
        if (res.data?.avatar) {
          setAvatar(res.data.avatar);
        }
      } catch (err) {
        console.error('Failed to load avatar', err);
      }
    };

    fetchAvatar();
  }, []);

  return (
    <Menu size='tiny'>
      <Menu.Item header onClick={() => navigate('/')} active={pathname==='/'}>
        <Logo size='milli' gray />
        {'\u00A0'}
        <span style={{color: 'grey'}}>
          {t('name', { ns: 'app' })}
        </span>
      </Menu.Item>
      { conf.hive.enable && (
        <Menu.Item onClick={() => navigate('/hive')} active={pathname==='/hive'}>
          <Icon name='cubes' />
          {t('Hive')}
        </Menu.Item>
      ) }
      { conf.chat.enable && (
        <Menu.Item onClick={() => navigate('/chat')} active={pathname==='/chat'}>
          <Icon name='chat' />
          {t('Chat')}
        </Menu.Item>
      ) }
      { conf.talk.enable && (
        <Menu.Item onClick={() => navigate('/talk')} active={pathname==='/talk'}>
          <Icon name='talk' />
          {t('Talk')}
        </Menu.Item>
      ) }
      { conf.map.enable && (
        <Menu.Item onClick={() => navigate('/map')} active={pathname==='/map'}>
          <Icon name='sitemap' />
          {t('Map')}
        </Menu.Item>
      ) }
      { conf.meet.enable && (
        <Menu.Item onClick={() => navigate('/meet')} active={pathname==='/meet'}>
          <Icon name='video' />
          {t('Meet')}
        </Menu.Item>
      ) }
      { conf.flow.enable && (
        <Menu.Item onClick={() => navigate('/flow')} active={pathname==='/flow'}>
          <Icon name='code branch' />
          {t('Flow')}
        </Menu.Item>
      ) }
      { conf.node.enable && (
        <Menu.Item onClick={() => navigate('/node')} active={pathname==='/node'}>
          <Icon name='map signs' />
          {t('Node')}
        </Menu.Item>
      ) }
      { conf.code.enable && (
        <Menu.Item onClick={() => navigate('/code')} active={pathname==='/code'}>
          <Icon name='code' />
          {t('Code')}
        </Menu.Item>
      ) }
      { conf.note.enable && (
        <Menu.Item onClick={() => navigate('/note')} active={pathname==='/note'}>
          <Icon name='edit outline' />
          {t('Note')}
        </Menu.Item>
      ) }
      { conf.sell.enable && (
        <Menu.Item onClick={() => navigate('/sell')} active={pathname==='/sell'}>
          <Icon name='handshake outline' />
          {t('Sell')}
        </Menu.Item>
      ) }
      { conf.train.enable && (
        <Menu.Item onClick={() => navigate('/train')} active={pathname==='/train'}>
          <Icon name='graduation cap' />
          {t('Train')}
        </Menu.Item>
      ) }
      { conf.docs.enable && (
        <Menu.Item onClick={() => navigate('/docs')} active={pathname==='/docs'}>
          <Icon name='book' />
          {t('Docs')}
        </Menu.Item>
      ) }

      {children}

      <Menu.Menu position='right'>
        <Dropdown
          item
          trigger={
            <span>
              { avatar ? (
                <Image
                  avatar
                  // inline
                  src={avatar}
                  style={{ width: '1.2rem', height: '1.2rem' }}
                />
              ): (
                <Icon name='user' />
              )}
              <span style={{ marginLeft: '0.5rem' }}>
                {name}
              </span>
            </span>
          }
        >
          <Dropdown.Menu>
            { conf.profile.enable && (
              <Dropdown.Item onClick={() => navigate('/profile')}>
                <Icon name='address card outline' />
                {t('Profile')}
              </Dropdown.Item>
            )}
            { conf.subscription.enable && (
              <Dropdown.Item onClick={() => navigate('/subscription')}>
                <Icon name='handshake' />
                {t('Subscription')}
              </Dropdown.Item>
            )}

            <Dropdown.Divider />

            { conf.vault.enable && (
            <Dropdown.Item onClick={() => navigate('/vault')}>
              <Icon name='shield alternate' />
              {t('Vault')}
            </Dropdown.Item>
            )}
            { conf.keys.enable && (
            <Dropdown.Item onClick={() => navigate('/keys')}>
              <Icon name='key' />
              {t('API Keys')}
            </Dropdown.Item>
            )}
            { conf.settings.enable && (
            <Dropdown.Item onClick={() => navigate('/settings')}>
              <Icon name='settings' />
              {t('Settings')}
            </Dropdown.Item>
            )}

            <Dropdown.Divider />

            <Dropdown.Item onClick={() => navigate('/logout')}>
              <Icon name='sign-out' />
              {t('Log Out')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  )
}
