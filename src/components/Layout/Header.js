import React from 'react'
import PropTypes from 'prop-types'
import {
  Icon, Layout, Select,
} from 'antd'
import styles from './Header.less'

const Header = ({
  changeLang, languages, networkProviders, changeNetworkProvider, i18n, curNetworkProvider,
}) => {
  return (
    <Layout.Header className={styles.header}>
      <div className={styles.logo}>
        <Icon type="meh-o" spin style={{ fontSize: 40 }} />
      </div>
      <div className={styles.rightWarpper}>
        <Select defaultValue={i18n} onSelect={value => changeLang(value)} className={styles.selectBox}>
          {languages.map((item) => {
            return (
              <Select.Option key={item.i18n} value={item.i18n} size="large">
                {item.label}
              </Select.Option>
            )
          })}
        </Select>

        <Select defaultValue={curNetworkProvider.name} onSelect={changeNetworkProvider} className={styles.selectBox}>
          {networkProviders.map((item) => {
            return (
              <Select.Option key={item.url} value={item.name} size="large">
                {item.name}
              </Select.Option>
            )
          })}
        </Select>


      </div>
    </Layout.Header>
  )
}

Header.propTypes = {
  changeLang: PropTypes.func,
  languages: PropTypes.array,
  networkProviders: PropTypes.array,
  changeNetworkProvider: PropTypes.func,
  i18n: PropTypes.string,
  curNetworkProvider: PropTypes.object,
}

export default Header
