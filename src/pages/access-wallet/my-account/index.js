import React from 'react'
import { Page } from 'components'
import PropTypes from 'prop-types'
import {
  intlShape, FormattedMessage, injectIntl, defineMessages,
} from 'react-intl'
import router from 'umi/router'
import {
  Row, Col, Tooltip, Icon,
} from 'antd'
import { connect } from 'dva'
import { AccountOperationPanel, AccountCollapse, SendOperationModal } from './components'
import styles from './index.less'

const messages = defineMessages({
  toolTip: {
    id: 'myWallet.originateAccountToolTip',
    defaultMessage: 'You need to create an delegable which address starts with "KT" to delegate your baking right to a delegation service',
  },
})
class myAccountIndex extends React.Component {
  componentDidMount () {
    const { myAccount, dispatch } = this.props
    const { accountLoaded, accounts } = myAccount
    if (!accountLoaded) {
      router.push('/access-wallet')
    } else {
      dispatch({
        type: 'myAccount/loadAccount',
        payload: accounts[0].address,
      })
    }
  }

  componentWillUnmount () {
    const { dispatch } = this.props
    dispatch({
      type: 'myAccount/logout',
    })
  }

  addNewAccount = () => {
    console.log('placeholder')
  }

  closeSendOperationModal = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'myAccount/closeSendOperationModal',
    })
  }

  logout = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'myAccount/logout',
    })
    router.push('/access-wallet')
  }

  onAccountChange = (accountAddress) => {
    const { dispatch } = this.props
    dispatch({
      type: 'myAccount/changeActiveAccount',
      payload: { accountAddress },
    })
  }

  onSendClick = (payload) => {
    // payload = {toAddress, amountToSend, gas, data = 'undefined',}
    const { dispatch } = this.props
    dispatch({
      type: 'myAccount/sendToken',
      payload,
    })
  }

  onSetDelegateClick = ({ delegation }) => {
    console.log(delegation)
  }

  render () {
    const { myAccount, loading, intl } = this.props
    const {
      accounts, activeAccountIndex, showNewAccountModal, sendOperationModalVisible, lastOpHash, sending,
    } = myAccount
    const { formatMessage } = intl
    return (
      <Page loading={loading.global} className={styles.dashboard}>
        <h1>
          <FormattedMessage id="myWallet.title" defaultMessage="Send Token & Delegation" />
        </h1>
        <Row gutter={32} style={styles.container}>
          <Col md={15}>
            <AccountOperationPanel
              onSendClick={this.onSendClick}
              onSetDelegateClick={this.onSetDelegateClick}
              sending={sending}
            />
          </Col>
          <Col md={9}>
            <AccountCollapse
              accounts={accounts}
              onAccountChange={this.onAccountChange}
              activeAccountIndex={activeAccountIndex}
              showNewAccountModal={showNewAccountModal}
            />
            <Row type="flex" align="space-between" className={styles.buttonGroup}>
              <div>
                <a onClick={(e) => { this.addNewAccount(e) }}>
                  <FormattedMessage id="myWallet.originateAccount" defaultMessage="+ New Delegable Account" />
                </a>
                <Tooltip placement="topLeft" title={formatMessage(messages.toolTip)} className={styles.toolTip}>
                  <Icon type="question-circle-o" />
                </Tooltip>
              </div>

              <a onClick={() => { this.logout() }}>
                <FormattedMessage id="myWallet.logout" defaultMessage="Log out" />
              </a>
            </Row>
          </Col>
        </Row>

        <SendOperationModal visible={sendOperationModalVisible} opHash={lastOpHash} onClose={this.closeSendOperationModal} />
      </Page>
    )
  }
}


myAccountIndex.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  myAccount: PropTypes.object,
  intl: intlShape.isRequired,
}

const mapStateToProps = (state) => {
  return {
    myAccount: state.myAccount,
    loading: state.loading,
  }
}

export default connect(mapStateToProps)(injectIntl(myAccountIndex))
