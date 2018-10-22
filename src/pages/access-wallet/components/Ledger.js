import React from 'react'
import { Button } from 'antd'
import {
  intlShape,
  injectIntl,
  defineMessages,
  FormattedMessage,
} from 'react-intl'
import PropTypes from 'prop-types'
import LedgerPathSelectionModal from './LedgerPathSelectionModal'
import styles from './styles.less'

const messages = defineMessages({
  ledgerHardwareWallet: {
    id: 'accessWallet.ledgerHardwareWallet',
    defaultMessage: 'Ledger Hardware Wallet',
  },
  connectToLedger: {
    id: 'accessWallet.connectToLedger',
    defaultMessage: 'Connect to Ledger Wallet',
  },
  errorMessage: {
    id: 'accessWallet.errorMessage',
    defaultMessage: 'Place check your input',
  },
})

const Ledger = ({
  intl, openModal, closeModal, modalVisible, asciiArtVisible, onUnlock,
}) => {
  return (
    <div>
      <h2 className={styles.title}>
        <FormattedMessage {...messages.ledgerHardwareWallet} />
      </h2>
      <Button
        type="primary"
        size="large"
        className={styles.button}
        onClick={openModal}
      >
        <FormattedMessage {...messages.connectToLedger} />
      </Button>
      <LedgerPathSelectionModal
        visible={modalVisible}
        asciiArtVisible={asciiArtVisible}
        intl={intl}
        onConfirm={onUnlock}
        onClose={closeModal}
      />
    </div>
  )
}

Ledger.propTypes = {
  intl: intlShape.isRequired,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  modalVisible: PropTypes.bool,
  asciiArtVisible: PropTypes.bool,
  onUnlock: PropTypes.func,
}

export default injectIntl(Ledger)
