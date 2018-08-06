import React from 'react'
import {
  Collapse, Row, Col, Tag,
} from 'antd'
import { FormattedMessage } from 'react-intl'
import Blockies from 'react-blockies'
import PropTypes from 'prop-types'
import styles from './AccountCollapse.less'

const { Panel } = Collapse

const AccountCollapse = ({ accounts, onAccountChange, activeAccountIndex }) => {
  return (
    <Collapse accordion bordered={false} onChange={onAccountChange} defaultActiveKey={activeAccountIndex}>
      { accounts.map((account, index) => {
        let header
        if (account.kind === 'manager') {
          header = <FormattedMessage id="myAccount.managerWallet" defaultMessage="Main Manager Wallet" />
        } else if (account.kind === 'origination') {
          let delegatableTag
          if (account.delegate) {
            const { setable } = account.delegate
            delegatableTag = (
              <Tag color={setable ? 'green' : 'orange'}>
                {
                  setable ? <FormattedMessage id="myAccount.delegatable" defaultMessage="Delegatable" /> : <FormattedMessage id="myAccount.notDelegatable" defaultMessage="Not Delegatable" />
                }
              </Tag>
            )
          }
          header = (
            <Row type="flex" align="space-between">
              <FormattedMessage id="myAccount.originationWallet" defaultMessage="Origination Wallet" />
              <Col>
                {delegatableTag}
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
            { account.kind === 'origination' ? (
              <Row className={styles.section}>
                <h3>
                  <FormattedMessage id="myAccount.curDelegation" defaultMessage="Current Delegation" />
                </h3>
                <div className={styles.infoContainer}>
                  <span className={styles.value}>
                    {account.delegate && account.delegate.value ? account.delegate.value : (
                      <span>
                        <FormattedMessage id="myAccount.notSet" defaultMessage="Not Set" />
                      </span>
                    )}
                  </span>
                </div>
              </Row>) : null
            }

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
                {/* <Col>
                  <a href={`https://tezos.id/account/${account.address}`} rel="noopener noreferrer" target="_blank">
                    <span className={styles.explorer}>
                    Tezos.id
                    </span>
                  </a>
                </Col> */}
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
