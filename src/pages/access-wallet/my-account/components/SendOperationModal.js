import React from 'react'
import { Modal, Button, Icon } from 'antd'
import {
  intlShape, injectIntl, defineMessages, FormattedMessage,
} from 'react-intl'
import PropTypes from 'prop-types'

const messages = defineMessages({
  title: {
    id: 'myAccount.operationSuccess',
    defaultMessage: 'Operation succeeds!',
  },
  confirmButton: {
    id: 'myAccount.confirm',
    defaultMessage: 'Confirm',
  },
  checkOperationHash: {
    id: 'myAccount.checkOperationHash',
    defaultMessage: 'Check your operation hash: ',
  },
  operationModalContent: {
    id: 'myAccount.sendOperationModalContent',
    defaultMessage: 'Your operation should be visible within a couple of minutes',
  },
})

const SendOperationModal = ({
  visible, opHash, intl, onClose, opType,
}) => {
  const { formatMessage } = intl
  return (
    <Modal
      title={(
        <span>
          <Icon type="check-circle-o" style={{ marginRight: '8px', color: 'green' }} />
          {formatMessage(messages.title)}
        </span>
      )}
      centered
      visible={visible}
      onCancel={() => { onClose() }}
      wrapClassName="vertical-center-modal"
      footer={[
        <Button key="submit" type="primary" onClick={() => { onClose() }}>
          <FormattedMessage id="myAccount.confirm" defaultMessage="Confirm" />
        </Button>,
      ]}
    >
      <p>
        <FormattedMessage {...messages.checkOperationHash} />
      </p>
      <p>
        <a href={`https://tzscan.io/${opHash}${opType ? `?default=${opType}` : ''}`} rel="noopener noreferrer" target="_blank">
          <Icon type="link" />
          <span>
            {opHash}
          </span>
        </a>
      </p>
      <p>
        <FormattedMessage {...messages.operationModalContent} />
      </p>
    </Modal>
  )
}

SendOperationModal.propTypes = {
  visible: PropTypes.bool,
  opHash: PropTypes.string,
  intl: intlShape.isRequired,
  onClose: PropTypes.func,
  opType: PropTypes.string,
}


export default injectIntl(SendOperationModal)
