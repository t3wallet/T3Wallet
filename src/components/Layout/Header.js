import React from 'react'
import PropTypes from 'prop-types'
import {
  Layout, Select, Row, Col, Icon,
} from 'antd'
import Link from 'umi/link'
import config from 'config'
import { FormattedMessage } from 'react-intl'
import logo from '../../assets/logo.png'
import styles from './Header.less'

const { languages, networkProviders } = config

const Header = ({
  changeLang, setNetworkProvider, i18n, blockHead,
}) => {
  const { header } = blockHead
  return (
    <Layout.Header className={styles.header}>
      <Row type="flex">
        <Col className={styles.leftWrapper} sm={12}>
          <Link to="/">
            <img alt="logo" src={logo} height="45px" />
          </Link>
        </Col>
        <Col className={styles.rightWrapper} sm={12}>
          <Col style={{ paddingRight: '10px' }}>
            <Icon type="bulb" style={{ color: header && header.level ? 'green' : 'red', marginRight: '5px' }} />
            <FormattedMessage id="blockLevel" defaultMessage="Block Level: " />
            {blockHead.header && blockHead.header.level || 'Loading...'}
          </Col>

          <Select defaultValue={i18n} onSelect={value => changeLang(value)} className={styles.selectBox}>
            {languages.map((item) => {
              return (
                <Select.Option key={item.i18n} value={item.i18n} size="large">
                  {item.label}
                </Select.Option>
              )
            })}
          </Select>

          <Select
            defaultValue={config.networkProviders[0].name}
            onSelect={value => setNetworkProvider(value)}
            className={styles.selectBox}
          >
            {networkProviders.map((item, index) => {
              return (
                <Select.Option key={item.url} value={index} size="large">
                  {item.name}
                </Select.Option>
              )
            })}
          </Select>
        </Col>
      </Row>
    </Layout.Header>
  )
}

Header.propTypes = {
  changeLang: PropTypes.func,
  setNetworkProvider: PropTypes.func,
  i18n: PropTypes.string,
  blockHead: PropTypes.object,
}

export default Header
