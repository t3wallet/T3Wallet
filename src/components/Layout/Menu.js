import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import styles from './Menu.less'

const Menus = ({
  menu, location,
}) => {
  const getMenus = () => {
    return menu.map((item) => {
      return (
        <Menu.Item key={item.key}>
          <Link to={item.route || '#'}>
            {item.icon && <Icon type={item.icon} />}
            <FormattedMessage id={item.localeId} defaultMessage={item.name} />
          </Link>
        </Menu.Item>
      )
    })
  }
  const menuItems = getMenus()
  return (
    <Menu
      mode="horizontal"
      theme="light"
      selectedKeys={[`/${location.pathname.split('/')[1]}`]}
      className={styles.menuContainer}
    >
      {menuItems}
    </Menu>
  )
}

Menus.propTypes = {
  location: PropTypes.object.isRequired,
  menu: PropTypes.array.isRequired,
}

export default Menus
