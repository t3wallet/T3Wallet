import React from 'react'
// import PropTypes from 'prop-types'
import {
  Layout, Icon,
} from 'antd'
import styles from './Footer.less'

const Footer = ({}) => {
  return (
    <Layout.Footer className={styles.footer}>
      <span>
                Hashbook is open-sourced.

            Please check out our github repo and contribute.
      </span>
      <div>
                  If you enjoy using our wallet, feel free to donate some tezzies to this address:

                  tz1XMRWVwwEZSZxkKurt3gAzr8G8fKPPE7QK
      </div>
      <Icon type="github" />
      <Icon type="twitter" />
      <Icon type="wechat" />
      <Icon type="slack" />

    </Layout.Footer>
  )
}

Footer.propTypes = {
}

export default Footer
