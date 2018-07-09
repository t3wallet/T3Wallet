import React from 'react'
import { Input, Button } from 'antd'
import { FormattedMessage } from 'react-intl'
import styles from './styles.less'

const ViewOnly = () => {
  return (
    <div>
      <Input.TextArea rows={2} placeholder="Your Address" />
      <Button type="primary" size="large" className={styles.button}>
        <FormattedMessage id="accessWallet.viewAddress" defaultMessage="View This Address" />
      </Button>
    </div>
  )
}

export default ViewOnly
