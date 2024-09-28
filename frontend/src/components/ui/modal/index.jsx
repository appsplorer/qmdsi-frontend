import { Modal } from 'antd'
import React from 'react'

const CustomModal = ({open,onClose,footer,children,title,closable,width}) => {
  return (
    <Modal title={title} closable={closable} open={open} onClose={onClose} footer={footer} width={width}>
        {children}
    </Modal>
  )
}

export default CustomModal
