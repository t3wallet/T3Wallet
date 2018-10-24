import React from 'react'
import {
  Modal, Icon, Col, Row,
} from 'antd'
import {
  intlShape, injectIntl, defineMessages,
} from 'react-intl'
import PropTypes from 'prop-types'

const messages = defineMessages({
  title: {
    id: 'myAccount.signOnLedger',
    defaultMessage: 'Please sign Transaction on Ledger.',
  },
  cancel: {
    id: 'myAccount.cancel',
    defaultMessage: 'Cancel',
  },
  ledgerConfirmText: {
    id: 'accessWallet.ledgerConfirmText',
    defaultMessage: 'Please press confirm button on your Ledger device.',
  },
})

const LedgerSignModal = ({ visible, onCancel, intl }) => {
  const { formatMessage } = intl
  return (
    <Modal
      title={(
        <span>
          <Icon
            type="check-circle-o"
            style={{ marginRight: '8px', color: 'green' }}
          />
          {formatMessage(messages.title)}
        </span>
      )}
      centered
      visible={visible}
      wrapClassName="vertical-center-modal"
      footer={null}
      onCancel={onCancel}
    >
      <div>
        <Col type="flex">
          <Row type="flex" justify="center">
            <svg t="1540363076142" className="icon" viewBox="0 0 1024 1024" version="1.1" width="100" height="100">
              <defs><style type="text/css" /></defs>
              <path d="M512 914.432l-2.048-0.512c-333.824-111.104-330.24-415.744-329.728-428.544V179.712h10.752c187.904 0 284.672-45.568 317.952-65.024l3.584-2.048 3.584 2.048c32.768 19.456 129.536 65.024 317.952 65.024h10.752v305.152c0 3.584-8.704 323.584-329.728 428.544l-3.072 1.024z" fill="#D2EEFF" p-id="2152" />
              <path d="M934.912 89.088c-4.608-4.608-11.776-7.168-18.944-7.168-275.456 6.144-386.048-75.264-386.56-75.776-9.216-7.68-24.064-7.68-33.28 0-1.536 0-103.936 75.776-357.376 75.776-9.728 0-19.968 0-30.72-0.512-7.68 0-13.824 2.56-18.432 7.168-5.12 5.12-8.192 11.776-8.192 18.944v372.224c0 4.096-5.12 405.504 422.4 542.72 2.56 1.024 5.632 1.024 8.192 1.024s5.632-0.512 8.192-1.024c413.184-129.024 422.4-537.6 422.912-542.208V107.52c-0.512-6.656-3.072-13.824-8.192-18.432z m-45.568 45.056v346.112c0 3.584-10.24 370.176-377.344 489.984-381.952-126.976-377.856-474.624-377.856-489.472V134.144h4.096c217.6 0 331.264-51.712 373.248-76.8 42.496 25.088 155.648 76.8 373.248 76.8h4.608z" fill="#5090F3" p-id="2153" />
              <path d="M844.288 364.032L271.872 750.592c9.728 12.8 20.48 25.088 32.256 37.376l540.16-365.056V364.032zM844.288 206.848L208.896 635.904c10.752 28.672 25.088 58.88 45.056 89.088l590.336-398.848V206.848z" fill="#5090F3" p-id="2154" />
            </svg>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: '20px', fontSize: '20px' }}>
            <text>Please press confirm button on your ledger device.</text>
          </Row>
        </Col>
      </div>
    </Modal>
  )
}

LedgerSignModal.propTypes = {
  visible: PropTypes.bool,
  intl: intlShape.isRequired,
  onCancel: PropTypes.func,
}


export default injectIntl(LedgerSignModal)
