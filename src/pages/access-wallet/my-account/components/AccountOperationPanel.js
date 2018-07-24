import React from 'react'
import {
  Card, Tabs,
} from 'antd'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import TransferForm from './TransferForm'
import DelegateForm from './DelegateForm'

const AccountOperationPanel = ({
  onSendClick, onSetDelegateClick, sending, curAccount,
}) => {
  return (
    <Card style={{ width: '100%' }}>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={<FormattedMessage id="myAccount.transfer" defaultMessage="Transfer" />} key="1">
          <TransferForm onSendClick={onSendClick} sending={sending} curAccount={curAccount} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={<FormattedMessage id="myAccount.delegate" defaultMessage="Delegate" />}
          disabled={typeof curAccount === 'undefined' || curAccount && curAccount.type !== 'KT'}
          key="2"
        >
          <DelegateForm onSetDelegateClick={onSetDelegateClick} curAccount={curAccount} />
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
  curAccount: PropTypes.object,
}


export default AccountOperationPanel
