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
import { AccountOperationPanel, AccountCollapse } from './components'
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
    console.log('hi')
  }

  logout = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'myAccount/logout',
    })
  }

  render () {
    const { myAccount } = this.props
    const { accounts, activeAccountIndex, showNewAccountModal } = myAccount
    const { loading, intl } = this.props
    const { formatMessage } = intl
    return (
      <Page loading={loading} className={styles.dashboard}>
        <h1>
          <FormattedMessage id="myWallet.title" defaultMessage="Send Token & Delegation" />
        </h1>
        <Row gutter={32} style={styles.container}>
          <Col md={15}>
            <AccountOperationPanel />
          </Col>
          <Col md={9}>
            <AccountCollapse accounts={accounts} showNewAccountModal={showNewAccountModal} />
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
      </Page>
    )
  }
}


myAccountIndex.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  myAccount: PropTypes.object,
  intl: intlShape.isRequired,
}

const mapStateToProps = (state) => {
  return {
    myAccount: state.myAccount,
  }
}

export default connect(mapStateToProps)(injectIntl(myAccountIndex))
