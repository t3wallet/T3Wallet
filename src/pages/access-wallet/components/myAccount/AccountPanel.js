import React from 'react'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import AccountOperationPanel from './AccountOperationPanel'
import AccountCollapse from './AccountCollapse'

const AccountPanel = ({
  accounts, addNewAccount, showNewAccountModal, transferFormFields,
}) => {
  return (
    <div>
      <Row gutter={32}>
        <Col span={15}>
          <AccountOperationPanel transferFormFields={transferFormFields} />
        </Col>
        <Col span={9}>
          <AccountCollapse accounts={accounts} />
          <div>
            <a onClick={(e) => { addNewAccount(e) }}>
              <FormattedMessage id="myWallet.newDelegableAccount" defaultMessage="+ New Delegable Account" />
            </a>
          </div>
        </Col>
      </Row>
    </div>
  )
}

AccountPanel.propTypes = {
  accounts: PropTypes.array,
  addNewAccount: PropTypes.func,
  showNewAccountModal: PropTypes.bool,
  transferFormFields: PropTypes.object,
}

export default AccountPanel
