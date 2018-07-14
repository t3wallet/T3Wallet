import React from 'react'
import { connect } from 'dva'
import { Card, Tabs } from 'antd'
import { Page } from 'components'
import PropTypes from 'prop-types'
import {
  intlShape, injectIntl, defineMessages, FormattedMessage,
} from 'react-intl'
import {
  ViewOnly, Mnemonic, Fundraiser, PrivateKey,
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
  constructor () {
    super()
    this.state = {
      tabPosition: 'left',
    }
  }

  componentDidMount () {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateDimensions)
  }


  updateDimensions = () => {
    if (window.innerWidth < 768) {
      this.setState({ tabPosition: 'top' })
    } else {
      this.setState({ tabPosition: 'left' })
    }
  }

  render () {
    const {
      intl, loading,
    } = this.props
    const { formatMessage } = intl
    const { tabPosition } = this.state
    return (
      <Page loading={loading}>
        <h1>
          <FormattedMessage id="myWallet.title" defaultMessage="Send Token & Delegation" />
        </h1>
        <Card loading={loading} bordered={false} className={styles.container}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <FormattedMessage {...messages.title} />
            </div>
            <div>
              <Tabs tabPosition={tabPosition} size="large" defaultActiveKey={null}>
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
  intl: intlShape.isRequired,
}

const mapStateToProps = (state) => {
  return {
    accessWallet: state.accessWallet,
  }
}

export default connect(mapStateToProps)(injectIntl(AccessWallet))
