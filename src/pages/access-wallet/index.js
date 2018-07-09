import React from 'react'
import { connect } from 'dva'
import { Card, Tabs } from 'antd'
import { Page } from 'components'
import PropTypes from 'prop-types'
import {
  ViewOnly, Mnemonic, Fundraiser, PrivateKey,
} from './components'
import styles from './index.less'

class AccessWallet extends React.Component {
  render () {
    const { loading } = this.props
    return (
      <Page loading={loading} className={styles.dashboard}>
        <h1>
Access Wallet / Send Token / Delegation
        </h1>
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
      </Page>
    )
  }
}

AccessWallet.propTypes = {
  loading: PropTypes.bool,
}

export default connect()(AccessWallet)
