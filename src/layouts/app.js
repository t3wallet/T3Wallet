/* global window */
import React from 'react'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Layout } from 'antd'
import { Helmet } from 'react-helmet'
import { withRouter } from 'dva/router'
import { config } from 'utils'
import { Header, Menu, styles } from 'components/Layout'
import './app.less'

const { Content, Footer } = Layout

const App = ({
  children, dispatch, global, loading, location,
}) => {
  const {
    menu, languages, curMenu, i18n, networkProviders, curNetworkProvider,
  } = global
  const { logo } = config

  /* NProgress listener */
  let lastHref
  const { href } = window.location
  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }

  const headerProps = {
    languages,
    i18n,
    networkProviders,
    curNetworkProvider,
    changeLang (lang) {
      dispatch({
        type: 'global/changeLang',
        payload: lang,
      })
    },
    changeNetworkProvider (network) {
      dispatch({
        type: 'global/changeNetworkProvider',
        payload: network,
      })
      console.log('[Changed network provider]', network)
    },
  }

  const menuProps = {
    location,
    menu,
    curMenu,
    handleClick (e) {
      const { key } = e
      dispatch({
        type: 'global/changeMenu',
        payload: key,
      })
    },
  }

  return (
    <div className="body">
      <Helmet>
        <title>
          Hashbook.io -- Your Trusted Tezos Wallet
          {/* <FormattedMessage id="slogan" defaultMessage="Hashbook.io -- Your Trusted Tezos Wallet" /> */}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={logo} type="image/x-icon" />
      </Helmet>
      <Layout className={styles.light}>
        <Layout style={{ height: '100vh', overflow: 'scroll' }} id="mainContainer">
          <Header {...headerProps} />
          <Menu {...menuProps} />
          <Content>
            { children }
          </Content>
          <Footer>
            {config.footerText}
          </Footer>
        </Layout>
      </Layout>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  global: PropTypes.object,
  loading: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    global: state.global,
    loading: state.loading,
  }
}

export default withRouter(connect(mapStateToProps)(App))
