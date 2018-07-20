import React from 'react'
import { Modal, Button, Icon } from 'antd'
import {
  intlShape, injectIntl, defineMessages, FormattedMessage,
} from 'react-intl'
import PropTypes from 'prop-types'

const messages = defineMessages({
  title: {
    id: 'myWallet.operationSuccess',
    defaultMessage: 'Operation succeeds!',
  },
  confirmButton: {
    id: 'myWallet.confirm',
    defaultMessage: 'Confirm',
  },
  checkOperationHash: {
    id: 'myWallet.checkOperationHash',
    defaultMessage: 'Check your operation hash: ',
  },
})

const SendOperationModal = ({
  visible, opHash, intl, onClose,
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
      visible={visible}
      onCancel={() => { onClose() }}
      wrapClassName="vertical-center-modal"
      footer={[
        <Button key="submit" type="primary" onClick={() => { onClose() }}>
          <FormattedMessage id="myWallet.confirm" defaultMessage="Confirm" />
        </Button>,
      ]}
    >
      <p>
        <FormattedMessage {...messages.checkOperationHash} />
      </p>
      <p>
        <a href={`http://tzscan.io/${opHash}`} rel="noopener noreferrer" target="_blank">
          <Icon type="link" />
          <span>
            {opHash}
          </span>
        </a>
      </p>
    </Modal>
  )
}

SendOperationModal.propTypes = {
  visible: PropTypes.bool,
  opHash: PropTypes.string,
  intl: intlShape.isRequired,
  onClose: PropTypes.func,
}


export default injectIntl(SendOperationModal)