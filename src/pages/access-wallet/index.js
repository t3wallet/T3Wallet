import React from 'react'
import { connect } from 'dva'
import { Card, Tabs } from 'antd'
import { Page } from 'components'
import PropTypes from 'prop-types'
import {
  intlShape, injectIntl, defineMessages, FormattedMessage,
} from 'react-intl'
import {
  AccountPanel, ViewOnly, Mnemonic, Fundraiser, PrivateKey,
} from './components'
import styles from './index.less'

const messages = defineMessages({
  title: {
    id: 'accessWallet.title',
    defaultMessage: 'How do you want to access your wallet',
  },
  viewOnly: {
    id: 'accessWallet.viewOnly',
    defaultMessage: 'View Only',
  },
  mnemonic: {
    id: 'accessWallet.mnemonic',
    defaultMessage: 'Mnemonic Phrase',
  },
  fundraiser: {
    id: 'accessWallet.fundraiser',
    defaultMessage: 'Fundraiser Wallet',
  },
  privateKey: {
    id: 'accessWallet.privateKey',
    defaultMessage: 'Private Key',
  },
})

class AccessWallet extends React.Component {
  addNewAccount = (e) => {
    e.preventDefault()
  }

  render () {
    const {
      intl, loading, accounts, showNewAccountModal, transferFormFields, delegateFormFields, accessWallet,
    } = this.props
    const { walletLoaded } = accessWallet
    const { formatMessage } = intl

    let panel
    if (walletLoaded) {
      panel = (
        <AccountPanel
          accounts={accounts}
          addNewAccount={this.addNewAccount}
          showNewAccountModal={showNewAccountModal}
          transferFormFields={transferFormFields}
          delegateFormFields={delegateFormFields}
        />
      )
    } else {
      panel = (
        <Card loading={loading} bordered={false} className={styles.container}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <FormattedMessage {...messages.title} />
            </div>
            <div>
              <Tabs tabPosition="left" size="large" defaultActiveKey="">
                <Tabs.TabPane tab={formatMessage(messages.viewOnly)} key="1">
                  <ViewOnly />
                </Tabs.TabPane>
                <Tabs.TabPane tab={formatMessage(messages.mnemonic)} key="2">
                  <Mnemonic onUnlock={this._onUnlockClick} />
                </Tabs.TabPane>
                <Tabs.TabPane tab={formatMessage(messages.fundraiser)} key="3">
                  <Fundraiser />
                </Tabs.TabPane>
                <Tabs.TabPane tab={formatMessage(messages.privateKey)} key="4">
                  <PrivateKey />
                </Tabs.TabPane>
              </Tabs>
            </div>
          </div>
        </Card>
      )
    }
    return (
      <Page loading={loading} className={styles.dashboard}>
        <h1>
          <FormattedMessage id="myWallet.title" defaultMessage="Send Token & Delegation" />
        </h1>
        {panel}
      </Page>
    )
  }

  _onUnlockClick = (payload) => {
    const { dispatch } = this.props
    dispatch({
      type: 'accessWallet/unlockWallet',
      payload, // {walletType: '', payload: {} }
    })
  }
}

AccessWallet.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  accessWallet: PropTypes.object,
  accounts: PropTypes.array,
  showNewAccountModal: PropTypes.bool,
  transferFormFields: PropTypes.object,
  delegateFormFields: PropTypes.object,
  intl: intlShape.isRequired,
}

const mapStateToProps = (state) => {
  return {
    accessWallet: state.accessWallet,
    accounts: state.myWallet.accounts,
    transferFormFields: state.myWallet.transferFormFields,
    delegateFormFields: state.myWallet.delegateFormFields,
  }
}

export default connect(mapStateToProps)(injectIntl(AccessWallet))
