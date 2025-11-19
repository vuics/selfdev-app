import React, { useState, useEffect, } from 'react'

import axios from 'axios'
import {
  Container,
  Loader,
  Message,
  Icon,
  Dropdown,
  Table,
  Menu,
  // Checkbox,
  // Button,
  // Input,
  // Segment,
  // Card,
  // Modal,
  // Divider,
  // Tab,
  // Header,
  // Popup,
  // Accordion,
  // List,
  // Label,
  // Confirm,
  // Form,
} from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import Menubar from './components/Menubar'
import conf from './conf'

function humanFileSizeI18n(bytes, t, decimals = 1) {
  if (!bytes) return "0"
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const units = ["B", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${value} ${t(`units.${units[i]}`)}`;
}


const getContentIcon = (contentType = '') => {
  if (!contentType) return 'file';

  // Normalize
  const ct = contentType.toLowerCase();

  if (ct.includes('text/')) {
    return 'file text';
  } else if (ct.includes('audio/')) {
    return 'file audio';
  } else if (ct.includes('video/')) {
    return 'file video';
  } else if (ct.includes('image/')) {
    return 'file image';
  } else if (ct.includes('application/pdf')) {
    return 'file pdf';
  } else if (
    ct.includes('application/zip') ||
    ct.includes('application/x-7z-compressed') ||
    ct.includes('application/x-rar') ||
    ct.includes('application/x-rar-compressed') ||
    ct.includes('application/x-tar') ||
    ct.includes('application/gzip')
  ) {
    return 'file archive';
  } else if (
    ct.includes('application/json') ||
    ct.includes('application/xml') ||
    ct.includes('application/x-yaml')
  ) {
    return 'file code';
  } else if (
    ct.includes('application/vnd.ms-excel') ||
    ct.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  ) {
    return 'file excel';
  } else if (
    ct.includes('application/msword') ||
    ct.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')
  ) {
    return 'file word';
  } else if (
    ct.includes('application/vnd.ms-powerpoint') ||
    ct.includes('application/vnd.openxmlformats-officedocument.presentationml.presentation')
  ) {
    return 'file powerpoint';
  }

  return 'file';
};

const openFile = (file) => {
  const url = `${conf.xmpp.shareUrlPrefix}${file.slot}/${file.filename}`;
  window.open(url, "_blank");
}

const openStorage = (storage) => {
  window.alert(`Namespace: ${storage.namespace}\nKey: ${storage.key}\nValue: ${storage.value}`)
}

export default function Data ({
  hideMenubar = false, clickFile = openFile, clickStorage = openStorage
} = {}) {
  const { t } = useTranslation('Data')
  const [ responseError, setResponseError ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ files, setFiles ] = useState([])
  const [ storages, setStorages ] = useState([])

  const [ active, setActive ] = useState(() => {
    return localStorage.getItem('data.active') || 'files'
  })
  useEffect(() => {
    localStorage.setItem('data.active', active);
  }, [active]);

  const indexFiles = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${conf.api.url}/file?skip=${conf.data.skip}&limit=${conf.data.limit}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      // console.log('res:', res)
      console.log('res.data:', res.data)
      setFiles(res.data)
    } catch (err) {
      console.error('get files error:', err);
      return setResponseError(err?.response?.data?.message || t('Error getting files.'))
    } finally {
      setLoading(false)
    }
  }

  const indexStorages = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${conf.api.url}/storage?skip=${conf.data.skip}&limit=${conf.data.limit}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      // console.log('res:', res)
      console.log('res.data:', res.data)
      setStorages(res.data)
    } catch (err) {
      console.error('get storages error:', err);
      return setResponseError(err?.response?.data?.message || t('Error getting storages.'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    indexFiles()
    indexStorages()
  }, [active])

  const deleteFile = async ({ file }) => {
    setLoading(true)
    try {
      const res = await axios.delete(`${conf.xmpp.shareUrlPrefix}${file.slot}/${file.filename}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      console.log('file delete res:', res)
      const res1 = await axios.delete(`${conf.api.url}/file/${file._id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      console.log('file doc delete res:', res1)
      // setResponseMessage(`File deleted successfully`)
      setFiles(files.filter(obj => obj._id !== file._id))
    } catch (err) {
      console.error('delete file error:', err);
      return setResponseError(err?.response?.data?.message || err.toString() || t('Error deleting file.'))
    } finally {
      setLoading(false)
    }
  }

  const deleteStorage = async ({ storage }) => {
    setLoading(true)
    try {
      const res = await axios.delete(`${conf.api.url}/storage/${storage._id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      console.log('storage doc delete res:', res)
      // setResponseMessage(`Storage deleted successfully`)
      setStorages(storages.filter(obj => obj._id !== storage._id))
    } catch (err) {
      console.error('delete storage error:', err);
      return setResponseError(err?.response?.data?.message || err.toString() || t('Error deleting storage.'))
    } finally {
      setLoading(false)
    }
  }

  console.log('storages:', storages)

  return (<>
    { !hideMenubar && (
      <Container fluid>
        <Menubar />
      </Container>
    )}

    <Container>
      <Loader active={loading} inline='centered' />
      { responseError &&
        <Message
          negative
          style={{ textAlign: 'left'}}
          icon='exclamation circle'
          header={t('error')}
          content={responseError}
          onDismiss={() => setResponseError('')}
        />
      }
    </Container>

    <Container fluid
      style={{ padding: '15px 15px 0 15px' }}
    >
      <Menu pointing>
        <Menu.Item
          name='File System'
          active={active === 'files'}
          onClick={() => setActive('files')}
        />
        <Menu.Item
          name='KV Storage'
          active={active === 'storages'}
          onClick={() => setActive('storages')}
        />
      </Menu>


      { active === 'files' && (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>File Name</Table.HeaderCell>
              <Table.HeaderCell>Size</Table.HeaderCell>
              <Table.HeaderCell>Path</Table.HeaderCell>
              <Table.HeaderCell>Created At</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>

            { files.map(file => (
              <Table.Row key={file.slot}>
                <Table.Cell
                  onClick={() => clickFile(file)}
                >
                  <Icon name={getContentIcon(file.contentType)} />
                  {file.filename}
                </Table.Cell>
                <Table.Cell
                  collapsing
                  onClick={() => clickFile(file)}
                >
                  {humanFileSizeI18n(file.filesize, t)}
                </Table.Cell>
                <Table.Cell
                  collapsing
                  onClick={() => clickFile(file)}
                >
                  {file.path}
                </Table.Cell>
                <Table.Cell
                  collapsing
                  onClick={() => clickFile(file)}
                >
                  {(new Date(file.createdAt)).toLocaleTimeString()}
                </Table.Cell>
                <Table.Cell>
                  <Dropdown icon='ellipsis vertical' color='gray'>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        text='Open'
                        onClick={() => {
                          openFile(file)
                        }}
                      />
                      <Dropdown.Divider />
                      <Dropdown.Item
                        text='Delete'
                        onClick={() => {
                          deleteFile({ file })
                        }}
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            ))}

          </Table.Body>
        </Table>
      )}

      { active === 'storages' && (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Namespace</Table.HeaderCell>
              <Table.HeaderCell>Key</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
              <Table.HeaderCell>Updated At</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>

            { storages.map(storage => (
              <Table.Row key={storage.key}>
                <Table.Cell
                  collapsing
                  onClick={() => clickStorage(storage)}
                >
                  {storage.namespace}
                </Table.Cell>
                <Table.Cell
                  collapsing
                  onClick={() => clickStorage(storage)}
                >
                  <Icon name='file' />
                  {storage.key}
                </Table.Cell>
                <Table.Cell
                  onClick={() => clickStorage(storage)}
                >
                  {storage.value}
                </Table.Cell>
                <Table.Cell
                  collapsing
                  onClick={() => clickStorage(storage)}
                >
                  {(new Date(storage.updatedAt)).toLocaleTimeString()}
                </Table.Cell>
                <Table.Cell
                  collapsing
                >
                  <Dropdown icon='ellipsis vertical' color='gray'>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        text='Open'
                        onClick={() => {
                          openStorage(storage)
                        }}
                      />
                      <Dropdown.Divider />
                      <Dropdown.Item
                        text='Delete'
                        onClick={() => {
                          deleteStorage({ storage })
                        }}
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            ))}

          </Table.Body>
        </Table>
      )}

    </Container>
  </>)
}
