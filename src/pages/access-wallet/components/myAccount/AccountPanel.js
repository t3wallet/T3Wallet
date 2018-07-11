import React from 'react'
import {
  Row, Col, Tooltip, Icon,
} from 'antd'
import PropTypes from 'prop-types'
import {
  intlShape, FormattedMessage, injectIntl, defineMessages,
} from 'react-intl'
import AccountOperationPanel from './AccountOperationPanel'
import AccountCollapse from './AccountCollapse'
import styles from './AccountPanel.less'

// originateAccountToolTip

const messages = defineMessages({
  toolTip: {
    id: 'myWallet.originateAccountToolTip',
    defaultMessage: 'You need to create an delegable which address starts with "KT" to delegate your baking right to a delegation service',
  },
})

const AccountPanel = ({
  accounts, addNewAccount, showNewAccountModal, transferFormFields, delegateFormFields, intl,
}) => {
  const { formatMessage } = intl
  return (
    <Row gutter={32} style={styles.container}>
      <Col span={15}>
        <AccountOperationPanel transferFormFields={transferFormFields} delegateFormFields={delegateFormFields} />
      </Col>
      <Col span={9}>
        <AccountCollapse accounts={accounts} showNewAccountModal={showNewAccountModal} />
        <Row type="flex" align="space-between" className={styles.buttonGroup}>
          <div>
            <a onClick={(e) => { addNewAccount(e) }}>
              <FormattedMessage id="myWallet.originateAccount" defaultMessage="+ New Delegable Account" />
            </a>
            <Tooltip placement="topLeft" title={formatMessage(messages.toolTip)} className={styles.toolTip}>
              <Icon type="question-circle-o" />
            </Tooltip>
          </div>

          <a onClick={(e) => { addNewAccount(e) }}>
            <FormattedMessage id="myWallet.logout" defaultMessage="Log out" />
          </a>
        </Row>
      </Col>
    </Row>
  )
}

AccountPanel.propTypes = {
  accounts: PropTypes.array,
  addNewAccount: PropTypes.func,
  showNewAccountModal: PropTypes.bool,
  transferFormFields: PropTypes.object,
  delegateFormFields: PropTypes.object,
  intl: intlShape.isRequired,
}

export default injectIntl(AccountPanel)
