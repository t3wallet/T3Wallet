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
    defaultMessage: 'Your are sending {value} xtz with fee price {fee} mutez',
  },
  fromAddress: {
    id: 'myAccount.fromAddress',
    defaultMessage: 'From Address:',
  },
  toAddress: {
    id: 'myAccount.toAddress',
    defaultMessage: 'To Address:',
  },
  confirm: {
    id: 'myAccount.confirm',
    defaultMessage: 'Confirm',
  },
})

const SendConfirmModal = ({
  visible, confirmSend, onClose, operation, intl,
}) => {
  const {
    amount, fromAddress, toAddress, fee,
  } = operation
  const { formatMessage } = intl
  return (
    <Modal
      title={(
        <span>
          <Icon type="question-circle-o" style={{ marginRight: '8px', color: 'orange' }} />
          <FormattedMessage {...messages.title} />
        </span>
      )}
      centered
      visible={visible}
      onOk={() => { confirmSend({ payload: operation }) }}
      okText={formatMessage(messages.confirm)}
      onCancel={() => { onClose() }}
      wrapClassName="vertical-center-modal"
    >
      <p>
        <FormattedMessage {...messages.detail}
          values={{
            value: <b>
              {amount}
            </b>,
            fee: <b>
              {fee}
            </b>,
          }}
        />
      </p>
      <FormattedMessage {...messages.fromAddress} />
      <p>
        <a href={`https://tzscan.io/${fromAddress}`} rel="noopener noreferrer" target="_blank">
          <Icon type="link" />
          <span>
            {fromAddress}
          </span>
        </a>
      </p>
      <FormattedMessage {...messages.toAddress} />
      <p>
        <a href={`https://tzscan.io/${toAddress}`} rel="noopener noreferrer" target="_blank">
          <Icon type="link" />
          <span>
            {toAddress}
          </span>
        </a>
      </p>

    </Modal>
  )
}

SendConfirmModal.propTypes = {
  visible: PropTypes.bool,
  confirmSend: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  operation: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
}


export default injectIntl(SendConfirmModal)
