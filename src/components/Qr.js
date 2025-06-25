import React, { useState } from 'react'
import {
  Image,
  Modal,
} from 'semantic-ui-react'

export default function Qr ({ src, size = 'tiny', modal = false } = {}) {
  const [open, setOpen] = useState(false);

  return (<>
    <Image
      src={src}
      size={size}
      centered
      style={{ cursor: 'pointer' }}
      onClick={() => setOpen(true)}
    />
    { modal && (
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        basic
        size='fullscreen'
        style={{ textAlign: 'center', cursor: 'pointer' }}
        onClick={() => setOpen(false)}
        dimmer
      >
        <Modal.Content>
          <Image
            src={src}
            size='huge'
            centered
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Modal.Content>
      </Modal>
    )}
  </>);
};
