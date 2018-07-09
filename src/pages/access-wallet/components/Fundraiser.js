import React from 'react'
import { Input, Button } from 'antd'
import { FormattedMessage } from 'react-intl'
import styles from './styles.less'

const Fundraiser = () => {
  return (
    <div>
      <Input.TextArea rows={4} placeholder="Fundraiser Seed Word" />
      <Input placeholder="Fundraiser Email Address" />
      <Input placeholder="Fundraiser Password" />
      <Input placeholder="Fundraiser Address" />
      <Input placeholder="Activation Code" />
      <Button type="primary" size="large" className={styles.button}>
        <FormattedMessage id="accessWallet.unlockWallet" defaultMessage="Unlock Your Wallet" />
      </Button>
    </div>
  )
}

export default Fundraiser
