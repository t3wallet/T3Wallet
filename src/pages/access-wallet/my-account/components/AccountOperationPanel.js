import React from 'react'
import {
  Card,
} from 'antd'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import TransferForm from './TransferForm'
import DelegateForm from './DelegateForm'

const operations = [{
  key: 'transfer',
  tab: <FormattedMessage id="myWallet.transfer" defaultMessage="Transfer" />,
}, {
  key: 'delegate',
  tab: <FormattedMessage id="myWallet.delegate" defaultMessage="Delegate" />,
}]

class AccountOperationPanel extends React.Component {
    state = {
      activeTabKey: 'transfer',
    }

    onTabChange = (key, type) => {
      this.setState({ [type]: key })
    }

    onFormSubmit = (e) => {
      e.preventDefault()
    }


    render () {
      const { onSendClick, onSetDelegateClick, loading } = this.props
      const { activeTabKey } = this.state
      const content = {
        transfer: (
          <TransferForm onSendClick={onSendClick} loading={loading} />
        ),
        delegate: (
          <DelegateForm onSetDelegateClick={onSetDelegateClick} />
        ),
      }
      return (
        <div>
          <Card
            style={{ width: '100%' }}
            tabList={operations}
            activeTabKey={activeTabKey}
            onTabChange={(key) => { this.onTabChange(key, 'activeTabKey') }}
          >
            {content[activeTabKey]}
          </Card>
        </div>
      )
    }
}

AccountOperationPanel.propTypes = {
  onSendClick: PropTypes.func,
  onSetDelegateClick: PropTypes.func,
  loading: PropTypes.bool,
}


export default AccountOperationPanel
