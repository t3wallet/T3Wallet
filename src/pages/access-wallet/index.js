import React from 'react'
import { connect } from 'dva'
import { Card, Tabs } from 'antd'
import { Page } from 'components'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import {
  AccountPanel, ViewOnly, Mnemonic, Fundraiser, PrivateKey,
} from './components'
import styles from './index.less'

class AccessWallet extends React.Component {
  addNewAccount = (e) => {
    e.preventDefault()
  }

  render () {
    const {
      loading, walletLoaded, accounts, showNewAccountModal, transferFormFields, delegateFormFields,
    } = this.props
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
        <Card loading={loading} bordered={false}>
          <div>
            <div style={{ marginBottom: 16 }}>
              How do you want access your wallet?
            </div>
            <div>
              <Tabs tabPosition="left" size="large" defaultActiveKey="">
                <Tabs.TabPane tab="View Only" key="1">
                  <ViewOnly />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Mnemonic Words" key="2">
                  <Mnemonic />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Mnemonic Words" key="3">
                  <Fundraiser />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Private Key" key="4">
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
}

AccessWallet.propTypes = {
  loading: PropTypes.bool,
  walletLoaded: PropTypes.bool,
  accounts: PropTypes.array,
  showNewAccountModal: PropTypes.bool,
  transferFormFields: PropTypes.object,
  delegateFormFields: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    walletLoaded: state.accessWallet.walletLoaded,
    accounts: state.myWallet.accounts,
    transferFormFields: state.myWallet.transferFormFields,
    delegateFormFields: state.myWallet.delegateFormFields,
  }
}

export default connect(mapStateToProps)(AccessWallet)
