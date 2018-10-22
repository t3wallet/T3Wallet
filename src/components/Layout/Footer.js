import React from 'react'
// import PropTypes from 'prop-types'
import {
  Layout, Icon, Row, Col, Tag, Tooltip, Modal,
} from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FormattedMessage } from 'react-intl'
import styles from './Footer.less'

const showModal = () => {
  Modal.info({
    title: 'T3钱包微信交流群',
    content: (
      <div>
        <p style={{ fontFamily: 'Tamil Sangam MN' }}>
进入微信群，请添加 sam__wang,备注 “t3钱包” 邀请加入。
        </p>
      </div>
    ),
  })
}

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
          <a href="https://github.com/orgs/t3wallet" style={{ color: '#fff' }} rel="noopener noreferrer" target="_blank">
            <Icon type="github" style={{ fontSize: 40 }} />
          </a>
          <a href="https://twitter.com/t3wallet" style={{ color: '#fff' }} rel="noopener noreferrer" target="_blank">
            <Icon type="twitter" style={{ fontSize: 40 }} />
          </a>
          <a style={{ color: '#fff' }}>
            <Icon type="wechat" style={{ fontSize: 40 }} onClick={() => { showModal() }} />
          </a>
          {/* <a href="https://join.slack.com/t/t3wallet/shared_invite/enQtNDA2MzQ5OTUwNzUzLWE2MTM4MGYzODU2M2Q0MDNhN2U4OGY3NTMwMjQzODFkZWI5MjM1MmE2YTI2ZjU4YWU3MTg4ZjRkYTgxNGM2ZWU" style={{ color: '#fff' }} rel="noopener noreferrer" target="_blank">
            <Icon type="slack" style={{ fontSize: 40 }} />
          </a> */}
        </Col>

        <Col sm={24} md={8}>
          <div style={{ fontWeight: 'bold' }}>
            <div>
              <FormattedMessage id="footer.donation" defaultMessage="If you enjoy using our wallet, donations are appreciated:" />
            </div>

            <CopyToClipboard text="tz1LTV5GuikfVsesof2nhy3v9kCzkAQ7nmt9"
              onCopy={() => console.log('[copied]', 'tz1LTV5GuikfVsesof2nhy3v9kCzkAQ7nmt9')}
            >
              <Tooltip title="Copied!" trigger="click">
                <Tag color="geekblue">
                  <Icon type="copy" />
tz1LTV5GuikfVsesof2nhy3v9kCzkAQ7nmt9
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
