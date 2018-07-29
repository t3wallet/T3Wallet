import React from 'react'
// import PropTypes from 'prop-types'
import {
  Layout, Icon, Row, Col, Tag, Tooltip,
} from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FormattedMessage } from 'react-intl'
import styles from './Footer.less'

const Footer = () => {
  return (
    <Layout.Footer className={styles.footer}>
      <Row type="flex" align="center" justify="center">
        <Col sm={24} md={8}>
          <div style={{ lineHeight: 1.6 }}>
            <p>
              <FormattedMessage id="footer.aboutApp" defaultMessage="T3Wallet is an open-sourced Tezos Wallet web application. You can build locally and use offline for the best security. Please check out our github repo and contribution is welcome." />
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>
2018 © T3Wallet. All Rights Reserved.
              </span>
            </p>
          </div>
        </Col>

        <Col sm={24} md={8} className={styles.middleWrapper}>
          <span style={{ fontSize: '20px' }}>
            <FormattedMessage id="footer.followUs" defaultMessage="Follow Us" />
          </span>
          <Icon type="github" style={{ fontSize: 40 }} />
          <Icon type="twitter" style={{ fontSize: 40 }} />
          <Icon type="wechat" style={{ fontSize: 40 }} />
          <Icon type="slack" style={{ fontSize: 40 }} />
        </Col>

        <Col sm={24} md={8}>
          <div style={{ fontWeight: 'bold' }}>
            <div>
              <FormattedMessage id="footer.donation" defaultMessage="If you enjoy using our wallet, donations are appreciated:" />
            </div>

            <CopyToClipboard text="tz1XMRWVwwEZSZxkKurt3gAzr8G8fKPPE7QK"
              onCopy={() => console.log('[copied]', 'tz1XMRWVwwEZSZxkKurt3gAzr8G8fKPPE7QK')}
            >
              <Tooltip title="Copied!" trigger="click">
                <Tag color="geekblue">
                  <Icon type="copy" />
tz1XMRWVwwEZSZxkKurt3gAzr8G8fKPPE7QK
                </Tag>
              </Tooltip>
            </CopyToClipboard>

          </div>
        </Col>
      </Row>


    </Layout.Footer>
  )
}

Footer.propTypes = {
}

export default Footer
