import React from 'react'
import {
  Card,
} from 'antd'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import TransferForm from './TransferForm'

const operations = [{
  key: 'transfer',
  tab: <FormattedMessage id="myWallet.transfer" defaultMessage="Transfer" />,
}, {
  key: 'delegate',
  tab: <FormattedMessage id="myWallet.delegate" defaultMessage="Delegate" />,
}]

class AccountCollapse extends React.Component {
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
      const { transferFormFields } = this.props
      const { activeTabKey } = this.state
      const content = {
        transfer: (
          <TransferForm transferFormFields={transferFormFields} />
        ),
        delegate: (
          <div>
delegate
          </div>
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

AccountCollapse.propTypes = {
  transferFormFields: PropTypes.object,
}


export default AccountCollapse
