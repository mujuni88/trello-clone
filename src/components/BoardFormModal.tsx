import * as React from 'react'
import { Modal } from 'antd'

export const BoardFormModal = ({visible, onCancel, children}) => (
  <Modal
    bodyStyle={{ padding: '45px 36px 10px' }}
    visible={visible}
    footer={null}
    onCancel={onCancel}
    destroyOnClose={true}
  >
    {children}
  </Modal>
)
