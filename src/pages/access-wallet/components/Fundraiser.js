import React from 'react'
import { Form, Input, Button } from 'antd'
import {
  intlShape, injectIntl, defineMessages, FormattedMessage,
} from 'react-intl'
import PropTypes from 'prop-types'
import styles from './styles.less'

const FormItem = Form.Item

const messages = defineMessages({
  seed: {
    id: 'accessWallet.fundraiserSeed',
    defaultMessage: 'Fundraiser Wallet Seed',
  },
  email: {
    id: 'accessWallet.fundraiserEmail',
    defaultMessage: 'Fundraiser Email Address',
  },
  password: {
    id: 'accessWallet.fundraiserPassword',
    defaultMessage: 'Fundraiser Password',
  },
  address: {
    id: 'accessWallet.fundraiserAddress',
    defaultMessage: 'Fundraiser Address',
  },
  code: {
    id: 'accessWallet.fundraiserCode',
    defaultMessage: 'Activation Code',
  },
})


const Fundraiser = ({
  seed, email, password, address, activationCode, intl,
}) => {
  console.log(seed, email, password, address, activationCode)
  const { formatMessage } = intl
  return (
    <Form>
      <FormItem>
        <Input.TextArea rows={4} placeholder={formatMessage(messages.seed)} />
      </FormItem>

      <FormItem>
        <Input placeholder={formatMessage(messages.email)} />
      </FormItem>

      <FormItem>
        <Input placeholder={formatMessage(messages.password)} />
      </FormItem>

      <FormItem>
        <Input placeholder={formatMessage(messages.address)} />
      </FormItem>

      <FormItem>
        <Input placeholder={formatMessage(messages.code)} />
      </FormItem>
      <Button type="primary" size="large" className={styles.button}>
        <FormattedMessage id="accessWallet.unlockWallet" defaultMessage="Unlock Your Wallet" />
      </Button>
    </Form>
  )
}

Fundraiser.propTypes = {
  seed: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  address: PropTypes.string,
  activationCode: PropTypes.string,
  intl: intlShape.isRequired,
}

export default injectIntl(Fundraiser)
