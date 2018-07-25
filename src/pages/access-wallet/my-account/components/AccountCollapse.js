import React from 'react'
import {
  Collapse, Row, Col, Tag,
} from 'antd'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import Blockies from 'react-blockies'
import styles from './AccountCollapse.less'

const { Panel } = Collapse

const AccountCollapse = ({ accounts, onAccountChange, activeAccountIndex }) => {
  return (
    <Collapse accordion bordered={false} onChange={onAccountChange} defaultActiveKey={activeAccountIndex}>
      { accounts.map((account, index) => {
        console.log(account)
        let header
        if (account.type === 'tz') {
          header = (
            <Row type="flex" align="space-between">
              <Col>
                <FormattedMessage id="myAccount.managerWallet" defaultMessage="Main Manager Wallet" />
              </Col>
              <Col />
            </Row>
          )
        } else {
          let delegableTag
          if (account.delegatable) {
            delegableTag = (
              <Tag color={account.delegatable ? 'green' : 'orange'}>
                <FormattedMessage id="myAccount.delegable" defaultMessage="Delegatable" />
              </Tag>
            )
          } else {
            delegableTag = (
              <Tag color={account.delegatable ? 'green' : 'orange'}>
                <FormattedMessage id="myAccount.notDelegable" defaultMessage="Not Delegatable" />
              </Tag>
            )
          }
          header = (
            <Row type="flex" align="space-between">
              <Col>
                <FormattedMessage id="myAccount.delegableWallet" defaultMessage="Delegable Wallet" />
              </Col>
              <Col>
                {delegableTag}
              </Col>
            </Row>
          )
        }
        return (
          <Panel header={header} key={index}>
            <Row className={styles.section}>
              <h3>
                <FormattedMessage id="myAccount.walletAddress" defaultMessage="Wallet Address" />
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
                <FormattedMessage id="myAccount.walletBalance" defaultMessage="Wallet Balance" />
              </h3>
              <div className={styles.infoContainer}>
                <span className={styles.value}>
                  {`${typeof account.balance === 'undefined' ? 'loading' : account.balance} ꜩ`}
                </span>
              </div>
            </Row>
            <Row className={styles.section}>
              <h3>
                <FormattedMessage id="myAccount.transactionHistory" defaultMessage="Transaction History" />
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
  onAccountChange: PropTypes.func,
  activeAccountIndex: PropTypes.string,
}

export default AccountCollapse
