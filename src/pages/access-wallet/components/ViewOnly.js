import React from 'react'
import { Input, Button } from 'antd'
import {
  intlShape, injectIntl, defineMessages, FormattedMessage,
} from 'react-intl'
import PropTypes from 'prop-types'
import styles from './styles.less'

const messages = defineMessages({
  address: {
    id: 'accessWallet.viewOnlyAddress',
    defaultMessage: 'Address',
  },
  button: {
    id: 'accessWallet.viewAddress',
    defaultMessage: 'View This Address',
  },
})

const ViewOnly = ({ address, intl }) => {
  const { formatMessage } = intl
  return (
    <div>
      <Input.TextArea rows={2} placeholder={formatMessage(messages.address)} value={address} />
      <br />
      <br />
      <Button type="primary" size="large" className={styles.button}>
        <FormattedMessage {...messages.button} />
      </Button>
    </div>
  )
}

ViewOnly.propTypes = {
  address: PropTypes.string,
  intl: intlShape.isRequired,
}

export default injectIntl(ViewOnly)
