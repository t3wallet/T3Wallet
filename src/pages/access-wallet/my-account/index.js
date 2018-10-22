import React from 'react'
import { Page } from 'components'
import {
  intlShape, FormattedMessage, injectIntl, defineMessages,
} from 'react-intl'
import router from 'umi/router'
import {
  Row, Col, Tooltip, Icon, Modal,
} from 'antd'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import ReactTimeout from 'react-timeout'

import {
  AccountOperationPanel,
  AccountCollapse,
  SendOperationModal,
  SendConfirmModal,
  LedgerSignModal,
} from './components'
import styles from './index.less'

const messages = defineMessages({
  title: {
    id: 'myAccount.title',
    defaultMessage: 'Send Token & Delegation',
  },
  toolTip: {
    id: 'myAccount.originateAccountToolTip',
    defaultMessage: 'You need to create an delegatable which address starts with "KT" to delegate your baking right to a delegation service',
  },
  originationModalTitle: {
    id: 'myAccount.originateModalTitle',
    defaultMessage: 'Create an delegatable account (Origination Account)',
  },
  originationModalContent: {
    id: 'myAccount.originateModalContent',
    defaultMessage: 'This operation need to spend ~0.25ꜩ. If you need to access delegation option and delegate your tokens, this step is necessary.',
  },
})

class myAccountIndex extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sendConfirmModalVisible: false,
      sendConfirmModalContent: {},
    }
  }

  UNSAFE_componentWillMount () {
    const { account } = this.props
    const { accounts } = account
    if (!accounts.length) {
      router.push('/access-wallet')
    }
  }

  componentDidMount () {
    this.initAccount()
  }

  componentWillUnmount () {
    const { dispatch } = this.props
    dispatch({
      type: 'account/logout',
    })
  }

  initAccount = () => {
    const { dispatch, setInterval } = this.props
    dispatch({
      type: 'account/loadKTAccounts',
    })
    setInterval(this.refreshAccounts, 40000)
  };

  refreshAccounts = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'account/refreshAccounts',
    })
  };

  confirmOriginateAcountModal = () => {
    const { dispatch, intl } = this.props
    const { formatMessage } = intl
    Modal.confirm({
      title: formatMessage(messages.originationModalTitle),
      content: formatMessage(messages.originationModalContent),
      onOk () {
        dispatch({
          type: 'account/originateAccount',
        })
      },
    })
  };

  closeOriginateAccountModal = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'account/closeOriginateAccountModal',
    })
  };

  closeSendOperationModal = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'account/closeSendOperationModal',
    })
  };

  closeLedgerSignModal = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'account/toggleLedgerSignModal',
      payload: { isShow: false },
    })
  }

  openSendConfirmModal = (payload) => {
    this.setState({
      sendConfirmModalContent: payload,
      sendConfirmModalVisible: true,
    })
  };

  closeSendConfirmModal = () => {
    this.setState({
      sendConfirmModalVisible: false,
      sendConfirmModalContent: {},
    })
  };

  logout = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'account/logout',
    })
    router.push('/access-wallet')
  };

  onAccountChange = (activeAccountIndex) => {
    const { dispatch } = this.props
    dispatch({
      type: 'account/changeActiveAccount',
      payload: { activeAccountIndex },
    })
  };

  onSend = ({ payload }) => {
    this.setState({
      sendConfirmModalVisible: false,
      sendConfirmModalContent: {},
    })
    const { dispatch } = this.props
    const sendOperation = payload
    dispatch({
      type: 'account/sendToken',
      payload: sendOperation,
    })
  };

  onSetDelegateClick = (payload) => {
    const { dispatch } = this.props
    dispatch({
      type: 'account/setDelegation',
      payload,
    })
  };

  render () {
    const { account, loading, intl } = this.props
    const { sendConfirmModalContent, sendConfirmModalVisible } = this.state
    const {
      accounts,
      activeAccountIndex,
      showNewAccountModal,
      sendOperationModalVisible,
      ledgerSignModalVisible,
      lastOpHash,
      opType,
    } = account
    const { formatMessage } = intl

    return (
      <Page loading={loading.global} className={styles.container}>
        <h1>
          <FormattedMessage {...messages.title} />
        </h1>
        <Row gutter={32}>
          <Col md={15}>
            <AccountOperationPanel
              accounts={accounts}
              activeAccountIndex={activeAccountIndex}
              onSendClick={this.openSendConfirmModal}
              onSetDelegateClick={this.onSetDelegateClick}
              sending={loading.effects['account/sendToken']}
              delegating={loading.effects['account/setDelegation']}
            />
          </Col>
          <Col md={9}>
            <AccountCollapse
              accounts={accounts}
              onAccountChange={this.onAccountChange}
              activeAccountIndex={activeAccountIndex}
              showNewAccountModal={showNewAccountModal}
            />
            <Row
              type="flex"
              align="space-between"
              className={styles.buttonGroup}
            >
              <div>
                <a
                  onClick={() => {
                    this.confirmOriginateAcountModal()
                  }}
                >
                  <FormattedMessage
                    id="myAccount.originateAccount"
                    defaultMessage="+ New Delegatable Account"
                  />
                </a>
                <Tooltip
                  placement="topLeft"
                  title={formatMessage(messages.toolTip)}
                  className={styles.toolTip}
                >
                  <Icon type="question-circle-o" />
                </Tooltip>
              </div>

              <a
                onClick={() => {
                  this.logout()
                }}
              >
                <FormattedMessage
                  id="myAccount.logout"
                  defaultMessage="Log out"
                />
              </a>
            </Row>
          </Col>
        </Row>

        <SendOperationModal
          visible={sendOperationModalVisible}
          opHash={lastOpHash}
          opType={opType}
          onClose={this.closeSendOperationModal}
        />
        <SendConfirmModal
          visible={sendConfirmModalVisible}
          operation={sendConfirmModalContent}
          confirmSend={this.onSend}
          onClose={this.closeSendConfirmModal}
        />
        <LedgerSignModal
          visible={ledgerSignModalVisible}
          onCancel={this.closeLedgerSignModal}
        />
      </Page>
    )
  }
}


myAccountIndex.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  account: PropTypes.object,
  intl: intlShape.isRequired,
  setInterval: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    loading: state.loading,
  }
}

export default connect(mapStateToProps)(ReactTimeout(injectIntl(myAccountIndex)))
