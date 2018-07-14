import React from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'

const NewAccountModal = ({ showNewAccountModal }) => {
  console.log(showNewAccountModal)
  return (
    <div>
      <Modal />
    </div>
  )
}

NewAccountModal.propTypes = {
  showNewAccountModal: PropTypes.bool,
}

export default NewAccountModal
