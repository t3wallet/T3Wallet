import React from 'react'
import {
  Card, Tabs,
} from 'antd'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import TransferForm from './TransferForm'
import DelegateForm from './DelegateForm'

const AccountOperationPanel = ({
  onSendClick, onSetDelegateClick, sending, account,
}) => {
  return (
    <Card style={{ width: '100%' }}>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={<FormattedMessage id="myWallet.transfer" defaultMessage="Transfer" />} key="1">
          <TransferForm onSendClick={onSendClick} sending={sending} account={account} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<FormattedMessage id="myWallet.delegate" defaultMessage="Delegate" />} disabled={account && account.type !== 'KT'} key="2">
          <DelegateForm onSetDelegateClick={onSetDelegateClick} account={account} />
        </Tabs.TabPane>
      </Tabs>
,
    </Card>
  )
}

AccountOperationPanel.propTypes = {
  onSendClick: PropTypes.func,
  onSetDelegateClick: PropTypes.func,
  sending: PropTypes.bool,
  account: PropTypes.object,
}


export default AccountOperationPanel
