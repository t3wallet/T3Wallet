import React from 'react'
import PropTypes from 'prop-types'
import {
  Layout, Select, Row, Col,
} from 'antd'
import config from 'config'
import logo from '../../assets/logo.png'
import styles from './Header.less'

const Header = ({
  changeLang, setNetworkProvider, i18n, curNetworkProvider,
}) => {
  const { languages, networkProviders } = config
  return (
    <Layout.Header className={styles.header}>
      <Row type="flex">
        <Col className={styles.leftWrapper} sm={12}>
          <a>
            <img alt="logo" src={logo} height="45px" />
          </a>
        </Col>
        <Col className={styles.rightWrapper} sm={12}>
          <Select defaultValue={i18n} onSelect={value => changeLang(value)} className={styles.selectBox}>
            {languages.map((item) => {
              return (
                <Select.Option key={item.i18n} value={item.i18n} size="large">
                  {item.label}
                </Select.Option>
              )
            })}
          </Select>

          <Select defaultValue={curNetworkProvider} onSelect={value => setNetworkProvider(value)} className={styles.selectBox}>
            {networkProviders.map((item) => {
              return (
                <Select.Option key={item.url} value={item.url} size="large">
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
  curNetworkProvider: PropTypes.string,
}

export default Header
