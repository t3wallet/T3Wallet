import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import styles from './Menu.less'

const Menus = ({
  menu, curMenu, handleClick,
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
      // mode="horizontal"
      theme="light"
      selectedKeys={curMenu}
      className={styles.menuContainer}
      onClick={handleClick}
    >
      {menuItems}
    </Menu>
  )
}

Menus.propTypes = {
  menu: PropTypes.array.isRequired,
  curMenu: PropTypes.array,
  handleClick: PropTypes.func,
}

export default Menus
