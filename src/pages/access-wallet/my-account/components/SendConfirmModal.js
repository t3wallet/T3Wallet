import React from 'react'
import { Modal, Icon } from 'antd'
import {
  intlShape, injectIntl, defineMessages, FormattedMessage,
} from 'react-intl'
import PropTypes from 'prop-types'

const messages = defineMessages({
  title: {
    id: 'myAccount.sendConfirmModalTitle',
    defaultMessage: 'Transcation Confirmation',
  },
  detail: {
    id: 'myAccount.sendConfirmModalContent',
    defaultMessage: 'Your are sending {value} xtz to this address with gas {gas} mutez: ',
  },
  confirm: {
    id: 'myAccount.confirm',
    defaultMessage: 'Confirm',
  },
})

const SendConfirmModal = ({
  visible, onOk, onClose, operation, intl,
}) => {
  const { amountToSend, toAddress, gas } = operation
  const { formatMessage } = intl
  return (
    <Modal
      title={(
        <span>
          <Icon type="check-circle-o" style={{ marginRight: '8px', color: 'green' }} />
          <FormattedMessage {...messages.title} />
        </span>
            )}
      visible={visible}
      onOk={() => { onOk(operation) }}
      okText={formatMessage(messages.confirm)}
      onCancel={() => { onClose() }}
      wrapClassName="vertical-center-modal"
    >
      <p>
        <FormattedMessage {...messages.detail}
          values={{
            value: <b>
              {amountToSend}
            </b>,
            gas: <b>
              {gas}
            </b>,
          }}
        />
      </p>
      <a href={`http://tzscan.io/${toAddress}`} rel="noopener noreferrer" target="_blank">
        <Icon type="link" />
        <span>
          {toAddress}
        </span>
      </a>
    </Modal>
  )
}

SendConfirmModal.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  operation: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
}


export default injectIntl(SendConfirmModal)
