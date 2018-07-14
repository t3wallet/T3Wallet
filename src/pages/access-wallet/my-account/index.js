import React from 'react'
import { Page } from 'components'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import router from 'umi/router'
import { connect } from 'dva'
import styles from './index.less'
import { AccountPanel } from '../components'

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

  render () {
    const { myAccount } = this.props
    const { accounts, showNewAccountModal } = myAccount
    const { loading } = this.props
    return (
      <Page loading={loading} className={styles.dashboard}>
        <h1>
          <FormattedMessage id="myWallet.title" defaultMessage="Send Token & Delegation" />
        </h1>
        <AccountPanel
          accounts={accounts}
          addNewAccount={this.addNewAccount}
          showNewAccountModal={showNewAccountModal}
        />
      </Page>
    )
  }
}


myAccountIndex.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  myAccount: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    myAccount: state.myAccount,
  }
}

export default connect(mapStateToProps)(myAccountIndex)
