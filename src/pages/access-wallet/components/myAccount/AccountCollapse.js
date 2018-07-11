import React from 'react'
import { Collapse, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import Blockies from 'react-blockies'
import styles from './AccountCollapse.less'

const { Panel } = Collapse

const AccountCollapse = ({ accounts }) => {
  return (
    <Collapse accordion bordered={false} defaultActiveKey={['0']}>
      { accounts.map((account, index) => {
        let header
        if (account.type === 'manager') {
          header = <FormattedMessage id="myWallet.managerWallet" defaultMessage="Main Manager Wallet" />
        } else {
          header = <FormattedMessage id="myWallet.delegableWallet" defaultMessage="Delegable Wallet" />
        }
        return (
          <Panel header={header} key={index}>
            <Row className={styles.section}>
              <h3>
                <FormattedMessage id="myWallet.walletAddress" defaultMessage="Wallet Address" />
              </h3>
              <Row type="flex" align="middle" className={styles.infoContainer}>
                <Col span={4}>
                  <Blockies seed={account.address} size={5} scale={10} />
                </Col>
                <Col span={20} type="flex">
                  <span className={styles.value}>
                    {account.address}
                  </span>
                </Col>
              </Row>
            </Row>
            <Row className={styles.section}>
              <h3>
                <FormattedMessage id="myWallet.walletBalance" defaultMessage="Wallet Balance" />
              </h3>
              <div className={styles.infoContainer}>
                <span className={styles.value}>
                  {`${account.balance} ꜩ`}
                </span>
              </div>
            </Row>
            <Row className={styles.section}>
              <h3>
                <FormattedMessage id="myWallet.transactionHistory" defaultMessage="Transaction History" />
              </h3>
              <Row className={styles.infoContainer}>
                <Col style={{ marginBottom: 5 }}>
                  <a href={`http://tzscan.io/${account.address}`} rel="noopener noreferrer" target="_blank">
                    <span className={styles.explorer}>
                    TzScan.io
                    </span>
                  </a>
                </Col>
                <Col>
                  <a href={`https://tezos.id/account/${account.address}`} rel="noopener noreferrer" target="_blank">
                    <span className={styles.explorer}>
                    Tezos.id
                    </span>
                  </a>
                </Col>
              </Row>
            </Row>
          </Panel>
        )
      })}
    </Collapse>
  )
}

AccountCollapse.propTypes = {
  accounts: PropTypes.array.isRequired,
}

export default AccountCollapse
